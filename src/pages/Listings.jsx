import React from "react";
import PGCards from "../components/PGCards";

const Listings = () => {
  return (
    <div className="max-w-6xl mx-auto flex gap-6 p-4">
      {/* Filters */}
      <div className="w-64 bg-white p-4 rounded shadow-sm space-y-4">
        <h3 className="font-semibold text-gray-700">Filter</h3>

        {/* Gender Filter */}
        <div>
          <p className="font-medium text-sm">Gender</p>
          <div className="space-y-1">
            <label className="block">
              <input type="checkbox" defaultChecked /> Boys
            </label>
            <label className="block">
              <input type="checkbox" /> Girls
            </label>
            <label className="block">
              <input type="checkbox" /> Mixed
            </label>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <p className="font-medium text-sm">Amenities</p>
          <div className="space-y-1">
            <label className="block">
              <input type="checkbox" /> Food
            </label>
            <label className="block">
              <input type="checkbox" /> Wi-Fi
            </label>
            <label className="block">
              <input type="checkbox" /> Laundry
            </label>
            <label className="block">
              <input type="checkbox" /> AC
            </label>
          </div>
        </div>

        {/* Price range */}
        <div>
          <p className="font-medium text-sm">Price Range</p>
          <input type="range" min="5000" max="15000" className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹5k</span>
            <span>₹15k</span>
          </div>
        </div>

        {/* <div>
          <p className="font-medium text-sm">Verified By</p>
          <label className="block">
            <input type="checkbox" defaultChecked /> Renets
          </label>
          <label className="block">
            <input type="checkbox" /> Assessmdnt
          </label>
          <label className="block">
            <input type="checkbox" /> Mixed
          </label>
        </div> */}
      </div>

      <div className="flex-1">
        <PGCards />
      </div>
    </div>
  );
};

export default Listings;
