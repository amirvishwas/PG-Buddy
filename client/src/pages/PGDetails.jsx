import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  MapPin,
  Bed,
  Users,
  Star,
  ArrowLeft,
  Phone,
  Calendar,
  Shield,
  Wifi,
  UtensilsCrossed,
  Car,
  Shirt,
  Wind,
  Droplets,
  Zap,
  Camera,
  Share2,
  Heart,
  CheckCircle,
  XCircle,
  Clock,
  Home,
} from "lucide-react";
import properties from "../data/properties";

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pg = properties[id];
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!pg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            PG Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/listings")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All PGs
          </button>
        </div>
      </div>
    );
  }

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      wifi: Wifi,
      "wi-fi": Wifi,
      food: UtensilsCrossed,
      parking: Car,
      laundry: Shirt,
      ac: Wind,
      water: Droplets,
      power: Zap,
    };
    const IconComponent = iconMap[amenity.toLowerCase()] || CheckCircle;
    return <IconComponent className="w-5 h-5" />;
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

  // Mock additional images for demonstration
  const images = [pg.image, pg.image, pg.image, pg.image];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={images[selectedImageIndex]}
                  alt={pg.name}
                  className="w-full h-96 object-cover"
                />
                {pg.verified && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-emerald-600 rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg">
                      <Shield className="w-4 h-4" />
                      Verified Property
                    </div>
                  </div>
                )}
                <button className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/70 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-3">
                  {images.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative overflow-hidden rounded-lg ${
                        selectedImageIndex === index
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${index + 1}`}
                        className="w-full h-20 object-cover hover:scale-110 transition-transform"
                      />
                      {index === 3 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/gallery/${id}`);
                          }}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium hover:bg-black/60 transition"
                        >
                          +5 more
                        </button>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {pg.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{pg.location}</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">4.5</span>
                    <span className="text-gray-500">(24 reviews)</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getGenderColor(
                      pg.gender
                    )}`}
                  >
                    {pg.gender}
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{pg.gender}</div>
                  <div className="text-sm text-gray-600">Accommodation</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <Bed className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    Single/Double
                  </div>
                  <div className="text-sm text-gray-600">Room Types</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Security</div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Amenities & Facilities
                </h3>
                {pg.amenities && pg.amenities.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {pg.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                      >
                        <div className="text-blue-600">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="font-medium text-gray-800">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <XCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      No amenities information available
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Location & Rules */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Location & House Rules
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nearby Locations */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Nearby Locations
                  </h4>
                  {pg.nearbyPlaces?.map((place, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-gray-600 mb-2"
                    >
                      <span>{place.name}</span>
                      <span className="font-medium">{place.distance}</span>
                    </div>
                  ))}
                </div>

                {/* House Rules */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    House Rules
                  </h4>
                  {pg.houseRules?.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600 mb-2"
                    >
                      {rule.allowed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span>{rule.rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {pg.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Including meals & basic utilities
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-md"
                  >
                    Book Now
                  </button>

                  <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-xl transition-colors">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Contact Owner
                  </button>

                  <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-xl transition-colors">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Schedule Visit
                  </button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Shield className="w-4 h-4" />
                    <span>Verified by PGBuddy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant booking available</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mt-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Info</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Deposit</span>
                    <span className="font-medium">
                      {pg.securityDeposit || "₹10,000"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Notice Period</span>
                    <span className="font-medium">
                      {pg.noticePeriod || "1 month"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gate Timing</span>
                    <span className="font-medium">
                      {pg.gateTimings || "24/7 open"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal pg={pg} onClose={() => setIsBookingModalOpen(false)} />
      )}
    </div>
  );
};

// Booking Modal Component
const BookingModal = ({ pg, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    roomType: "single",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert("Booking request submitted! Owner will contact you soon.");
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Book {pg.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Move-in Date
              </label>
              <input
                type="date"
                name="moveInDate"
                value={formData.moveInDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Type
              </label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="single">Single Occupancy</option>
                <option value="double">Double Sharing</option>
                <option value="triple">Triple Sharing</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PGDetails;
