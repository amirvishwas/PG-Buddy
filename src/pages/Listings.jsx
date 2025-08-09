import React from "react";
import PGCards from "../components/PGCards";

const Listings = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
      {/* Filters */}
      <div className="w-full md:w-64 bg-white p-4 rounded shadow-sm space-y-4 order-1 md:order-none">
        <h3 className="font-semibold text-lg text-gray-800">Filter</h3>

        {/* Gender Filter */}
        <div>
          <p className="font-medium text-sm mb-2 text-gray-700">Gender</p>
          <div className="space-y-3">
            {["Boys", "Girls", "Mixed"].map((label, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  defaultChecked={label === "Boys"}
                  className="custom-checkbox"
                />
                <span className="text-gray-700 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <p className="font-medium text-sm mb-2 text-gray-700">Amenities</p>
          <div className="space-y-3">
            {["Food", "Wi-Fi", "Laundry", "AC"].map((label, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input type="checkbox" className="custom-checkbox" />
                <span className="text-gray-700 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price range */}
        <div>
          <p className="font-medium text-sm mb-2 text-gray-700">Price Range</p>
          <input type="range" min="5000" max="15000" className="custom-range" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹5k</span>
            <span>₹15k</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 order-1 lg:order-2">
        <PGCards />
      </div>
    </div>
  );
};

export default Listings;
