// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { BiListUl } from "react-icons/bi";

const items = [
  { name: "Dashboard", path: "/owner", Icon: MdDashboard },
  { name: "Add Room", path: "/owner/addroom", Icon: AiOutlinePlus },
  { name: "List Room", path: "/owner/listroom", Icon: BiListUl },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 hidden md:block">
      <div className="py-6 px-4">
        <nav className="mt-4">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.name} className="relative">
                  {/* left blue indicator */}
                  <span
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-10 w-1 rounded-tr-md rounded-br-md transition-all ${
                      active ? "bg-blue-600" : "opacity-0"
                    }`}
                    aria-hidden
                  />
                  <Link
                    to={item.path}
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
  );
}
