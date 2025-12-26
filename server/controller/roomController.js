import Room from "../models/room.js";
import PG from "../models/pg.js";
import { cloudinary } from "../config/cloudinary.js";

export const createRoom = async (req, res) => {
  try {
    const {
      roomType,
      pricePerBed,
      totalBeds,
      availableBeds,
      gender,
      amenities,
    } = req.body;
    // Find PG owned by logged-in user
    const pg = await PG.findOne({ owner: req.user._id });

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "No PG found. Please register your PG first.",
      });
    }

    // Upload images to Cloudinary
    let images = [];
    if (req.files?.length) {
      const uploads = req.files.map((file) =>
        cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "pg_rooms" }
        )
      );

      const results = await Promise.all(uploads);
      images = results.map((r) => r.secure_url);
    }

    // Create Room
    await Room.create({
      pg: pg._id,
      roomType,
      totalBeds: parseInt(totalBeds),
      availableBeds: parseInt(availableBeds),
      pricePerBed: parseInt(pricePerBed),
      gender,
      amenities: Array.isArray(amenities)
        ? amenities
        : JSON.parse(amenities || "[]"),
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
    });
  } catch (error) {
    console.error("Create Room Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to delete a room
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("pg");
    if (!room || room.pg.owner !== req.auth.userId) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    await Room.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all available rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "pg",
        select: "name city address",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOwnerRooms = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const pg = await PG.findOne({ owner: ownerId });
    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "No PG found for this owner",
      });
    }

    const rooms = await Room.find({ pg: pg._id })
      .populate("pg", "name city address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const ownerId = req.user._id;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const pg = await PG.findOne({
      _id: room.pg,
      owner: ownerId,
    });

    if (!pg) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this room",
      });
    }

    room.isAvailable = !room.isAvailable;
    await room.save();

    return res.status(200).json({
      success: true,
      message: "Room availability updated",
      isAvailable: room.isAvailable,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
