import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";

// Create the context
export const SideBarContext = createContext();

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SideBarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <div className="flex sm:block ">
        <div className="h-full">
          <SideBar />
        </div>
        <div>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </SideBarContext.Provider>
  );
};

export default Layout;

// className={`${
//   isSidebarOpen ? `max-sm:ml-[6%] ml-[12%]` : `max-sm:ml-[13%] ml-[5%]`
// }  `}
// className={`${
//   isSidebarOpen ? `max-sm:ml-[6%] ml-[12%]` : `max-sm:ml-[13%] ml-[5%]`
// }  `}
