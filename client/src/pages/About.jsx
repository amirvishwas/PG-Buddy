import React from "react";
import {
  CheckCircle,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Sparkles,
  Search,
  Home,
  Users,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function About() {
  const features = [
    {
      icon: CheckCircle,
      title: "Verified Listings",
      description: "Real photos & essential details you can trust",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Platform",
      description: "No hidden fees or surprise charges",
    },
    {
      icon: MapPin,
      title: "Location Based",
      description: "Find PGs near your college or workplace",
    },
    {
      icon: PhoneCall,
      title: "Direct Contact",
      description: "Connect with owners — no middleman",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Discover",
      description:
        "Explore verified PGs with images, amenities, pricing and owner info.",
    },
    {
      number: "02",
      title: "Compare",
      description:
        "Filter by price, location and sharing type to find your perfect room.",
    },
    {
      number: "03",
      title: "Book",
      description:
        "Contact the owner directly or proceed with booking through your dashboard.",
    },
  ];

  const whyChoose = [
    {
      icon: ShieldCheck,
      title: "Trusted Platform",
      description:
        "We ensure listings are real, updated and easy to understand.",
    },
    {
      icon: MapPin,
      title: "Location Advantage",
      description: "PGs near colleges, metro stations and office hotspots.",
    },
    {
      icon: Users,
      title: "Easy to Use",
      description: "Clean UI, fast booking, and simple owner management tools.",
    },
  ];

  return (
    <div className="font-[Poppins]">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[90%] rounded-b-[40px] sm:rounded-b-[80px] lg:rounded-b-[120px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(219, 234, 254, 0.6) 0%, rgba(204, 251, 241, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
          }}
        />

        <div className="absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-40 h-40 sm:w-72 sm:h-72 bg-teal-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                About Us
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                PG Buddy
              </span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              PG Buddy is a smart platform designed to simplify how students and
              working professionals find and manage PG accommodations. Our goal
              is to offer clear pricing, verified details, real photos, and a
              seamless booking experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 mb-6">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Our Mission</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Making PG search stress-free
              </h2>

              <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                Finding the right PG shouldn't be stressful. PG Buddy was
                created to make the entire process — from discovering rooms to
                booking — more organized and trustworthy. Whether you're moving
                to a new city or switching accommodations, PG Buddy gives you
                all the details you need in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-4">
              <Search className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Simple Process
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              How PG Buddy Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-lg h-full">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 mb-4">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">Why Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose PG Buddy?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {whyChoose.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(219, 234, 254, 0.8) 0%, rgba(204, 251, 241, 0.8) 100%)",
              }}
            />

            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-300/30 rounded-full blur-3xl" />

            <div className="relative z-10 p-8 sm:p-12 md:p-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to find your perfect PG?
              </h2>
              <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-xl mx-auto">
                Search verified rooms or list your own accommodation today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/listings"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transform transition-all duration-200 shadow-lg shadow-blue-600/30"
                >
                  <Search className="w-5 h-5" />
                  Browse PGs
                </Link>
                <Link
                  to="/owner"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-xl font-medium border border-gray-200 hover:scale-105 transform transition-all duration-200 shadow-lg"
                >
                  <Home className="w-5 h-5" />
                  List Your Room
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-gray-600">
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span className="text-sm">
                  Have questions?{" "}
                  <a
                    href="mailto:calvintakasi@outlook.com"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Contact Us
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
