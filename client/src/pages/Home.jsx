import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import HowItWorks from "../components/howItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import FeaturedPGs from "../components/FeaturedPGs";

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
    <>
      {/* Hero Section */}
      <div className="h-[calc(100vh-64px)] flex flex-col items-center px-4 font-[Poppins]">
        <div className="flex flex-col items-center max-w-7xl justify-center text-center flex-grow">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 text-gray-900 leading-tight uppercase tracking-wide">
            FIND YOUR NEXT HOME <br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              AWAY FROM HOME
            </span>
          </h1>

          <p className="mb-6 text-lg md:text-xl text-gray-700 max-w-2xl">
            PGBuddy helps you find{" "}
            <span className="font-semibold text-blue-600">PGs, Hostels </span>
            and even{" "}
            <span className="font-semibold text-teal-600">roommates</span> who
            match your vibe. ✨
          </p>

          {/* Search Box */}
          <div className="max-w-xl w-full mx-auto mb-8">
            <div className="flex items-center border-2 border-gray-300 focus-within:border-blue-500 rounded-2xl px-4 py-3 bg-white shadow-md transition">
              <MdLocationOn className="text-blue-600 text-2xl mr-2" />
              <input
                type="text"
                placeholder="Search by city or PG name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 outline-none text-gray-800 placeholder-gray-500"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:scale-105 transform transition"
              >
                Search
              </button>
            </div>

            {/* Suggested Cities */}
            <div className="flex gap-3 mt-4 justify-center flex-wrap">
              {["Delhi", "Bangalore", "Mumbai", "Chandigarh"].map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSearch(city);
                    navigate(`/listings?search=${encodeURIComponent(city)}`);
                  }}
                  className="px-4 py-2 rounded-full border text-sm bg-white shadow-sm hover:bg-blue-100 transition"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <FeaturedPGs />
      </div>

      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
