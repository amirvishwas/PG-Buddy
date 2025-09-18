import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Student",
      feedback:
        "PG Buddy made it super easy to find a PG near my college. The pictures and details were very accurate!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Verma",
      role: "Working Professional",
      feedback:
        "I was new to the city and PG Buddy helped me find a safe and budget-friendly hostel in just a few minutes.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Amit Kumar",
      role: "Tenant",
      feedback:
        "The booking process was smooth and transparent. Highly recommend this platform to anyone searching for PGs.",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      name: "Sneha Joshi",
      role: "Student",
      feedback:
        "Finding a PG has never been easier. The app is user-friendly and reliable.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Rohan Mehta",
      role: "Job Seeker",
      feedback:
        "I found a PG near my office in no time. The filters are really helpful!",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      name: "Anjali Singh",
      role: "Tenant",
      feedback:
        "Transparent and quick booking. I loved the reviews section, it really helped!",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
    },
    {
      name: "Vikram Das",
      role: "Professional",
      feedback:
        "A very convenient platform for people new to a city. Safe and budget-friendly options!",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
    },
  ];

  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          What Our Users Say
        </h2>

        <div className="flex space-x-8 animate-marquee">
          {marqueeReviews.map((review, index) => (
            <div
              key={index}
              className="w-[500px] bg-gray-50 p-6 rounded-2xl shadow-md min-w-[250px] flex-shrink-0 hover:shadow-lg transition"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                {review.name}
              </h3>
              <p className="text-md text-indigo-500 mb-3">{review.role}</p>
              <p className="text-gray-600 text-sm">{review.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
