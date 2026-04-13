import React, { useEffect, useState } from "react";
import { MdHome, MdBed, MdBarChart, MdAttachMoney } from "react-icons/md";
import {
  Check,
  Loader2,
  X,
  CircleDollarSign,
  Calendar,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

const StatCard = ({ title, value, icon: Icon, iconBg }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-slate-400 mb-1">{title}</p>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</p>
      </div>
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon size={18} />
      </div>
    </div>
  </div>
);

const getStatusStyle = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-green-50 border-green-100 text-green-700";
    case "cancelled":
      return "bg-rose-50 border-rose-100 text-rose-700";
    case "pending":
      return "bg-amber-50 border-amber-100 text-amber-700";
    default:
      return "bg-slate-100 border-slate-200 text-slate-600";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "confirmed":
      return <Check className="w-3 h-3" />;
    case "cancelled":
      return <X className="w-3 h-3" />;
    case "pending":
      return <Clock className="w-3 h-3" />;
    default:
      return <AlertCircle className="w-3 h-3" />;
  }
};

export default function Dashboard() {
  const { axios, getToken } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [updatingPayment, setUpdatingPayment] = useState(null);
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalBookings: 0,
    vacantBeds: 0,
    totalRevenue: 0,
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await getToken();
        const headers = { Authorization: `Bearer ${token}` };
        const [bookingsRes, roomsRes] = await Promise.all([
          axios.get("/api/bookings/owner", { headers }),
          axios.get("/api/rooms/owner", { headers }),
        ]);
        if (bookingsRes.data.success) {
          const { totalBookings, totalRevenue, bookings } =
            bookingsRes.data.dashboardData;
          setStats((prev) => ({ ...prev, totalBookings, totalRevenue }));
          setBookings(bookings || []);
        }
        if (roomsRes.data.success) {
          const rooms = roomsRes.data.rooms || [];
          setStats((prev) => ({
            ...prev,
            totalRooms: rooms.length,
            vacantBeds: rooms.reduce(
              (acc, r) => acc + (r.availableBeds || 0),
              0,
            ),
          }));
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [axios, getToken]);

  const handleMarkAsPaid = async (bookingId) => {
    try {
      setUpdatingPayment(bookingId);
      const token = await getToken();
      const { data } = await axios.put(
        `/api/bookings/${bookingId}/mark-paid`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, isPaid: true } : b)),
        );
        toast.success("Booking marked as paid");
      } else {
        toast.error(data.message || "Failed to update payment status");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update payment status",
      );
    } finally {
      setUpdatingPayment(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#fafaf8] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-1">
            Overview
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            Owner dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Your property performance at a glance.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live updates
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <StatCard
          title="Total revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={MdAttachMoney}
          iconBg="bg-green-100 text-green-700"
        />
        <StatCard
          title="Total bookings"
          value={stats.totalBookings}
          icon={MdBarChart}
          iconBg="bg-blue-100 text-blue-700"
        />
        <StatCard
          title="Active rooms"
          value={stats.totalRooms}
          icon={MdBed}
          iconBg="bg-amber-100 text-amber-700"
        />
        <StatCard
          title="Vacant beds"
          value={stats.vacantBeds}
          icon={MdHome}
          iconBg="bg-slate-100 text-slate-700"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">
            Recent bookings
          </p>
          <span className="text-xs text-slate-400 font-medium">
            {bookings.slice(0, 5).length} of {bookings.length}
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center px-6">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm font-semibold text-slate-900 mb-1">
              No bookings yet
            </p>
            <p className="text-xs text-slate-400">
              Bookings will appear here once tenants start booking your rooms.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-3 px-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="py-3 px-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="py-3 px-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="py-3 px-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.slice(0, 5).map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0">
                            {(
                              booking.user?.username ||
                              booking.user?.name ||
                              "G"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-slate-900 truncate max-w-[120px]">
                            {booking.user?.username ||
                              booking.user?.name ||
                              "Guest"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium capitalize">
                          {booking.room?.roomType || "—"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-sm font-semibold text-slate-900">
                          ₹{booking.totalPrice?.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusStyle(booking.status)}`}
                        >
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        {booking.isPaid ? (
                          <div className="flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            Paid
                          </div>
                        ) : booking.status !== "cancelled" ? (
                          <button
                            onClick={() => handleMarkAsPaid(booking._id)}
                            disabled={updatingPayment === booking._id}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-50 border border-amber-100 text-amber-700 rounded-lg hover:bg-amber-100 transition-all disabled:opacity-50 cursor-pointer"
                          >
                            {updatingPayment === booking._id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CircleDollarSign className="w-3.5 h-3.5" />
                            )}
                            Mark paid
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Cancelled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-slate-100">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking._id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0">
                        {(booking.user?.username || booking.user?.name || "G")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 leading-none">
                          {booking.user?.username ||
                            booking.user?.name ||
                            "Guest"}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 capitalize">
                          {booking.room?.roomType || "Room"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusStyle(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      ₹{booking.totalPrice?.toLocaleString()}
                    </span>
                    {booking.isPaid ? (
                      <div className="flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        Paid
                      </div>
                    ) : booking.status !== "cancelled" ? (
                      <button
                        onClick={() => handleMarkAsPaid(booking._id)}
                        disabled={updatingPayment === booking._id}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-50 border border-amber-100 text-amber-700 rounded-lg hover:bg-amber-100 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {updatingPayment === booking._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <CircleDollarSign className="w-3.5 h-3.5" />
                        )}
                        Mark paid
                      </button>
                    ) : (
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
