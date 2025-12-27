import React from "react";

const TestimonialCard = ({ stars, text, name, handle, avatar, verified }) => (
  <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 transition">
    {/* Stars */}
    <div className="flex gap-1 mb-3 sm:mb-4">
      {[...Array(stars)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>

    {/* Text */}
    <p className="text-gray-900 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
      {text}
    </p>

    {/* User */}
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
      />

      <div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-gray-900 text-sm sm:text-base">
            {name}
          </span>

          {verified && (
            <svg
              className="w-4 h-4 text-blue-500 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.854 7.854l-5 5a.5.5 0 01-.708 0l-2.5-2.5a.5.5 0 01.708-.708L9.5 11.793l4.646-4.647a.5.5 0 01.708.708z" />
            </svg>
          )}
        </div>

        <a
          href={`https://twitter.com/${handle.replace("@", "")}`}
          className="text-gray-500 text-xs sm:text-sm hover:text-gray-700"
        >
          {handle}
        </a>
      </div>
    </div>
  </div>
);

export default function WallOfLove() {
  const testimonials = [
    {
      stars: 5,
      text: "We've been using Designify for our client projects, and it’s made the entire workflow so smooth. Absolute game changer!",
      name: "Aarav Mehta",
      handle: "@aaravmehta",
      avatar:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=100&h=100&fit=crop",
      verified: true,
    },
    {
      stars: 5,
      text: "From concept to delivery, Designify helps us create stunning designs in no time. It’s our go-to design tool now.",
      name: "Diya Sharma",
      handle: "@diyasharma",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop",
      verified: true,
    },
    {
      stars: 5,
      text: "Our design team loves using Designify. It’s boosted our productivity and helped us maintain top-notch quality.",
      name: "Kabir Nair",
      handle: "@kabirnair",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      verified: true,
    },
    {
      stars: 5,
      text: "Designify has made our creative process so much faster. The templates are exactly what we needed.",
      name: "Isha Patel",
      handle: "@isha_patel",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
      verified: true,
    },
    {
      stars: 5,
      text: "Designify is perfect for startups like ours. Professional quality without any hassle.",
      name: "Rohan Gupta",
      handle: "@rohangupta",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      verified: true,
    },
    {
      stars: 5,
      text: "We’ve saved hours of work since switching to Designify. Clean and intuitive interface.",
      name: "Ananya Iyer",
      handle: "@ananya_iyer",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      verified: true,
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Wall of love
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-600">
            Hear first-hand from our incredible community of customers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
