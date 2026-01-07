import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from "lucide-react";

const WallOfLove = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
      gradient: "from-rose-500 to-pink-500",
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
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Ananya Reddy",
      role: "Marketing Executive",
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "I was skeptical about online PG booking, but PG Buddy changed my mind. The verified listings, direct owner contact, and honest reviews made me feel confident in my choice.",
      rating: 5,
      gradient: "from-violet-500 to-purple-500",
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
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Heart className="w-4 h-4 text-rose-400 fill-current animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              Wall of Love
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Join thousands of happy users who found their perfect PG through our
            platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <button
              onClick={prevTestimonial}
              className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
              <div
                className={`absolute top-6 right-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonials[activeIndex].gradient} opacity-20 flex items-center justify-center`}
              >
                <Quote className="w-8 h-8 text-white" />
              </div>

              <div
                className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br ${testimonials[activeIndex].gradient} opacity-20 blur-3xl`}
              />

              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 font-light italic">
                  "{testimonials[activeIndex].content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/20"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${testimonials[activeIndex].gradient} flex items-center justify-center`}
                    >
                      <Heart className="w-3 h-3 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[activeIndex].role} •{" "}
                      {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-gradient-to-r from-rose-400 to-purple-400"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mini testimonials */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                p-4 rounded-2xl text-left transition-all duration-300
                ${
                  index === activeIndex
                    ? "bg-white/10 border-white/30 scale-105"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:scale-102"
                }
                border backdrop-blur-sm
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-white text-sm font-medium">
                    {testimonial.name}
                  </h5>
                  <p className="text-gray-500 text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: "100+", label: "Happy Users" },
            { value: "50+", label: "Verified PGs" },
            { value: "10+", label: "Cities" },
            { value: "4.9", label: "Average Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WallOfLove;
