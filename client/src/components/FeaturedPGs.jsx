import React from "react";
import propertiesData from "../data/properties";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {featured.map((pg, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={pg.image}
              alt={pg.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">{pg.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{pg.location}</p>

              {pg.amenities && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {pg.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-4 font-bold text-blue-600">₹{pg.price}/month</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPGs;
