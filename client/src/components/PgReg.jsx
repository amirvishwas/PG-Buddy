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
  ChevronDown,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0", // slate-200
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

  const labelClass =
    "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2";
  const inputClass =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:outline-none transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div
        className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Panel - Dark Slate */}
        <div className="hidden md:flex md:w-5/12 bg-slate-900 p-8 flex-col justify-between relative overflow-hidden text-white">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">
                Partner with Us
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-3 leading-tight tracking-tight text-white">
              Grow with <span className="text-amber-500">PGBuddy</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Capture your exact location automatically to help quality tenants
              find you effortlessly.
            </p>
          </div>

          <div className="relative z-10 space-y-5 mt-8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center backdrop-blur-sm shrink-0">
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
              </div>
              <span className="text-sm font-semibold text-slate-200">
                Instant Listing Activation
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center backdrop-blur-sm shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
              </div>
              <span className="text-sm font-semibold text-slate-200">
                Verified Tenant Leads
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center backdrop-blur-sm shrink-0">
                <Navigation className="w-5 h-5 text-amber-500" />
              </div>
              <span className="text-sm font-semibold text-slate-200">
                GPS Location Tracking
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-8 mt-auto">
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
              Trusted by 2,000+ owners nationwide
            </p>
          </div>
        </div>

        {/* Right Panel - Form (Scrollable) */}
        <div className="relative flex flex-col md:w-7/12 bg-white h-full">
          {/* Header (Sticky) */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white/95 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <Building2 className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Register Property
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowPgReg(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
            <form onSubmit={onSubmitHandler} className="space-y-5">
              {/* Property & Contact */}
              <div>
                <label className={labelClass}>
                  Property Name <span className="text-rose-400">*</span>
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="e.g. Sunshine Residency"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Contact Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="tel"
                    placeholder="+91 98765..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    City <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="">Select City</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Full Address <span className="text-rose-400">*</span>
                </label>
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  rows="2"
                  placeholder="Street address, landmark..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Location Controls */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Pin Location <span className="text-rose-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={fetchingLocation}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {fetchingLocation ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Navigation className="w-3.5 h-3.5" />
                    )}
                    {fetchingLocation ? "Locating..." : "Auto-Detect"}
                  </button>
                </div>

                {/* Coordinates */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700">
                      <Crosshair className="w-4 h-4" />
                    </div>
                    <div className="flex gap-4 text-xs font-medium text-slate-500">
                      <span>
                        <span className="text-slate-400 uppercase tracking-wider text-[10px] mr-1">
                          Lat
                        </span>
                        {location.lat.toFixed(5)}
                      </span>
                      <span>
                        <span className="text-slate-400 uppercase tracking-wider text-[10px] mr-1">
                          Lng
                        </span>
                        {location.lng.toFixed(5)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-green-50 px-2 py-0.5 rounded-md text-green-700 border border-green-200 font-bold uppercase tracking-wider">
                    Live
                  </span>
                </div>

                {/* Map */}
                <div className="relative overflow-hidden rounded-xl shadow-sm bg-slate-50 border border-slate-200">
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
                      <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Tip */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800 font-medium leading-relaxed">
                  Drag the red pin on the map to point exactly at your building
                  entrance for better accuracy.
                </p>
              </div>

              {/* Submit Action */}
              <div className="pt-4 sticky bottom-0 bg-white/95 backdrop-blur-sm pb-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-700 text-white font-semibold text-sm py-4 rounded-xl active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating Profile...
                    </>
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
