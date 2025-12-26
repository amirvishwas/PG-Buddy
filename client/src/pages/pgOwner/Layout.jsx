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
    <div className="flex flex-col h-screen">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
