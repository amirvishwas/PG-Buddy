import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import RatingModal from "../components/RatingModal";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Home,
  ArrowLeft,
  Bed,
  Receipt,
  Sparkles,
  SearchX,
  ChevronRight,
  ShieldCheck,
  Star,
} from "lucide-react";

const MyBookings = () => {
  const navigate = useNavigate();
  const { axios, getToken, user, currency } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [ratingBooking, setRatingBooking] = useState(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setCancellingId(bookingId);
      const token = await getToken();

      const { data } = await axios.delete(`/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("Booking deleted successfully");
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      } else {
        toast.error(data.message || "Failed to delete booking");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  const handleRatingSubmitted = (rating) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === ratingBooking?._id
          ? { ...b, isRated: true, userRating: rating }
          : b,
      ),
    );
    setRatingBooking(null);
  };

  const canRate = (booking) => {
    const rateableStatuses = ["confirmed", "completed"];
    return (
      rateableStatuses.includes(booking.status?.toLowerCase()) &&
      !booking.isRated
    );
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "completed":
        return "bg-slate-50 text-slate-700 border-slate-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "pending":
        return <Clock className="w-3.5 h-3.5" />;
      case "cancelled":
        return <XCircle className="w-3.5 h-3.5" />;
      case "completed":
        return <CheckCircle className="w-3.5 h-3.5" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-700 shrink-0">
            <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
            Sign In Required
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed text-sm sm:text-base">
            Please sign in to access your bookings and manage your stays
            securely.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-slate-900 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-slate-700 active:scale-95 transition-all duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm font-medium">
          Fetching your stays...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <div className="pt-6 sm:pt-8 md:pt-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 group inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-semibold">Back</span>
        </button>

        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-1">
            User Account
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              My Bookings
            </h1>
            <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-sm">
              {bookings.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-200 shadow-sm px-6">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-6">
              <SearchX className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              No Bookings Yet
            </h2>
            <p className="text-sm text-slate-500 mb-8 max-w-sm">
              Looks like you haven't made any bookings yet. Your perfect stay is
              just a search away.
            </p>
            <button
              onClick={() => navigate("/listings")}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-700 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Explore PGs
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Bookings",
                  value: bookings.length,
                  icon: Receipt,
                  iconClass: "text-slate-700",
                  bgClass: "bg-slate-100",
                },
                {
                  label: "Confirmed",
                  value: bookings.filter((b) => b.status === "confirmed")
                    .length,
                  icon: CheckCircle,
                  iconClass: "text-green-600",
                  bgClass: "bg-green-50",
                },
                {
                  label: "Pending",
                  value: bookings.filter((b) => b.status === "pending").length,
                  icon: Clock,
                  iconClass: "text-amber-600",
                  bgClass: "bg-amber-50",
                },
                {
                  label: "Cancelled",
                  value: bookings.filter((b) => b.status === "cancelled")
                    .length,
                  icon: XCircle,
                  iconClass: "text-rose-600",
                  bgClass: "bg-rose-50",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bgClass}`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.iconClass}`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bookings List */}
            <div className="grid gap-5">
              {bookings.map((booking) => {
                const pgName =
                  booking.pg?.name || booking.room?.pg?.name || "PG Room";
                const pgAddress =
                  booking.pg?.address ||
                  booking.room?.pg?.address ||
                  booking.pg?.city ||
                  booking.room?.pg?.city ||
                  "Location not available";

                return (
                  <div
                    key={booking._id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row gap-5 transition-all duration-200 hover:shadow-md"
                  >
                    {/* Image Section */}
                    <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative rounded-xl overflow-hidden border border-slate-100">
                      <img
                        src={booking.room?.images?.[0] || "/placeholder.svg"}
                        alt={pgName}
                        className="w-full h-full object-cover"
                      />

                      {/* Rating Badge  */}
                      {booking.isRated && booking.userRating && (
                        <div className="absolute top-3 left-3 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-bold text-xs">
                            {booking.userRating.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                          <div>
                            <h3
                              className="text-lg font-bold text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                              onClick={() =>
                                navigate(`/pg/${booking.room?._id}`)
                              }
                            >
                              {pgName}
                            </h3>
                            <div className="flex items-center gap-1.5 text-slate-500 mt-1 text-sm">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{pgAddress}</span>
                            </div>
                          </div>

                          <span
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${getStatusColor(
                              booking.status,
                            )}`}
                          >
                            {getStatusIcon(booking.status)}
                            {booking.status || "Pending"}
                          </span>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                          <div className="space-y-1">
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Check-in
                            </div>
                            <div className="font-semibold text-slate-900 text-sm">
                              {formatDate(booking.checkInDate)}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Check-out
                            </div>
                            <div className="font-semibold text-slate-900 text-sm">
                              {formatDate(booking.checkOutDate)}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <Users className="w-3 h-3" /> Guests
                            </div>
                            <div className="font-semibold text-slate-900 text-sm">
                              {booking.guests || 1} Person(s)
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <Bed className="w-3 h-3" /> Room Type
                            </div>
                            <div className="font-semibold text-slate-900 text-sm capitalize">
                              {booking.room?.roomType || "Standard"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-5 border-t border-slate-100">
                        <div className="w-full sm:w-auto flex items-end gap-1.5">
                          <div className="text-xl font-bold text-slate-900">
                            {currency}
                            {booking.totalPrice?.toLocaleString() ||
                              booking.room?.pricePerBed?.toLocaleString() ||
                              "N/A"}
                          </div>
                          <span className="text-slate-400 text-xs font-medium pb-1">
                            Total
                          </span>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                          {/* Rate Stay  */}
                          {canRate(booking) && (
                            <button
                              onClick={() => setRatingBooking(booking)}
                              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                              <Star className="w-4 h-4 fill-current" /> Rate
                            </button>
                          )}

                          <button
                            onClick={() => navigate(`/pg/${booking.room?._id}`)}
                            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-1.5"
                          >
                            Details <ChevronRight className="w-4 h-4" />
                          </button>

                          {booking.status === "pending" && (
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              disabled={cancellingId === booking._id}
                              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              {cancellingId === booking._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Cancel"
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {ratingBooking && (
        <RatingModal
          booking={ratingBooking}
          onClose={() => setRatingBooking(null)}
          onRatingSubmitted={handleRatingSubmitted}
        />
      )}
    </div>
  );
};

export default MyBookings;
