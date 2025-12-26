import React, { useEffect, useState } from "react";
import { MdHome, MdBed, MdBarChart, MdAttachMoney } from "react-icons/md";
import { Check, Loader2 } from "lucide-react";
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

        // Fetch bookings and rooms in parallel
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

  if (loading) {
    return (
      <div className="p-6 font-[Poppins] flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 font-[Poppins]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Owner Dashboard
      </h1>

      {/* Stats Section - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <MdBed size={28} />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Total Rooms</h3>
            <p className="text-xl font-semibold">{stats.totalRooms}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <MdBarChart size={28} />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Total Bookings</h3>
            <p className="text-xl font-semibold">{stats.totalBookings}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-xl text-purple-600">
            <MdHome size={28} />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Vacant Beds</h3>
            <p className="text-xl font-semibold">{stats.vacantBeds}</p>
          </div>
        </div>
      </div>

      {/* Stats Section - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <MdAttachMoney size={28} />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Total Revenue</h3>
            <p className="text-xl font-semibold">₹{stats.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-3 px-4 text-sm font-medium">User Name</th>
                <th className="py-3 px-4 text-sm font-medium">Room Type</th>
                <th className="py-3 px-4 text-sm font-medium">Total Amount</th>
                <th className="py-3 px-4 text-sm font-medium">Status</th>
                <th className="py-3 px-4 text-sm font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No bookings yet
                  </td>
                </tr>
              ) : (
                bookings.slice(0, 5).map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="py-3 px-4 text-gray-700">
                      {booking.user?.username || booking.user?.name || "Guest"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {booking.room?.roomType || "—"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      ₹{booking.totalPrice}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {booking.isPaid ? (
                        <span className="flex items-center gap-1.5 text-green-600 font-medium">
                          <Check className="w-4 h-4" />
                          Paid
                        </span>
                      ) : booking.status !== "cancelled" ? (
                        <button
                          onClick={() => handleMarkAsPaid(booking._id)}
                          disabled={updatingPayment === booking._id}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {updatingPayment === booking._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-gray-400">—</span>
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
