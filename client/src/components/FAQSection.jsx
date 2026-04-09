import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

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

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const left = faqs.slice(0, 3);
  const right = faqs.slice(3);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
            FAQ
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight max-w-sm">
              Questions we <span className="text-slate-400">get a lot.</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xs sm:text-right leading-relaxed">
              Can't find what you're looking for?{" "}
              <a
                href="mailto:calvintakasi@outlook.com"
                className="text-amber-600 font-medium hover:underline"
              >
                Email us directly.
              </a>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
          {[left, right].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-3">
              {col.map((faq, ri) => {
                const i = ci * 3 + ri;
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-slate-300 bg-white"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                    >
                      <span
                        className={`text-sm sm:text-base font-medium leading-snug transition-colors ${
                          isOpen ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isOpen
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-5 sm:px-6 pb-5">
                        <div className="h-px bg-slate-100 mb-4" />
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 bg-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-base sm:text-lg mb-1">
              Still have questions?
            </p>
            <p className="text-slate-400 text-sm">
              Our team usually replies within a few hours.
            </p>
          </div>
          <a
            href="mailto:calvintakasi@outlook.com"
            className="shrink-0 bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95"
          >
            Contact support →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
