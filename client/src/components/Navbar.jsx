import React, { useState } from "react";
import { Menu, X, Home, Search, Building, Compass, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { BsBookmarkCheckFill } from "react-icons/bs";

const BookIcon = () => <BsBookmarkCheckFill />;

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
    { name: "PG Owners", path: "/owner", icon: Building },
    { name: "About", path: "/about", icon: Info },
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
