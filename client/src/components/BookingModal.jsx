import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const BookingModal = ({ room, onClose }) => {
  const navigate = useNavigate();
  const { axios, getToken, currency } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    paymentMethod: "Pay At PG",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Reset availability when dates change
    if (e.target.name === "checkInDate" || e.target.name === "checkOutDate") {
      setIsAvailable(null);
    }
  };

  const checkAvailability = async () => {
    const { checkInDate, checkOutDate } = formData;

    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      toast.error("Check-in date should be before check-out date");
      return;
    }

    setCheckingAvailability(true);

    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: room._id,
        checkInDate,
        checkOutDate,
      });

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available for selected dates!");
        } else {
          setIsAvailable(false);
          toast.error("Room is not available for selected dates");
        }
      } else {
        toast.error(data.message || "Failed to check availability");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to check availability"
      );
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, checkInDate, checkOutDate, guests } = formData;

    if (!name || !email || !phone || !checkInDate || !checkOutDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      toast.error("Check-in date should be before check-out date");
      return;
    }

    // If availability hasn't been checked, check it first
    if (isAvailable === null) {
      await checkAvailability();
      return;
    }

    if (formData.paymentMethod === "Online") {
      toast("Online payment coming soon! Please select Pay At PG for now.", {
        icon: "🚧",
      });
      return;
    }

    if (!isAvailable) {
      toast.error(
        "Room is not available for selected dates. Please choose different dates."
      );
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();
      const username = email.trim().toLowerCase();

      const { data } = await axios.post(
        "/api/bookings/book",
        {
          room: room._id,
          name,
          email,
          phone,
          username,
          checkInDate,
          checkOutDate,
          guests: parseInt(guests),
          paymentMethod: formData.paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Booking successful!");
        onClose();
        navigate("/my-bookings");
        window.scrollTo(0, 0);
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to book room");
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  // Calculate total price (same logic as backend)
  const calculateTotalPrice = () => {
    const { checkInDate, checkOutDate, guests } = formData;
    if (!checkInDate || !checkOutDate || !room.pricePerBed) return null;

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);

    if (end <= start) return null;

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const months = Math.max(1, Math.ceil(days / 30));

    return Number(room.pricePerBed) * Number(guests) * months;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Book Room</h3>
              <p className="text-sm text-gray-500">{room.pg?.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Price Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price per bed</span>
              <span className="font-medium text-gray-900">
                {currency}
                {room.pricePerBed?.toLocaleString()}/month
              </span>
            </div>
            {totalPrice !== null && (
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="text-gray-700 font-medium">
                  Total ({formData.guests} guest{formData.guests > 1 ? "s" : ""}
                  )
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {currency}
                  {totalPrice.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  min={today}
                  className="w-full px-3 py-2 border hover:cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  min={formData.checkInDate || today}
                  className="w-full px-3 py-2 border hover:cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Guests
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[...Array(room.availableBeds || 1)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Guest{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "Pay At PG" })
                  }
                  className={`p-3 rounded-lg hover:cursor-pointer border-2 transition-all ${
                    formData.paymentMethod === "Pay At PG"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 "
                  }`}
                >
                  <div className="font-medium">Pay At PG</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Pay when you arrive
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "Online" })
                  }
                  className={`p-3 rounded-lg border-2 hover:cursor-pointer transition-all ${
                    formData.paymentMethod === "Online"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium">Pay Now</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Online payment
                  </div>
                </button>
              </div>
            </div>

            {/* Availability Status */}
            {isAvailable !== null && (
              <div
                className={`flex items-center  gap-2 p-3 rounded-lg ${
                  isAvailable
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {isAvailable ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Room is available for selected dates</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span>Room is not available for selected dates</span>
                  </>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={checkAvailability}
                disabled={
                  checkingAvailability ||
                  !formData.checkInDate ||
                  !formData.checkOutDate
                }
                className="flex-1 border-2  border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkingAvailability ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking...
                  </span>
                ) : (
                  "Check Availability"
                )}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || isAvailable === false}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Booking...
                  </span>
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
