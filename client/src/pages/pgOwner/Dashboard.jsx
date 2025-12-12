import React from "react";
import {
  MdHome,
  MdBed,
  MdPeople,
  MdBarChart,
  MdAttachMoney,
} from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="p-6 font-[Poppins]">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Owner Dashboard
      </h1>

      {/* Stats Section - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Rooms */}
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <MdBed size={28} />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Total Rooms</h3>
            <p className="text-xl font-semibold">10</p>
          </div>
        </div>
        {/* Total Bookings */}
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <MdBarChart size={28} />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Total Bookings</h3>
            <p className="text-xl font-semibold">3</p>
          </div>
        </div>

        {/* Vacant Rooms */}
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-xl text-purple-600">
            <MdHome size={28} />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Vacant</h3>
            <p className="text-xl font-semibold">4</p>
          </div>
        </div>
      </div>

      {/* Stats Section - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <MdAttachMoney size={28} />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Total Revenue</h3>
            <p className="text-xl font-semibold">$897</p>
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
                <th className="py-3 px-4 text-sm font-medium">Room Name</th>
                <th className="py-3 px-4 text-sm font-medium">Total Amount</th>
                <th className="py-3 px-4 text-sm font-medium">
                  Payment Status
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Booking Row 1 */}
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-700">Great Stack</td>
                <td className="py-3 px-4 text-gray-700">Double Bed</td>
                <td className="py-3 px-4 text-gray-700">$299</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    Completed
                  </span>
                </td>
              </tr>

              {/* Booking Row 2 */}
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-700">Great Stack</td>
                <td className="py-3 px-4 text-gray-700">Double Bed</td>
                <td className="py-3 px-4 text-gray-700">$399</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                </td>
              </tr>

              {/* Booking Row 3 */}
              <tr>
                <td className="py-3 px-4 text-gray-700">Great Stack</td>
                <td className="py-3 px-4 text-gray-700">Single Bed</td>
                <td className="py-3 px-4 text-gray-700">$199</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
