import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@components/user/Navbar";
import Footer from "@components/user/static/Footer";
import FloatingButtons from "@components/user/FloatingButtons";
import useGoogleAnalytics from "@hooks/useGoogleAnalytics";

const Layout = () => {
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

export default Layout;
