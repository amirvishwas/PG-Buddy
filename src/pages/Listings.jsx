import React, { useState } from "react";
import PGCards from "../components/PGCards";

const Listings = ({ properties }) => {
  const [maxPrice, setMaxPrice] = useState(15000);
  const [selectedGenders, setSelectedGenders] = useState(["Boys"]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleGenderChange = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
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
    setMaxPrice(15000);
    setSelectedGenders([]);
    setSelectedAmenities([]);
  };

  const filteredProperties = properties.filter((p) => {
    const priceMatch = p.priceValue <= maxPrice;
    const genderMatch =
      selectedGenders.length === 0 || selectedGenders.includes(p.gender);
    const amenitiesMatch =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => p.amenities?.includes(a));
    return priceMatch && genderMatch && amenitiesMatch;
  });

  const activeFiltersCount =
    selectedGenders.length +
    selectedAmenities.length +
    (maxPrice !== 15000 ? 1 : 0);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              PG Listings ({filteredProperties.length})
            </h2>
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
                selectedAmenities={selectedAmenities}
                handleGenderChange={handleGenderChange}
                handleAmenityChange={handleAmenityChange}
                clearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
                filteredCount={filteredProperties.length}
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
                    selectedAmenities={selectedAmenities}
                    handleGenderChange={handleGenderChange}
                    handleAmenityChange={handleAmenityChange}
                    clearFilters={clearFilters}
                    activeFiltersCount={activeFiltersCount}
                    filteredCount={filteredProperties.length}
                    isMobile={true}
                    onClose={() => setShowFilters(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Desktop Header */}
            <div className="hidden lg:block mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  PG Listings ({filteredProperties.length})
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            {filteredProperties.length > 0 ? (
              <PGCards properties={filteredProperties} />
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
                  No properties found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters to see more results
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

// Filter Panel Component
const FilterPanel = ({
  maxPrice,
  setMaxPrice,
  selectedGenders,
  selectedAmenities,
  handleGenderChange,
  handleAmenityChange,
  clearFilters,
  activeFiltersCount,
  filteredCount,
  isMobile = false,
  onClose,
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
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedGenders.includes(gender)}
                  onChange={() => handleGenderChange(gender)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded ${
                    selectedGenders.includes(gender)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300"
                  } flex items-center justify-center transition-colors`}
                >
                  {selectedGenders.includes(gender) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-gray-700 font-medium">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Amenities</h4>
        <div className="grid grid-cols-2 gap-2">
          {["Food", "Wi-Fi", "Laundry", "AC"].map((amenity) => (
            <label
              key={amenity}
              className="flex items-center space-x-2 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded ${
                    selectedAmenities.includes(amenity)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300"
                  } flex items-center justify-center transition-colors`}
                >
                  {selectedAmenities.includes(amenity) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="5000"
            max="20000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">₹5,000</span>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Up to ₹{maxPrice.toLocaleString()}
            </div>
            <span className="text-sm font-medium text-gray-600">₹20,000</span>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          <span className="font-medium text-gray-900">{filteredCount}</span>{" "}
          properties match your criteria
        </p>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Show {filteredCount} Properties
        </button>
      )}
    </div>
  );
};

export default Listings;
