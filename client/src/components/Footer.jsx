import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 border-t border-gray-800 font-[Poppins] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                PG
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                  Buddy
                </span>
              </h2>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Find your perfect PG or Hostel easily with verified listings,
              hassle-free booking, and trusted reviews from genuine users.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Browse PGs", path: "/browsepg" },
                { name: "List Property", path: "/owner" },
                { name: "About Us", path: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-cyan-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:calvintakasi@outlook.com"
                className="flex items-start gap-3 text-sm text-gray-400 group hover:bg-gray-800/50 p-2 -ml-2 rounded-lg transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-medium">
                    Email
                  </span>
                  <span className="group-hover:text-white transition-colors">
                    calvintakasi@outlook.com
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3 text-sm text-gray-400 group p-2 -ml-2">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-all">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-medium">
                    Phone
                  </span>
                  <span className="group-hover:text-white transition-colors">
                    +91 98765 43210
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Follow Us</h3>
            <div className="flex gap-4">
              {[
                {
                  Icon: Facebook,
                  href: "#",
                  bg: "hover:bg-[#1877F2]",
                  text: "group-hover:text-white",
                },
                {
                  Icon: Instagram,
                  href: "#",
                  bg: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]",
                  text: "group-hover:text-white",
                },
                {
                  Icon: Twitter,
                  href: "#",
                  bg: "hover:bg-[#1DA1F2]",
                  text: "group-hover:text-white",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group ${social.bg}`}
                >
                  <social.Icon
                    size={20}
                    className={`transition-colors ${social.text}`}
                  />
                </a>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
              <p className="text-xs text-violet-200 font-medium flex items-center gap-2">
                <Heart size={12} className="text-violet-400 fill-current" />
                Made with love in India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} PG Buddy. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link
              to="/privacy"
              className="hover:text-white hover:underline decoration-blue-500 underline-offset-4 transition-all"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white hover:underline decoration-blue-500 underline-offset-4 transition-all"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
