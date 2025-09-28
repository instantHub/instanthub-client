import { FC, useEffect, useState } from "react";
import { Navbar, Sidebar } from "@components/admin";
import { SidebarContext } from "@hooks";
import { SidebarContextType } from "@utils/types";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@features/store";
import { setCredentials } from "@features/slices/auth/auth.slice";
import { useAdminProfileQuery } from "@features/api";

export const AdminLayout: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const contextValue: SidebarContextType = {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
  };

  const dispatch = useDispatch();

  // const token = localStorage.getItem("token");
  const admin = useSelector((state: RootState) => state.adminPanel.admin);

  // Call /me only if we have a token
  // const { data, isSuccess } = useAdminProfileQuery(undefined, { skip: !token });
  const { data, isSuccess } = useAdminProfileQuery();

  // Hydrate Redux when /me succeeds
  useEffect(() => {
    if (isSuccess && data) {
      console.log("isSuccess && data");

      dispatch(setCredentials({ admin: data }));

      if (data.role === "partner") {
        window.location.href = "/partner/dashboard";
      }
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    console.log("Admin data from store ALayout-useEffect:", admin);
  });

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content - always takes full width */}
        <div className="w-screen">
          <Navbar />
          <main className="p-2 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
