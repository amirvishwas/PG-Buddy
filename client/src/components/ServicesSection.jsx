import React from "react";
import { MapPin, Calendar, Gift, Sparkles, Star } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: MapPin,
      title: "Discover Local Stays",
      description:
        "Explore verified paying guest accommodations in your preferred area. Browse through 100+ locations across multiple cities.",
      gradient: "from-rose-500 to-orange-400",
      bgColor: "bg-rose-50",
      iconBg: "bg-rose-100",
      accentColor: "text-rose-500",
      stat: "100+",
      statLabel: "Locations",
    },
    {
      icon: Calendar,
      title: "Instant Booking",
      description:
        "Reserve your ideal PG instantly via our platform or mobile app. Check real-time availability and secure exclusive online offers.",
      gradient: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      accentColor: "text-blue-500",
      stat: "24/7",
      statLabel: "Available",
    },
    {
      icon: Gift,
      title: "Premium Value Plans",
      description:
        "Access exclusive partnerships with top-rated PGs nationwide. We guarantee our guests receive unbeatable value and premium amenities.",
      gradient: "from-emerald-500 to-cyan-500",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      accentColor: "text-emerald-500",
      stat: "50%",
      statLabel: "Savings",
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Floating decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-rose-200 to-orange-200 rounded-full blur-2xl opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-200 to-cyan-200 rounded-full blur-2xl opacity-60" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium text-cyan-700">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            What We{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Offer
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 4 150 4 198 10"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mt-6">
            Experience exceptional accommodation services tailored for modern
            living
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="group relative">
                {/* Main card */}
                <div
                  className={`
                  relative bg-white rounded-3xl p-8 sm:p-10
                  border border-gray-100
                  shadow-lg hover:shadow-2xl
                  transition-all duration-500 ease-out
                  hover:-translate-y-3
                  overflow-hidden
                `}
                >
                  {/* Decorative corner gradient */}
                  <div
                    className={`
                    absolute -top-20 -right-20 w-40 h-40 rounded-full
                    bg-gradient-to-br ${service.gradient} opacity-10
                    group-hover:opacity-20 group-hover:scale-150
                    transition-all duration-700
                  `}
                  />

                  {/* Stat badge */}
                  <div className="absolute top-6 right-6">
                    <div
                      className={`
                      px-3 py-1.5 rounded-full ${service.bgColor}
                      text-xs font-bold ${service.accentColor}
                    `}
                    >
                      {service.stat} {service.statLabel}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`
                      w-16 h-16 sm:w-18 sm:h-18 rounded-2xl
                      ${service.iconBg}
                      flex items-center justify-center mb-6
                      group-hover:scale-110 
                      transition-transform duration-500
                      relative
                    `}
                    >
                      <div
                        className={`
                        absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient}
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      `}
                      />
                      <IconComponent
                        className={`
                        w-8 h-8 sm:w-9 sm:h-9 ${service.accentColor}
                        group-hover:text-white relative z-10
                        transition-colors duration-500
                      `}
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Rating stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${service.accentColor} fill-current`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">
                        Rated 5.0
                      </span>
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div
                    className={`
                    absolute bottom-0 left-0 right-0 h-1
                    bg-gradient-to-r ${service.gradient}
                    transform scale-x-0 group-hover:scale-x-100
                    transition-transform duration-500 origin-left
                  `}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
