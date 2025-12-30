import React, { useState } from "react";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaWifi,
  FaUtensils,
  FaSnowflake,
  FaTshirt,
  FaBed,
  FaTimesCircle,
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {properties.map((property, index) => (
        <PropertyCard
          key={`${property.id || property._id || index}-${property.name}`}
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

  // Check if room is available
  const isAvailable =
    property.isAvailable !== false && property.availableBeds > 0;

  return (
    <Link
      to={`/pg/${property._id || property.id || index}`}
      className={`
        group block bg-white rounded-xl sm:rounded-2xl
        border border-gray-200
        shadow-sm hover:shadow-lg
        transition-all duration-300
        sm:hover:-translate-y-1
        ${!isAvailable ? "opacity-75" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl bg-gray-100">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
              src={
                property.images && property.images.length > 0
                  ? property.images[0]
                  : property.image
              }
              alt={property.name}
              className={`w-full h-44 sm:h-48 object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onError={onImageError}
              onLoad={onImageLoad}
            />
          </>
        ) : (
          <div className="h-44 sm:h-48 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* Availability Badge */}
        <span
          className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            isAvailable
              ? "bg-white/90 text-emerald-600 border-emerald-200"
              : "bg-red-100/90 text-red-600 border-red-200"
          }`}
        >
          {isAvailable ? (
            <>
              <FaCheckCircle className="w-3 h-3" />
              Available
            </>
          ) : (
            <>
              <FaTimesCircle className="w-3 h-3" />
              Sold Out
            </>
          )}
        </span>

        {/* Price */}
        <span className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1">
          <FaRupeeSign className="w-3 h-3" />
          {property.pricePerBed}
          <span className="text-xs font-medium">/mo</span>
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className="font-bold text-base sm:text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600">
          {property.name || property.pg?.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 text-gray-600">
          <FaMapMarkerAlt className="text-blue-500 w-4 h-4" />
          <p className="text-xs sm:text-sm line-clamp-1">
            {property.location || property.pg?.city || property.pg?.address}
          </p>
        </div>

        {/* Gender & Beds */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getGenderColor(
              property.gender || "mixed"
            )}`}
          >
            {property.gender || "Mixed"}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <FaBed className="w-3 h-3" />
            {property.availableBeds}/{property.totalBeds} beds
          </span>
        </div>

        {/* Amenities */}
        <div className="mt-4">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2">
            Amenities
          </h4>

          {property.amenities?.length ? (
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((amenity, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-md text-xs"
                >
                  {getAmenityIcon(amenity)}
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-xs text-gray-500 font-medium">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No amenities listed</p>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="border-t pt-3 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">
            {isAvailable ? "View Details" : "View Anyway"}
          </span>
          <span className="text-blue-500 text-sm font-semibold">→</span>
        </div>
      </div>
    </Link>
  );
};

export default PGCards;
