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

  // CATEGORY_READ: "category:read",
  // CATEGORY_CREATE: "category:update",
  // CATEGORY_UPDATE: "category:update",
  // CATEGORY_DELETE: "category:delete",

  // BRAND_READ: "brand:read",
  // BRAND_CREATE: "brand:update",
  // BRAND_UPDATE: "brand:update",
  // BRAND_DELETE: "brand:delete",

  // PRODUCT_READ: "product:read",
  // PRODUCT_CREATE: "product:update",
  // PRODUCT_UPDATE: "product:update",
  // PRODUCT_DELETE: "product:delete",

  ORDERS_READ: "order:read",
  ORDERS_UPDATE: "order:update",
  ORDERS_DELETE: "order:delete",

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

  // Admin Channel
  ADMIN_CHANNEL: "admin-channel",
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
  none: [],
} as const;

// export const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
