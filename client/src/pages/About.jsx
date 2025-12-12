// src/pages/About.jsx
import React from "react";
import { CheckCircle, PhoneCall, MapPin, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="p-6 lg:p-12 font-[Poppins] text-gray-800">
      {/* Hero */}
      <section className="max-w-5xl mx-auto mb-12">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-3">
          About PG Buddy
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          PG Buddy is a smart platform designed to simplify how students and
          working professionals find and manage PG accommodations. Our goal is
          to offer clear pricing, verified details, real photos, and a seamless
          booking experience — so you can choose your next stay confidently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-blue-600" />
            <span className="text-gray-700">
              Verified Listings with real photos & essential details
            </span>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="text-green-600" />
            <span className="text-gray-700">
              Trustworthy & transparent platform — no hidden fees
            </span>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-purple-600" />
            <span className="text-gray-700">
              Find PGs based on your location, college or workplace
            </span>
          </div>

          <div className="flex items-start gap-3">
            <PhoneCall className="text-pink-600" />
            <span className="text-gray-700">
              Contact owners directly — no middleman involved
            </span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto mb-12 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          Finding the right PG shouldn’t be stressful. PG Buddy was created to
          make the entire process — from discovering rooms to booking — more
          organized and trustworthy. Whether you're moving to a new city or
          switching accommodations, PG Buddy gives you all the details you need
          in one place.
        </p>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4">How PG Buddy Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="font-semibold text-xl mb-1">1. Discover</h3>
            <p className="text-gray-600 text-sm">
              Explore verified PGs with images, amenities, pricing and owner
              info.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="font-semibold text-xl mb-1">2. Compare</h3>
            <p className="text-gray-600 text-sm">
              Filter by price, location and sharing type to find your perfect
              room.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="font-semibold text-xl mb-1">3. Contact / Book</h3>
            <p className="text-gray-600 text-sm">
              Contact the owner directly or proceed with booking through your
              dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose PG Buddy?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow flex gap-4">
            <ShieldCheck className="text-blue-600" />
            <div>
              <h4 className="font-medium">Trusted Platform</h4>
              <p className="text-sm text-gray-600">
                We ensure listings are real, updated and easy to understand.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow flex gap-4">
            <MapPin className="text-purple-600" />
            <div>
              <h4 className="font-medium">Location Advantage</h4>
              <p className="text-sm text-gray-600">
                PGs near colleges, metro stations and office hotspots.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow flex gap-4">
            <CheckCircle className="text-green-600" />
            <div>
              <h4 className="font-medium">Easy to Use</h4>
              <p className="text-sm text-gray-600">
                Clean UI, fast booking, and simple owner management tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto mb-20 text-center">
        <div className="bg-white p-6 rounded-xl shadow inline-block">
          <h3 className="text-xl font-semibold mb-2">
            Ready to find your perfect PG?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Search verified rooms or list your own accommodation today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/listings"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse PGs
            </a>

            <a
              href="/owner/addroom"
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              List Your Room
            </a>
          </div>

          <div className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-3">
            <PhoneCall />
            <span>
              Have questions?
              <a
                href="mailto:support@pgbuddy.example"
                className="text-blue-600"
              >
                {" "}
                Contact Us
              </a>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
