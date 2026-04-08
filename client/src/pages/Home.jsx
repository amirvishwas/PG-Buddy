import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import HowItWorks from "../components/howItWorks";
import WallOfLove from "../components/WallOfLove";
import Footer from "../components/Footer";
import FeaturedPGs from "../components/FeaturedPGs";
import ServicesSection from "../components/ServicesSection";
import FAQSection from "../components/FAQSection";

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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-5">
              PG Search
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Your next home{" "}
              <em className="not-italic text-slate-400">shouldn't feel</em> like
              a compromise.
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
              Curated PGs, honest photos, and zero broker drama. Because finding
              a place to live should feel exciting — not exhausting.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {trustPills.map((pill) => (
                <span
                  key={pill}
                  className="text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                >
                  ✓ {pill}
                </span>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex items-center gap-2 shadow-sm mb-6">
              <MdLocationOn className="w-5 h-5 text-amber-500 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="City, locality, or landmark…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-base py-2.5"
              />
              <button
                onClick={handleSearch}
                className="bg-slate-900 hover:bg-slate-700 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
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
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-400 rounded-lg transition-all cursor-pointer"
                >
                  <span>{city.emoji}</span>
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80"
                  alt="Cozy room"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-800">
                    Koramangala, Bangalore
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ₹8,500 / month
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                      Available now
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-2xl font-bold text-slate-900">4,200+</p>
                <p className="text-sm text-slate-500 mt-1">
                  verified rooms across India
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <div className="bg-slate-900 rounded-2xl p-4 text-white">
                <p className="text-sm font-medium mb-3">Recently moved in</p>
                {["Priya, Delhi", "Arjun, Mumbai", "Sneha, Bangalore"].map(
                  (name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 py-2 border-b border-slate-700 last:border-0"
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                        {name[0]}
                      </div>
                      <span className="text-xs text-slate-300">{name}</span>
                    </div>
                  ),
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80"
                  alt="Modern room"
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Hauz Khas, Delhi
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ₹12,000 / month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <FeaturedPGs />
      </div>

      <div className="bg-white pt-10">
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
