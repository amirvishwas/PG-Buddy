import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">PG Buddy</h2>
          <p className="text-sm">
            Find your perfect PG or Hostel easily with verified listings,
            hassle-free booking, and trusted reviews.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/browsepg" className="hover:text-white">
                Browse PGs
              </a>
            </li>
            <li>
              <a href="/signup" className="hover:text-white">
                Signup
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm">
            <Mail size={16} /> calvintakasi@outlook.com
          </p>
          <p className="flex items-center gap-2 text-sm mt-2">
            <Phone size={16} /> +91
          </p>
          <p className="text-sm mt-2">Ambala, India</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PG Buddy. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
