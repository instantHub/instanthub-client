import {
  DashboardIcon,
  CategoryIcon,
  ListIndefiniteIcon,
  AirtableIcon,
  AlertCircle,
  ProfileIcon,
  JediOrderIcon,
  SlidesIcon,
  GitDiffIcon,
  StockpilesIcon,
  ListCheck2Icon,
  NumbersIcon,
  AstroIcon,
  QuestionAnswerIcon,
  DatabricksIcon,
} from "@icons";
import {
  ADMIN_PERMISSIONS,
  ROLE_PERMISSIONS,
  SidebarSection,
} from "@utils/types";
import { ROUTES_CONST } from "@utils/types/routes.types";

export const sidebarConfig: SidebarSection[] = [
  {
    title: "Overview",
    links: [
      {
        name: "dashboard",
        href: "/admin/dashboard",
        icon: DashboardIcon,
        permissions: [
          ADMIN_PERMISSIONS.GENERAL_READ,
          ADMIN_PERMISSIONS.CAMPAIGNS_READ,
        ],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.GENERAL_READ],
  },
  {
    title: "Catalog Management",
    links: [
      {
        name: "add-category",
        href: "/admin/add-category",
        icon: CategoryIcon,
        permissions: [ADMIN_PERMISSIONS.CATEGORY_CREATE],
      },
      {
        name: "categories-list",
        href: "/admin/categories-list",
        icon: ListIndefiniteIcon,
        permissions: [ADMIN_PERMISSIONS.CATEGORY_READ],
      },
      {
        name: "add-brands",
        href: "/admin/add-brands",
        icon: AirtableIcon,
        permissions: [ADMIN_PERMISSIONS.BRAND_CREATE],
      },
      {
        name: "brands-list",
        href: "/admin/brands-list",
        icon: ListIndefiniteIcon,
        permissions: [ADMIN_PERMISSIONS.BRAND_READ],
      },
      {
        name: "add-series",
        href: "/admin/add-series",
        icon: DatabricksIcon,
        permissions: [ADMIN_PERMISSIONS.SERIES_CREATE],
      },
      {
        name: "add-products",
        href: "/admin/add-products",
        icon: AstroIcon,
        permissions: [ADMIN_PERMISSIONS.PRODUCT_CREATE],
      },
      {
        name: "products-list",
        href: "/admin/products-list",
        icon: ListIndefiniteIcon,
        permissions: [ADMIN_PERMISSIONS.PRODUCT_READ],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.CATALOG_MANAGEMENT],
  },
  {
    title: "Customer Support",
    links: [
      {
        name: "create-questions",
        href: "/admin/create-questions",
        icon: QuestionAnswerIcon,
        permissions: [ADMIN_PERMISSIONS.QUESTIONS_CREATE],
      },
      {
        name: "testimonial",
        href: "/admin/testimonial",
        icon: AstroIcon,
        permissions: [ADMIN_PERMISSIONS.GENERAL_READ],
      },
      {
        name: "complaints",
        href: "/admin/complaints",
        icon: QuestionAnswerIcon,
        badge: 3,
        permissions: [ADMIN_PERMISSIONS.GENERAL_READ],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.CUSTOMER_SUPPORT],
  },
  {
    title: "Order Management",
    links: [
      {
        name: "orders",
        href: "/admin/orders",
        icon: ListCheck2Icon,
        permissions: [ADMIN_PERMISSIONS.ORDERS_READ],
      },
      {
        name: "phone-numbers",
        href: "/admin/phone-numbers",
        icon: NumbersIcon,
        permissions: [ADMIN_PERMISSIONS.NUMBERS_READ],
      },
      {
        name: "recycle-orders",
        href: "/admin/recycle-orders",
        icon: ListCheck2Icon,
        permissions: [ADMIN_PERMISSIONS.ORDERS_READ],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.ORDER_MANAGEMENT],
  },
  {
    title: "Services",
    links: [
      {
        name: "manage-services",
        href: "/admin/manage-services",
        // href: ROUTES.admin.manageServices,
        icon: StockpilesIcon,
        // permissions: [ADMIN_PERMISSIONS.CREATE, ADMIN_PERMISSIONS.UPDATE],
      },
      {
        name: "service-orders",
        href: "/admin/service-orders",
        // href: ROUTES.admin.serviceOrders,
        icon: GitDiffIcon,
        // permissions: [ADMIN_PERMISSIONS.CREATE, ADMIN_PERMISSIONS.UPDATE],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.SERVICES_MANAGEMENT],
  },
  {
    title: "Inventory",
    links: [
      {
        name: "manage-stocks",
        href: "/admin/manage-stocks",
        icon: StockpilesIcon,
        permissions: [ADMIN_PERMISSIONS.UPDATE],
      },
      {
        name: "variants-questions",
        href: "/admin/variants-questions",
        icon: GitDiffIcon,
        permissions: [ADMIN_PERMISSIONS.CREATE, ADMIN_PERMISSIONS.UPDATE],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.INVENTORY_MANAGEMENT],
  },
  {
    title: "Marketing",
    links: [
      {
        name: "add-sliders",
        href: "/admin/add-sliders",
        icon: SlidesIcon,
        permissions: [ADMIN_PERMISSIONS.CAMPAIGNS_CREATE],
      },
      {
        name: "add-coupons",
        href: ROUTES_CONST.admin.createCoupon,
        icon: SlidesIcon,
        permissions: [ADMIN_PERMISSIONS.CAMPAIGNS_CREATE],
      },
      {
        name: "SEO",
        href: ROUTES_CONST.admin.marketing.seo,
        icon: DatabricksIcon,
        permissions: [ADMIN_PERMISSIONS.CAMPAIGNS_CREATE],
      },
      {
        name: "create-post",
        href: ROUTES_CONST.admin.marketing.createPost,
        icon: JediOrderIcon,
        permissions: [ADMIN_PERMISSIONS.CAMPAIGNS_CREATE],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.MARKETING_MANAGEMENT],
  },
  {
    title: "System",
    links: [
      {
        name: "update-profile",
        href: "/admin/update-profile",
        icon: ProfileIcon,
        permissions: [ADMIN_PERMISSIONS.SETTINGS_READ],
      },
      {
        name: "admin-channel",
        href: "/admin/admin-channel",
        icon: AlertCircle,
        permissions: [ADMIN_PERMISSIONS.ADMIN_CHANNEL],
      },
      {
        name: "icons",
        href: "/admin/icons",
        icon: AstroIcon,
        permissions: [ADMIN_PERMISSIONS.SETTINGS_READ],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.SETTINGS_MANAGEMENT],
  },
];
