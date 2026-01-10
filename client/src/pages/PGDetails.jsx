import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import BookingModal from "../components/BookingModal";
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
  Loader2,
  MessageSquare,
  User,
} from "lucide-react";

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pgs, loadingPgs, currency, axios } = useAppContext();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Ratings state
  const [ratings, setRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    if (!loadingPgs && pgs.length > 0) {
      const foundRoom = pgs.find((r) => r._id === id);
      setRoom(foundRoom || null);
      setLoading(false);
    } else if (!loadingPgs) {
      setLoading(false);
    }
  }, [id, pgs, loadingPgs]);

  // Fetch ratings for this room
  useEffect(() => {
    if (id) {
      fetchRatings();
    }
  }, [id]);

  const fetchRatings = async () => {
    try {
      setRatingsLoading(true);
      const { data } = await axios.get(`/api/ratings/room/${id}`);
      if (data.success) {
        setRatings(data.ratings || []);
        setAverageRating(data.averageRating || 0);
        setTotalRatings(data.totalRatings || 0);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setRatingsLoading(false);
    }
  };

  if (loading || loadingPgs) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!room) {
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
      "free wifi": Wifi,
      food: UtensilsCrossed,
      "free breakfast": UtensilsCrossed,
      parking: Car,
      laundry: Shirt,
      "laundry service": Shirt,
      ac: Wind,
      water: Droplets,
      power: Zap,
      "room service": UtensilsCrossed,
      "pool access": Droplets,
      "cleaning service": Shirt,
    };
    const IconComponent = iconMap[amenity.toLowerCase()] || CheckCircle;
    return <IconComponent className="w-5 h-5" />;
  };

  const getGenderColor = (gender) => {
    switch (gender?.toLowerCase()) {
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

  const getRoomTypeLabel = (type) => {
    switch (type) {
      case "single":
        return "Single Bed";
      case "double":
        return "Double Sharing";
      case "triple":
        return "Triple Sharing";
      default:
        return type;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const images = room.images?.length > 0 ? room.images : ["/placeholder.svg"];

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
                  alt={room.pg?.name || "Room"}
                  className="w-full h-96 object-cover"
                />
                {room.isAvailable && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-emerald-600 rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg">
                      <Shield className="w-4 h-4" />
                      Available
                    </div>
                  </div>
                )}
                <button className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/70 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
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
                        {index === 3 && images.length > 4 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">
                            +{images.length - 4} more
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {room.pg?.name || "PG Room"}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>
                    {room.pg?.city ||
                      room.pg?.address ||
                      "Location not available"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">
                      {averageRating > 0 ? averageRating.toFixed(1) : "New"}
                    </span>
                    <span className="text-gray-500">
                      ({totalRatings}{" "}
                      {totalRatings === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                  {room.gender && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getGenderColor(
                        room.gender
                      )}`}
                    >
                      {room.gender}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">
                    {getRoomTypeLabel(room.roomType)}
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    {room.gender || "Any"}
                  </div>
                  <div className="text-sm text-gray-600">Accommodation</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <Bed className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    {room.availableBeds}/{room.totalBeds} Beds
                  </div>
                  <div className="text-sm text-gray-600">Available</div>
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
                {room.amenities && room.amenities.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {room.amenities.map((amenity, index) => (
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

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Guest Reviews
                </h3>
                {totalRatings > 0 && (
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-lg font-bold text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      / 5 ({totalRatings})
                    </span>
                  </div>
                )}
              </div>

              {ratingsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : ratings.length > 0 ? (
                <div className="space-y-4">
                  {ratings.map((rating, index) => (
                    <div
                      key={rating._id || index}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {rating.user?.name?.[0]?.toUpperCase() || (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {rating.user?.name || "Anonymous Guest"}
                              </h4>
                              <p className="text-xs text-gray-400">
                                {formatDate(rating.createdAt)}
                              </p>
                            </div>
                            {renderStars(rating.rating)}
                          </div>
                          {rating.review && (
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {rating.review}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-200">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-gray-300" />
                  </div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    No Reviews Yet
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Be the first to share your experience!
                  </p>
                </div>
              )}
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Location Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{room.pg?.name}</p>
                    <p className="text-gray-600">{room.pg?.address}</p>
                    <p className="text-gray-600">{room.pg?.city}</p>
                  </div>
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
                      {currency}
                      {room.pricePerBed?.toLocaleString()}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Per bed • {getRoomTypeLabel(room.roomType)}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    disabled={!room.isAvailable || room.availableBeds === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {room.isAvailable && room.availableBeds > 0
                      ? "Book Now"
                      : "Not Available"}
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
                    <span>Verified Property</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>
                      {averageRating > 0
                        ? `${averageRating.toFixed(1)} rating`
                        : "No ratings yet"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{room.availableBeds} bed(s) available</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mt-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Info</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Type</span>
                    <span className="font-medium">
                      {getRoomTypeLabel(room.roomType)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Beds</span>
                    <span className="font-medium">{room.totalBeds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Beds</span>
                    <span className="font-medium">{room.availableBeds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender</span>
                    <span className="font-medium">{room.gender || "Any"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                      {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
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
        <BookingModal
          room={room}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PGDetails;
