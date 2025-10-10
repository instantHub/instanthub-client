import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@features/store";
import { useLogoutMutation, usePartnerProfileQuery } from "@features/api";
import { AstroIcon, MenuIcon, ProfileIcon } from "@icons";
import { logout } from "@features/slices/auth/auth.slice";
import { ROUTES } from "@routes";
import { PartnerSideBar } from "./PartnerSideBar";
import { setPartner } from "@features/slices/partner";

export const PartnerLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { admin } = useSelector((state: RootState) => state.adminPanel);
  const { data: profile } = usePartnerProfileQuery();

  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    console.log("handleLogout called..!");

    try {
      await logoutMutation().unwrap();
      window.location.href = ROUTES.admin.loginPage;
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(logout());
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/partner/dashboard", icon: AstroIcon },
    // { name: "Clients", href: "/partner/clients", icon: Users },
    // { name: "Analytics", href: "/partner/analytics", icon: BarChart3 },
    { name: "Settings", href: "/partner/settings", icon: ProfileIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    console.log("partner profile", profile);
    if (profile) {
      dispatch(setPartner({ partner: profile }));
    }
  }, [profile, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-400 hover:text-gray-600 lg:hidden"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-gray-900">
                {navigation.find((item) => isActive(item.href))?.name ||
                  "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                {/* <Bell className="h-5 w-5" /> */}
                Bell Icon
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {admin?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {admin?.role}
                  </p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">
                    {admin?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
