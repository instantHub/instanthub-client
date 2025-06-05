import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, FloatingButtons, Footer } from "@components/user";
import useGoogleAnalytics from "@hooks/useGoogleAnalytics";

export const Layout = () => {
  useGoogleAnalytics();
  return (
    <>
      <div className="flex flex-col min-h-screen font-serif">
        <Navbar />
        <FloatingButtons />

        <div className="">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};
