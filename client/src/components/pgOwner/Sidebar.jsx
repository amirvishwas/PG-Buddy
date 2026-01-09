import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdMenu, MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { BiListUl } from "react-icons/bi";
import { Building2 } from "lucide-react";

const items = [
  { name: "Dashboard", path: "/owner", Icon: MdDashboard },
  { name: "Add Room", path: "/owner/addroom", Icon: AiOutlinePlus },
  { name: "List Room", path: "/owner/listroom", Icon: BiListUl },
];

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-white text-gray-700 rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 transition-all active:scale-95"
        aria-label="Toggle menu"
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-72 min-h-screen bg-white border-r border-gray-100 shadow-xl md:shadow-none
          transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-20 flex items-center px-8 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Building2 size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                  OwnerPanel
                </h1>
                <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
                  Management
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="mb-4 px-4">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Main Menu
              </h2>
            </div>
            <nav>
              <ul className="space-y-2">
                {items.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        onClick={closeSidebar}
                        className={`
                          relative group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200
                          ${
                            active
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                              : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                          }
                        `}
                      >
                        <item.Icon
                          className={`text-xl transition-colors ${
                            active
                              ? "text-white"
                              : "text-gray-400 group-hover:text-blue-600"
                          }`}
                        />
                        <span className="font-medium text-sm">{item.name}</span>

                        {active && (
                          <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
