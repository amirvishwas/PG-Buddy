import React from "react";
import { useParams } from "react-router-dom";
import { MapPin, Bed, Users, Star } from "lucide-react";
import properties from "../data/properties";

const PGDetails = () => {
  const { id } = useParams();
  const pg = properties[id]; // get PG details

  if (!pg) {
    return <div className="text-center p-10">PG not found ❌</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="space-y-3">
          <img
            src={pg.image}
            alt="PG Main"
            className="rounded-xl w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between space-y-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {pg.name}
            </h1>
            <p className="text-gray-600 text-sm md:text-base">{pg.location}</p>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700 font-medium">
                Verified: {pg.verified ? "✅" : "❌"}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>For {pg.gender}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span>{pg.location}</span>
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold text-green-600">{pg.price}</p>
            <p className="text-sm text-gray-500">
              + meals & amenities included
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition">
              Book Now
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-xl hover:bg-indigo-50 transition">
              Contact Owner
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Amenities</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {pg.amenities.length > 0 ? (
              pg.amenities.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>No amenities listed</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PGDetails;
