import React from "react";
import { Search, Home, UserPlus } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-indigo-600" />,
      title: "Search for PGs",
      description:
        "Enter your location and browse through a variety of PGs and hostels that fit your budget and preferences.",
    },
    {
      icon: <Home className="w-12 h-12 text-indigo-600" />,
      title: "View Details",
      description:
        "Check images, facilities, pricing, and detailed descriptions to find the perfect stay for you.",
    },
    {
      icon: <UserPlus className="w-12 h-12 text-indigo-600" />,
      title: "Connect & Book",
      description:
        "Contact the PG owner directly and book your room easily without any hassle.",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
