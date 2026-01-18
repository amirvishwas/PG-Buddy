import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Sparkles, Search } from "lucide-react";
import HowItWorks from "../components/howItWorks";
import WallOfLove from "../components/WallOfLove";
import Footer from "../components/Footer";
import FeaturedPGs from "../components/FeaturedPGs";
import ServicesSection from "../components/ServicesSection";
import FAQSection from "../components/FAQSection";

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

  const cities = [
    {
      name: "Delhi",
      img: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    },
    {
      name: "Bangalore",
      img: "https://cdn-icons-png.flaticon.com/512/3175/3175170.png",
    },
    {
      name: "Mumbai",
      img: "https://cdn-icons-png.flaticon.com/512/3175/3175180.png",
    },
    {
      name: "Chandigarh",
      img: "https://cdn-icons-png.flaticon.com/512/3175/3175164.png",
    },
  ];

  return (
    <>
      {/* Hero Section with Rounded Background */}
      <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Rounded Gradient Background */}
        <div
          className="absolute inset-x-0 top-0 h-[85%] sm:h-[80%] rounded-b-[40px] sm:rounded-b-[80px] lg:rounded-b-[120px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(219, 234, 254, 0.6) 0%, rgba(204, 251, 241, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
          }}
        />

        {/* Decorative blur circles */}
        <div className="absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-40 h-40 sm:w-72 sm:h-72 bg-teal-200/30 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-28 pb-16">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Welcome to PGBuddy
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-center font-[Poppins] mb-4 sm:mb-6">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Find Your Next Home
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent leading-tight">
              Away From Home
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 px-4 font-[Poppins]">
            PGBuddy helps you find{" "}
            <span className="font-semibold text-blue-600">PGs, Hostels</span>{" "}
            and even{" "}
            <span className="font-semibold text-teal-600">roommates</span> who
            match your vibe. ✨
          </p>

          {/* Search Box */}
          <div className="w-full max-w-xl mx-auto px-4 mb-6">
            <div className="flex items-center bg-white border-2 border-gray-200 focus-within:border-blue-500 rounded-2xl px-4 py-3 sm:py-4 shadow-lg shadow-gray-200/50 transition-all duration-300">
              <MdLocationOn className="text-blue-600 text-xl sm:text-2xl mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by city or PG name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base bg-transparent min-w-0 font-[Poppins]"
              />
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:scale-105 transform transition-all duration-200 text-sm sm:text-base font-medium flex-shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>

          {/* City Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
            {cities.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  setSearch(city.name);
                  navigate(`/listings?search=${encodeURIComponent(city.name)}`);
                }}
                className="flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-5 h-5 object-contain"
                />
                <span>{city.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured PGs Section */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
        <FeaturedPGs />
      </div>

      <HowItWorks />
      <ServicesSection />
      <WallOfLove />
      <FAQSection />

      <Footer />
    </>
  );
};

export default Home;
