import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const properties = [
  {
    name: "Greenview PG",
    location: "Bellandur, Bangalore",
    price: "₹8500 / mo",
    amenities: ["Food", "WiFi", "Laundry"],
    gender: "Boys",
    verified: true,
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/385388071.jpg?k=de0b51f296a3d9431866b51b974921c9ebb50cacf08eb55c1eec1d468849ffe2&o=",
  },
  {
    name: "UrbanNest Hostel",
    location: "Koramangala, Bangalore",
    price: "₹10,000 / mo",
    amenities: ["Food", "Laundry", "AC"],
    gender: "Girls",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/385388495.jpg?k=d7eaa4dfa75d4acedb1bdb8378cb8c6da37257b409db0519f940f8827d4c653e&o=",
  },
  {
    name: "Maple Stay",
    location: "HSR Layout, Bangalore",
    price: "₹7,200 / mo",
    amenities: ["WiFi", "Laundry", "AC"],
    gender: "Mixed",
    image:
      "https://assets.simplotel.com/simplotel/image/upload/x_0,y_117,w_2250,h_1266,r_0,c_crop,q_80,fl_progressive/w_400,f_auto,c_fit/daizzo-maple-residency-hotel-gangtok/Exterior_day_nbm2da",
  },
  {
    name: "Cozy Haven",
    location: "Indiranagar, Bangalore",
    price: "₹9,000 / mo",
    amenities: [],
    gender: "Boys",
    image:
      "https://www.itchotels.com/content/dam/itchotels/in/umbrella/welcomHotel/hotels/welcomhoteljabalpur/images/overview-landing-page/overview/d/hotel-facade-dusk-view.jpg",
  },
];

const PGCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 flex-1">
      {properties.map((p, i) => (
        <div
          key={i}
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
        </div>
      ))}
    </div>
  );
};

export default PGCards;
