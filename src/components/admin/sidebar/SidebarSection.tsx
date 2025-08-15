import {
  ADMIN_PERMISSIONS,
  SidebarSection as SidebarSectionType,
} from "@utils/types";
import { SidebarLink } from "./SidebarLink";

interface SidebarSectionProps {
  section: SidebarSectionType;
  isCollapsed: boolean;
  adminPermissions: readonly string[];
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  section,
  isCollapsed,
  adminPermissions,
}) => {
  if (section.show === false) return null;

  const visibleLinks = section.links.filter((link) => {
    if (!link.permissions) return true;
    return link.permissions.some((perm) => adminPermissions.includes(perm));
  });

  const hasVisibleLinks: boolean = visibleLinks.length > 0;

  return (
    <div className="mb-6">
      {!isCollapsed && hasVisibleLinks && (
        <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {section.title}
        </h3>
      )}
      <nav className="space-y-1">
        {/* {section.links.map((link) => ( */}
        {visibleLinks.map((link) => (
          <SidebarLink key={link.name} link={link} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </div>
  );
};
