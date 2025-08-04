import React from "react";
import Navbar from "../components/Navbar";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center p-6 md:p-12  min-h-screen">
        <div className="md:w-1/2 flex flex-col items-start">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Find Your Perfect
            <br />
            PG or Hostel
          </h1>
          <p className="mb-6 text-lg text-gray-700">
            PGBuddy helps you find nearby PGs/Hostel and compatible roommates.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold">
            Search PGs
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="src/assets/hotel.png"
            alt="Hostel"
            className="w-80 h-80 object-cover rounded-md shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
