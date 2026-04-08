import React from "react";
import { MapPin, Calendar, Gift } from "lucide-react";

const services = [
  {
    icon: MapPin,
    title: "Discover local stays",
    description:
      "Explore verified PGs in your preferred area. Browse through 100+ locations across multiple cities — all curated by hand.",
    stat: "100+",
    statLabel: "locations",
    iconBg: "bg-amber-100 text-amber-700",
    statBg: "bg-amber-50 border-amber-100 text-amber-700",
  },
  {
    icon: Calendar,
    title: "Instant booking",
    description:
      "Reserve your ideal PG directly through the platform. Check real-time availability and lock in your room before someone else does.",
    stat: "24/7",
    statLabel: "available",
    iconBg: "bg-slate-100 text-slate-700",
    statBg: "bg-slate-50 border-slate-200 text-slate-600",
  },
  {
    icon: Gift,
    title: "Premium value plans",
    description:
      "Access exclusive partnerships with top-rated PGs nationwide. We make sure you get the best amenities without overpaying.",
    stat: "50%",
    statLabel: "avg. savings",
    iconBg: "bg-green-100 text-green-700",
    statBg: "bg-green-50 border-green-100 text-green-700",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-14">
        <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
          What we offer
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight max-w-sm">
            Built around{" "}
            <span className="text-slate-400">how you actually live.</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xs sm:text-right leading-relaxed">
            Every feature exists to take something stressful off your plate.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-7 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${service.iconBg}`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${service.statBg}`}
                >
                  {service.stat} {service.statLabel}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-slate-400 ml-1">Rated 5.0</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        {[
          { value: "4,200+", label: "Verified rooms" },
          { value: "12+", label: "Cities covered" },
          { value: "98%", label: "Happy tenants" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900 rounded-2xl px-6 py-5 flex items-center justify-between"
          >
            <span className="text-2xl font-bold text-white">{stat.value}</span>
            <span className="text-sm text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
