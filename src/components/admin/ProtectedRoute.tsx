import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, useAuthInitialize, useSessionTimeout } from "@hooks";
import { SessionTimeout } from "./SessionTimeout";
import { Loading } from "@components/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  console.log("ProtectedRoute");

  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Initialize session timeout management
  // useSessionTimeout();

  if (loading) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // if (!requireAuth && isAuthenticated) {
  // if (isAuthenticated) {
  //   return <Navigate to="/admin/dashboard" replace />;
  // }

  return (
    <>
      {children}
      <SessionTimeout />
    </>
  );
};
