const Rating = require("../models/ratingModel");
const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

exports.createRating = async (req, res) => {
  try {
    const { bookingId, roomId, rating, review } = req.body;
    const userId = req.user._id;

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

    if (booking.isRated) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this booking",
      });
    }

    const newRating = await Rating.create({
      user: userId,
      booking: bookingId,
      room: roomId,
      rating,
      review,
    });

    //Update Booking status
    booking.isRated = true;
    booking.userRating = newRating._id;
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      rating: newRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error submitting rating",
      error: error.message,
    });
  }
};
