import React, { useEffect, useState } from "react";
import { Trash2, Loader2, Bed, Check, X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const roomTypeLabel = (t) =>
  ({ single: "Single bed", double: "Double bed", triple: "Triple sharing" })[
    t
  ] || t;

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
  }, []);

  const toggleActive = async (roomId) => {
    try {
      setTogglingId(roomId);
      const token = await getToken();
      const { data } = await axios.post(
        "/api/rooms/toggle-availability",
        { roomId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data?.success) {
        setRooms((prev) =>
          prev.map((r) =>
            r._id === roomId ? { ...r, isAvailable: !r.isAvailable } : r,
          ),
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
      <div className="p-6 h-96 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Loading inventory…</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#fafaf8] min-h-screen">
      <div className="mb-7">
        <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-1">
          Inventory
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
          Room inventory
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage pricing, availability, and details.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-100">
          <div className="col-span-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Room
          </div>
          <div className="col-span-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Amenities
          </div>
          <div className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
            Price
          </div>
          <div className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
            Actions
          </div>
        </div>

        {rooms.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center px-6">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Bed className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm font-semibold text-slate-900 mb-1">
              No rooms listed yet
            </p>
            <p className="text-xs text-slate-400 max-w-xs">
              Add a new room to your property inventory to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="p-4 sm:p-5 md:px-6 md:py-5 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-slate-50/60 transition-colors"
              >
                <div className="md:col-span-4 flex items-center gap-3 mb-3 md:mb-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      room.isAvailable
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {roomTypeLabel(room.roomType)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {room.totalBeds} total
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                          room.availableBeds > 0
                            ? "bg-green-50 text-green-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {room.availableBeds} free
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 mb-3 md:mb-0">
                  {room.amenities?.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg text-xs font-medium bg-slate-50 border border-slate-100 text-slate-500"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="px-2 py-0.5 rounded-lg text-xs text-slate-400">
                          +{room.amenities.length - 3}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">
                      No amenities listed
                    </span>
                  )}
                </div>

                <div className="md:col-span-2 mb-3 md:mb-0 flex items-center justify-between md:justify-end md:text-right">
                  <span className="md:hidden text-xs text-slate-400">
                    Price
                  </span>
                  <div>
                    <p className="text-base font-bold text-slate-900">
                      ₹{room.pricePerBed?.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">per bed/mo</p>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-center gap-3 border-t border-slate-100 pt-3 md:border-0 md:pt-0">
                  <label
                    className="relative inline-flex items-center cursor-pointer"
                    title={
                      room.isAvailable ? "Mark unavailable" : "Mark available"
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
                      className={`w-10 h-5 rounded-full transition-all ${
                        room.isAvailable ? "bg-slate-900" : "bg-slate-200"
                      }`}
                    />
                    <div
                      className={`absolute top-0.5 left-0.5 bg-white rounded-full h-4 w-4 transition-all shadow-sm flex items-center justify-center ${
                        room.isAvailable ? "translate-x-5" : "translate-x-0"
                      }`}
                    >
                      {togglingId === room._id ? (
                        <Loader2 className="w-2.5 h-2.5 animate-spin text-slate-400" />
                      ) : room.isAvailable ? (
                        <Check className="w-2.5 h-2.5 text-slate-900" />
                      ) : (
                        <X className="w-2.5 h-2.5 text-slate-400" />
                      )}
                    </div>
                  </label>

                  <button
                    type="button"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all disabled:opacity-50 cursor-pointer"
                    onClick={() => removeRoom(room._id)}
                    disabled={deletingId === room._id}
                    title="Delete room"
                  >
                    {deletingId === room._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
