import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";

const Layout = () => {
  // const
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex sm:block ">
      <div className="h-full">
        <SideBar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className={` ml-[12%] `}>
        <Navbar isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </div>

    // NEW
  );
};

export default Layout;
