import mongoose from "mongoose";

import Booking from "../models/booking.js";
import Room from "../models/room.js";
import PG from "../models/pg.js";
import User from "../models/user.js";

/** ---------- helpers ---------- */

const getClerkUserId = (req) =>
  req?.user?.clerkId ||
  req?.user?.id ||
  req?.user?.userId ||
  req?.auth?.userId ||
  req?.userId ||
  null;

const getModelPathInstance = (model, pathName) => {
  const p = model?.schema?.path?.(pathName);
  return p?.instance || null;
};

const getIdForSchemaPath = (model, pathName, { objectId, stringId }) => {
  const instance = getModelPathInstance(model, pathName);
  if (instance === "ObjectId" || instance === "ObjectID") return objectId;
  return stringId;
};

const calculateTotalPrice = ({
  pricePerBed,
  checkInDate,
  checkOutDate,
  guests,
}) => {
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);

  if (end <= start) return 0;

  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const months = Math.max(1, Math.ceil(days / 30));

  return Number(pricePerBed) * Number(guests) * months;
};

const assertValidDateRange = (checkInDate, checkOutDate) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (!checkInDate || !checkOutDate)
    return { ok: false, message: "Missing dates" };
  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return { ok: false, message: "Invalid date format" };
  }
  if (checkOut <= checkIn) {
    return { ok: false, message: "Check-out date must be after check-in date" };
  }

  return { ok: true, checkIn, checkOut };
};

const getRoomAvailabilityForRange = async ({
  roomId,
  checkInDate,
  checkOutDate,
}) => {
  const range = assertValidDateRange(checkInDate, checkOutDate);
  if (!range.ok) {
    const err = new Error(range.message);
    err.statusCode = 400;
    throw err;
  }

  const roomData = await Room.findById(roomId);
  if (!roomData) {
    const err = new Error("Room not found");
    err.statusCode = 404;
    throw err;
  }

  const totalBeds = Math.max(1, Number(roomData.totalBeds) || 1);

  const overlapMatch = {
    room: roomData._id,
    status: { $ne: "cancelled" },
    checkInDate: { $lt: range.checkOut },
    checkOutDate: { $gt: range.checkIn },
  };

  const agg = await Booking.aggregate([
    { $match: overlapMatch },
    { $group: { _id: null, bookedBeds: { $sum: "$guests" } } },
  ]);

  const bookedBeds = agg?.[0]?.bookedBeds ? Number(agg[0].bookedBeds) : 0;
  const remainingBeds = Math.max(0, totalBeds - bookedBeds);

  return { roomData, totalBeds, bookedBeds, remainingBeds, range };
};

const getOrCreateMongoUser = async (req) => {
  const clerkId = getClerkUserId(req);
  if (!clerkId) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    throw err;
  }

  const dbUser = await User.findOneAndUpdate(
    { clerkId },
    { $setOnInsert: { clerkId } },
    { new: true, upsert: true, runValidators: true },
  );

  return { dbUser, clerkId };
};

/** ---------- controllers ---------- */

// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;

    if (!room || !checkInDate || !checkOutDate) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const requestedBeds = Math.max(1, Number(guests) || 1);

    const { remainingBeds } = await getRoomAvailabilityForRange({
      roomId: room,
      checkInDate,
      checkOutDate,
    });

    const isAvailable = remainingBeds >= requestedBeds;

    return res.json({
      success: true,
      isAvailable,
      remainingBeds,
      requestedBeds,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// POST /api/bookings/book
export const createBooking = async (req, res) => {
  try {
    const {
      room,
      checkInDate,
      checkOutDate,
      guests,
      name,
      email,
      phone,
      username,
      paymentMethod,
    } = req.body;

    if (!room || !checkInDate || !checkOutDate || !guests) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const parsedGuests = Number(guests);
    if (!Number.isFinite(parsedGuests) || parsedGuests < 1) {
      return res.json({ success: false, message: "Invalid guests count" });
    }

    const range = assertValidDateRange(checkInDate, checkOutDate);
    if (!range.ok) {
      return res.json({ success: false, message: range.message });
    }

    const { dbUser } = await getOrCreateMongoUser(req);

    const roomData = await Room.findById(room).populate("pg");
    if (!roomData || !roomData.pg) {
      return res.json({ success: false, message: "Room not found" });
    }

    const { remainingBeds } = await getRoomAvailabilityForRange({
      roomId: roomData._id,
      checkInDate,
      checkOutDate,
    });

    if (remainingBeds < parsedGuests) {
      return res.json({
        success: false,
        message: `Room not available. Only ${remainingBeds} bed(s) left for selected dates.`,
      });
    }

    const totalPrice = calculateTotalPrice({
      pricePerBed: roomData.pricePerBed,
      checkInDate,
      checkOutDate,
      guests: parsedGuests,
    });

    const booking = await Booking.create({
      user: dbUser._id,
      room: roomData._id,
      pg: roomData.pg._id,
      guests: parsedGuests,
      checkInDate: range.checkIn,
      checkOutDate: range.checkOut,
      totalPrice,
      status: "pending",
      paymentMethod: paymentMethod || "Pay At PG",
      isPaid: false,

      name,
      email,
      phone,
      username,
    });

    return res.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error?.message || "Failed to create booking",
    });
  }
};

// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const { dbUser, clerkId } = await getOrCreateMongoUser(req);

    const bookingUserId = getIdForSchemaPath(Booking, "user", {
      objectId: dbUser._id,
      stringId: clerkId,
    });

    const bookings = await Booking.find({ user: bookingUserId })
      .populate("room")
      .populate("pg")
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (error) {
    return res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

// GET /api/bookings/owner
export const getOwnerBookings = async (req, res) => {
  try {
    const { dbUser, clerkId } = await getOrCreateMongoUser(req);

    const ownerId = getIdForSchemaPath(PG, "owner", {
      objectId: dbUser._id,
      stringId: clerkId,
    });

    if (
      getModelPathInstance(PG, "owner")?.startsWith("ObjectId") &&
      !mongoose.Types.ObjectId.isValid(ownerId)
    ) {
      return res.json({ success: false, message: "Invalid owner id" });
    }

    const pg = await PG.findOne({ owner: ownerId });
    if (!pg) {
      return res.json({ success: false, message: "No PG found" });
    }

    const bookings = await Booking.find({ pg: pg._id })
      .populate("room")
      .populate("pg")
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + (Number(booking.totalPrice) || 0),
      0,
    );

    return res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    return res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

// DELETE /api/bookings/:id
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findOne({ _id: id, user: userId });
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    await Booking.findByIdAndDelete(id);

    return res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Failed to delete booking" });
  }
};

// PUT /api/bookings/:id/mark-paid
export const markBookingAsPaid = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    booking.isPaid = true;
    booking.status = "confirmed";
    await booking.save();

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
