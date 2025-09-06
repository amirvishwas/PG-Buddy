import React, { useState } from "react";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaWifi,
  FaUtensils,
  FaSnowflake,
  FaTshirt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const PGCards = ({ properties }) => {
  const [imageErrors, setImageErrors] = useState({});
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
      case "wi-fi":
        return <FaWifi className="w-3 h-3" />;
      case "food":
        return <FaUtensils className="w-3 h-3" />;
      case "ac":
        return <FaSnowflake className="w-3 h-3" />;
      case "laundry":
        return <FaTshirt className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getGenderColor = (gender) => {
    switch (gender.toLowerCase()) {
      case "boys":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "girls":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "mixed":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Properties Available
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          We couldn't find any properties matching your current filters. Try
          adjusting your search criteria to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <PropertyCard
          key={`${property.id || index}-${property.name}`}
          property={property}
          index={index}
          imageError={imageErrors[index]}
          imageLoaded={loadedImages[index]}
          onImageError={() => handleImageError(index)}
          onImageLoad={() => handleImageLoad(index)}
          getAmenityIcon={getAmenityIcon}
          getGenderColor={getGenderColor}
        />
      ))}
    </div>
  );
};

const PropertyCard = ({
  property,
  index,
  imageError,
  imageLoaded,
  onImageError,
  onImageLoad,
  getAmenityIcon,
  getGenderColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/pg/${property.id || index}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-2xl bg-gray-100">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <img
              src={property.image}
              alt={property.name}
              className={`w-full h-52 sm:h-48 lg:h-52 object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onError={onImageError}
              onLoad={onImageLoad}
            />
          </>
        ) : (
          <div className="w-full h-52 sm:h-48 lg:h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <p className="text-sm text-gray-500">Property Image</p>
            </div>
          </div>
        )}

        {/* Verified Badge */}
        {property.verified && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-emerald-600 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg border border-emerald-100">
              <FaCheckCircle className="text-emerald-500 w-3 h-3" />
              Verified
            </div>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-black/80 backdrop-blur-sm text-white rounded-lg px-3 py-1.5 text-sm font-bold">
            <div className="flex items-center gap-1">
              <FaRupeeSign className="w-3 h-3" />
              {property.price}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-2 text-gray-600">
            <FaMapMarkerAlt className="text-blue-500 w-4 h-4 flex-shrink-0" />
            <p className="text-sm line-clamp-1">{property.location}</p>
          </div>
        </div>

        {/* Gender Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getGenderColor(
              property.gender
            )}`}
          >
            {property.gender}
          </span>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-800">Amenities</h4>
          {property.amenities && property.amenities.length > 0 ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {property.amenities.slice(0, 3).map((amenity, amenityIndex) => (
                  <div
                    key={amenityIndex}
                    className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-lg text-xs font-medium"
                  >
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              {property.amenities.length > 3 && (
                <p className="text-xs text-gray-500 font-medium">
                  +{property.amenities.length - 3} more amenities
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No amenities listed</p>
          )}
        </div>
      </div>

      {/* Hover Effect Footer */}
      <div className="px-6 pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">
              View Details
            </span>
            <svg
              className="w-4 h-4 text-blue-500 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PGCards;
