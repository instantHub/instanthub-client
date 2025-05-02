import "./App.css";
import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGoogleAnalytics from "@hooks/useGoogleAnalytics";
import { router } from "@routes";

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <AnalyticsWrapper />
      </RouterProvider>
      <ToastContainer />
    </>
  );
}

const AnalyticsWrapper = () => {
  console.log("AnalyticsWrapper rendered");
  useGoogleAnalytics();
  return null; // This component only exists to run the hook
};

export default App;
