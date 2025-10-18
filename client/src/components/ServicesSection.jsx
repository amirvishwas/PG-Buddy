import React from "react";
import { MapPin, Calendar, Gift } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <MapPin className="w-16 h-16 text-cyan-500" strokeWidth={1.5} />,
      title: "Discover Local Stays",
      description:
        "Explore verified paying guest accommodations in your preferred area. Browse through 100+ locations across multiple cities.",
    },
    {
      icon: <Calendar className="w-16 h-16 text-cyan-500" strokeWidth={1.5} />,
      title: "Instant Booking",
      description:
        "Reserve your ideal PG instantly via our platform or mobile app. Check real-time availability and secure exclusive online offers.",
    },
    {
      icon: <Gift className="w-16 h-16 text-cyan-500" strokeWidth={1.5} />,
      title: "Premium Value Plans",
      description:
        "Access exclusive partnerships with top-rated PGs nationwide. We guarantee our guests receive unbeatable value and premium amenities.",
    },
  ];

  return (
    <div className="min-h-screen  flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">
            What We Offer
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience exceptional accommodation services tailored for modern
            living. We connect you with premium paying guest facilities that
            offer comfort, convenience, and affordability in one package.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
            >
              <div className="flex justify-center mb-6 transform hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-slate-600 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
