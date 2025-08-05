import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const properties = [
  {
    name: "Greenview PG",
    location: "Bellandur, Bangalore",
    price: "₹8500 / mo",
    amenities: ["Food", "WiFi", "Landry"],
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
    image: "https://via.placeholder.com/300x200?text=Maple+Stay",
  },
  {
    name: "Cozy Haven",
    location: "Indiranagar, Bangalore",
    price: "₹9,000 / mo",
    amenities: [],
    gender: "Boys",
    image: "https://via.placeholder.com/300x200?text=Cozy+Haven",
  },
];

const PGCards = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 flex-1">
        {properties.map((p, i) => (
          <div key={i} className="bg-white rounded shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              {p.verified && (
                <div className="absolute top-2 left-2 bg-white text-green-500 rounded-full p-1">
                  <FaCheckCircle />
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{p.location}</p>
              <p className="text-base font-semibold mb-2">{p.price}</p>
              <div className="text-sm text-gray-600 mb-2">
                {p.amenities.map((a, j) => (
                  <span key={j} className="inline-block mr-2">
                    ✓ {a}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-700">{p.gender}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PGCards;
