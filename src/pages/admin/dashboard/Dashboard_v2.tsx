import { useSelector } from "react-redux";
import OrderAnalyticsDashboard from "./OrderAnalyticsDashboard";
import { selectAdminState } from "@features/slices";
import { ADMIN_ROLE_ENUM } from "@utils/constants";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@routes";

export const Dashboard_v2 = () => {
  const { admin, isAuthenticated } = useSelector(selectAdminState);
  // console.log("admin from dash", admin, isAuthenticated);

  if (!isAuthenticated) return <Loader />;

  if (admin?.role === ADMIN_ROLE_ENUM.MARKETING) {
    console.log("Marketing login");
    return <Navigate to={ROUTES.admin.marketing.seo} replace />;
  }

  return (
    <div>
      {import.meta.env.VITE_BUILD === "development" ? (
        <OrderAnalyticsDashboard />
      ) : (
        <h1>Statistics data under development!!</h1>
      )}
    </div>
  );
};
