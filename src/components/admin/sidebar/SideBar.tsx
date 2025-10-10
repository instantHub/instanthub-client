import { Link } from "react-router-dom";
import { useAuth, useSidebar } from "@hooks";
import { CloseIcon } from "@icons";
import { SidebarSection } from "./SidebarSection";
import { sidebarConfig } from "./sidebar.config";
import { ROLE_PERMISSIONS } from "@utils/types";
import { IAdmin } from "@features/api/admin/types";
import { ADMIN_ROLE_ENUM } from "@utils/constants";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { adminData, isAdmin, isExecutive, isMarketing, isPartner } = useAuth();

  const adminPermissions = ROLE_PERMISSIONS[(adminData as IAdmin)?.role];

  return (
    <>
      {/* Overlay for when sidebar is open */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 border-r border-gray-800 transition-all duration-300 w-56 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <Link
            to="/admin"
            className="flex items-center gap-3 text-white font-bold text-lg"
            onClick={closeSidebar}
          >
            <div className="w-8 h-8 bg-instant-mid rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">IH</span>
            </div>
            {/* <span>Instant Hub</span> */}
          </Link>

          {/* User Role Badge */}
          {adminData && (
            <div className="px-4 py-2 border-b border-gray-800">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${
                  isAdmin()
                    ? "bg-red-600 text-white"
                    : isExecutive()
                    ? "bg-blue-600 text-white"
                    : isMarketing()
                    ? "bg-green-600 text-white"
                    : isPartner()
                    ? "bg-yellow-600 text-black"
                    : "bg-gray-600 text-white"
                }`}
              >
                {adminData?.role?.toUpperCase()}
              </span>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={closeSidebar}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
            aria-label="Close sidebar"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {sidebarConfig
            .filter((section) => {
              console.log("filtering sidebar section");
              return section?.permissions?.some((perm) =>
                ROLE_PERMISSIONS[adminData?.role as ADMIN_ROLE_ENUM]?.includes(
                  // @ts-ignore
                  perm
                )
              );
            })
            .map((section) => (
              <SidebarSection
                key={section.title}
                section={section}
                isCollapsed={false}
                adminPermissions={adminPermissions}
              />
            ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-400 text-center">
            © 2025 Instant Hub
          </div>
        </div>
      </div>
    </>
  );
};
