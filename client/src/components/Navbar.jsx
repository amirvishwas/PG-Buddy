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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
            : "bg-[#fafaf8]/80 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2.5 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white group-hover:bg-slate-700 transition-colors duration-200">
                  <Building2 size={18} className="md:w-5 md:h-5" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  PG
                  <span className="text-amber-500">Buddy</span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`
                      relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                      ${
                        isActive
                          ? "text-slate-900 bg-slate-100"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      }
                    `}
                  >
                    <IconComponent size={15} />
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {user && (
                <button
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
                    ${
                      isOwner
                        ? "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                        : "border-slate-200 text-slate-700 hover:border-slate-400 bg-white"
                    }
                  `}
                  onClick={() =>
                    isOwner ? navigate("/owner") : setShowPgReg(true)
                  }
                >
                  {isOwner ? (
                    <LayoutDashboard size={15} />
                  ) : (
                    <PlusCircle size={15} />
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
                          "w-9 h-9 border-2 border-white shadow-sm ring-2 ring-slate-100 hover:ring-amber-100 transition-all",
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
                  className="bg-slate-900 hover:bg-slate-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95"
                >
                  Sign In
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              {user && (
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 border border-slate-200",
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

              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isOpen ? "max-h-[450px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-6 pt-2 space-y-1 bg-white border-t border-slate-100 shadow-lg">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <IconComponent
                    size={18}
                    className={isActive ? "text-amber-500" : "text-slate-400"}
                  />
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 space-y-2">
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
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }
                  `}
                >
                  {isOwner ? (
                    <LayoutDashboard size={17} />
                  ) : (
                    <PlusCircle size={17} />
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
                  className="w-full bg-slate-900 hover:bg-slate-700 text-white px-4 py-3 rounded-xl text-sm font-bold active:scale-95 transition-all"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16 md:h-18" />
    </>
  );
};

export default Navbar;
