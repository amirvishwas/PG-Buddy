import React from "react";
import TestimonialCard from "./Testimonials";

export default function WallOfLove() {
  const testimonials = [
    {
      text: "We love Landingfolio! Our designers were using it for their projects, so clients already knew what it was and how to use it.",
      name: "Bessie Cooper",
      role: "Co-Founder, CEO",
      company: "Alterbone",
      avatar:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=100&h=100&fit=crop",
    },
    {
      text: "I didn’t know designing in Figma could be this individualized. I’d never considered it before, but Landingfolio changed my mind.",
      name: "Albert Flores",
      role: "Senior Product Manager",
      company: "Ridoria",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    },
    {
      text: "We love Landingfolio! Our designers were using it for their projects, so clients already knew what it was and how to use it.",
      name: "Jenny Wilson",
      role: "Head of Marketing",
      company: "Incanto",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Wall of Love
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} index={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
