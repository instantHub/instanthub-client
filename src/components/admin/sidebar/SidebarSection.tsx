import { SidebarSection as SidebarSectionType } from "@types";
import { SidebarLink } from "./SidebarLink";

interface SidebarSectionProps {
  section: SidebarSectionType;
  isCollapsed: boolean;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  section,
  isCollapsed,
}) => {
  if (section.show === false) return null;

  return (
    <div className="mb-6">
      {!isCollapsed && (
        <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {section.title}
        </h3>
      )}
      <nav className="space-y-1">
        {section.links.map((link) => (
          <SidebarLink key={link.name} link={link} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </div>
  );
};
