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
import { SidebarSection } from "@types";

export const sidebarSections: SidebarSection[] = [
  {
    title: "Overview",
    links: [
      {
        name: "dashboard",
        href: "/admin/dashboard",
        icon: DashboardIcon,
      },
    ],
  },
  {
    title: "Catalog Management",
    links: [
      {
        name: "add-category",
        href: "/admin/add-category",
        icon: CategoryIcon,
      },
      {
        name: "categories-list",
        href: "/admin/categories-list",
        icon: ListIndefiniteIcon,
      },
      {
        name: "add-brands",
        href: "/admin/add-brands",
        icon: AirtableIcon,
      },
      {
        name: "brands-list",
        href: "/admin/brands-list",
        icon: ListIndefiniteIcon,
      },
      {
        name: "add-series",
        href: "/admin/add-series",
        icon: DatabricksIcon,
      },
      {
        name: "add-products",
        href: "/admin/add-products",
        icon: AstroIcon,
      },
      {
        name: "products-list",
        href: "/admin/products-list",
        icon: ListIndefiniteIcon,
      },
    ],
  },
  {
    title: "Customer Support",
    links: [
      {
        name: "create-questions",
        href: "/admin/create-questions",
        icon: QuestionAnswerIcon,
      },
      {
        name: "testimonial",
        href: "/admin/testimonial",
        icon: AstroIcon,
      },
      {
        name: "complaints",
        href: "/admin/complaints",
        icon: QuestionAnswerIcon,
        badge: 3, // Example badge
      },
    ],
  },
  {
    title: "Order Management",
    links: [
      {
        name: "orders",
        href: "/admin/orders",
        icon: ListCheck2Icon,
        // badge: 12, // Example badge
      },
      {
        name: "phone-numbers",
        href: "/admin/phone-numbers",
        icon: NumbersIcon,
      },
      {
        name: "recycle-orders",
        href: "/admin/recycle-orders",
        icon: ListCheck2Icon,
      },
    ],
  },
  {
    title: "Inventory",
    links: [
      {
        name: "manage-stocks",
        href: "/admin/manage-stocks",
        icon: StockpilesIcon,
      },
      {
        name: "variants-questions",
        href: "/admin/variants-questions",
        icon: GitDiffIcon,
      },
    ],
  },
  {
    title: "Marketing",
    links: [
      {
        name: "add-sliders",
        href: "/admin/add-sliders",
        icon: SlidesIcon,
      },
      {
        name: "add-coupons",
        href: "/admin/add-coupons",
        icon: SlidesIcon,
      },
      {
        name: "create-post",
        href: "/admin/create-post",
        icon: JediOrderIcon,
      },
    ],
  },
  {
    title: "System",
    links: [
      {
        name: "update-profile",
        href: "/admin/update-profile",
        icon: ProfileIcon,
      },
      {
        name: "admin-channel",
        href: "/admin/admin-channel",
        icon: AlertCircle,
      },
    ],
  },
];
