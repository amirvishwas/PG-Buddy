import Rating from "../models/rating.js";
import Booking from "../models/booking.js";
import Room from "../models/room.js";
import User from "../models/user.js";

export const createRating = async (req, res) => {
  try {
    const { bookingId, roomId, rating, review } = req.body;

    // 1. GET USER ID
    const clerkId = req.auth?.userId || req.user?.id || req.user?.clerkId;

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user ID found",
      });
    }

    // Find the user
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in database",
      });
    }

    const userId = user._id;

    // 2. Validate if booking exists and belongs to user
    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      status: { $in: ["completed", "confirmed"] },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or not eligible for rating",
      });
    }

    // 3. Check if already rated
    if (booking.isRated) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this booking",
      });
    }

    // 4. Create Rating
    const newRating = await Rating.create({
      user: userId,
      booking: bookingId,
      room: roomId,
      rating,
      review,
    });

    // 5. Update Booking status
    booking.isRated = true;
    booking.userRating = newRating._id;
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      rating: newRating,
    });
  } catch (error) {
    console.error("Rating Error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting rating",
      error: error.message,
    });
  }
};

export const getRoomRatings = async (req, res) => {
  try {
    const { roomId } = req.params;

    const ratings = await Rating.find({ room: roomId })
      .populate("user", "name email image")
      .sort({ createdAt: -1 });

    const totalRatings = ratings.length;
    const averageRating =
      totalRatings > 0
        ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings
        : 0;

    res.status(200).json({
      success: true,
      ratings,
      averageRating,
      totalRatings,
    });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ratings",
      error: error.message,
    });
  }
};
