import React from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const PGCards = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
      {properties.length > 0 ? (
        properties.map((p, i) => (
          <Link
            key={i}
            to={`/pg/${i}`}
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-44 sm:h-52 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {p.verified && (
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-white text-green-600 rounded-full px-3 py-1 text-xs font-medium shadow-md">
                  <FaCheckCircle className="text-green-500" /> Verified
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                {p.name}
              </h2>
              <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <FaMapMarkerAlt className="text-blue-500" /> {p.location}
              </p>

              <p className="flex items-center text-base font-semibold text-blue-600 mt-3">
                <FaRupeeSign className="mr-1" /> {p.price}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mt-3">
                {p.amenities.length > 0 ? (
                  p.amenities.slice(0, 3).map((a, j) => (
                    <span
                      key={j}
                      className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
                    >
                      {a}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">
                    No amenities listed
                  </span>
                )}
                {p.amenities.length > 3 && (
                  <span className="text-gray-500 text-xs">
                    +{p.amenities.length - 3} more
                  </span>
                )}
              </div>

              {/* Gender */}
              <div className="mt-4">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                  {p.gender}
                </span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default PGCards;
