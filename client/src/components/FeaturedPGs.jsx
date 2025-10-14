import React from "react";
import { useNavigate } from "react-router-dom";
import propertiesData from "../data/properties";

const PGCard = ({ pg, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pg/${index}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={pg.image}
          alt={pg.name}
          className="h-48 sm:h-56 w-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Featured
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
          {pg.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1">{pg.location}</p>

        {/* Amenities */}
        {pg.amenities && (
          <div className="flex flex-wrap gap-2 mt-3">
            {pg.amenities.slice(0, 3).map((a, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
              >
                {a}
              </span>
            ))}
            {pg.amenities.length > 3 && (
              <span className="text-gray-400 text-xs">
                +{pg.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto pt-4">
          <p className="text-blue-600 font-bold text-lg">{pg.price}/month</p>
        </div>
      </div>
    </div>
  );
};

const FeaturedPGs = () => {
  const properties = Array.isArray(propertiesData) ? propertiesData : [];
  const featured = properties.slice(0, 4);

  return (
    <section className="py-12 px-4 font-[Poppins] ">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Best Seller
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Most popular and highly rated PGs & hostels this month
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((pg, index) => (
          <PGCard key={index} pg={pg} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPGs;
