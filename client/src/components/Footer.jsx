import React from "react";
import { Facebook, Instagram, Twitter, Mail, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Browse PGs", path: "/browsepg" },
  { name: "List property", path: "/owner" },
  { name: "About us", path: "/about" },
];

const socials = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 mb-5 group"
            >
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                <Building2 size={18} className="text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                PG<span className="text-amber-400">Buddy</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Find your perfect PG with verified listings, honest photos, and
              zero broker drama. Because your next home should feel like home.
            </p>
            <a
              href="mailto:calvintakasi@outlook.com"
              className="inline-flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Mail size={14} />
              </div>
              calvintakasi@outlook.com
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-5">
              Follow us
            </p>
            <div className="flex gap-2 mb-8">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
              <p className="text-xs text-amber-400 font-medium">
                🇮🇳 Made with love in India
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Helping people find homes since 2024
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} PG Buddy. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-xs text-slate-600 hover:text-slate-300 transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-slate-600 hover:text-slate-300 transition-colors"
            >
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
