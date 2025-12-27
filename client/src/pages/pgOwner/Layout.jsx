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

  if (isOwner === null) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-3 pt-16 md:pt-6 md:p-4 lg:px-10 w-full overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
