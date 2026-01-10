import React, { useState } from "react";
import { Star, X, Loader2, MessageSquare } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const RatingModal = ({ booking, onClose, onRatingSubmitted }) => {
  const { axios, getToken } = useAppContext();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    try {
      setSubmitting(true);
      const token = await getToken();

      // Adjust the API endpoint to match your backend routes
      const { data } = await axios.post(
        "/api/ratings",
        {
          bookingId: booking._id,
          roomId: booking.room._id,
          rating,
          review,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Thank you for your feedback!");
        // Pass the new rating object back to the parent to update UI instantly
        onRatingSubmitted({ rating, review });
        onClose();
      } else {
        toast.error(data.message || "Failed to submit rating");
      }
    } catch (error) {
      console.error("Rating error:", error);
      toast.error(error?.response?.data?.message || "Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Rate your stay</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <img
              src={booking.room?.images?.[0] || "/placeholder.svg"}
              alt="Room"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900 line-clamp-1">
                {booking.room?.pg?.name || "PG Name"}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                {booking.room?.roomType} Room
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Star Rating */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                How was your experience?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-100 text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-yellow-600 font-medium h-5">
                {rating === 1 && "Terrible"}
                {rating === 2 && "Bad"}
                {rating === 3 && "Okay"}
                {rating === 4 && "Good"}
                {rating === 5 && "Excellent!"}
              </p>
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Write a review (optional)
                </span>
                <span className="text-xs text-gray-400">
                  {review.length}/500
                </span>
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                maxLength={500}
                placeholder="Tell us what you liked or what needs improvement..."
                className="w-full min-h-[100px] p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || rating === 0}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
