import React from "react";
import Navbar from "../components/Navbar";
import Buildings from "../components/buildings";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-64px)]  flex flex-col items-center px-4">
        <div className="flex flex-col items-center max-w-7xl justify-center text-center flex-grow">
          <h1 className="text-3xl md:text-7xl font-bold mb-2 text-gray-900">
            Find your perfect <br /> PG or Hostel
          </h1>
          <p className="mb-4 text-md md:text-lg text-gray-700 max-w-xl">
            PGBuddy helps you find nearby PGs/Hostel and compatible roommates.
          </p>
          <div className="max-w-7xl md:w-3xl mx-auto mb-6">
            <div className="flex items-center border rounded-2xl px-4 py-2 bg-white">
              <input
                type="text"
                placeholder="Select city"
                className="flex-1 outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl  w-22">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* 🏙 Building at bottom */}
        <div className="w-full max-w-5xl mb-2"></div>
      </div>
    </>
  );
};

export default Home;
