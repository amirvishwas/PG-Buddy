import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { MapPin, Bed, Users, Star, ArrowRight, TrendingUp } from "lucide-react";

const PGCard = ({ room, index }) => {
  const navigate = useNavigate();
  const { currency } = useAppContext();

  const handleClick = () => {
    navigate(`/pg/${room._id}`);
  };

  const pg = room.pg || {};
  const pgName = pg.name || "PG Name";
  const pgLocation = pg.city || pg.location || "Location";
  const pgAmenities = pg.amenities || [];
  const pgImage = room.images?.[0] || pg.images?.[0] || "/placeholder.svg";

  const getGenderBadge = (gender) => {
    switch (gender?.toLowerCase()) {
      case "boys":
        return { bg: "bg-blue-50 border-blue-100 text-blue-700", icon: "♂" };
      case "girls":
        return { bg: "bg-pink-50 border-pink-100 text-pink-700", icon: "♀" };
      default:
        return {
          bg: "bg-slate-100 border-slate-200 text-slate-600",
          icon: "⊕",
        };
    }
  };

  const genderStyle = getGenderBadge(room.gender);

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={pgImage}
          alt={pgName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 text-white text-xs font-semibold">
            <TrendingUp className="w-3 h-3" />
            Featured
          </div>
        </div>

        <div className="absolute top-3 right-3">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium backdrop-blur-sm ${genderStyle.bg}`}
          >
            {room.gender || "Any"}
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-1.5 text-white text-xs">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium truncate">{pgLocation}</span>
          </div>
          <div className="bg-white rounded-lg px-2.5 py-1.5 shrink-0">
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-bold text-slate-900">
                {currency}
                {room.pricePerBed}
              </span>
              <span className="text-slate-400 text-xs">/bed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-2.5 group-hover:text-amber-600 transition-colors truncate">
          {pgName}
        </h3>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Bed className="w-3.5 h-3.5 text-slate-400" />
            <span className="capitalize">{room.roomType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-green-600 font-medium">
              {room.availableBeds}
            </span>
            <span className="text-slate-400">/ {room.totalBeds} beds</span>
          </div>
        </div>

        {pgAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {pgAmenities.slice(0, 3).map((a, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs"
              >
                {a}
              </span>
            ))}
            {pgAmenities.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded-md text-xs">
                +{pgAmenities.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span className="text-xs font-semibold text-slate-900">
              {room.averageRating ? room.averageRating.toFixed(1) : "New"}
            </span>
            {room.totalRatings > 0 && (
              <span className="text-slate-400 text-xs">
                ({room.totalRatings})
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-slate-900 transition-colors">
            View details
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedPGs = () => {
  const { pgs, loadingPgs, navigate } = useAppContext();

  const featured = pgs
    .filter((room) => room.isAvailable !== false && room.availableBeds > 0)
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 4);

  const handleViewAll = () => {
    navigate("/listings");
  };

  if (loadingPgs) {
    return (
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="h-4 w-24 bg-slate-200 rounded mb-4 animate-pulse" />
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-slate-100" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-5 bg-slate-100 rounded w-14" />
                  <div className="h-5 bg-slate-100 rounded w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!pgs || pgs.length === 0) return null;

  return (
    <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
          Top picks
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Rooms people <span className="text-slate-400">actually love.</span>
          </h2>
          <button
            onClick={handleViewAll}
            className="flex items-center gap-2 text-sm font-medium text-slate-900 border border-slate-200 hover:border-slate-400 bg-white px-4 py-2 rounded-lg transition-all shrink-0 cursor-pointer"
          >
            View all PGs
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featured.map((room, index) => (
          <PGCard key={room._id} room={room} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPGs;
