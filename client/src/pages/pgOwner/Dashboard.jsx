import React, { useEffect, useState } from "react";
import { MdHome, MdBed, MdBarChart, MdAttachMoney } from "react-icons/md";
import {
  Check,
  Loader2,
  ArrowUpRight,
  Clock,
  X,
  CircleDollarSign,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

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
          setStats((prev) => ({
            ...prev,
            totalBookings,
            totalRevenue,
          }));
          setBookings(bookings || []);
        }

        if (roomsRes.data.success) {
          const rooms = roomsRes.data.rooms || [];
          const totalRooms = rooms.length;
          const vacantBeds = rooms.reduce(
            (acc, room) => acc + (room.availableBeds || 0),
            0
          );
          setStats((prev) => ({
            ...prev,
            totalRooms,
            vacantBeds,
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, isPaid: true } : b))
        );
        toast.success("Booking marked as paid");
      } else {
        toast.error(data.message || "Failed to update payment status");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update payment status"
      );
    } finally {
      setUpdatingPayment(null);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subColor }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${subColor} opacity-10 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110`}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
        </div>
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center font-[Poppins]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 font-[Poppins] bg-gray-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Overview of your property performance
          </p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 font-medium shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Updates
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue}`}
          icon={MdAttachMoney}
          color="from-emerald-500 to-teal-400"
          subColor="from-emerald-200 to-teal-200"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={MdBarChart}
          color="from-blue-500 to-indigo-400"
          subColor="from-blue-200 to-indigo-200"
        />
        <StatCard
          title="Active Rooms"
          value={stats.totalRooms}
          icon={MdBed}
          color="from-violet-500 to-purple-400"
          subColor="from-violet-200 to-purple-200"
        />
        <StatCard
          title="Vacant Beds"
          value={stats.vacantBeds}
          icon={MdHome}
          color="from-orange-400 to-amber-400"
          subColor="from-orange-200 to-amber-200"
        />
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
            View All <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Calendar size={48} className="mb-4 text-gray-200" />
                      <p className="text-gray-500 font-medium">
                        No bookings found yet
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.slice(0, 5).map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {(booking.user?.username || booking.user?.name || "G")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 text-sm">
                          {booking.user?.username ||
                            booking.user?.name ||
                            "Guest"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-800 text-xs font-medium capitalize">
                        {booking.room?.roomType || "—"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      ₹{booking.totalPrice}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${
                          booking.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : booking.status === "cancelled"
                            ? "bg-rose-50 text-rose-700 border-rose-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        {booking.status === "confirmed" && <Check size={12} />}
                        {booking.status === "cancelled" && <X size={12} />}
                        {booking.status === "pending" && <Clock size={12} />}
                        <span className="capitalize">{booking.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {booking.isPaid ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                          <Check size={16} strokeWidth={3} />
                          <span>Paid</span>
                        </div>
                      ) : booking.status !== "cancelled" ? (
                        <button
                          onClick={() => handleMarkAsPaid(booking._id)}
                          disabled={updatingPayment === booking._id}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 shadow-sm"
                        >
                          {updatingPayment === booking._id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <CircleDollarSign
                              size={14}
                              className="text-gray-400"
                            />
                          )}
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          <AlertCircle size={14} /> Cancelled
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
