import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("useGoogleAnalytics Page path updated to:", location.pathname);

    if (window.gtag) {
      window.gtag("config", "G-N0VEN50GJD", {
        page_path: location.pathname,
      });
    }
  }, [location]);
};
