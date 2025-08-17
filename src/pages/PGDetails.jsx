import React from "react";
import { useParams } from "react-router-dom";
import { MapPin, Bed, Users, Star } from "lucide-react";

const PGDetails = () => {
  const { id } = useParams(); // will be used to fetch details from backend later

  // dummy data
  const pg = {
    name: "Sunrise PG | Jaipur",
    description: "Affordable PG with meals, WiFi & study-friendly rooms",
    rating: 4.5,
    reviews: 120,
    location: "Gokulpura, Jaipur",
    oldPrice: 10000,
    price: 7500,
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
    rooms: "2 & 3 Seater Rooms",
    capacity: "Fits up to 50 Residents",
    amenities: ["🍽️ Free Meals", "📶 High-speed WiFi", "🧹 Daily Cleaning"],
    nearby: ["🎓 University - 1 km", "🏪 Market - 500m", "🚌 Bus Stop - 300m"],
    rules: [
      "🚭 No Smoking",
      "🔇 Silent after 11 PM",
      "👥 Guests allowed till 9 PM",
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Images */}
        <div className="space-y-3">
          <img
            src={pg.images[0]}
            alt="PG Main"
            className="rounded-xl w-full object-cover"
          />
          <div className="grid grid-cols-2 gap-3">
            {pg.images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`PG ${index}`}
                className="rounded-xl w-full object-cover"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between space-y-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {pg.name}
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              {pg.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700 font-medium">
                {pg.rating} ({pg.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-3">
              <Bed className="w-5 h-5 text-indigo-600" />
              <span>{pg.rooms}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>{pg.capacity}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span>{pg.location}</span>
            </div>
          </div>

          <div>
            <p className="text-gray-500 line-through">₹{pg.oldPrice}/month</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{pg.price}/month
            </p>
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
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Amenities</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {pg.amenities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Nearby</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {pg.nearby.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Rules</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {pg.rules.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PGDetails;
