import { useAuth } from "@hooks";
import { TAdminRole, TPermissionAction } from "@utils/types";
import { AccessDenied } from "../components/admin/auth/AccessDenied";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: TAdminRole[];
  requiredPermissions?: TPermissionAction[];
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
  const { adminData, hasRole, hasPermission, hasAnyPermission } = useAuth();

  if (!adminData) {
    return fallback || <AccessDenied />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.some((role) => hasRole(role))) {
    return fallback || <AccessDenied />;
  }
  
  // Check permission-based access
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requireAll
      ? requiredPermissions.every((permission: TPermissionAction) =>
          hasPermission(permission)
        )
      : hasAnyPermission(requiredPermissions);
    if (!hasRequiredPermissions) {
      return fallback || <AccessDenied />;
    }
  }

  return <>{children}</>;
};
