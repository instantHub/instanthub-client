import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@components/admin/Navbar";
import SideBar from "@components/admin/SideBar";

// Create the context
export const SideBarContext = createContext();

const AdminLayout = () => {
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

export default AdminLayout;

// className={`${
//   isSidebarOpen ? `max-sm:ml-[6%] ml-[12%]` : `max-sm:ml-[13%] ml-[5%]`
// }  `}
// className={`${
//   isSidebarOpen ? `max-sm:ml-[6%] ml-[12%]` : `max-sm:ml-[13%] ml-[5%]`
// }  `}
