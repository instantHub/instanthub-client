// components/admin/SidebarLink.tsx
import { NavLink } from "react-router-dom";
import { SidebarLink as SidebarLinkType } from "@utils/types";
import { useSidebar } from "@hooks";

interface SidebarLinkProps {
  link: SidebarLinkType;
  isCollapsed: boolean;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  link,
  isCollapsed,
}) => {
  const { closeSidebar } = useSidebar();
  const IconComponent = link.icon;

  return (
    <NavLink
      to={link.href}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-instant-mid text-white shadow-lg"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      <IconComponent className="w-5 h-5 flex-shrink-0" />

      {!isCollapsed && (
        <>
          <span className="capitalize truncate">
            {link.name.replace(/-/g, " ")}
          </span>
          {link.badge && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] flex items-center justify-center">
              {link.badge}
            </span>
          )}
        </>
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
          {link.name.replace(/-/g, " ")}
        </div>
      )}
    </NavLink>
  );
};
