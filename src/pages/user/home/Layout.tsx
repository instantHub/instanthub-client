import { Outlet } from "react-router-dom";
import { Navbar, FloatingButtons, Footer } from "@components/user";
import { useGoogleAnalytics } from "@hooks";
import { FlexBox } from "@components/general";

export const Layout = () => {
  useGoogleAnalytics();
  return (
    <FlexBox direction="col" className="min-h-screen w-full font-serif">
      <Navbar />

      <Outlet />

      <Footer />
      <FloatingButtons />
    </FlexBox>
  );
};
