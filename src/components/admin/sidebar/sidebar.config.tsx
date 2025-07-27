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

export const sidebarSections: SidebarSection[] = [
  {
    title: "Overview",
    links: [
      {
        name: "dashboard",
        href: "/admin/dashboard",
        icon: DashboardIcon,
        permissions: [ADMIN_PERMISSIONS.GENERAL_READ],
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
        permissions: [ADMIN_PERMISSIONS.CREATE],
      },
      {
        name: "categories-list",
        href: "/admin/categories-list",
        icon: ListIndefiniteIcon,
        permissions: [ADMIN_PERMISSIONS.GENERAL_READ],
      },
      {
        name: "add-brands",
        href: "/admin/add-brands",
        icon: AirtableIcon,
        permissions: [ADMIN_PERMISSIONS.CREATE],
      },
      {
        name: "brands-list",
        href: "/admin/brands-list",
        icon: ListIndefiniteIcon,
        permissions: [ADMIN_PERMISSIONS.GENERAL_READ],
      },
      {
        name: "add-series",
        href: "/admin/add-series",
        icon: DatabricksIcon,
        permissions: [ADMIN_PERMISSIONS.CREATE],
      },
      {
        name: "add-products",
        href: "/admin/add-products",
        icon: AstroIcon,
        permissions: [ADMIN_PERMISSIONS.CREATE],
      },
      {
        name: "products-list",
        href: "/admin/products-list",
        icon: ListIndefiniteIcon,
        permissions: [ADMIN_PERMISSIONS.GENERAL_READ],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.GENERAL_READ, ADMIN_PERMISSIONS.CREATE],
  },
  {
    title: "Customer Support",
    links: [
      {
        name: "create-questions",
        href: "/admin/create-questions",
        icon: QuestionAnswerIcon,
        permissions: [ADMIN_PERMISSIONS.CREATE],
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
    permissions: [ADMIN_PERMISSIONS.GENERAL_READ, ADMIN_PERMISSIONS.CREATE],
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
        permissions: [ADMIN_PERMISSIONS.ORDERS_READ],
      },
      {
        name: "recycle-orders",
        href: "/admin/recycle-orders",
        icon: ListCheck2Icon,
        permissions: [ADMIN_PERMISSIONS.ORDERS_READ],
      },
    ],
    permissions: [ADMIN_PERMISSIONS.ORDERS_READ],
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
    // permissions: [ADMIN_PERMISSIONS.UPDATE],
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
    permissions: [ADMIN_PERMISSIONS.UPDATE],
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
        href: "/admin/add-coupons",
        icon: SlidesIcon,
        permissions: [ADMIN_PERMISSIONS.CAMPAIGNS_CREATE],
      },
      {
        name: "create-post",
        href: "/admin/create-post",
        icon: JediOrderIcon,
        permissions: [ADMIN_PERMISSIONS.CAMPAIGNS_CREATE],
      },
    ],
    permissions: [
      ADMIN_PERMISSIONS.CAMPAIGNS_READ,
      ADMIN_PERMISSIONS.CAMPAIGNS_CREATE,
    ],
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
    permissions: [
      ADMIN_PERMISSIONS.SETTINGS_READ,
      ADMIN_PERMISSIONS.ADMIN_CHANNEL,
    ],
  },
];
