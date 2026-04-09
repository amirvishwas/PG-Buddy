import React from "react";
import {
  CheckCircle,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Search,
  Home,
  Users,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const features = [
  {
    icon: CheckCircle,
    title: "Verified listings",
    description: "Real photos and essential details you can trust",
    bg: "bg-amber-100 text-amber-700",
  },
  {
    icon: ShieldCheck,
    title: "Transparent platform",
    description: "No hidden fees or surprise charges",
    bg: "bg-slate-100 text-slate-700",
  },
  {
    icon: MapPin,
    title: "Location based",
    description: "Find PGs near your college or workplace",
    bg: "bg-green-100 text-green-700",
  },
  {
    icon: PhoneCall,
    title: "Direct contact",
    description: "Connect with owners — no middleman",
    bg: "bg-blue-100 text-blue-700",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore verified PGs with images, amenities, pricing, and owner info.",
  },
  {
    number: "02",
    title: "Compare",
    description:
      "Filter by price, location, and sharing type to find your perfect room.",
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
    title: "Trusted platform",
    description: "We ensure listings are real, updated, and easy to understand.",
    bg: "bg-amber-100 text-amber-700",
  },
  {
    icon: MapPin,
    title: "Location advantage",
    description: "PGs near colleges, metro stations, and office hotspots.",
    bg: "bg-slate-100 text-slate-700",
  },
  {
    icon: Users,
    title: "Easy to use",
    description: "Clean UI, fast booking, and simple owner management tools.",
    bg: "bg-green-100 text-green-700",
  },
];

export default function About() {
  return (
    <div className="bg-[#fafaf8] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-14 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
              About us
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
              We built this so{" "}
              <span className="text-slate-400">finding a PG stops being painful.</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md">
              PG Buddy is a smart platform designed to simplify how students and
              working professionals find and manage PG accommodations — with
              clear pricing, verified details, and real photos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${f.bg}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">{f.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 text-white">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Building2 size={16} className="text-slate-900" />
                </div>
                <span className="text-sm font-semibold text-slate-300">Our mission</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 leading-snug">
                Making PG search{" "}
                <span className="text-amber-400">stress-free.</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Finding the right PG shouldn't be stressful. PG Buddy was
                created to make the entire process — from discovering rooms to
                booking — more organised and trustworthy. Whether you're moving
                to a new city or switching accommodations, PG Buddy gives you
                all the details you need in one place.
              </p>
              <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-4">
                {[
                  { v: "4,200+", l: "Rooms" },
                  { v: "12+", l: "Cities" },
                  { v: "98%", l: "Satisfaction" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-xl font-bold text-white">{s.v}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
                How it works
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-8">
                Three steps,{" "}
                <span className="text-slate-400">then you're home.</span>
              </h2>
              <div className="flex flex-col gap-5">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-slate-500">{step.number}</span>
                    </div>
                    <div className="pt-1.5">
                      <p className="text-sm font-semibold text-slate-900 mb-1">{step.title}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
              Why us
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight max-w-sm">
                Built for people,{" "}
                <span className="text-slate-400">not platforms.</span>
              </h2>
              <p className="text-slate-500 text-sm max-w-xs sm:text-right leading-relaxed">
                Every decision we make starts with what's best for the person looking for a room.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {whyChoose.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 hover:border-slate-300 hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${item.bg}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-4">
                Get started
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Ready to find your perfect PG?
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
                Search verified rooms or list your own accommodation today. No brokerage, no stress.
              </p>
              <div className="mt-5 flex items-center gap-2 text-slate-400 text-sm">
                <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                Have questions?{" "}
                <a
                  href="mailto:calvintakasi@outlook.com"
                  className="text-amber-400 font-medium hover:underline"
                >
                  Email us
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                to="/listings"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
              >
                <Search className="w-4 h-4" />
                Browse PGs
              </Link>
              <Link
                to="/owner"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl text-sm font-semibold border border-slate-700 transition-all active:scale-95"
              >
                <Home className="w-4 h-4" />
                List your room
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}