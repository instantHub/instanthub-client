import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingButtons from "../../components/FloatingButtons";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <FloatingButtons />

        <div className="flex-grow">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
