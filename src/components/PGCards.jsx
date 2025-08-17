import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom"; // 👈 import Link

const PGCards = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 flex-1">
      {properties.length > 0 ? (
        properties.map((p, i) => (
          <Link
            key={i}
            to={`/pg/${p.id}`} // 👈 navigate to PGDetails with ID
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 sm:h-44 lg:h-48 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              {p.verified && (
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 bg-white/90 text-green-600 rounded-full px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium shadow-sm">
                  <FaCheckCircle className="text-green-500" /> Verified
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
              <h2 className="font-semibold text-base sm:text-lg text-gray-800">
                {p.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                {p.location}
              </p>
              <p className="text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                {p.price}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                {p.amenities.length > 0 ? (
                  p.amenities.map((a, j) => (
                    <span
                      key={j}
                      className="bg-blue-50 text-blue-600 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
                    >
                      {a}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-[10px] sm:text-xs">
                    No amenities listed
                  </span>
                )}
              </div>

              {/* Gender */}
              <span className="inline-block bg-gray-100 text-gray-700 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {p.gender}
              </span>
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
