import { ADMIN_ROLE_ENUM } from "@utils/constants";

export type TAdminRole =
  | "admin"
  | "executive"
  | "marketing"
  | "partner"
  | "sub_admin";
export type TPermissionAction = "read" | "create" | "update" | "delete" | "*";

export interface IPermissions {
  actions: TPermissionAction[];
  resource: string; // e.g., "user", "post", etc.
}

export const ADMIN_PERMISSIONS = {
  // User Management
  GENERAL_READ: "general:read",

  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",

  CATEGORY_READ: "category:read",
  CATEGORY_CREATE: "category:create",
  CATEGORY_UPDATE: "category:update",
  CATEGORY_DELETE: "category:delete",

  BRAND_READ: "brand:read",
  BRAND_CREATE: "brand:create",
  BRAND_UPDATE: "brand:update",
  BRAND_DELETE: "brand:delete",

  PRODUCT_READ: "product:read",
  PRODUCT_CREATE: "product:create",
  PRODUCT_UPDATE: "product:update",
  PRODUCT_DELETE: "product:delete",

  SERIES_READ: "series:read",
  SERIES_CREATE: "series:create",
  SERIES_UPDATE: "series:update",
  SERIES_DELETE: "series:delete",

  NUMBERS_READ: "numbers:read",
  NUMBERS_DELETE: "numbers:delete",

  ORDERS_READ: "order:read",
  ORDERS_UPDATE: "order:update",
  ORDERS_DELETE: "order:delete",

  QUESTIONS_READ: "questions:read",
  QUESTIONS_CREATE: "questions:create",
  QUESTIONS_UPDATE: "questions:update",
  QUESTIONS_DELETE: "questions:delete",

  VARIANT_QUESTION_READ: "variant-questions:read",
  VARIANT_QUESTION_CREATE: "variant-questions:create",
  VARIANT_QUESTION_UPDATE: "variant-questions:update",
  VARIANT_QUESTION_DELETE: "variant-questions:delete",

  COUPONS_READ: "coupons:read",
  COUPONS_CREATE: "coupons:create",
  COUPONS_UPDATE: "coupons:update",
  COUPONS_DELETE: "coupons:delete",

  TESTIMONIALS_READ: "testimonials:read",
  TESTIMONIALS_CREATE: "testimonials:create",
  TESTIMONIALS_UPDATE: "testimonials:update",
  TESTIMONIALS_DELETE: "testimonials:delete",

  SERVICES_READ: "services:read",
  SERVICES_CREATE: "services:create",
  SERVICES_UPDATE: "services:update",
  SERVICES_DELETE: "services:delete",

  SERVICE_ORDERS_READ: "service-orders:read",
  SERVICE_ORDERS_UPDATE: "service-orders:update",
  SERVICE_ORDERS_DELETE: "service-orders:delete",

  RECYCLE_READ: "recycle:read",
  RECYCLE_CREATE: "recycle:create",
  RECYCLE_UPDATE: "recycle:update",
  RECYCLE_DELETE: "recycle:delete",

  COMPLAINTS_READ: "complaints:read",
  COMPLAINTS_UPDATE: "complaints:update",
  COMPLAINTS_DELETE: "complaints:delete",

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

  // CATALOG MANAGEMENT
  CATALOG_MANAGEMENT: "catalog-management",
  CUSTOMER_SUPPORT: "customer-support",
  ORDER_MANAGEMENT: "order-management",
  SERVICES_MANAGEMENT: "services-management",
  INVENTORY_MANAGEMENT: "inventory-management",
  COMPLAINTS_MANAGEMENT: "complaints-management",
  MARKETING_MANAGEMENT: "marketing-management",
  REPORTS_ANALYTICS: "reports-analytics",
  SETTINGS_MANAGEMENT: "settings-management",
} as const;

/* Adding role inside this hides and displays sidebar option and makes routers to deny access for the perticular role */
export const ROLE_PERMISSIONS = {
  [ADMIN_ROLE_ENUM.ADMIN]: Object.values(ADMIN_PERMISSIONS),

  [ADMIN_ROLE_ENUM.SUB_ADMIN]: [
    // SECTION MANAGEMENT PERMISSIONS
    ADMIN_PERMISSIONS.CATALOG_MANAGEMENT,
    ADMIN_PERMISSIONS.CUSTOMER_SUPPORT,
    ADMIN_PERMISSIONS.ORDER_MANAGEMENT,
    ADMIN_PERMISSIONS.SERVICES_MANAGEMENT,
    ADMIN_PERMISSIONS.COMPLAINTS_MANAGEMENT,

    // PAGE MANAGEMENT PERMISSIONS
    ADMIN_PERMISSIONS.GENERAL_READ,
    ADMIN_PERMISSIONS.CATEGORY_READ,
    ADMIN_PERMISSIONS.CATEGORY_CREATE,
    ADMIN_PERMISSIONS.CATEGORY_UPDATE,

    ADMIN_PERMISSIONS.BRAND_READ,
    ADMIN_PERMISSIONS.BRAND_CREATE,
    ADMIN_PERMISSIONS.BRAND_UPDATE,

    ADMIN_PERMISSIONS.PRODUCT_READ,
    ADMIN_PERMISSIONS.PRODUCT_CREATE,
    ADMIN_PERMISSIONS.PRODUCT_UPDATE,

    ADMIN_PERMISSIONS.SERIES_READ,
    ADMIN_PERMISSIONS.SERIES_CREATE,
    ADMIN_PERMISSIONS.SERIES_UPDATE,

    ADMIN_PERMISSIONS.NUMBERS_READ,
    ADMIN_PERMISSIONS.NUMBERS_DELETE,

    ADMIN_PERMISSIONS.QUESTIONS_READ,
    ADMIN_PERMISSIONS.QUESTIONS_CREATE,
    ADMIN_PERMISSIONS.QUESTIONS_UPDATE,

    ADMIN_PERMISSIONS.TESTIMONIALS_READ,
    ADMIN_PERMISSIONS.TESTIMONIALS_CREATE,
    ADMIN_PERMISSIONS.TESTIMONIALS_UPDATE,

    ADMIN_PERMISSIONS.COUPONS_READ,

    ADMIN_PERMISSIONS.SERVICES_READ,
    ADMIN_PERMISSIONS.SERVICE_ORDERS_READ,
    ADMIN_PERMISSIONS.RECYCLE_READ,
    ADMIN_PERMISSIONS.COMPLAINTS_READ,
  ],

  [ADMIN_ROLE_ENUM.MARKETING]: [
    ADMIN_PERMISSIONS.CAMPAIGNS_READ,
    ADMIN_PERMISSIONS.CAMPAIGNS_CREATE,
    ADMIN_PERMISSIONS.CAMPAIGNS_UPDATE,
    ADMIN_PERMISSIONS.ANALYTICS_READ,
    ADMIN_PERMISSIONS.ORDERS_READ,
  ],
  [ADMIN_ROLE_ENUM.EXECUTIVE]: [],
  [ADMIN_ROLE_ENUM.PARTNER]: [],
  none: [],
} as const;
