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
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-white text-slate-700 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
        aria-label="Toggle menu"
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-72 min-h-screen bg-white border-r border-slate-200 shadow-2xl md:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block
        `}
      >
        <div className="flex flex-col h-full">
          <div className="h-24 flex items-center px-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-sm">
                <Building2 size={22} />
              </div>
              <div>
                <p className="text-[10px] text-amber-600 font-bold tracking-widest uppercase mb-0.5">
                  Property
                </p>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                  OwnerPanel
                </h1>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-5">
            <div className="mb-4 px-3">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Main Menu
              </h2>
            </div>
            <nav>
              <ul className="space-y-1.5">
                {items.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        onClick={closeSidebar}
                        className={`
                          relative group flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200
                          ${
                            active
                              ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                          }
                        `}
                      >
                        <item.Icon
                          className={`text-xl transition-colors ${
                            active
                              ? "text-white"
                              : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        />
                        <span
                          className={`font-medium text-sm ${active ? "font-semibold" : ""}`}
                        >
                          {item.name}
                        </span>

                        {active && (
                          <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-amber-500" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="p-5 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-900">
                  System Online
                </span>
              </div>
              <p className="text-xs text-slate-500">
                All services running smoothly.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
