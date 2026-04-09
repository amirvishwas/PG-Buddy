import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content:
      "PG Buddy made my relocation to Bangalore so much easier! Found a verified PG near my office within a day. The transparent pricing and real photos saved me from so many scams.",
    rating: 5,
  },
  {
    name: "Rahul Kumar",
    role: "MBA Student",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "As a student, budget was my main concern. PG Buddy's filters helped me find affordable options near my college. The booking process was seamless and the owner was exactly as described!",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "Marketing Executive",
    location: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "I was skeptical about online PG booking, but PG Buddy changed my mind. Verified listings, direct owner contact, and honest reviews made me feel confident in my choice.",
    rating: 5,
  },
  {
    name: "Vikash Patel",
    role: "Freelance Designer",
    location: "Chandigarh",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content:
      "The best part about PG Buddy is the transparency. No hidden charges, actual photos, and you can talk to the owner before committing. Highly recommended for anyone moving to a new city!",
    rating: 5,
  },
];

const WallOfLove = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  const next = () => setActiveIndex((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 sm:py-28 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
            Wall of love
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight max-w-sm">
              People who found{" "}
              <span className="text-slate-400">their home here.</span>
            </h2>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-slate-400 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-slate-400 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start mb-10 sm:mb-14">
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-7 sm:p-10">
            <div className="flex gap-0.5 mb-6">
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
              ))}
            </div>

            <p className="text-slate-700 text-lg sm:text-xl leading-relaxed mb-8 font-normal">
              "{active.content}"
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
              <img
                src={active.image}
                alt={active.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {active.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {active.role} · {active.location}
                </p>
              </div>
              <div className="ml-auto">
                <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-700">
                  Verified tenant
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  i === activeIndex
                    ? "bg-slate-900 border-slate-900"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className={`w-9 h-9 rounded-full object-cover shrink-0 ${
                      i === activeIndex
                        ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900"
                        : ""
                    }`}
                  />
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${i === activeIndex ? "text-white" : "text-slate-800"}`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`text-xs truncate ${i === activeIndex ? "text-slate-400" : "text-slate-400"}`}
                    >
                      {t.role} · {t.location}
                    </p>
                  </div>
                  <div className="ml-auto shrink-0 flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3 h-3 fill-current ${i === activeIndex ? "text-amber-400" : "text-amber-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WallOfLove;
