import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Home,
  Search,
  Info,
  PlusCircle,
  LayoutDashboard,
  Building2,
  Heart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => <BsBookmarkCheckFill />;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);

  const { openSignIn } = useClerk();
  const { user, navigate, isOwner, setShowPgReg } = useAppContext();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navRef]);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Browse PG", path: "/browsepg", icon: Search },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 font-[Poppins] ${
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm"
            : "bg-white/50 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-200 transition-all duration-300 transform group-hover:rotate-3">
                  <Building2 size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                  PG
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                    Buddy
                  </span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }
                  `}
                  >
                    <IconComponent
                      size={16}
                      className={isActive ? "fill-current opacity-20" : ""}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* CTA Section - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {user && (
                <Link
                  to="/saved-pgs"
                  className="p-2.5 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all relative group"
                  title="Saved PGs"
                >
                  <Heart size={20} className="group-hover:fill-current" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Link>
              )}

              {user && (
                <button
                  className={`
                    group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300
                    ${
                      isOwner
                        ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-md"
                        : "border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600 bg-white"
                    }
                `}
                  onClick={() =>
                    isOwner ? navigate("/owner") : setShowPgReg(true)
                  }
                >
                  {isOwner ? (
                    <LayoutDashboard size={16} />
                  ) : (
                    <PlusCircle size={16} />
                  )}
                  {isOwner ? "Dashboard" : "List Your PG"}
                </button>
              )}

              {user ? (
                <div className="flex items-center pl-1">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-10 h-10 border-2 border-white shadow-sm ring-2 ring-gray-100 hover:ring-blue-100 transition-all",
                      },
                    }}
                  >
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="My Bookings"
                        labelIcon={<BookIcon />}
                        onClick={() => navigate("/my-bookings")}
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              ) : (
                <button
                  onClick={openSignIn}
                  className="bg-gray-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-gray-200 hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Sign In
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              {user && (
                <Link
                  to="/saved"
                  className="p-2 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors relative"
                >
                  <Heart size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Link>
              )}

              {user && (
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 border border-gray-200",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="My Bookings"
                      labelIcon={<BookIcon />}
                      onClick={() => navigate("/my-bookings")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              )}

              {/* Hamburger Menu */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isOpen ? "max-h-[450px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-6 pt-2 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                `}
                >
                  <IconComponent
                    size={20}
                    className={isActive ? "text-blue-600" : "text-gray-400"}
                  />
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-gray-100 space-y-3">
              {user && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    isOwner ? navigate("/owner") : setShowPgReg(true);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                    ${
                      isOwner
                        ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }
                `}
                >
                  {isOwner ? (
                    <LayoutDashboard size={18} />
                  ) : (
                    <PlusCircle size={18} />
                  )}
                  {isOwner ? "Owner Dashboard" : "List Your Property"}
                </button>
              )}

              {!user && (
                <button
                  onClick={() => {
                    openSignIn();
                    setIsOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;
