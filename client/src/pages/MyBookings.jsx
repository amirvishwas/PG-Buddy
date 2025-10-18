import React from "react";
import { MapPin, Users } from "lucide-react";
import properties from "../data/properties";

const MyBookings = () => {
  const bookings = properties.map((property, index) => ({
    id: property.id,
    name: property.name,
    location: property.location,
    guests: 2,
    total: property.priceValue,
    checkIn: "October 20, 2025",
    checkOut: "October 25, 2025",
    paymentStatus: index % 2 === 0 ? "paid" : "unpaid",
    image: property.image || property.images?.[0],
    type: property.gender === "Mixed" ? "(Shared)" : "(Single Bed)",
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">My Bookings</h1>
          <p className="text-gray-600 max-w-2xl">
            Manage your PG and hostel bookings easily in one place.
          </p>
        </div>

        {/* Table Header */}
        <div className="bg-white rounded-t-xl border-b">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
            <div className="col-span-4">PG / Hostel</div>
            <div className="col-span-4">Date & Timings</div>
            <div className="col-span-4">Payment</div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-b-xl shadow-sm divide-y">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="grid grid-cols-12 gap-4 px-6 py-6 hover:bg-gray-50 transition-colors"
            >
              {/* PG Info */}
              <div className="col-span-4 flex gap-4">
                <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 group cursor-pointer">
                  <img
                    src={booking.image}
                    alt={booking.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-6 h-6 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {booking.name}{" "}
                    <span className="font-normal text-gray-600">
                      {booking.type}
                    </span>
                  </h3>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                    <Users className="w-4 h-4" />
                    <span>Guests: {booking.guests}</span>
                  </div>
                  <div className="text-gray-900 font-bold">
                    Total: ₹{booking.total.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Date & Timings */}
              <div className="col-span-4 flex items-center">
                <div className="grid grid-cols-2 gap-8 w-full">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Check-In:
                    </div>
                    <div className="text-sm text-gray-600">
                      {booking.checkIn}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Check-Out:
                    </div>
                    <div className="text-sm text-gray-600">
                      {booking.checkOut}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="col-span-4 flex items-center justify-center">
                {booking.paymentStatus === "paid" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-semibold">Paid</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-600 font-semibold">Unpaid</span>
                    </div>
                    <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors">
                      Pay now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
