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

    if (e.target.name === "checkInDate" || e.target.name === "checkOutDate") {
      setIsAvailable(null);
    }
  };

  const checkAvailability = async () => {
    const { checkInDate, checkOutDate, guests } = formData;

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
        guests: Number(guests) || 1,
      });

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available for selected dates!");
        } else {
          setIsAvailable(false);
          toast.error(
            data.message ||
              `Room is not available. Only ${data.remainingBeds ?? 0} bed(s) left.`,
          );
        }
      } else {
        toast.error(data.message || "Failed to check availability");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to check availability",
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
        "Room is not available for selected dates. Please choose different dates.",
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
          guests: parseInt(guests, 10),
          paymentMethod: formData.paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
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

  const today = new Date().toISOString().split("T")[0];

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

  const maxGuests = Math.max(1, Number(room.totalBeds) || 1);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-10 sticky top-0">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Secure Booking
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </h3>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <Building className="w-3.5 h-3.5" />
              {room?.pg?.name || "Property"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Price Summary Box */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 relative z-10">
                <span className="text-slate-400 text-sm font-medium">
                  Price per bed
                </span>
                <span className="font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg">
                  {currency}
                  {room?.pricePerBed?.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal ml-0.5">
                    /mo
                  </span>
                </span>
              </div>

              {totalPrice !== null ? (
                <div className="flex justify-between items-end pt-4 border-t border-slate-800 relative z-10">
                  <div>
                    <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold block mb-1">
                      Total Amount
                    </span>
                    <span className="text-sm text-slate-300 font-medium">
                      {formData.guests} Guest
                      {Number(formData.guests) > 1 ? "s" : ""}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-amber-400">
                    {currency}
                    {totalPrice.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
                  Select dates to calculate total
                </div>
              )}
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                Personal Details
              </h4>
              <div className="grid gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-slate-400 focus:ring-0 text-slate-900 placeholder:text-slate-400 transition-all outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-slate-400 focus:ring-0 text-slate-900 placeholder:text-slate-400 transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-slate-400 focus:ring-0 text-slate-900 placeholder:text-slate-400 transition-all outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                Stay Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 ml-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    min={today}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-slate-400 focus:ring-0 text-slate-900 outline-none cursor-pointer transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 ml-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    min={formData.checkInDate || today}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-slate-400 focus:ring-0 text-slate-900 outline-none cursor-pointer transition-all"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-slate-400 focus:ring-0 text-slate-900 outline-none appearance-none cursor-pointer transition-all"
                >
                  {[...Array(maxGuests || 1)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Guest{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-4 w-2 h-2 border-r-2 border-b-2 border-slate-400 rotate-45 pointer-events-none" />
              </div>
            </div>

            {/* Availability Banner */}
            {isAvailable !== null && (
              <div
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  isAvailable
                    ? "bg-green-50 border-green-100 text-green-800"
                    : "bg-rose-50 border-rose-100 text-rose-800"
                }`}
              >
                {isAvailable ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
                )}
                <div>
                  <p className="font-bold text-sm">
                    {isAvailable ? "Available!" : "Not Available"}
                  </p>
                  <p className="text-xs opacity-90 mt-0.5">
                    {isAvailable
                      ? "Beds are available for your selected dates."
                      : "Please select different dates or reduce guests."}
                  </p>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                <Wallet className="w-4 h-4 text-amber-500" />
                Payment Method
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleChange({
                      target: { name: "paymentMethod", value: "Pay At PG" },
                    }) ||
                    (typeof setFormData === "function" &&
                      setFormData({ ...formData, paymentMethod: "Pay At PG" }))
                  }
                  className={`relative p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2 cursor-pointer ${
                    formData.paymentMethod === "Pay At PG"
                      ? "border-slate-900 bg-slate-50 text-slate-900 ring-1 ring-slate-900"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-500"
                  }`}
                >
                  <Building
                    className={`w-6 h-6 ${
                      formData.paymentMethod === "Pay At PG"
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  />
                  <div className="text-center">
                    <div
                      className={`font-bold text-sm ${formData.paymentMethod === "Pay At PG" ? "text-slate-900" : "text-slate-700"}`}
                    >
                      Pay at Property
                    </div>
                    <div className="text-[10px] opacity-70 mt-0.5">
                      Cash / UPI on arrival
                    </div>
                  </div>
                  {formData.paymentMethod === "Pay At PG" && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-slate-900" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleChange({
                      target: { name: "paymentMethod", value: "Online" },
                    }) ||
                    (typeof setFormData === "function" &&
                      setFormData({ ...formData, paymentMethod: "Online" }))
                  }
                  className={`relative p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2 cursor-pointer ${
                    formData.paymentMethod === "Online"
                      ? "border-slate-900 bg-slate-50 text-slate-900 ring-1 ring-slate-900"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-500"
                  }`}
                >
                  <CreditCard
                    className={`w-6 h-6 ${
                      formData.paymentMethod === "Online"
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  />
                  <div className="text-center">
                    <div
                      className={`font-bold text-sm ${formData.paymentMethod === "Online" ? "text-slate-900" : "text-slate-700"}`}
                    >
                      Pay Online
                    </div>
                    <div className="text-[10px] opacity-70 mt-0.5">
                      Secure Payment
                    </div>
                  </div>
                  {formData.paymentMethod === "Online" && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-slate-900" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={checkAvailability}
                disabled={
                  checkingAvailability ||
                  !formData.checkInDate ||
                  !formData.checkOutDate
                }
                className="flex-1 py-3.5 px-4 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                className="flex-[2] py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-700 text-white font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
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
