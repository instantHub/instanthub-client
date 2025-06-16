import "./App.css";
import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleAnalytics } from "@hooks";
import { router } from "@routes";

function App() {
  return (
    <>
      {/* <AnalyticsWrapper /> */}
      <RouterProvider router={router}></RouterProvider>
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
