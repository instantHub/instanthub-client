import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex sm:block ">
      <div className="h-full">
        <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div
      // className={`${
      //   isSidebarOpen ? `max-sm:ml-[6%] ml-[12%]` : `max-sm:ml-[13%] ml-[5%]`
      // }  `}
      // className={`${
      //   isSidebarOpen ? `max-sm:ml-[6%] ml-[12%]` : `max-sm:ml-[13%] ml-[5%]`
      // }  `}
      >
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>

    // NEW
  );
};

export default Layout;
