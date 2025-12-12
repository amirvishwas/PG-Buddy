import React, { useEffect, useRef, useState } from "react";
import { Trash2, Edit3 } from "lucide-react";

const SAMPLE_ROOMS = [
  {
    id: "r1",
    name: "Double Bed",
    amenities: ["Room Service", "Mountain View", "Pool Access"],
    price: 399,
    active: true,
  },
  {
    id: "r2",
    name: "Double Bed",
    amenities: ["Room Service", "Mountain View", "Pool Access"],
    price: 299,
    active: true,
  },
  {
    id: "r3",
    name: "Double Bed",
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    price: 249,
    active: true,
  },
  {
    id: "r4",
    name: "Single Bed",
    amenities: ["Free WiFi", "Room Service", "Pool Access"],
    price: 199,
    active: true,
  },
];

export default function ListRoom() {
  const [rooms, setRooms] = useState([]);
  const mountedRef = useRef(false); // used to skip first persist

  // load rooms from localStorage or seed sample
  useEffect(() => {
    const raw = localStorage.getItem("rooms_table");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // ensure parsed is an array
        if (Array.isArray(parsed)) {
          setRooms(parsed);
          return;
        }
      } catch (e) {
        console.warn("Invalid rooms in localStorage, reseeding.", e);
      }
    }
    // seed if nothing valid in storage
    localStorage.setItem("rooms_table", JSON.stringify(SAMPLE_ROOMS));
    setRooms(SAMPLE_ROOMS);
  }, []);

  // persist rooms whenever it changes (skip first run)
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    localStorage.setItem("rooms_table", JSON.stringify(rooms));
  }, [rooms]);

  const toggleActive = (id) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const removeRoom = (id) => {
    if (!confirm("Delete this room?")) return;
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 font-[Poppins]">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">All Rooms</h2>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Table header */}
        <div className="hidden md:block border-b bg-gray-50">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm text-gray-600 items-center">
            <div className="col-span-3 font-medium">Name</div>
            <div className="col-span-6 font-medium">Facility</div>
            <div className="col-span-2 text-right font-medium">
              Price / night
            </div>
            <div className="col-span-1 text-center font-medium">Actions</div>
          </div>
        </div>

        {/* Scrollable table body */}
        <div className="max-h-64 overflow-y-auto">
          {/* Mobile header row (for small screens) */}
          <div className="md:hidden px-4 py-2 text-sm text-gray-600 border-b bg-gray-50">
            Name
          </div>

          {rooms.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No rooms available.
            </div>
          ) : (
            <div className="divide-y">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50"
                >
                  {/* Name */}
                  <div className="col-span-12 md:col-span-3">
                    <div className="text-sm font-medium text-gray-800">
                      {room.name}
                    </div>
                  </div>

                  {/* Facility */}
                  <div className="col-span-12 md:col-span-6 text-sm text-gray-600">
                    {room.amenities && room.amenities.length > 0
                      ? room.amenities.join(", ")
                      : "—"}
                  </div>

                  {/* Price */}
                  <div className="col-span-8 md:col-span-2 text-right md:text-right">
                    <div className="text-sm font-medium text-gray-800">
                      ₹{room.price}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-4 md:col-span-1 flex items-center justify-end gap-2">
                    {/* Toggle switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={!!room.active}
                        onChange={() => toggleActive(room.id)}
                        aria-label={`Toggle ${room.name}`}
                      />
                      <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors" />
                      <div
                        className={
                          "absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform " +
                          (room.active ? "translate-x-4" : "translate-x-0")
                        }
                      />
                    </label>

                    {/* Optional small icons */}
                    <button
                      type="button"
                      title="Edit"
                      className="p-1 rounded hover:bg-gray-100"
                      onClick={() => alert("Edit action - implement as needed")}
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      type="button"
                      title="Delete"
                      className="p-1 rounded hover:bg-red-50 text-red-600"
                      onClick={() => removeRoom(room.id)}
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
