import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, SideBar } from "@components/admin";
import { useAuth } from "@hooks";
import { useAdminProfileQuery } from "@features/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "@features/adminSlices/adminAuthSlice";

// Create the context
export const SideBarContext = createContext();

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const { admin, hasPermission } = useAuth();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (profile) {
  //     dispatch(setCredentials({ admin: profile }));
  //   }
  // }, [profile, dispatch]);

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
