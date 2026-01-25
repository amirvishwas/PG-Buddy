import React, { useState } from "react";
import {
  X,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Star,
  Sparkles,
  MapPin,
  Crosshair,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "220px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
};

const defaultCenter = { lat: 28.6139, lng: 77.209 };

const PgReg = () => {
  const { setShowPgReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(defaultCenter);

  const cities = [
    "Patna",
    "Lucknow",
    "Ambala",
    "Noida",
    "Kolkata",
    "Delhi",
    "Bangalore",
    "Mumbai",
    "Chandigarh",
  ];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onMarkerDragEnd = (e) => {
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !phone || !address || !city) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/pg",
        {
          name,
          address,
          city,
          contact: phone,
          gender: "both",
          startingPrice: 1000,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowPgReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to register PG");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-[Poppins]">
      <div
        className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Panel */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-10 flex-col justify-between relative overflow-hidden text-white">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-xs font-medium text-blue-50">
                Partner with Us
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Grow Your Business with{" "}
              <span className="text-blue-400">PGBuddy</span>
            </h2>
            <p className="text-blue-100/80 text-base">
              Mark your exact location on the map to help quality tenants find
              you effortlessly.
            </p>
          </div>

          <div className="relative z-10 space-y-5 mt-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
                <CheckCircle2 className="w-5 h-5 text-blue-300" />
              </div>
              <span className="font-medium text-blue-50">
                Instant Listing Activation
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-300" />
              </div>
              <span className="font-medium text-blue-50">
                Verified Tenant Leads
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 mt-auto">
            <p className="text-xs text-blue-200 font-medium">
              Trusted by 2,000+ owners nationwide
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="relative flex flex-col md:w-7/12 p-8 md:p-10 bg-white overflow-y-auto max-h-[90vh] md:max-h-full">
          <button
            type="button"
            onClick={() => setShowPgReg(false)}
            className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <X size={24} />
          </button>

          <div className="mb-6 mt-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Register Property
              </h3>
            </div>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5 ml-1">
                Property Name *
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="e.g. Sunshine Residency"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5 ml-1">
                  Contact Number *
                </label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5 ml-1">
                  City *
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none text-gray-700"
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5 ml-1">
                Full Address *
              </label>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                rows="2"
                placeholder="Enter complete street address..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700 resize-none"
              />
            </div>

            {/* NEW: Coordinates Section */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Crosshair className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider leading-none mb-1">
                    Selected Coordinates
                  </p>
                  <div className="flex gap-4">
                    <p className="text-xs font-mono text-gray-600">
                      <span className="font-bold text-blue-600">LAT:</span>{" "}
                      {location.lat.toFixed(6)}
                    </p>
                    <p className="text-xs font-mono text-gray-600">
                      <span className="font-bold text-blue-600">LNG:</span>{" "}
                      {location.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full border border-blue-100 text-blue-500 font-medium">
                  Auto-captured
                </span>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                Drag Marker to Exact Location
              </label>
              <div className="relative overflow-hidden rounded-2xl shadow-inner bg-gray-100 border border-gray-200">
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={location}
                    zoom={13}
                  >
                    <Marker
                      position={location}
                      draggable={true}
                      onDragEnd={onMarkerDragEnd}
                    />
                  </GoogleMap>
                ) : (
                  <div className="w-full h-[220px] flex items-center justify-center">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full" />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3.5 rounded-lg shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Profile...
                  </span>
                ) : (
                  "Create Owner Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PgReg;
