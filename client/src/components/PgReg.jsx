import React, { useState } from "react";
import {
  X,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Star,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const PgReg = () => {
  const { setShowPgReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
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
        {/* Left Panel - Dark Navy Gradient */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-10 flex-col justify-between relative overflow-hidden text-white">
          {/* Background Pattern (Subtle Plus Grid) */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Decorative Blur Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          {/* Top Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-xs font-medium text-blue-50 tracking-wide">
                Partner with Us
              </span>
            </div>

            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Grow Your Business with{" "}
              <span className="text-blue-400">PGBuddy</span>
            </h2>
            <p className="text-blue-100/80 text-base leading-relaxed">
              Join thousands of verified owners and connect with quality tenants
              effortlessly.
            </p>
          </div>

          {/* Features List */}
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
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
                <Star className="w-5 h-5 text-blue-300" />
              </div>
              <span className="font-medium text-blue-50">
                Boost Your Visibility
              </span>
            </div>
          </div>

          {/* Bottom Social Proof */}
          <div className="relative z-10 pt-8 border-t border-white/10 mt-auto">
            <div className="flex -space-x-3 mb-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#1e1b4b] bg-gray-200 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 5}`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-[#1e1b4b] bg-white flex items-center justify-center text-xs font-bold text-indigo-900">
                +2k
              </div>
            </div>
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

          <div className="mb-8 mt-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Register Property
              </h3>
            </div>
            <p className="text-gray-500 text-sm ml-1">
              Enter your PG details to get started. It only takes a minute.
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5 flex-1">
            {/* Property Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5 ml-1">
                Property Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="e.g. Sunshine Residency"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-700"
              />
            </div>

            {/* Contact & City Grid */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5 ml-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5 ml-1">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="city"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-gray-700"
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5 ml-1">
                Full Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                rows="3"
                placeholder="Enter complete street address, landmark, and pincode"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none text-gray-700"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3.5 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
              <p className="text-xs text-center text-gray-400 mt-4">
                By registering, you agree to our Terms of Service & Privacy
                Policy.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PgReg;
