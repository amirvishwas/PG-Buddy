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
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-700">
                {review.name}
              </h3>
              <p className="text-sm text-indigo-500 mb-3">{review.role}</p>
              <p className="text-gray-600 text-sm">{review.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
