import React, { useEffect, useState } from "react";
import {
  Trash2,
  Edit3,
  Loader2,
  Bed,
  Search,
  Filter,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const roomTypeLabel = (t) =>
  ({ single: "Single Bed", double: "Double Bed", triple: "Triple Sharing" }[
    t
  ] || t);

export default function ListRoom() {
  const { axios, getToken } = useAppContext();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get("/api/rooms/owner", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success) setRooms(data.rooms || []);
      else toast.error(data?.message || "Failed to fetch rooms");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleActive = async (roomId) => {
    try {
      setTogglingId(roomId);
      const token = await getToken();

      const { data } = await axios.post(
        "/api/rooms/toggle-availability",
        { roomId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data?.success) {
        setRooms((prev) =>
          prev.map((r) =>
            r._id === roomId ? { ...r, isAvailable: !r.isAvailable } : r
          )
        );
      } else {
        toast.error(data?.message || "Failed to update");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update");
    } finally {
      setTogglingId(null);
    }
  };

  const removeRoom = async (roomId) => {
    if (!confirm("Delete this room?")) return;

    try {
      setDeletingId(roomId);
      const token = await getToken();

      const { data } = await axios.delete(`/api/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success) {
        setRooms((prev) => prev.filter((r) => r._id !== roomId));
        toast.success("Room deleted");
      } else {
        toast.error(data?.message || "Failed to delete room");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete room");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 h-96 flex flex-col items-center justify-center font-[Poppins]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
        <p className="text-gray-500 font-medium">Loading inventory...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 font-[Poppins] bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Room Inventory</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage pricing, availability, and details
            </p>
          </div>

          {/* Visual-only Controls */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search rooms..."
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 shadow-sm"
                disabled
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-6 px-8 py-5 bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Room Details</div>
            <div className="col-span-4">Amenities & Facilities</div>
            <div className="col-span-2 text-right">Pricing</div>
            <div className="col-span-2 text-center">Status & Actions</div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
            {rooms.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Bed className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  No rooms listed yet
                </h3>
                <p className="text-gray-500 max-w-xs mt-1">
                  Start by adding a new room to your property inventory.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    className="p-6 md:px-8 md:py-6 md:grid md:grid-cols-12 md:gap-6 hover:bg-gray-50/50 transition-colors group items-center"
                  >
                    {/* Name & Capacity */}
                    <div className="md:col-span-4 mb-4 md:mb-0">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            room.isAvailable
                              ? "bg-blue-50 text-blue-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Bed className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">
                            {roomTypeLabel(room.roomType)}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                              Total: {room.totalBeds}
                            </span>
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                                room.availableBeds > 0
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-red-50 text-red-700"
                              }`}
                            >
                              Free: {room.availableBeds}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Facilities */}
                    <div className="md:col-span-4 mb-4 md:mb-0">
                      <div className="flex flex-wrap gap-2">
                        {room.amenities?.length ? (
                          room.amenities.slice(0, 3).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100"
                            >
                              {amenity}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400 italic">
                            No amenities listed
                          </span>
                        )}
                        {room.amenities?.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium text-gray-400">
                            +{room.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 mb-4 md:mb-0 flex items-center justify-between md:justify-end md:text-right">
                      <span className="md:hidden text-sm font-medium text-gray-500">
                        Price:
                      </span>
                      <div>
                        <span className="block text-lg font-bold text-gray-900">
                          ₹{room.pricePerBed}
                        </span>
                        <span className="text-xs text-gray-400">
                          per bed/mo
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-center gap-4 border-t md:border-none pt-4 md:pt-0 mt-2 md:mt-0">
                      {/* Availability Toggle */}
                      <label
                        className="relative inline-flex items-center cursor-pointer group/toggle"
                        title={
                          room.isAvailable
                            ? "Mark as Unavailable"
                            : "Mark as Available"
                        }
                      >
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={!!room.isAvailable}
                          onChange={() => toggleActive(room._id)}
                          disabled={togglingId === room._id}
                        />
                        <div
                          className={`w-11 h-6 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-100 transition-all ${
                            room.isAvailable ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        />
                        <div
                          className={`absolute top-1 left-1 bg-white border-gray-300 border rounded-full h-4 w-4 transition-all shadow-sm flex items-center justify-center ${
                            room.isAvailable
                              ? "translate-x-5 border-white"
                              : "translate-x-0"
                          }`}
                        >
                          {togglingId === room._id && (
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-blue-600" />
                          )}
                        </div>
                      </label>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => alert("Edit action placeholder")}
                          title="Edit Room"
                        >
                          <Edit3 size={18} />
                        </button>

                        <button
                          type="button"
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          onClick={() => removeRoom(room._id)}
                          disabled={deletingId === room._id}
                          title="Delete Room"
                        >
                          {deletingId === room._id ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
