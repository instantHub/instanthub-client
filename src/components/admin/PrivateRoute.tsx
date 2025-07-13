import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "@routes";
import { useAdminProfileQuery } from "@features/api";
import { RootState } from "@features/store";

export const PrivateRoute = () => {
  const { admin, isAuthenticated } = useSelector(
    (state: RootState) => state.adminPanel
  );
  console.log("PrivateRoute", admin, isAuthenticated);
  // const { data, isError, isSuccess, error } = useAdminProfileQuery();
  // console.log("data PrivateRoute", data, isError, isSuccess, error);
  // return data ? <Outlet /> : <Navigate to={"/admin/login"} replace />;
  // return data ? <Outlet /> : <Navigate to={ROUTES.admin.login} replace />;
  return admin ? <Outlet /> : <Navigate to={ROUTES.admin.login} replace />;
};
