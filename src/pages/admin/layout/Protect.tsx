import React from "react";
import { useAdminProfileQuery } from "@features/api";
import { ROUTES } from "@routes";
import { Navigate } from "react-router-dom";
import { ADMIN_ROLE_ENUM } from "@utils/constants";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
}) => {
  const { data: user, isLoading, isError, isSuccess } = useAdminProfileQuery();
  console.log("user - AdminProtectedRoute", user, isSuccess);

  const LayoutMap: Record<string, JSX.Element> = {
    [ADMIN_ROLE_ENUM.ADMIN]: <>{children}</>,
    [ADMIN_ROLE_ENUM.SUB_ADMIN]: <>{children}</>,
    [ADMIN_ROLE_ENUM.EXECUTIVE]: (
      <Navigate to={ROUTES.executive.root} replace />
    ),
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Checking authentication...
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to={ROUTES.admin.loginPage} replace />;
  }

  const layout = LayoutMap[user.role] ?? (
    <Navigate to={ROUTES.admin.accessDenied} replace />
  );

  // ✅ Authenticated and authorized
  return layout;
};

export default AdminProtectedRoute;
