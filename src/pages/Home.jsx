import React from "react";
import Navbar from "../components/Navbar";
import Buildings from "../components/buildings";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-7xl font-bold mb-2 text-gray-900">
          Find Your Perfect <br /> PG or Hostel
        </h1>
        <p className="mb-4 text-md md:text-lg text-gray-700 max-w-xl">
          PGBuddy helps you find nearby PGs/Hostel and compatible roommates.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold mb-4">
          Search PGs
        </button>

        <div className="w-full max-w-5xl bg-amber-300 h-[calc(600px-64px)]">
          <Buildings />
        </div>
      </div>
    </>
  );
};

export default Home;
