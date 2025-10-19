import React from "react";
import { X } from "lucide-react";

const PgReg = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <form className="flex flex-col md:flex-row bg-white rounded-xl max-w-4xl w-full mx-4 overflow-hidden">
        {/* Left Image */}
        <img
          src={"src/assets/hotel.png"}
          alt="hotel-registration"
          className="hidden md:block md:w-1/2 object-cover rounded-l-xl"
        />

        {/* Right Form */}
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          <div className="w-full mt-6 space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Hotel Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Phone
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Address
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                City
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option value="">Select City</option>
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Chennai</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PgReg;
