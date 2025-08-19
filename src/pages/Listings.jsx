import React, { useState } from "react";
import PGCards from "../components/PGCards";

const Listings = ({ properties }) => {
  const [maxPrice, setMaxPrice] = useState(15000);
  const [selectedGenders, setSelectedGenders] = useState(["Boys"]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Handle Gender toggle
  const handleGenderChange = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  // Handle Amenities toggle
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Filtering logic
  const filteredProperties = properties.filter((p) => {
    const priceMatch = p.priceValue <= maxPrice;

    const genderMatch =
      selectedGenders.length === 0 || selectedGenders.includes(p.gender);
    // assuming property has "gender" field (Boys/Girls/Mixed)

    const amenitiesMatch =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => p.amenities?.includes(a));
    // assuming property has amenities: ["Wi-Fi","Food"] etc.

    return priceMatch && genderMatch && amenitiesMatch;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
      {/* Filters */}
      <div className="w-full md:w-64 bg-white p-4 rounded-2xl shadow-sm space-y-4 order-1 md:order-none">
        <h3 className="font-semibold text-lg text-gray-800">Filter</h3>

        {/* Gender Filter */}
        <div>
          <p className="font-medium text-sm mb-2 text-gray-700">Gender</p>
          <div className="space-y-3">
            {["Boys", "Girls", "Mixed"].map((label) => (
              <label
                key={label}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedGenders.includes(label)}
                  onChange={() => handleGenderChange(label)}
                  className="custom-checkbox"
                />
                <span className="text-gray-700 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <p className="font-medium text-sm mb-2 text-gray-700">Amenities</p>
          <div className="space-y-3">
            {["Food", "Wi-Fi", "Laundry", "AC"].map((label) => (
              <label
                key={label}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(label)}
                  onChange={() => handleAmenityChange(label)}
                  className="custom-checkbox"
                />
                <span className="text-gray-700 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <p className="font-medium text-sm mb-2 text-gray-700">Price Range</p>
          <input
            type="range"
            min="5000"
            max="20000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹5k</span>
            <span>₹{maxPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 order-1 lg:order-2">
        <PGCards properties={filteredProperties} />
      </div>
    </div>
  );
};

export default Listings;
