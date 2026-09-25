import React from "react";
import { Search, Home, UserPlus } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search your city",
    description:
      "Type a city, locality, or landmark. We'll show you verified rooms that actually match what you're looking for.",
    accent: "bg-amber-50 border-amber-100 text-amber-700",
    iconBg: "bg-amber-100 text-amber-700",
  },
  {
    number: "02",
    icon: Home,
    title: "Browse honestly",
    description:
      "Real photos, real prices, real facilities. No inflated listings, no bait-and-switch. What you see is what you get.",
    accent: "bg-slate-100 border-slate-200 text-slate-700",
    iconBg: "bg-slate-200 text-slate-700",
  },
  {
    number: "03",
    icon: UserPlus,
    title: "Connect & move in",
    description:
      "Reach the owner directly. No middlemen taking cuts, no awkward broker calls. Just you and your next home.",
    accent: "bg-green-50 border-green-100 text-green-700",
    iconBg: "bg-green-100 text-green-700",
  },
];

const HowItWorks = () => {
  const { pgs } = useAppContext();
  const navigate = useNavigate();
  
  // Calculate total occupied beds from real database
  const occupiedBeds = pgs ? pgs.reduce((acc, room) => acc + Math.max(0, (room.totalBeds || 0) - (room.availableBeds || 0)), 0) : 0;
  const displayPeople = occupiedBeds > 0 ? `${occupiedBeds}` : "1,200+";

  return (
    <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-14">
        <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
          The process
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight max-w-sm">
            Three steps,{" "}
            <span className="text-slate-400">then you're home.</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xs sm:text-right leading-relaxed">
            We cut out everything that made finding a PG feel like a part-time
            job.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-7 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="absolute top-5 right-6 text-5xl font-extrabold text-slate-200 group-hover:text-slate-300 transition-colors select-none">
                {step.number}
              </span>

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${step.iconBg}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 text-xs">→</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-slate-900 rounded-2xl">
        <div className="flex -space-x-2">
          {["P", "A", "S", "R"].map((initial, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs text-slate-300 font-medium"
            >
              {initial}
            </div>
          ))}
        </div>
        <p className="text-slate-300 text-sm flex-1">
          <span className="text-white font-semibold">{displayPeople} people</span> found
          their room recently — most within 3 days of searching.
        </p>
        <button 
          onClick={() => navigate('/listings')}
          className="text-amber-400 hover:text-amber-300 active:text-amber-500 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors"
        >
          You could be next →
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
