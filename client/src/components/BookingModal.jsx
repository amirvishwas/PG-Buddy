import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  Loader2,
  X,
  Calendar,
  User,
  Mail,
  Phone,
  CreditCard,
  Building,
  Users,
  Wallet,
  ShieldCheck,
} from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 sticky top-0">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Secure Booking
              <ShieldCheck className="w-5 h-5 text-green-500" />
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <Building className="w-3 h-3" />
              {room.pg?.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Price Summary Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl -mr-10 -mt-10" />

              <div className="flex justify-between items-center mb-3 relative z-10">
                <span className="text-gray-600 text-sm font-medium">
                  Price per bed
                </span>
                <span className="font-bold text-gray-900 bg-white/60 px-2 py-1 rounded-lg backdrop-blur-sm">
                  {currency}
                  {room.pricePerBed?.toLocaleString()}
                  <span className="text-xs text-gray-500 font-normal">/mo</span>
                </span>
              </div>

              {totalPrice !== null ? (
                <div className="flex justify-between items-end pt-3 border-t border-blue-200/50 relative z-10">
                  <div>
                    <span className="text-gray-600 text-xs uppercase tracking-wider font-bold block mb-1">
                      Total Amount
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {formData.guests} Guest{formData.guests > 1 ? "s" : ""}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-blue-700">
                    {currency}
                    {totalPrice.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div className="pt-3 border-t border-blue-200/50 text-center text-xs text-blue-400">
                  Select dates to calculate total
                </div>
              )}
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                Personal Details
              </h4>
              <div className="grid gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Stay Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 ml-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    min={today}
                    className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 ml-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    min={formData.checkInDate || today}
                    className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                >
                  {[...Array(room.availableBeds || 1)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Guest{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-4 w-2 h-2 border-r-2 border-b-2 border-gray-400 rotate-45 pointer-events-none" />
              </div>
            </div>

            {/* Availability Status */}
            {isAvailable !== null && (
              <div
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  isAvailable
                    ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                    : "bg-red-50 border-red-100 text-red-800"
                }`}
              >
                {isAvailable ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                )}
                <div>
                  <p className="font-bold text-sm">
                    {isAvailable ? "Available!" : "Not Available"}
                  </p>
                  <p className="text-xs opacity-90 mt-0.5">
                    {isAvailable
                      ? "This room is free for your selected dates."
                      : "Please select different dates to proceed."}
                  </p>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-500" />
                Payment Method
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "Pay At PG" })
                  }
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 hover:shadow-md ${
                    formData.paymentMethod === "Pay At PG"
                      ? "border-blue-600 bg-blue-50/50 text-blue-700"
                      : "border-gray-100 hover:border-blue-200 bg-white text-gray-600"
                  }`}
                >
                  <Building
                    className={`w-6 h-6 ${
                      formData.paymentMethod === "Pay At PG"
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="text-center">
                    <div className="font-bold text-sm">Pay at Property</div>
                    <div className="text-[10px] opacity-70">
                      Cash / UPI on arrival
                    </div>
                  </div>
                  {formData.paymentMethod === "Pay At PG" && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "Online" })
                  }
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 hover:shadow-md ${
                    formData.paymentMethod === "Online"
                      ? "border-blue-600 bg-blue-50/50 text-blue-700"
                      : "border-gray-100 hover:border-blue-200 bg-white text-gray-600"
                  }`}
                >
                  <CreditCard
                    className={`w-6 h-6 ${
                      formData.paymentMethod === "Online"
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="text-center">
                    <div className="font-bold text-sm">Pay Online</div>
                    <div className="text-[10px] opacity-70">Secure Payment</div>
                  </div>
                  {formData.paymentMethod === "Online" && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={checkAvailability}
                disabled={
                  checkingAvailability ||
                  !formData.checkInDate ||
                  !formData.checkOutDate
                }
                className="flex-1 py-3.5 px-4 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200"
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

              <button
                type="submit"
                disabled={loading || isAvailable === false}
                className="flex-[2] py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Confirm Booking"
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
