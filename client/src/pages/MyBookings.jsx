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
          : b
      )
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
        return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 ring-gray-500/20";
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
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-purple-50/50 -z-10" />
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Sign In Required
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Please sign in to access your bookings and manage your stays
            securely.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">
          Fetching your stays...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 relative font-[Poppins]">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-full shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              My Bookings
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                {bookings.length}
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-blue-50 rounded-full animate-ping opacity-20" />
              <SearchX className="w-14 h-14 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              No Bookings Yet
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you haven't made any bookings yet. Your perfect stay is
              just a search away!
            </p>
            <button
              onClick={() => navigate("/listings")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
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
                  color: "blue",
                  icon: Receipt,
                },
                {
                  label: "Confirmed",
                  value: bookings.filter((b) => b.status === "confirmed")
                    .length,
                  color: "emerald",
                  icon: CheckCircle,
                },
                {
                  label: "Pending",
                  value: bookings.filter((b) => b.status === "pending").length,
                  color: "amber",
                  icon: Clock,
                },
                {
                  label: "Cancelled",
                  value: bookings.filter((b) => b.status === "cancelled")
                    .length,
                  color: "rose",
                  icon: XCircle,
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow`}
                >
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-${stat.color}-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}
                  />
                  <stat.icon
                    className={`w-6 h-6 text-${stat.color}-500 mb-3 relative z-10`}
                  />
                  <div className="relative z-10">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bookings List */}
            <div className="grid gap-6">
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
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="md:w-72 h-48 md:h-auto relative overflow-hidden">
                        <img
                          src={booking.room?.images?.[0] || "/placeholder.svg"}
                          alt={pgName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />

                        <div className="absolute bottom-4 left-4 text-white md:hidden">
                          <p className="font-bold text-lg">{pgName}</p>
                          <p className="text-sm opacity-90">{pgAddress}</p>
                        </div>

                        {/* Rating Badge  */}
                        {booking.isRated && booking.userRating && (
                          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="font-bold text-xs">
                              {booking.userRating.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Details Section */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                            <div className="hidden md:block">
                              <h3
                                className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                                onClick={() =>
                                  navigate(`/pg/${booking.room?._id}`)
                                }
                              >
                                {pgName}
                              </h3>
                              <div className="flex items-center gap-1.5 text-gray-500 mt-1 text-sm">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{pgAddress}</span>
                              </div>
                            </div>

                            <span
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ring-1 ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {getStatusIcon(booking.status)}
                              {booking.status || "Pending"}
                            </span>
                          </div>

                          {/* Info Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                            <div className="space-y-1">
                              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Check-in
                              </div>
                              <div className="font-semibold text-gray-900 text-sm">
                                {formatDate(booking.checkInDate)}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Check-out
                              </div>
                              <div className="font-semibold text-gray-900 text-sm">
                                {formatDate(booking.checkOutDate)}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1">
                                <Users className="w-3 h-3" /> Guests
                              </div>
                              <div className="font-semibold text-gray-900 text-sm">
                                {booking.guests || 1} Person(s)
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1">
                                <Bed className="w-3 h-3" /> Room Type
                              </div>
                              <div className="font-semibold text-gray-900 text-sm capitalize">
                                {booking.room?.roomType || "Standard"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100">
                          <div className="w-full sm:w-auto">
                            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                              Total Amount
                            </span>
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                              {currency}
                              {booking.totalPrice?.toLocaleString() ||
                                booking.room?.pricePerBed?.toLocaleString() ||
                                "N/A"}
                            </div>
                          </div>

                          <div className="flex gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                            {/* Rate Stay  */}
                            {canRate(booking) && (
                              <button
                                onClick={() => setRatingBooking(booking)}
                                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium hover:from-yellow-500 hover:to-orange-500 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                              >
                                <Star className="w-4 h-4 fill-current" /> Rate
                                Stay
                              </button>
                            )}

                            <button
                              onClick={() =>
                                navigate(`/pg/${booking.room?._id}`)
                              }
                              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all flex items-center justify-center gap-2"
                            >
                              View Details <ChevronRight className="w-4 h-4" />
                            </button>

                            {booking.status === "pending" && (
                              <button
                                onClick={() => handleCancelBooking(booking._id)}
                                disabled={cancellingId === booking._id}
                                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 hover:text-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                        {/* ID Tag */}
                        <div className="mt-3 flex justify-end">
                          <span className="text-[10px] text-gray-300 font-mono">
                            ID: {booking._id}
                          </span>
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
