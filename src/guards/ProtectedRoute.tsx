import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@hooks";
import { Loading } from "@components/user";
import { FC, ReactNode } from "react";
import { ROUTES } from "@routes";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
}

/*
  - Currently we are not using this protected route as we have interceptor for error handling for API calls
  - We call Admin-Profile from Admin Layout amd if that fails user navigates back to login page
**/
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  console.log("ProtectedRoute");

  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.admin.loginPage}
        state={{ from: location }}
        replace
      />
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      {children}
      {/* <SessionTimeout /> */}
    </>
  );
};
