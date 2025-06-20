import { FC } from "react";
import { HomeIcon, RecycleIcon, ServiceIcon } from "@icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes";
import { IActivePath } from "../Navbar";

interface INavMenuProps {
  activePath: IActivePath;
}

export const NavMenu: FC<INavMenuProps> = ({ activePath }: INavMenuProps) => {
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
      icon: <ServiceIcon size={16} />,
      onClick: () => navigate("/services"),
    },
    {
      key: "home",
      label: "Home",
      icon: <HomeIcon size={16} />,
      onClick: () => navigate("/"),
    },
    {
      key: "recycle",
      label: "Recycle",
      icon: <RecycleIcon size={16} />,
      onClick: () => navigate(ROUTES.user.recycleCategories),
    },
  ];

  const activeLink =
    "text-secondary text-xl transition-all duration-1000 ease-in-out";
  const activeLinkName = "font-extrabold text-secondary";
  const activeButton = "bg-instant-mid/10 transition-all duration-1000";

  return (
    <div className="max-sm:hidden h-12 grid grid-cols-3 border bg-white w-full text-sm font-thin">
      {footerNavItems.map((item) => (
        <button
          key={item.key}
          aria-label={`${item.label} button`}
          onClick={item.onClick}
          className={`flex justify-center items-center gap-1 py-2 border-r ${
            activePath[item.key] ? activeButton : ""
          }`}
        >
          <span className={activePath[item.key] ? activeLink : "text-gray-400"}>
            {item.icon}
          </span>
          <span className={activePath[item.key] ? activeLinkName : ""}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};
