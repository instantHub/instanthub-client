import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";

// import { links } from "../data/dummy";
// import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  // const { currentColor, activeMenu, setActiveMenu, screenSize } =
  //   useStateContext();
  const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  };
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const sideBarLinks = [
    {
      text: "Dashboard",
      url: "dashboard",
    },
    {
      text: "Products",
      url: "productsList",
    },
    {
      text: "Add Products",
      url: "add-products",
    },

    {
      text: "Add Category",
      url: "add-category",
    },

    {
      text: "Add Brands",
      url: "add-brands",
    },
    {
      text: "Add Series",
      url: "add-series",
    },
    {
      text: "Questions",
      url: "questions",
    },
    {
      text: "Orders",
      url: "orders",
    },
    {
      text: "Sliders",
      url: "add-sliders",
    },
    {
      text: "Setting",
      url: "update-profile",
    },
  ];

  const links = [
    {
      title: "Dashboard",
      links: [
        {
          name: "dashboard",
          // icon: <FiShoppingBag />,
        },
      ],
    },

    {
      title: "Pages",
      links: [
        {
          name: "orders",
          // icon: <AiOutlineShoppingCart />,
        },
        {
          name: "employees",
          // icon: <IoMdContacts />,
        },
        {
          name: "customers",
          // icon: <RiContactsLine />,
        },
      ],
    },

    {
      title: "Charts",
      links: [
        {
          name: "line",
          // icon: <AiOutlineStock />,
        },
        {
          name: "area",
          // icon: <AiOutlineAreaChart />,
        },

        {
          name: "bar",
          // icon: <AiOutlineBarChart />,
        },
        {
          name: "pie",
          // icon: <FiPieChart />,
        },
        {
          name: "financial",
          // icon: <RiStockLine />,
        },
        {
          name: "color-mapping",
          // icon: <BsBarChart />,
        },
      ],
    },
  ];

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Shoppy</span>
            </Link>
            {/* <TooltipComponent content="Menu" position="BottomCenter"> */}
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            {/* </TooltipComponent> */}
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/admin/${link.name}`}
                    // to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {/* {link.icon} */}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
