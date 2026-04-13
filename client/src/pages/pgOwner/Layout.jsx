import React, { useEffect } from "react";
import Sidebar from "../../components/pgOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (isOwner === false) {
      navigate("/");
    }
  }, [isOwner, navigate]);

  if (isOwner === null) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8]">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 pt-16 md:pt-0 w-full overflow-x-hidden min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
