import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Search, Wifi, Coffee, Sparkles } from "lucide-react";
import HowItWorks from "../components/howItWorks";
import WallOfLove from "../components/WallOfLove";
import Footer from "../components/Footer";
import FeaturedPGs from "../components/FeaturedPGs";
import ServicesSection from "../components/ServicesSection";
import FAQSection from "../components/FAQSection";
import { useAppContext } from "../context/AppContext";

const cities = [
  { name: "Delhi", emoji: "🏛️" },
  { name: "Bangalore", emoji: "🌿" },
  { name: "Mumbai", emoji: "🌊" },
  { name: "Chandigarh", emoji: "🌸" },
];

const trustPills = ["No brokerage", "Verified listings", "Move in this week"];

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { pgs, currency } = useAppContext();

  const heroPgs = pgs && pgs.length >= 2 ? pgs.slice(0, 2) : null;
  const totalRooms = pgs ? pgs.reduce((acc, room) => acc + (room.totalBeds || 1), 0) : 0;
  
  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/listings?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 sm:pt-10 lg:pt-14 lg:pb-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center pt-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
              PG Search
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-4 sm:mb-6">
              Your next home{" "}
              <em className="not-italic text-slate-400">shouldn't feel</em> like
              a compromise.
            </h1>

            <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-6 max-w-md">
              Curated PGs, honest photos, and zero broker drama. Because finding
              a place to live should feel exciting — not exhausting.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {trustPills.map((pill) => (
                <span
                  key={pill}
                  className="text-xs sm:text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                >
                  ✓ {pill}
                </span>
              ))}
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-1.5 flex items-center gap-2 shadow-sm mb-4">
              <MdLocationOn className="w-5 h-5 text-amber-500 ml-2 sm:ml-3 shrink-0" />
              <input
                type="text"
                placeholder="City, locality, or landmark…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm sm:text-base py-2 sm:py-2.5 min-w-0"
              />
              <button
                onClick={handleSearch}
                className="bg-slate-900 hover:bg-slate-700 active:scale-95 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xs:inline sm:inline">Search</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <button
                  key={city.name}
                  onClick={() =>
                    navigate(
                      `/listings?search=${encodeURIComponent(city.name)}`,
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-400 rounded-lg transition-all cursor-pointer"
                >
                  <span>{city.emoji}</span>
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:border-slate-300 hover:-translate-y-1 transition-all duration-300" onClick={() => heroPgs ? navigate(`/pg/${heroPgs[0]._id}`) : null}>
                <img
                  src={heroPgs ? (heroPgs[0].images?.[0] || heroPgs[0].pg?.images?.[0] || "/placeholder.svg") : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80"}
                  alt="Cozy room"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {heroPgs ? `${heroPgs[0].pg?.name || "PG"}, ${heroPgs[0].pg?.city || "City"}` : "Koramangala, Bangalore"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {heroPgs ? `${currency}${heroPgs[0].pricePerBed} / month` : "₹8,500 / month"}
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                      {heroPgs && heroPgs[0].availableBeds > 0 ? "Available now" : (!heroPgs ? "Available now" : "Full")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-2xl font-bold text-slate-900">{totalRooms > 0 ? `${totalRooms}+` : '4,200+'}</p>
                <p className="text-sm text-slate-500 mt-1">
                  verified rooms across India
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <div className="bg-slate-900 rounded-2xl p-4 text-white">
                <p className="text-sm font-medium mb-3">Included Amenities</p>
                
                <div className="flex items-center gap-3 py-2 border-b border-slate-700">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center">
                    <Wifi className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-xs text-slate-300">High-speed WiFi</span>
                </div>
                
                <div className="flex items-center gap-3 py-2 border-b border-slate-700">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center">
                    <Coffee className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-xs text-slate-300">Homely Meals</span>
                </div>
                
                <div className="flex items-center gap-3 py-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-xs text-slate-300">Daily Housekeeping</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:border-slate-300 hover:-translate-y-1 transition-all duration-300" onClick={() => heroPgs ? navigate(`/pg/${heroPgs[1]._id}`) : null}>
                <img
                  src={heroPgs ? (heroPgs[1].images?.[0] || heroPgs[1].pg?.images?.[0] || "/placeholder.svg") : "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80"}
                  alt="Modern room"
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {heroPgs ? `${heroPgs[1].pg?.name || "PG"}, ${heroPgs[1].pg?.city || "City"}` : "Hauz Khas, Delhi"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {heroPgs ? `${currency}${heroPgs[1].pricePerBed} / month` : "₹12,000 / month"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto pt-22 px-4 sm:px-6 lg:px-8">
        <FeaturedPGs />
      </div>

      <div className="bg-white pt-6 sm:pt-10">
        <HowItWorks />
        <ServicesSection />
        <WallOfLove />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
