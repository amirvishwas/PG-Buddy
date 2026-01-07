import React from "react";
import { Search, Home, UserPlus, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search for PGs",
      description:
        "Enter your location and browse through a variety of PGs and hostels that fit your budget and preferences.",
      gradient: "from-blue-500 to-cyan-400",
      bgGradient: "from-blue-50 to-cyan-50",
      shadowColor: "shadow-blue-200/50",
    },
    {
      icon: Home,
      title: "View Details",
      description:
        "Check images, facilities, pricing, and detailed descriptions to find the perfect stay for you.",
      gradient: "from-violet-500 to-purple-400",
      bgGradient: "from-violet-50 to-purple-50",
      shadowColor: "shadow-violet-200/50",
    },
    {
      icon: UserPlus,
      title: "Connect & Book",
      description:
        "Contact the PG owner directly and book your room easily without any hassle.",
      gradient: "from-emerald-500 to-teal-400",
      bgGradient: "from-emerald-50 to-teal-50",
      shadowColor: "shadow-emerald-200/50",
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-700">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Find your perfect PG in just three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200" />

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="group relative">
                <div
                  className={`
                  relative bg-white rounded-3xl p-8 sm:p-10
                  border border-gray-100
                  shadow-xl ${step.shadowColor}
                  hover:shadow-2xl hover:-translate-y-2
                  transition-all duration-500 ease-out
                  overflow-hidden
                `}
                >
                  {/* Background gradient on hover */}
                  <div
                    className={`
                    absolute inset-0 bg-gradient-to-br ${step.bgGradient}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  `}
                  />

                  {/* Step number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-white/20 transition-colors duration-500">
                    0{index + 1}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`
                      w-16 h-16 sm:w-20 sm:h-20 rounded-2xl
                      bg-gradient-to-br ${step.gradient}
                      flex items-center justify-center mb-6
                      shadow-lg group-hover:scale-110 group-hover:rotate-3
                      transition-all duration-500
                    `}
                    >
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center`}
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
