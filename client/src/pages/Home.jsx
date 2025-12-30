import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import HowItWorks from "../components/howItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import FeaturedPGs from "../components/FeaturedPGs";
import ServicesSection from "../components/ServicesSection";

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
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center px-3 sm:px-4 font-[Poppins] py-8 sm:py-0">
        <div className="flex flex-col items-center max-w-7xl justify-center text-center flex-grow w-full">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-3 sm:mb-4 text-gray-900 leading-tight uppercase tracking-wide px-2">
            FIND YOUR NEXT HOME <br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              AWAY FROM HOME
            </span>
          </h1>

          <p className="mb-4 sm:mb-6 text-sm sm:text-lg md:text-xl text-gray-700 max-w-2xl px-2">
            PGBuddy helps you find{" "}
            <span className="font-semibold text-blue-600">PGs, Hostels </span>
            and even{" "}
            <span className="font-semibold text-teal-600">roommates</span> who
            match your vibe. ✨
          </p>

          {/* Search Box */}
          <div className="max-w-xl w-full mx-auto mb-6 sm:mb-8 px-2">
            <div className="flex items-center border-2 border-gray-300 focus-within:border-blue-500 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 bg-white shadow-md transition">
              <MdLocationOn className="text-blue-600 text-xl sm:text-2xl mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by city or PG name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 outline-none text-gray-800 placeholder-gray-500 text-sm sm:text-base min-w-0"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:cursor-pointer text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:scale-105 transform transition text-sm sm:text-base flex-shrink-0"
              >
                Search
              </button>
            </div>

            {/* Suggested Cities */}
            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 justify-center flex-wrap">
              {[
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
              ].map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    setSearch(city.name);
                    navigate(
                      `/listings?search=${encodeURIComponent(city.name)}`
                    );
                  }}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm bg-white shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-200"
                >
                  <img
                    src={city.img}
                    alt={city.name}
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                  />
                  <span className="font-medium text-gray-800">{city.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-8 px-3 sm:px-4">
        <FeaturedPGs />
      </div>

      <HowItWorks />
      <ServicesSection />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
