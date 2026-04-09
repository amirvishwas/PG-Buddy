import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  MapPin,
  Users,
  ArrowRight,
  X,
  Home,
  ChevronRight,
  Check,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const getGenderBadge = (gender) => {
  switch (gender?.toLowerCase()) {
    case "boys":
      return "bg-blue-50 border-blue-100 text-blue-700";
    case "girls":
      return "bg-rose-50 border-rose-100 text-rose-700";
    default:
      return "bg-slate-100 border-slate-200 text-slate-600";
  }
};

const FilterPanel = ({
  maxPrice,
  setMaxPrice,
  selectedGenders,
  selectedRoomTypes,
  selectedAmenities,
  handleGenderChange,
  handleRoomTypeChange,
  handleAmenityChange,
  clearFilters,
  activeFiltersCount,
  filteredCount,
  isMobile = false,
  onClose,
  currency,
}) => {
  return (
    <div
      className={`space-y-7 ${!isMobile ? "bg-white rounded-2xl border border-slate-200 p-6" : ""}`}
    >
      {!isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <p className="text-sm font-semibold text-slate-900">Filters</p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Budget
          </p>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
            Up to {currency}
            {maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="20000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-900"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>{currency}1k</span>
          <span>{currency}20k</span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Gender
        </p>
        <div className="flex flex-col gap-2">
          {["Boys", "Girls", "Mixed"].map((gender) => {
            const isSelected = selectedGenders.includes(gender);
            return (
              <label
                key={gender}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-slate-900 bg-slate-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleGenderChange(gender)}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                    isSelected
                      ? "bg-slate-900 border-slate-900"
                      : "border-slate-300"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span
                  className={`text-sm font-medium ${isSelected ? "text-slate-900" : "text-slate-600"}`}
                >
                  {gender}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Room type
        </p>
        <div className="flex gap-2">
          {[
            { value: "single", label: "Single" },
            { value: "double", label: "Double" },
            { value: "triple", label: "Triple" },
          ].map((type) => {
            const isSelected = selectedRoomTypes.includes(type.value);
            return (
              <label
                key={type.value}
                className={`flex-1 text-center cursor-pointer py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleRoomTypeChange(type.value)}
                  className="hidden"
                />
                {type.label}
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Amenities
        </p>
        <div className="grid grid-cols-2 gap-2">
          {["Food", "Free WiFi", "Laundry", "AC"].map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-slate-900 bg-slate-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAmenityChange(amenity)}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-slate-900 border-slate-900"
                      : "border-slate-300"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span
                  className={`text-xs font-medium ${isSelected ? "text-slate-900" : "text-slate-600"}`}
                >
                  {amenity}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {!isMobile && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-center">
          <p className="text-xs text-slate-500">
            <span className="font-bold text-slate-900 text-sm">
              {filteredCount}
            </span>{" "}
            rooms match
          </p>
        </div>
      )}

      {isMobile && (
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-700 text-white rounded-xl font-semibold text-sm active:scale-95 transition-all cursor-pointer"
          >
            Show {filteredCount} properties
          </button>
        </div>
      )}
    </div>
  );
};

const Listings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pgs, loadingPgs, currency } = useAppContext();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase().trim() || "";

  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleGenderChange = (gender) =>
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender],
    );

  const handleRoomTypeChange = (type) =>
    setSelectedRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );

  const handleAmenityChange = (amenity) =>
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );

  const clearFilters = () => {
    setMaxPrice(20000);
    setSelectedGenders([]);
    setSelectedRoomTypes([]);
    setSelectedAmenities([]);
  };

  const filteredRooms = pgs.filter((room) => {
    const priceMatch = room.pricePerBed <= maxPrice;
    const genderMatch =
      selectedGenders.length === 0 || selectedGenders.includes(room.gender);
    const roomTypeMatch =
      selectedRoomTypes.length === 0 ||
      selectedRoomTypes.includes(room.roomType);
    const amenitiesMatch =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => room.amenities?.includes(a));
    const nameMatch = room.pg?.name?.toLowerCase().includes(searchQuery);
    const cityMatch = room.pg?.city?.toLowerCase().includes(searchQuery);
    const searchMatch = searchQuery === "" || nameMatch || cityMatch;
    return (
      priceMatch &&
      genderMatch &&
      roomTypeMatch &&
      amenitiesMatch &&
      searchMatch
    );
  });

  const activeFiltersCount =
    selectedGenders.length +
    selectedRoomTypes.length +
    selectedAmenities.length +
    (maxPrice !== 20000 ? 1 : 0);

  if (loadingPgs) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Finding the best stays…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 font-medium capitalize">
            {searchQuery ? searchQuery : "All listings"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">
              {searchQuery ? `Search results` : "All listings"}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              {searchQuery ? (
                <>
                  Results for{" "}
                  <span className="text-slate-400">"{searchQuery}"</span>
                </>
              ) : (
                <>
                  Find your{" "}
                  <span className="text-slate-400">perfect stay.</span>
                </>
              )}
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {filteredRooms.length}{" "}
              {filteredRooms.length === 1 ? "property" : "properties"} available
              now
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden self-start flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-sm font-medium rounded-xl transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-slate-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedGenders={selectedGenders}
                selectedRoomTypes={selectedRoomTypes}
                selectedAmenities={selectedAmenities}
                handleGenderChange={handleGenderChange}
                handleRoomTypeChange={handleRoomTypeChange}
                handleAmenityChange={handleAmenityChange}
                clearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
                filteredCount={filteredRooms.length}
                currency={currency}
              />
            </div>
          </aside>

          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl">
                <div className="flex flex-col h-full">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      Filters
                    </p>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-5">
                    <FilterPanel
                      maxPrice={maxPrice}
                      setMaxPrice={setMaxPrice}
                      selectedGenders={selectedGenders}
                      selectedRoomTypes={selectedRoomTypes}
                      selectedAmenities={selectedAmenities}
                      handleGenderChange={handleGenderChange}
                      handleRoomTypeChange={handleRoomTypeChange}
                      handleAmenityChange={handleAmenityChange}
                      clearFilters={clearFilters}
                      activeFiltersCount={activeFiltersCount}
                      filteredCount={filteredRooms.length}
                      isMobile={true}
                      onClose={() => setShowFilters(false)}
                      currency={currency}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 min-w-0">
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredRooms.map((room) => {
                  const pgImage =
                    room.images?.[0] ||
                    room.pg?.images?.[0] ||
                    "/placeholder.svg";
                  const pgName = room.pg?.name || "PG Room";
                  const pgLocation =
                    room.pg?.city || room.pg?.address || "Location";
                  const pgAmenities = room.amenities || [];

                  return (
                    <div
                      key={room._id}
                      onClick={() => navigate(`/pg/${room._id}`)}
                      className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img
                          src={pgImage}
                          alt={pgName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          {room.gender && (
                            <span
                              className={`px-2.5 py-1 rounded-lg border text-xs font-medium backdrop-blur-sm ${getGenderBadge(room.gender)}`}
                            >
                              {room.gender}
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded-lg bg-white/90 text-slate-700 text-xs font-medium capitalize">
                            {room.roomType}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <div className="flex items-center gap-1 text-white text-xs">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="font-medium truncate drop-shadow">
                              {pgLocation}
                            </span>
                          </div>
                          <div className="bg-white rounded-xl px-3 py-1.5 shadow-md shrink-0">
                            <span className="text-sm font-bold text-slate-900">
                              {currency}
                              {room.pricePerBed?.toLocaleString()}
                            </span>
                            <span className="text-slate-400 text-xs">/bed</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-600 transition-colors mb-2.5 truncate">
                          {pgName}
                        </h3>

                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1 text-xs">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-green-600 font-semibold">
                              {room.availableBeds}
                            </span>
                            <span className="text-slate-400">
                              / {room.totalBeds} beds
                            </span>
                          </div>
                        </div>

                        {pgAmenities.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {pgAmenities.slice(0, 3).map((a, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-500 rounded-md text-xs"
                              >
                                {a}
                              </span>
                            ))}
                            {pgAmenities.length > 3 && (
                              <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-400 rounded-md text-xs">
                                +{pgAmenities.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-end">
                          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-amber-600 transition-colors">
                            View details
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 text-center px-6">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-5">
                  <Search className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No rooms found
                </h3>
                <p className="text-slate-500 text-sm mb-6 max-w-xs">
                  Try adjusting your filters or searching a different location.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Listings;
