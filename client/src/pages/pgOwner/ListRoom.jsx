import React, { useEffect, useState } from "react";
import { Trash2, Edit3, Loader2 } from "lucide-react";
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
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 font-[Poppins]">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">All Rooms</h2>

      <div className="bg-white rounded-xl h-auto shadow-sm border overflow-hidden">
        {/* Table Header (Desktop only) */}
        <div className="hidden md:block border-b bg-gray-50">
          <div className="grid grid-cols-12 gap-9 px-6 py-3 text-sm text-gray-600 items-center">
            <div className="col-span-3 font-medium">Name</div>
            <div className="col-span-6 font-medium">Facility</div>
            <div className="col-span-2 text-right font-medium">Price / bed</div>
            <div className="col-span-1 text-center font-medium">Actions</div>
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {rooms.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No rooms available.
            </div>
          ) : (
            <div className="divide-y">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className=" px-4 py-4 md:grid md:grid-cols-12 md:gap-9 md:px-6 hover:bg-gray-50">
                  {/* Name */}
                  <div className="md:col-span-3">
                    <div className="text-sm font-medium text-gray-800">
                      {roomTypeLabel(room.roomType)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Beds: {room.availableBeds}/{room.totalBeds}
                    </div>
                  </div>

                  {/* Facility */}
                  <div className="mt-2 md:mt-0 md:col-span-6 text-sm text-gray-600">
                    <span className="md:hidden font-medium text-gray-700">
                      Facilities:{" "}
                    </span>
                    {room.amenities?.length ? room.amenities.join(", ") : "—"}
                  </div>

                  {/* Price */}
                  <div className="mt-2 mr-8 md:mt-0 md:col-span-2 md:text-right">
                    <span className="md:hidden font-medium text-gray-700">
                      Price:{" "}
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      ₹{room.pricePerBed}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-2 md:mt-0 md:col-span-1 flex items-center justify-between md:justify-end gap-3">
                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={!!room.isAvailable}
                        onChange={() => toggleActive(room._id)}
                        disabled={togglingId === room._id}
                        aria-label={`Toggle ${roomTypeLabel(room.roomType)}`}
                      />
                      <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors" />
                      <div
                        className={
                          "absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform " +
                          (room.isAvailable ? "translate-x-4" : "translate-x-0")
                        }
                      />
                    </label>

                    {/* Edit */}
                    <button
                      type="button"
                      title="Edit"
                      className="p-1.5 rounded hover:bg-gray-100"
                      onClick={() => alert("Edit action - implement as needed")}
                    >
                      <Edit3 size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      title="Delete"
                      className="p-1.5 rounded hover:bg-red-50 text-red-600 disabled:opacity-60"
                      onClick={() => removeRoom(room._id)}
                      disabled={deletingId === room._id}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
