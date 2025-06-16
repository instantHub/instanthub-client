import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, SideBar } from "@components/admin";

// Create the context
export const SideBarContext = createContext();

export const AdminLayout = () => {
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
