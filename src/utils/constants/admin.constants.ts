import { TAdminRole } from "@utils/types";

export enum ADMIN_ROLE_ENUM {
  ADMIN = "admin",
  EXECUTIVE = "executive",
  MARKETING = "marketing",
  PARTNER = "partner",
  SUB_ADMIN = "sub_admin",
}

export enum DASHBOARDS_ROUTES_ENUM {
  admin = "/admin/dashboard",
  sub_admin = "/admin/dashboard",
  executive = "/executive/dashboard",
  partner = "/partner/dashboard",
  marketing = "/admin/dashboard",
}
