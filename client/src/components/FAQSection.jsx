import React, { useState } from "react";
import { HelpCircle, Plus, Minus } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I search for a PG on PGBuddy?",
      answer:
        "Simply enter your desired location or city in the search bar on our homepage. You can filter results by budget, amenities, room type, and more to find the perfect PG that matches your preferences.",
    },
    {
      question: "Is PGBuddy free to use?",
      answer:
        "Yes! PGBuddy is completely free for tenants. You can browse listings, view details, and contact PG owners without any charges. We believe in making your PG search hassle-free.",
    },
    {
      question: "How can I verify if a PG listing is genuine?",
      answer:
        "All listings on PGBuddy go through a verification process. Look for the 'Verified' badge on listings. We also encourage you to visit the PG in person before making any payments.",
    },
    {
      question: "Can I find roommates through PGBuddy?",
      answer:
        "Absolutely! PGBuddy has a dedicated roommate finder feature. You can create a profile, mention your preferences, and connect with like-minded people looking for shared accommodations.",
    },
    {
      question: "What cities does PGBuddy cover?",
      answer:
        "PGBuddy currently covers major cities including Delhi, Bangalore, Mumbai, Chandigarh, Pune, Hyderabad, and many more. We're constantly expanding to new locations.",
    },
    {
      question: "How do I list my PG on PGBuddy?",
      answer:
        "PG owners can easily list their property by creating an account and filling out the listing form. Add photos, amenities, pricing, and contact details to attract potential tenants.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200 to-green-200 rounded-full blur-3xl opacity-40" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-emerald-50 border border-cyan-100 mb-6">
            <HelpCircle className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium text-cyan-700">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Frequently Asked{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Questions
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 4 150 4 198 10"
                  stroke="url(#faq-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="faq-gradient"
                    x1="0"
                    y1="0"
                    x2="200"
                    y2="0"
                  >
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mt-6">
            Everything you need to know about finding your perfect PG
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-100 last:border-b-0 transition-all duration-300 ${
                openIndex === index
                  ? "bg-gradient-to-r from-cyan-50/80 to-emerald-50/80"
                  : ""
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-emerald-50/50 transition-all duration-300 group cursor-pointer"
              >
                <span className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors pr-4">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === index
                      ? "bg-gradient-to-r from-cyan-500 to-emerald-500 rotate-0"
                      : "bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-emerald-500"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <div className="relative pl-5 border-l-2 border-gradient-to-b from-cyan-400 to-emerald-400">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-full" />
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed bg-gradient-to-r from-cyan-50/50 to-emerald-50/50 p-4 rounded-xl border border-cyan-100/50">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
            <HelpCircle className="w-5 h-5" />
            <a href="mailto:calvintakasi@outlook.com">Contact Support</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
