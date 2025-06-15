import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "@routes";

export const PrivateRoute = () => {
  const { adminInfo } = useSelector((state) => state.auth);
  return adminInfo ? <Outlet /> : <Navigate to={ROUTES.admin.login} replace />;
};
