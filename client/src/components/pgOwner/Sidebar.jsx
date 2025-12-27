import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdMenu, MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { BiListUl } from "react-icons/bi";

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
        className="md:hidden fixed top-10 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label="Toggle menu"
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 min-h-screen bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block
        `}
      >
        <div className="py-6 px-4">
          <div className="md:hidden mb-4 pl-10">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          </div>
          <nav className="mt-4">
            <ul className="space-y-1">
              {items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <li key={item.name} className="relative">
                    <span
                      className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-10 w-1 rounded-tr-md rounded-br-md transition-all ${
                        active ? "bg-blue-600" : "opacity-0"
                      }`}
                      aria-hidden
                    />
                    <Link
                      to={item.path}
                      onClick={closeSidebar}
                      className={`group flex items-center gap-3 pl-4 pr-3 py-3 rounded-r-md transition-colors duration-150
                        ${
                          active
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                    >
                      <item.Icon
                        className={`text-lg ${
                          active
                            ? "text-blue-600"
                            : "text-gray-500 group-hover:text-blue-600"
                        }`}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
