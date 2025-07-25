// types/sidebar.types.ts
export interface SidebarLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  permissions?: string[];
}

export interface SidebarSection {
  title: string;
  links: SidebarLink[];
  show?: boolean;
  permissions?: string[];
}

export interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}
