import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import BookingModal from "../components/BookingModal";
import ImageGallery from "./ImageGallery";
import {
  MapPin,
  Bed,
  Users,
  Star,
  ArrowLeft,
  Phone,
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
  Maximize2,
  Sparkles,
} from "lucide-react";

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pgs, loadingPgs, currency, axios } = useAppContext();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [isFavorite, setIsFavorite] = useState(false);

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
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-500 font-medium animate-pulse">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full border border-gray-100">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-50 rounded-full flex items-center justify-center">
            <Home className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            PG Not Found
          </h2>
          <p className="text-gray-500 mb-8">
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/listings")}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
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
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "girls":
        return "bg-pink-50 text-pink-600 border-pink-200";
      case "mixed":
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
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
            className={`w-3.5 h-3.5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const images = room.images?.length > 0 ? room.images : ["/placeholder.svg"];

  const handleOpenGallery = (index = 0) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 relative font-[Poppins]">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm">Back</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2.5 rounded-full transition-all duration-300 border ${
                  isFavorite
                    ? "bg-red-50 text-red-500 border-red-100 shadow-sm"
                    : "bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              <button className="p-2.5 rounded-full bg-white text-gray-400 border border-gray-200 hover:border-gray-300 hover:text-gray-600 transition-all duration-300">
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
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/20 border border-gray-100 overflow-hidden group">
              <div
                className="relative cursor-pointer aspect-[16/10] overflow-hidden"
                onClick={() => handleOpenGallery(selectedImageIndex)}
              >
                <img
                  src={images[selectedImageIndex]}
                  alt={room.pg?.name || "Room"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-8 h-8 text-white" />
                  </div>
                </div>

                {room.isAvailable && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-emerald-600 rounded-full px-4 py-1.5 text-xs font-bold shadow-lg uppercase tracking-wide">
                      <Shield className="w-3.5 h-3.5" />
                      Verified & Available
                    </div>
                  </div>
                )}

                {/* Camera Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenGallery(0);
                  }}
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white rounded-full p-2.5 hover:bg-black/70 transition-colors z-10"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-5 gap-3">
                    {images.slice(0, 5).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                          selectedImageIndex === index
                            ? "ring-2 ring-blue-500 ring-offset-2 scale-95"
                            : "opacity-70 hover:opacity-100 hover:scale-105"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 4 && images.length > 5 && (
                          <div
                            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white cursor-pointer backdrop-blur-[1px]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenGallery(4);
                            }}
                          >
                            <span className="text-lg font-bold">
                              +{images.length - 5}
                            </span>
                            <span className="text-[10px] font-medium uppercase tracking-wider">
                              More
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/20 border border-gray-100 p-8">
              <div className="mb-8 pb-8 border-b border-gray-100">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {room.pg?.name || "PG Room"}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>
                        {room.pg?.city ||
                          room.pg?.address ||
                          "Location not available"}
                      </span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-xl border border-yellow-100">
                      <Star className="w-5 h-5 text-orange-400 fill-current" />
                      <div>
                        <span className="text-xl font-bold text-gray-900 block leading-none">
                          {averageRating > 0 ? averageRating.toFixed(1) : "New"}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {totalRatings} Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {room.gender && (
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getGenderColor(
                        room.gender,
                      )} flex items-center gap-2`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      {room.gender}
                    </span>
                  )}
                  <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-2">
                    <Bed className="w-3.5 h-3.5" />
                    {getRoomTypeLabel(room.roomType)}
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100 text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-blue-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-gray-900">
                    {room.gender || "Any"}
                  </div>
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mt-1">
                    Accommodation
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100 text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-emerald-500">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-gray-900">
                    {room.availableBeds}/{room.totalBeds} Beds
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-1">
                    Availability
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100 text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-purple-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-gray-900">24/7</div>
                  <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mt-1">
                    Security
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Amenities & Perks
                  </h3>
                </div>

                {room.amenities && room.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="group flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all duration-300"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-500 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="font-medium text-gray-700 text-sm capitalize group-hover:text-gray-900">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
                    <XCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 font-medium">
                      No specific amenities listed
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/20 border border-gray-100 p-8">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900">
                  Neighborhood
                </h3>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 flex items-start gap-4 border border-gray-200/60">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    {room.pg?.name}
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                    {room.pg?.address}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase tracking-wide">
                    {room.pg?.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/20 border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">
                  Guest Reviews
                </h3>
                <div className="text-sm text-gray-500 font-medium">
                  {totalRatings} Verified Reviews
                </div>
              </div>

              {ratingsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              ) : ratings.length > 0 ? (
                <div className="space-y-6">
                  {ratings.map((rating, index) => (
                    <div
                      key={index}
                      className="pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold">
                            {rating.user?.name?.[0] || "U"}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm">
                              {rating.user?.name || "User"}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {formatDate(rating.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
                          {renderStars(rating.rating)}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed pl-[52px]">
                        "{rating.review}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">
                    No reviews yet. Be the first!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column  */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-gray-100 p-6 overflow-hidden relative">
                {/* Decorative Blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-bl-full -z-0 opacity-50" />

                <div className="relative z-10 mb-8">
                  <p className="text-sm font-semibold text-gray-500 mb-1">
                    Starting price
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      {currency}
                      {room.pricePerBed?.toLocaleString()}
                    </span>
                    <span className="text-gray-400 font-medium">/month</span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-wider border border-emerald-100">
                    <CheckCircle className="w-3 h-3" />
                    {getRoomTypeLabel(room.roomType)}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    disabled={!room.isAvailable}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {room.isAvailable && room.availableBeds > 0 ? (
                      <>
                        Book Now
                        <Shield className="w-4 h-4 opacity-80" />
                      </>
                    ) : (
                      "Currently Unavailable"
                    )}
                  </button>

                  <button className="w-full bg-white border-2 border-gray-100 hover:border-blue-200 text-gray-700 hover:text-blue-600 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    Contact Owner
                  </button>
                </div>

                <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Property Stats
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Occupancy</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${
                                ((room.totalBeds - room.availableBeds) /
                                  room.totalBeds) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="font-bold text-gray-900">
                          {Math.round(
                            ((room.totalBeds - room.availableBeds) /
                              room.totalBeds) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
                      <span className="text-gray-500">Gender Policy</span>
                      <span className="font-bold text-gray-900 capitalize">
                        {room.gender}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
                      <span className="text-gray-500">Verification</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" /> Book securely with PGBuddy
                    Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <BookingModal
          room={room}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

      {isGalleryOpen && (
        <ImageGallery
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </div>
  );
};

export default PGDetails;
