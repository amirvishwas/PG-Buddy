import React from "react";

const tiltClasses = [
  "-rotate-2",
  "rotate-0",
  "rotate-2",
  "-rotate-1",
  "rotate-1",
  "-rotate-2",
];

const TestimonialCard = ({ index, text, name, role, company, avatar }) => {
  return (
    <div
      className={`
        bg-gray-50 rounded-2xl p-6 md:p-8
        transform ${tiltClasses[index % tiltClasses.length]}
        transition-all duration-300 ease-out
        hover:rotate-0 hover:-translate-y-2 hover:shadow-xl
      `}
    >
      {/* Text */}
      <p className="text-gray-900 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
        “{text}”
      </p>

      {/* Divider */}
      <div className="h-px bg-gray-200 mb-4" />

      {/* User */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>

        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {/* Company */}
      <div className="mt-4 text-sm font-medium text-gray-700">{company}</div>
    </div>
  );
};

export default TestimonialCard;
