import { useSelector } from "react-redux";
import { ADMIN_ROLES, TPermissionAction } from "@utils/types";
import { RootState } from "@features/store";

export const useAuth = () => {
  console.log("useAuth hook called");

  const { admin, isAuthenticated, loading, sessionExpiry } = useSelector(
    (state: RootState) => state.adminPanel
  );

  const hasRole = (role: string) => {
    return admin?.role === role;
  };

  const hasPermission = (permission: TPermissionAction) => {
    if (!admin) return false;
    return admin?.permissions?.some(
      (p) => p.actions.includes(permission) || p.actions.includes("*")
    );
  };

  const hasAnyPermission = (permissions: TPermissionAction[]) => {
    return permissions.some((permission) => hasPermission(permission));
  };

  const isAdmin = () => hasRole(ADMIN_ROLES.ADMIN);
  const isExecutive = () => hasRole(ADMIN_ROLES.EXECUTIVE);
  const isMarketing = () => hasRole(ADMIN_ROLES.MARKETING);
  const isPartner = () => hasRole(ADMIN_ROLES.PARTNER);

  const isSessionExpired = () => {
    if (!sessionExpiry) return false;
    return Date.now() > sessionExpiry;
  };

  return {
    adminData: admin,
    isAuthenticated: isAuthenticated,
    loading: loading,
    sessionExpiry: sessionExpiry,
    hasRole,
    hasPermission,
    hasAnyPermission,
    isAdmin,
    isExecutive,
    isMarketing,
    isPartner,
    isSessionExpired,
  };
};

// export const useAuth = () => {
//   console.log("useAuth hook called");

//   return {
//     adminData: [],
//     isAuthenticated: "tokenValidated",
//     loading: false,
//     // sessionExpiry: adminData?.sessionExpiry,
//     sessionExpiry: "",
//     hasRole: [],
//     hasPermission: [],
//     hasAnyPermission: [],
//     isAdmin: () => true,
//     isExecutive: false,
//     isMarketing: false,
//     isPartner: false,
//     isSessionExpired: false,
//   };
// };
