import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import BookingModal from "../components/BookingModal";
import ImageGallery from "./ImageGallery";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
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
} from "lucide-react";

const defaultCenter = { lat: 28.6139, lng: 77.209 };

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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

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
    if (id) fetchRatings();
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
    return <IconComponent className="w-4 h-4" />;
  };

  const getGenderBadge = (gender) => {
    switch (gender?.toLowerCase()) {
      case "boys":
        return "bg-blue-50 border-blue-100 text-blue-700";
      case "girls":
        return "bg-rose-50 border-rose-100 text-rose-700";
      case "mixed":
        return "bg-slate-100 border-slate-200 text-slate-600";
      default:
        return "bg-slate-100 border-slate-200 text-slate-600";
    }
  };

  const getRoomTypeLabel = (type) => {
    switch (type) {
      case "single":
        return "Single bed";
      case "double":
        return "Double sharing";
      case "triple":
        return "Triple sharing";
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

  const renderStars = (rating) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating ? "text-amber-400 fill-current" : "text-slate-200"
          }`}
        />
      ))}
    </div>
  );

  if (loading || loadingPgs) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading property details…</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-sm w-full">
          <div className="w-14 h-14 mx-auto mb-5 bg-slate-100 rounded-2xl flex items-center justify-center">
            <Home className="w-6 h-6 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            PG not found
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/listings")}
            className="w-full bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
          >
            Browse all PGs
          </button>
        </div>
      </div>
    );
  }

  const images = room.images?.length > 0 ? room.images : ["/placeholder.svg"];

  const handleOpenGallery = (index = 0) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const mapPosition =
    room.pg?.location?.lat && room.pg?.location?.lng
      ? { lat: Number(room.pg.location.lat), lng: Number(room.pg.location.lng) }
      : defaultCenter;

  const occupancyPct = Math.round(
    ((room.totalBeds - room.availableBeds) / room.totalBeds) * 100,
  );

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isFavorite
                    ? "bg-rose-50 text-rose-500 border-rose-100"
                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              <button className="p-2 rounded-xl bg-white text-slate-400 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid lg:grid-cols-3 gap-7">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div
                className="relative cursor-pointer aspect-[16/10] overflow-hidden group"
                onClick={() => handleOpenGallery(selectedImageIndex)}
              >
                <img
                  src={images[selectedImageIndex]}
                  alt={room.pg?.name || "Room"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {room.isAvailable && (
                  <div className="absolute top-4 left-4">
                    <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-green-700 rounded-lg px-3 py-1.5 text-xs font-semibold border border-green-100">
                      <Shield className="w-3 h-3" />
                      Verified & available
                    </span>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenGallery(0);
                  }}
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white rounded-xl p-2 hover:bg-black/70 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {images.length > 1 && (
                <div className="p-3 grid grid-cols-5 gap-2">
                  {images.slice(0, 5).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-xl overflow-hidden transition-all cursor-pointer ${
                        selectedImageIndex === index
                          ? "ring-2 ring-slate-900 ring-offset-1"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 4 && images.length > 5 && (
                        <div
                          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenGallery(4);
                          }}
                        >
                          <span className="text-base font-bold">
                            +{images.length - 5}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider">
                            More
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5 pb-5 border-b border-slate-100">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                    {room.pg?.name || "PG Room"}
                  </h1>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      {room.pg?.city ||
                        room.pg?.address ||
                        "Location not available"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 px-3 py-2 rounded-xl">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <div>
                    <span className="text-base font-bold text-slate-900 block leading-none">
                      {averageRating > 0 ? averageRating.toFixed(1) : "New"}
                    </span>
                    <span className="text-xs text-slate-400">
                      {totalRatings} reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-7">
                {room.gender && (
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 ${getGenderBadge(
                      room.gender,
                    )}`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    {room.gender}
                  </span>
                )}
                <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-100 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5" />
                  {getRoomTypeLabel(room.roomType)}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                {[
                  {
                    icon: Users,
                    label: "Accommodation",
                    value: room.gender || "Any",
                    bg: "bg-slate-50 border-slate-100",
                    icon_bg: "bg-white text-slate-600",
                  },
                  {
                    icon: CheckCircle,
                    label: "Availability",
                    value: `${room.availableBeds}/${room.totalBeds} beds`,
                    bg: "bg-green-50 border-green-100",
                    icon_bg: "bg-white text-green-600",
                  },
                  {
                    icon: Clock,
                    label: "Security",
                    value: "24/7",
                    bg: "bg-amber-50 border-amber-100",
                    icon_bg: "bg-white text-amber-600",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`rounded-2xl p-4 border text-center ${stat.bg}`}
                  >
                    <div
                      className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center mb-2.5 shadow-sm ${stat.icon_bg}`}
                    >
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
                  Amenities & perks
                </p>
                {room.amenities && room.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="text-xs font-medium text-slate-700 capitalize">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-7 text-center border border-dashed border-slate-200">
                    <XCircle className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">
                      No amenities listed
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
                Neighbourhood
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between gap-5">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {room.pg?.name || "Property location"}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">
                      {room.pg?.address || "Detailed address loading…"}
                    </p>
                    <span className="inline-flex items-center text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                      {room.pg?.city || "Location details"}
                    </span>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${mapPosition.lat},${mapPosition.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-all active:scale-95 w-fit"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Get directions
                  </a>
                </div>

                <div className="h-56 md:h-auto rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      center={mapPosition}
                      zoom={15}
                      options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                        styles: [
                          {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }],
                          },
                        ],
                      }}
                    >
                      <Marker position={mapPosition} />
                    </GoogleMap>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                      <span className="text-xs text-slate-400">
                        Loading map…
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold">
                  Guest reviews
                </p>
                <span className="text-xs text-slate-400 font-medium">
                  {totalRatings} verified
                </span>
              </div>

              {ratingsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
              ) : ratings.length > 0 ? (
                <div className="space-y-5">
                  {ratings.map((rating, index) => (
                    <div
                      key={index}
                      className="pb-5 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm shrink-0">
                            {rating.user?.name?.[0] || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {rating.user?.name || "User"}
                            </p>
                            <p className="text-xs text-slate-400">
                              {formatDate(rating.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 px-2 py-1 rounded-lg">
                          {renderStars(rating.rating)}
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed pl-12">
                        "{rating.review}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 text-sm">
                    No reviews yet. Be the first!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <p className="text-xs text-slate-400 mb-1">Starting price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {currency}
                      {room.pricePerBed?.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-semibold border border-green-100">
                    <CheckCircle className="w-3 h-3" />
                    {getRoomTypeLabel(room.roomType)}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    disabled={!room.isAvailable}
                    className="w-full bg-slate-900 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    {room.isAvailable && room.availableBeds > 0 ? (
                      <>
                        <Shield className="w-4 h-4" />
                        Book now
                      </>
                    ) : (
                      "Currently unavailable"
                    )}
                  </button>
                  <button className="w-full bg-white border border-slate-200 hover:border-slate-400 text-slate-700 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer">
                    <Phone className="w-4 h-4 text-slate-400" />
                    Contact owner
                  </button>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-1">
                    Property stats
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Occupancy</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-900 rounded-full"
                          style={{ width: `${occupancyPct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {occupancyPct}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Gender policy</span>
                    <span className="font-semibold text-slate-900 capitalize">
                      {room.gender}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Verification</span>
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-5">
                  <Shield className="w-3 h-3" />
                  Secured by PGBuddy guarantee
                </p>
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
