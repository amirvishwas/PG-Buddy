import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const PGCard = ({ room }) => {
  const navigate = useNavigate();
  const { currency } = useAppContext();

  const handleClick = () => {
    navigate(`/pg/${room._id}`);
  };

  // Get PG data from populated room
  const pg = room.pg || {};
  const pgName = pg.name || "PG Name";
  const pgLocation = pg.city || pg.location || "Location";
  const pgAmenities = pg.amenities || [];
  const pgImage = room.images?.[0] || pg.images?.[0] || "/placeholder.svg";

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-card rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={pgImage}
          alt={pgName}
          className="h-48 sm:h-56 w-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Featured
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-semibold text-foreground truncate">
          {pgName}
        </h3>
        <p className="text-muted-foreground text-sm mt-1">{pgLocation}</p>

        {/* Room Type */}
        <p className="text-sm text-muted-foreground mt-1">
          {room.roomType} • {room.availableBeds}/{room.totalBeds} beds available
        </p>

        {/* Amenities */}
        {pgAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {pgAmenities.slice(0, 3).map((a, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
              >
                {a}
              </span>
            ))}
            {pgAmenities.length > 3 && (
              <span className="text-muted-foreground text-xs">
                +{pgAmenities.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-4">
          <p className="text-primary font-bold text-lg">
            {currency}
            {room.pricePerBed}/bed
          </p>
        </div>
      </div>
    </div>
  );
};

const FeaturedPGs = () => {
  const { pgs, loadingPgs, navigate } = useAppContext();
  const featured = pgs
    .filter((room) => room.isAvailable !== false && room.availableBeds > 0)
    .slice(0, 4);
  const handleViewAll = () => {
    navigate("/listings");
  };

  if (loadingPgs) {
    return (
      <section className="py-12 px-4 font-[Poppins]">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
            Featured PGs
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Loading...
          </p>
        </div>
      </section>
    );
  }

  if (!pgs || pgs.length === 0) return null;

  return (
    <section className="py-12 px-4 font-[Poppins]">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
          Best Seller
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Most popular and highly rated PGs & hostels this month
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((room) => (
          <PGCard key={room._id} room={room} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-10 flex justify-end">
        <button
          onClick={handleViewAll}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300"
        >
          View All PGs →
        </button>
      </div>
    </section>
  );
};

export default FeaturedPGs;
