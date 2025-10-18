import React, { useState } from "react";
import { Menu, X, Home, Search, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { MdDashboard } from "react-icons/md";

const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
  >
    <path
      d="M52.5 7H19a3.995 3.995 0 0 0-2.828 1.172A3.995 3.995 0 0 0 15 11v42c0 1.061.421 2.078 1.172 2.828A3.995 3.995 0 0 0 19 57h7"
      style={{ fill: "none", stroke: "#222a33", strokeWidth: "2px" }}
    />
    <path
      d="M38 57h7a3.995 3.995 0 0 0 2.828-1.172A3.995 3.995 0 0 0 49 53V10.5a3.5 3.5 0 1 1 7 0V26a4 4 0 0 1-4 4h-2.9M24 22.5V33a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V22.5"
      style={{ fill: "none", stroke: "#222a33", strokeWidth: "2px" }}
    />
    <path
      d="M21 24.603 32 16l11 8.603M25.5 42h13M25.5 47h13M29 55l2.5 3 5.5-6"
      style={{ fill: "none", stroke: "#222a33", strokeWidth: "2px" }}
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Browse PG", path: "/browsepg", icon: Search },
    { name: "PG Owners", path: "/map", icon: Building },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              PG<span className="text-gray-800">Buddy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    <IconComponent size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="hidden md:flex items-center space-x-2">
                {user && (
                  <Link
                    to="/dashboard"
                    onClick={() => (navigate("/dashboard"), setIsOpen(false))}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    <MdDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            {user ? (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Bookings"
                    labelIcon={<BookIcon />}
                    onClick={() => navigate("/my-bookings")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <button
                onClick={openSignIn}
                className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:cursor-pointer"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}

          <div className="md:hidden flex center items-center">
            {user && (
              <div className="ml-2">
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="My Bookings"
                      labelIcon={<BookIcon />}
                      onClick={() => navigate("/my-bookings")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t border-gray-200">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                <IconComponent size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Dashboard Link */}
          {user && (
            <Link
              to="/dashboard"
              onClick={() => (navigate("/dashboard"), setIsOpen(false))}
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              <MdDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          )}

          {/* Mobile CTA Button */}
          <div className="pt-2">
            {!user && (
              <button
                onClick={openSignIn}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
