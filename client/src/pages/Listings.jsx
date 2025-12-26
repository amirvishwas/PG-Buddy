import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

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

  if (loadingPgs) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-gray-600 text-md mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Home
          </button>
          <span className="mx-2">{">"}</span>
          <span className="text-gray-800 capitalize">
            {searchQuery ? searchQuery : "All Locations"}
          </span>
        </div>

        {/* Search Heading */}
        {searchQuery && (
          <h2 className="text-2xl font-semibold mb-4">
            Search results for "
            <span className="text-blue-600">{searchQuery}</span>"
          </h2>
        )}

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
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
          </div>

          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div
              className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
              onClick={() => setShowFilters(false)}
            >
              <div
                className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4 overflow-y-auto h-full pb-20">
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
          )}

          {/* Results */}
          <div className="flex-1">
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                  <div
                    key={room._id}
                    onClick={() => handleCardClick(room._id)}
                    className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={room.images?.[0] || "/placeholder.svg"}
                        alt={room.pg?.name || "Room"}
                        className="h-48 w-full object-cover"
                      />
                      {room.gender && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                          {room.gender}
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md capitalize">
                        {room.roomType}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {room.pg?.name || "PG Room"}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {room.pg?.city || room.pg?.address || "Location"}
                      </p>

                      {room.amenities && room.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {room.amenities.slice(0, 3).map((a, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                            >
                              {a}
                            </span>
                          ))}
                          {room.amenities.length > 3 && (
                            <span className="text-gray-400 text-xs">
                              +{room.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-blue-600 font-bold text-lg">
                          {currency}
                          {room.pricePerBed?.toLocaleString()}/bed
                        </p>
                        <p className="text-sm text-gray-500">
                          {room.availableBeds}/{room.totalBeds} beds
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No rooms found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search keywords
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Gender Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Gender Preference</h4>
        <div className="space-y-2">
          {["Boys", "Girls", "Mixed"].map((gender) => (
            <label
              key={gender}
              className="flex items-center space-x-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedGenders.includes(gender)}
                onChange={() => handleGenderChange(gender)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-gray-700 font-medium">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Room Type Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Room Type</h4>
        <div className="space-y-2">
          {[
            { value: "single", label: "Single Bed" },
            { value: "double", label: "Double Bed" },
            { value: "triple", label: "Triple Sharing" },
          ].map((type) => (
            <label
              key={type.value}
              className="flex items-center space-x-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedRoomTypes.includes(type.value)}
                onChange={() => handleRoomTypeChange(type.value)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-gray-700 font-medium">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Amenities</h4>
        <div className="grid grid-cols-2 gap-2">
          {["Food", "Free WiFi", "Laundry", "AC"].map((amenity) => (
            <label
              key={amenity}
              className="flex items-center space-x-2 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Price Range</h4>
        <input
          type="range"
          min="1000"
          max="20000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            {currency}1,000
          </span>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Up to {currency}
            {maxPrice.toLocaleString()}
          </div>
          <span className="text-sm font-medium text-gray-600">
            {currency}20,000
          </span>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{filteredCount}</span>{" "}
          rooms match your filters
        </p>
      </div>

      {/* Mobile Apply */}
      {isMobile && (
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Show {filteredCount} rooms
        </button>
      )}
    </div>
  );
};

export default Listings;
