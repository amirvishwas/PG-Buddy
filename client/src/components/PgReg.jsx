import React, { useState, useRef, useCallback } from "react";
import {
  X,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  MapPin,
  Crosshair,
  Navigation,
  Loader2,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "12px",
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
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const mapRef = useRef(null);

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
    "Gurugram",
    "Pune",
    "Hyderabad",
  ];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onMarkerDragEnd = (e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setLocation(newLocation);

    if (isLoaded && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: newLocation }, (results, status) => {
        if (status === "OK" && results[0]) {
          if (!address) {
            setAddress(results[0].formatted_address);
          }
          toast.success("Location updated!");
        }
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setFetchingLocation(true);
      toast.loading("Detecting your location...", { id: "geolocation" });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);

          if (mapRef.current) {
            mapRef.current.panTo(newLocation);
            mapRef.current.setZoom(17);
          }

          if (isLoaded && window.google) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: newLocation }, (results, status) => {
              if (status === "OK" && results[0]) {
                if (!address) {
                  setAddress(results[0].formatted_address);
                }
              }
            });
          }

          setFetchingLocation(false);
          toast.success("Location captured successfully!", {
            id: "geolocation",
          });
        },
        (error) => {
          setFetchingLocation(false);
          toast.error("Could not get your location. Please enable GPS.", {
            id: "geolocation",
          });
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

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
    // UPDATED: Changed z-50 to z-[100] to ensure it covers the Navbar (which is z-50)
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-[Poppins]">
      <div
        className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Panel - Dark Navy Gradient */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-8 flex-col justify-between relative overflow-hidden text-white">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6 w-fit">
              <Sparkles className="w-3 h-3 text-blue-300" />
              <span className="text-[10px] font-bold text-blue-50 uppercase tracking-wide">
                Partner with Us
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-3 leading-tight">
              Grow with <span className="text-blue-400">PGBuddy</span>
            </h2>
            <p className="text-blue-100/80 text-sm leading-relaxed">
              Capture your exact location automatically to help quality tenants
              find you effortlessly.
            </p>
          </div>

          <div className="relative z-10 space-y-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
                <CheckCircle2 className="w-4 h-4 text-blue-300" />
              </div>
              <span className="text-sm font-medium text-blue-50">
                Instant Listing Activation
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
                <ShieldCheck className="w-4 h-4 text-blue-300" />
              </div>
              <span className="text-sm font-medium text-blue-50">
                Verified Tenant Leads
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
                <Navigation className="w-4 h-4 text-blue-300" />
              </div>
              <span className="text-sm font-medium text-blue-50">
                GPS Location Tracking
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 mt-auto">
            <p className="text-[10px] text-blue-200 font-medium opacity-80">
              Trusted by 2,000+ owners nationwide
            </p>
          </div>
        </div>

        {/* Right Panel - Form (Scrollable) */}
        <div className="relative flex flex-col md:w-7/12 bg-white h-full">
          {/* Header (Sticky) */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Register Property
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowPgReg(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-5 space-y-4">
            <form onSubmit={onSubmitHandler} className="space-y-3">
              {/* Property & Contact */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">
                  Property Name *
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="e.g. Sunshine Residency"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm text-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">
                    Contact Number *
                  </label>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="tel"
                    placeholder="+91 98765..."
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">
                    City *
                  </label>
                  <div className="relative">
                    <select
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none text-sm text-gray-700"
                    >
                      <option value="">Select City</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">
                  Full Address *
                </label>
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  rows="2"
                  placeholder="Street address, landmark..."
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm text-gray-700 resize-none"
                />
              </div>

              {/* Location Controls */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 ml-1">
                    Pin Location *
                  </label>
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={fetchingLocation}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {fetchingLocation ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Navigation className="w-3 h-3" />
                    )}
                    {fetchingLocation ? "Locating..." : "Auto-Detect"}
                  </button>
                </div>

                {/* Coordinates */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2.5 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-white rounded shadow-sm text-blue-600">
                      <Crosshair className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex gap-3 text-[10px] font-mono text-gray-600">
                      <span>
                        <strong className="text-blue-700">LAT:</strong>{" "}
                        {location.lat.toFixed(5)}
                      </span>
                      <span>
                        <strong className="text-blue-700">LNG:</strong>{" "}
                        {location.lng.toFixed(5)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded text-blue-600 border border-blue-100 font-semibold">
                    Live
                  </span>
                </div>

                {/* Map */}
                <div className="relative overflow-hidden rounded-xl shadow-sm bg-gray-100 border border-gray-200">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={location}
                      zoom={13}
                      onLoad={onMapLoad}
                      options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                    >
                      <Marker
                        position={location}
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        animation={window.google?.maps?.Animation?.DROP}
                      />
                    </GoogleMap>
                  ) : (
                    <div className="w-full h-[200px] flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Tip */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-2 flex gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-amber-700 leading-tight">
                  Drag the red pin to point exactly at your building entrance.
                </p>
              </div>

              {/* Submit Action */}
              <div className="pt-2 sticky bottom-0 bg-white pb-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
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
    </div>
  );
};

export default PgReg;
