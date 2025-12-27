import React from "react";
import { MapPin, Calendar, Gift } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: (
        <MapPin
          className="w-12 h-12 md:w-16 md:h-16 text-cyan-500"
          strokeWidth={1.5}
        />
      ),
      title: "Discover Local Stays",
      description:
        "Explore verified paying guest accommodations in your preferred area. Browse through 100+ locations across multiple cities.",
    },
    {
      icon: (
        <Calendar
          className="w-12 h-12 md:w-16 md:h-16 text-cyan-500"
          strokeWidth={1.5}
        />
      ),
      title: "Instant Booking",
      description:
        "Reserve your ideal PG instantly via our platform or mobile app. Check real-time availability and secure exclusive online offers.",
    },
    {
      icon: (
        <Gift
          className="w-12 h-12 md:w-16 md:h-16 text-cyan-500"
          strokeWidth={1.5}
        />
      ),
      title: "Premium Value Plans",
      description:
        "Access exclusive partnerships with top-rated PGs nationwide. We guarantee our guests receive unbeatable value and premium amenities.",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            What We Offer
          </h2>
          <div className="w-20 md:w-24 h-1 bg-cyan-500 mx-auto mb-5"></div>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience exceptional accommodation services tailored for modern
            living. We connect you with premium paying guest facilities that
            offer comfort, convenience, and affordability in one package.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                bg-white rounded-xl md:rounded-2xl
                p-5 sm:p-6 md:p-8
                shadow-md hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1 md:hover:-translate-y-2
                border border-slate-100
              "
            >
              <div className="flex justify-center mb-4 md:mb-6 transition-transform duration-300 hover:scale-110">
                {service.icon}
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 text-center">
                {service.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
