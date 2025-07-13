import { useDispatch } from "react-redux";
import { ADMIN_ROLES, TPermissionAction } from "@types";
import { useEffect } from "react";
import { useValidateTokenQuery } from "@features/api";
import { setCredentials } from "@features/adminSlices/adminAuthSlice";

export const useAuth = () => {
  console.log("useAuth hook called");
  const dispatch = useDispatch();

  const {
    data: adminData,
    isSuccess: tokenValidated,
    isLoading,
  } = useValidateTokenQuery();

  // const { admin, isAuthenticated, loading, sessionExpiry } = useSelector(
  //   (state: RootState) => state.adminPanel
  // );

  const hasRole = (role: string) => {
    return adminData?.admin.role === role;
  };

  const hasPermission = (permission: TPermissionAction) => {
    if (!adminData) return false;
    return adminData?.admin?.permissions?.some(
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
    if (!adminData?.sessionExpiry) return false;
    return Date.now() > adminData?.sessionExpiry;
  };

  useEffect(() => {
    if (tokenValidated && adminData) {
      dispatch(setCredentials({ admin: adminData }));
    }
  }, [dispatch, adminData]);

  return {
    adminData,
    isAuthenticated: tokenValidated,
    loading: isLoading,
    sessionExpiry: adminData?.sessionExpiry,
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
