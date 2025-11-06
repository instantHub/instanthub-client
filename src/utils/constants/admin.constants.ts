import { TAdminRole } from "@utils/types";

export enum ADMIN_ROLE_ENUM {
  ADMIN = "admin",
  EXECUTIVE = "executive",
  MARKETING = "marketing",
  SUB_ADMIN = "sub_admin",
}

export enum DASHBOARDS_ROUTES_ENUM {
  admin = "/admin/dashboard",
  sub_admin = "/admin/dashboard",
  executive = "/executive/dashboard",
  marketing = "/admin/dashboard",
}
