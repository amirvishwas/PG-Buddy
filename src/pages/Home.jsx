import React, { useState } from "react";
import Listings from "./Listings";
import propertiesData from "../data/properties";
import { MdLocationOn } from "react-icons/md";

const Home = () => {
  const [search, setSearch] = useState("");

  // Filter properties based on search
  const filteredProperties = propertiesData.filter(
    (p) =>
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <div className="h-[calc(100vh-64px)] flex flex-col items-center px-4  font-[Poppins]">
        <div className="flex flex-col items-center max-w-7xl justify-center text-center flex-grow">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 text-gray-900 leading-tight uppercase font-[Poppins] tracking-wide">
            FIND YOUR NEXT HOME <br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              AWAY FROM HOME
            </span>
          </h1>

          <p className="mb-6 text-lg md:text-xl text-gray-700 max-w-2xl font-[Poppins]">
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
                className="flex-1 outline-none text-gray-800 placeholder-gray-500 font-[Poppins]"
              />
              <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-xl hover:scale-105 transform transition font-[Poppins]">
                Search
              </button>
            </div>

            {/* Suggested Cities */}
            <div className="flex gap-3 mt-4 justify-center flex-wrap">
              {["Delhi", "Bangalore", "Mumbai", "Chandigarh"].map((city) => (
                <button
                  key={city}
                  onClick={() => setSearch(city)}
                  className="px-4 py-2 rounded-full border text-sm bg-white shadow-sm hover:bg-blue-100 transition font-[Poppins]"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PG Cards & Filters */}
      <div className="mt-8 px-4">
        <Listings properties={filteredProperties} />
      </div>
    </>
  );
};

export default Home;
