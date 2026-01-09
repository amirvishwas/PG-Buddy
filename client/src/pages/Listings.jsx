import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  MapPin,
  Bed,
  Users,
  ArrowRight,
  Filter,
  X,
  Home,
  ChevronRight,
  Check,
  Search,
  SlidersHorizontal,
} from "lucide-react";

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

  const handleGenderChange = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  const handleRoomTypeChange = (type) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

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

  const handleCardClick = (roomId) => {
    navigate(`/pg/${roomId}`);
  };

  const getGenderBadge = (gender) => {
    switch (gender?.toLowerCase()) {
      case "boys":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          border: "border-blue-200",
        };
      case "girls":
        return {
          bg: "bg-pink-50",
          text: "text-pink-600",
          border: "border-pink-200",
        };
      default:
        return {
          bg: "bg-purple-50",
          text: "text-purple-600",
          border: "border-purple-200",
        };
    }
  };

  if (loadingPgs) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Finding the best stays...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-[600px] rounded-b-[40px] sm:rounded-b-[80px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(219, 234, 254, 0.6) 0%, rgba(204, 251, 241, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
          }}
        />
        <div className="absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-40 h-40 sm:w-72 sm:h-72 bg-teal-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center text-sm text-gray-500 bg-white/60 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/50 shadow-sm">
            <button
              onClick={() => navigate("/")}
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-800 font-medium capitalize">
              {searchQuery ? searchQuery : "All Locations"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {searchQuery ? (
                <h1 className="text-3xl font-bold text-gray-900">
                  Results for "
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                    {searchQuery}
                  </span>
                  "
                </h1>
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">
                  Find Your Perfect Stay
                </h1>
              )}
              <p className="text-gray-600 mt-2 font-medium">
                Showing {filteredRooms.length} properties available now
              </p>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-all"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-white text-blue-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
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

          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform animate-in slide-in-from-right duration-300">
                <div className="flex flex-col h-full">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Filter className="w-5 h-5 text-blue-600" />
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                    >
                      <X className="w-5 h-5" />
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

          {/* Results Grid */}
          <main className="flex-1">
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRooms.map((room, index) => {
                  const genderStyle = getGenderBadge(room.gender);
                  const gradients = [
                    "from-blue-500 to-cyan-400",
                    "from-violet-500 to-purple-400",
                    "from-rose-500 to-pink-400",
                    "from-emerald-500 to-teal-400",
                  ];
                  const gradient = gradients[index % gradients.length];

                  return (
                    <div
                      key={room._id}
                      onClick={() => handleCardClick(room._id)}
                      className="group cursor-pointer relative bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-transparent transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                    >
                      {/* Image Section */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={room.images?.[0] || "/placeholder.svg"}
                          alt={room.pg?.name || "Room"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {room.gender && (
                            <div
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md bg-white/90 ${genderStyle.text}`}
                            >
                              {room.gender}
                            </div>
                          )}
                        </div>

                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/20 capitalize">
                            {room.roomType}
                          </div>
                        </div>

                        {/* Price Tag Overlay */}
                        <div className="absolute bottom-4 right-4">
                          <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1">
                            <span
                              className={`text-sm font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                            >
                              {currency}
                              {room.pricePerBed?.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium">
                              /bed
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors">
                            {room.pg?.name || "PG Room"}
                          </h3>
                          <div className="flex items-center text-gray-500 text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            <p className="truncate">
                              {room.pg?.city || room.pg?.address || "Location"}
                            </p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-4 h-6 overflow-hidden">
                          {room.amenities?.slice(0, 3).map((a, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-md text-[10px] font-medium uppercase tracking-wider"
                            >
                              {a}
                            </span>
                          ))}
                          {room.amenities?.length > 3 && (
                            <span className="text-[10px] text-gray-400 flex items-center">
                              +{room.amenities.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">
                              <span className="text-emerald-600">
                                {room.availableBeds}
                              </span>
                              <span className="text-gray-400">
                                /{room.totalBeds} beds
                              </span>
                            </span>
                          </div>

                          <div
                            className={`flex items-center gap-1 text-xs font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300`}
                          >
                            View Details{" "}
                            <ArrowRight className="w-3 h-3 text-blue-500" />
                          </div>
                        </div>
                      </div>

                      {/* Hover Line */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No rooms found
                </h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  We couldn't find any rooms matching your current filters. Try
                  adjusting your preferences.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
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
      className={`space-y-8 ${
        !isMobile
          ? "bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-blue-100/50 border border-white"
          : ""
      }`}
    >
      {/* Header for Desktop */}
      {!isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-900">Price Budget</h4>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            Up to {currency}
            {maxPrice.toLocaleString()}
          </span>
        </div>
        <div className="pt-2">
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
            <span>{currency}1k</span>
            <span>{currency}20k</span>
          </div>
        </div>
      </div>

      {/* Gender Filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-900">Gender</h4>
        <div className="flex flex-col gap-2">
          {["Boys", "Girls", "Mixed"].map((gender) => {
            const isSelected = selectedGenders.includes(gender);
            return (
              <label
                key={gender}
                className={`relative flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleGenderChange(gender)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition-colors ${
                    isSelected
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isSelected ? "text-blue-700" : "text-gray-600"
                  }`}
                >
                  {gender}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Room Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-900">Room Type</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "single", label: "Single" },
            { value: "double", label: "Double" },
            { value: "triple", label: "Triple" },
          ].map((type) => {
            const isSelected = selectedRoomTypes.includes(type.value);
            return (
              <label
                key={type.value}
                className={`flex-1 min-w-[80px] text-center cursor-pointer py-2 px-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  isSelected
                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
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

      {/* Amenities */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-900">Amenities</h4>
        <div className="grid grid-cols-2 gap-2">
          {["Food", "Free WiFi", "Laundry", "AC"].map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                  isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                />
                <span
                  className={`ml-2 text-sm ${
                    isSelected ? "text-blue-700 font-medium" : "text-gray-600"
                  }`}
                >
                  {amenity}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Results Summary (Mobile Only) */}
      {isMobile && (
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 active:scale-95 transition-all"
          >
            Show {filteredCount} Properties
          </button>
        </div>
      )}

      {!isMobile && (
        <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
          <p className="text-xs text-gray-500">
            <span className="font-bold text-gray-900">{filteredCount}</span>{" "}
            results match
          </p>
        </div>
      )}
    </div>
  );
};

export default Listings;
