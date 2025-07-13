import { useAuth } from "@hooks";
import { AlertCircle } from "@icons";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requiredPermissions?: string[];
  requireAll?: boolean; // Whether all permissions are required (AND) or any (OR)
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles = [],
  requiredPermissions = [],
  requireAll = false,
  fallback,
}) => {
  const { admin, hasRole, hasPermission, hasAnyPermission } = useAuth();

  if (!admin) {
    return fallback || <AccessDenied />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.some((role) => hasRole(role))) {
    return fallback || <AccessDenied />;
  }

  // Check permission-based access
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requireAll
      ? requiredPermissions.every((permission) => hasPermission(permission))
      : hasAnyPermission(requiredPermissions);

    if (!hasRequiredPermissions) {
      return fallback || <AccessDenied />;
    }
  }

  return <>{children}</>;
};

const AccessDenied: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
    <p className="text-gray-600 text-center max-w-md">
      You don't have the required permissions to access this content. Please
      contact your administrator if you believe this is an error.
    </p>
  </div>
);
