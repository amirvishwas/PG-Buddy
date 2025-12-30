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

const calcNights = (checkInDate, checkOutDate) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffMs = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Number.isFinite(nights) ? nights : 0;
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

const isRoomAvailable = async ({ room, checkInDate, checkOutDate }) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  const overlap = await Booking.exists({
    room,
    status: { $ne: "cancelled" },
    checkInDate: { $lt: checkOut },
    checkOutDate: { $gt: checkIn },
  });

  return !overlap;
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
    { new: true, upsert: true, runValidators: true }
  );

  return { dbUser, clerkId };
};

const getIdForSchemaPath = (model, pathName, { objectId, stringId }) => {
  const instance = getModelPathInstance(model, pathName);
  if (instance === "ObjectId" || instance === "ObjectID") return objectId;
  return stringId;
};

/** ---------- controllers ---------- */

// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    if (!room || !checkInDate || !checkOutDate) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const available = await isRoomAvailable({
      room,
      checkInDate,
      checkOutDate,
    });
    return res.json({ success: true, isAvailable: available });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// POST /api/bookings/book
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;

    if (!room || !checkInDate || !checkOutDate || !guests) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      return res.json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    const { dbUser } = await getOrCreateMongoUser(req);

    // Check availability
    const isAvailable = await Booking.exists({
      room,
      status: { $ne: "cancelled" },
      checkInDate: { $lt: new Date(checkOutDate) },
      checkOutDate: { $gt: new Date(checkInDate) },
    });

    if (isAvailable) {
      return res.json({ success: false, message: "Room not available" });
    }

    const roomData = await Room.findById(room).populate("pg");
    if (!roomData || !roomData.pg) {
      return res.json({ success: false, message: "Room not found" });
    }

    const totalPrice = calculateTotalPrice({
      pricePerBed: roomData.pricePerBed,
      checkInDate,
      checkOutDate,
      guests,
    });

    const booking = await Booking.create({
      user: dbUser._id,
      room: roomData._id,
      pg: roomData.pg._id,
      guests,
      checkInDate,
      checkOutDate,
      totalPrice,
      status: "pending",
      isPaid: false,
    });
    roomData.availableBeds = Math.max(
      0,
      roomData.availableBeds - Number(guests)
    );
    if (roomData.availableBeds === 0) {
      roomData.isAvailable = false;
    }
    await roomData.save();

    return res.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Failed to create booking",
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
      0
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

    // Verify booking belongs to user
    const booking = await Booking.findOne({ _id: id, user: userId });
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    // Restore room availability
    const roomData = await Room.findById(booking.room);
    if (roomData) {
      roomData.availableBeds = Math.min(
        roomData.totalBeds,
        roomData.availableBeds + booking.guests
      );
      roomData.isAvailable = true;
      await roomData.save();
    }

    await Booking.findByIdAndDelete(id);
    return res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Failed to delete booking" });
  }
};

//mark booking as paid
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
