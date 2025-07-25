import { FC, useState } from "react";
import { Navbar, Sidebar } from "@components/admin";
import { SidebarContext } from "@hooks";
import { SidebarContextType } from "@utils/types";
import { Outlet } from "react-router-dom";

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
