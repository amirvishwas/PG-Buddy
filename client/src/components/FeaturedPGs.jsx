import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  MapPin,
  Bed,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const PGCard = ({ room, index }) => {
  const navigate = useNavigate();
  const { currency } = useAppContext();

  const handleClick = () => {
    navigate(`/pg/${room._id}`);
  };

  // Get PG data from populated room
  const pg = room.pg || {};
  const pgName = pg.name || "PG Name";
  const pgLocation = pg.city || pg.location || "Location";
  const pgAmenities = pg.amenities || [];
  const pgImage = room.images?.[0] || pg.images?.[0] || "/placeholder.svg";

  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-violet-500 to-purple-400",
    "from-rose-500 to-pink-400",
    "from-emerald-500 to-teal-400",
  ];

  const gradient = gradients[index % gradients.length];

  const getGenderBadge = (gender) => {
    switch (gender?.toLowerCase()) {
      case "boys":
        return { bg: "bg-blue-100", text: "text-blue-700", icon: "👨" };
      case "girls":
        return { bg: "bg-pink-100", text: "text-pink-700", icon: "👩" };
      default:
        return { bg: "bg-purple-100", text: "text-purple-700", icon: "👥" };
    }
  };

  const genderStyle = getGenderBadge(room.gender);

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={pgImage}
          alt={pgName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Featured badge */}
        <div className="absolute top-4 left-4">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-semibold shadow-lg`}
          >
            <TrendingUp className="w-3 h-3" />
            Featured
          </div>
        </div>

        {/* Gender badge */}
        <div className="absolute top-4 right-4">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${genderStyle.bg} ${genderStyle.text} text-xs font-medium backdrop-blur-sm`}
          >
            <span>{genderStyle.icon}</span>
            {room.gender || "Any"}
          </div>
        </div>

        {/* Price tag */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
            <div className="flex items-baseline gap-1">
              <span
                className={`text-lg font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
              >
                {currency}
                {room.pricePerBed}
              </span>
              <span className="text-gray-500 text-xs">/bed</span>
            </div>
          </div>
        </div>

        {/* Location on image */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5 text-white text-sm">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{pgLocation}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 truncate">
          {pgName}
        </h3>

        {/* Room info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Bed className="w-4 h-4 text-gray-400" />
            <span className="capitalize">{room.roomType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-emerald-600 font-medium">
              {room.availableBeds}
            </span>
            <span className="text-gray-400">/ {room.totalBeds}</span>
          </div>
        </div>

        {/* Amenities */}
        {pgAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {pgAmenities.slice(0, 3).map((a, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                {a}
              </span>
            ))}
            {pgAmenities.length > 3 && (
              <span className="px-2.5 py-1 bg-gray-50 text-gray-400 rounded-lg text-xs">
                +{pgAmenities.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Rating & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-semibold text-gray-900">4.5</span>
            <span className="text-gray-400 text-sm">(24)</span>
          </div>
          <div
            className={`flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all duration-300`}
          >
            View Details
            <ArrowRight className="w-4 h-4 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </div>
  );
};

const FeaturedPGs = () => {
  const { pgs, loadingPgs, navigate } = useAppContext();
  // Filter to show only available rooms with beds, then take first 4
  const featured = pgs
    .filter((room) => room.isAvailable !== false && room.availableBeds > 0)
    .slice(0, 4);

  const handleViewAll = () => {
    navigate("/listings");
  };

  if (loadingPgs) {
    return (
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 mb-6">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">
                Top Picks
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Best{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Sellers
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Loading amazing PGs for you...
            </p>
          </div>

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-lg w-16" />
                    <div className="h-6 bg-gray-200 rounded-lg w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!pgs || pgs.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 mb-6">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Top Picks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Best{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Sellers
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 4 150 4 198 10"
                  stroke="url(#bestSellerGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="bestSellerGradient"
                    x1="0"
                    y1="0"
                    x2="200"
                    y2="0"
                  >
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Most popular and highly rated PGs & hostels this month
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((room, index) => (
            <PGCard key={room._id} room={room} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <button
            onClick={handleViewAll}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-200/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <span className="relative">View All PGs</span>
            <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPGs;
