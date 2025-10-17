import { FC, memo } from "react";
import { HomeIcon, RecycleIcon, ServiceIcon } from "@icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes";
import { IActivePath } from "../Navbar";

interface INavMenuProps {
  activePath: IActivePath;
}

export const NavMenu: FC<INavMenuProps> = memo(
  ({ activePath }: INavMenuProps) => {
    const navigate = useNavigate();

    type ActivePathKey = keyof typeof activePath;

    const footerNavItems: {
      key: ActivePathKey;
      label: string;
      icon: JSX.Element;
      onClick: () => void;
    }[] = [
      {
        key: "service",
        label: "Services",
        icon: <ServiceIcon size={18} />,
        onClick: () => navigate("/services"),
      },
      {
        key: "home",
        label: "Sell Now",
        icon: <HomeIcon size={18} />,
        onClick: () => navigate("/"),
      },
      {
        key: "recycle",
        label: "Recycle",
        icon: <RecycleIcon size={18} />,
        onClick: () => navigate(ROUTES.user.recycleCategories),
      },
    ];

    return (
      <div className="max-sm:hidden grid grid-cols-3 bg-white w-full border-b text-xs">
        {footerNavItems.map((item) => (
          <button
            key={item.key}
            aria-label={`${item.label} navigation`}
            onClick={item.onClick}
            className={`
            group relative flex justify-center items-center gap-2 py-3 
            transition-all duration-300 
            border-r last:border-r-0
            ${
              activePath[item.key]
                ? "bg-gradient-to-b from-instant-mid/10 to-transparent border-t-4 border-t-purple-600"
                : "hover:bg-instant-mid/10"
            }
          `}
          >
            {/* Icon with animation */}
            <span
              className={`
              transition-all duration-300 
              ${
                activePath[item.key]
                  ? "text-purple-600 scale-110"
                  : "text-gray-500 group-hover:text-purple-600 group-hover:scale-110"
              }
            `}
            >
              {item.icon}
            </span>

            {/* Label */}
            <span
              className={`
              font-medium transition-colors duration-300
              ${
                activePath[item.key]
                  ? "text-purple-600 font-bold"
                  : "text-gray-700 group-hover:text-purple-600"
              }
            `}
            >
              {item.label}
            </span>

            {/* Active indicator line */}
            {activePath[item.key] && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    );
  }
);

NavMenu.displayName = "NavMenu";
