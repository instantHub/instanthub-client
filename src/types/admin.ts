export type TAdminRole = "admin" | "executive" | "marketing" | "partner";
export type TPermissionAction = "read" | "create" | "update" | "delete" | "*";

export interface IPermissions {
  actions: TPermissionAction[];
  resource: string; // e.g., "user", "post", etc.
}

export const ADMIN_ROLES: Record<string, TAdminRole> = {
  ADMIN: "admin",
  EXECUTIVE: "executive",
  MARKETING: "marketing",
  PARTNER: "partner",
} as const;

export const ADMIN_PERMISSIONS = {
  // User Management
  GENERAL_READ: "general:read",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",

  ORDERS_READ: "order:read",
  ORDERS_CREATE: "order:read",
  ORDERS_UPDATE: "order:read",
  ORDERS_DELETE: "order:read",

  // Analytics
  ANALYTICS_READ: "analytics:read",

  // Marketing
  CAMPAIGNS_READ: "campaigns:read",
  CAMPAIGNS_CREATE: "campaigns:create",
  CAMPAIGNS_UPDATE: "campaigns:update",
  CAMPAIGNS_DELETE: "campaigns:delete",

  // Partner Management
  PARTNERS_READ: "partners:read",
  PARTNERS_CREATE: "partners:create",
  PARTNERS_UPDATE: "partners:update",

  // System Settings
  SETTINGS_READ: "settings:read",
  SETTINGS_UPDATE: "settings:update",
} as const;

export const ROLE_PERMISSIONS = {
  [ADMIN_ROLES.ADMIN]: Object.values(ADMIN_PERMISSIONS),
  [ADMIN_ROLES.EXECUTIVE]: [
    ADMIN_PERMISSIONS.GENERAL_READ,
    ADMIN_PERMISSIONS.ANALYTICS_READ,
    ADMIN_PERMISSIONS.CAMPAIGNS_READ,
    ADMIN_PERMISSIONS.PARTNERS_READ,
    ADMIN_PERMISSIONS.ORDERS_READ,
    ADMIN_PERMISSIONS.ORDERS_UPDATE,
  ],
  [ADMIN_ROLES.MARKETING]: [
    ADMIN_PERMISSIONS.CAMPAIGNS_READ,
    ADMIN_PERMISSIONS.CAMPAIGNS_CREATE,
    ADMIN_PERMISSIONS.CAMPAIGNS_UPDATE,
    ADMIN_PERMISSIONS.ANALYTICS_READ,
  ],
  [ADMIN_ROLES.PARTNER]: [
    ADMIN_PERMISSIONS.PARTNERS_READ,
    ADMIN_PERMISSIONS.ANALYTICS_READ,
  ],
} as const;

export const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
