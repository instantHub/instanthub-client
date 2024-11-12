import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import {
  MdCategory,
  MdOutlineNumbers,
  MdOutlineMultipleStop,
} from "react-icons/md";
import { FaJediOrder, FaCentSign } from "react-icons/fa6";
import { PiGitDiff } from "react-icons/pi";
import { GoMultiSelect } from "react-icons/go";
import { GrMultiple } from "react-icons/gr";
import { FcMultipleInputs } from "react-icons/fc";
import { IoOpenOutline } from "react-icons/io5";
import { LuPanelLeftClose } from "react-icons/lu";

import {
  RiListCheck2,
  RiListCheck3,
  RiListIndefinite,
  RiQuestionAnswerFill,
} from "react-icons/ri";
import { TbBrandAirtable } from "react-icons/tb";
import { SiAstro, SiDatabricks, SiSlides } from "react-icons/si";
import { GiStockpiles, GiCash } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { isAction } from "@reduxjs/toolkit";
// import { FaCentSign } from "react-icons/fa6";

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  };

  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const handleClick = (event, to) => {
    // event.preventDefault(); // Prevent default behavior
    // startTransition(() => {
    //   window.history.pushState({}, "", to); // Programmatic navigation
    // });
  };

  const links = [
    // DASHBOARD
    {
      title: "Dashboard",
      links: [
        {
          name: "dashboard",
          icon: <BiSolidDashboard />,
        },
      ],
    },

    // CATEGORY
    {
      title: "Category",
      links: [
        {
          name: "add-category",
          icon: <MdCategory />,
        },
        {
          name: "categories-list",
          icon: <RiListCheck3 />,
        },
      ],
    },

    // BRANDS
    {
      title: "Brands",
      links: [
        {
          name: "add-brands",
          icon: <TbBrandAirtable />,
        },
        {
          name: "brands-list",
          icon: <RiListIndefinite />,
        },
      ],
    },

    // PRODUCTS
    {
      title: "Products",
      links: [
        {
          name: "add-products",
          // icon: <TbBrandPushover />,
          icon: <SiAstro />,
        },
        {
          name: "products-list",
          icon: <RiListCheck2 />,
        },
      ],
    },

    // SERIES
    {
      title: "Series",
      links: [
        {
          name: "add-series",
          icon: <SiDatabricks />,
        },
      ],
    },

    // QUESTIONS
    {
      title: "Questions",
      links: [
        {
          name: "create-questions",
          icon: <RiQuestionAnswerFill />,
        },
      ],
    },

    // VARIANT QUESTIONS
    {
      title: "Variant Questions",
      links: [
        {
          name: "variants-questions",
          icon: <PiGitDiff />,
        },
      ],
    },

    // ORDERS
    {
      title: "Orders",
      links: [
        {
          name: "orders",
          // icon: <BsBorderStyle />,
          icon: <FcMultipleInputs />,
        },
        {
          name: "phone-numbers",
          icon: <MdOutlineNumbers />,
          // icon: <TbPasswordMobilePhone />,
        },
      ],
    },

    // MANAGE STOCKS
    {
      title: "Manage Stocks",
      links: [
        {
          name: "manage-stocks",
          icon: <GiStockpiles />,
        },
      ],
    },

    // SLIDERS & COUPONS
    {
      title: "Sliders & Coupons",
      links: [
        {
          name: "add-sliders",
          icon: <SiSlides />,
          // icon: <MdSlideshow />,
        },
        {
          name: "add-coupons",
          icon: <FaCentSign />,
          // icon: <MdSlideshow />,
        },
      ],
    },

    // SERVICES
    {
      title: "Services",
      links: [
        {
          name: "add-services",
          // icon: <CgProfile />,
          icon: <GrMultiple />,
        },
        {
          name: "services-list",
          // icon: <CgProfile />,
          icon: <GoMultiSelect />,
        },
        {
          name: "services-Orders",
          // icon: <CgProfile />,
          icon: <MdOutlineMultipleStop />,
        },
      ],
    },

    // RECYCLE
    {
      title: "Recycle Order",
      links: [
        {
          name: "recycle-orders",
          icon: <FaJediOrder />,
        },
      ],
    },

    // UPDATE PROFILE
    {
      title: "Settings",
      links: [
        {
          name: "update-profile",
          // icon: <CgProfile />,
          icon: <ImProfile />,
        },
      ],
    },
  ];

  const activeLink = `flex items-center gap-3 pl-4 pt-2 pb-2 rounded-lg text-white text-md m-2 `;
  const normalLink = `flex items-center gap-3 pl-4 pt- pb-1 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-cyan-500 hover:bg-light-gray m-2`;

  return (
    <div
      className={` ${
        isSidebarOpen ? `lg:w-[12%] max-md:w-[40%]` : `lg:w-[4%] max-md:w-[13%]`
      }
        md-[15%] h-full bg-gray-900 text-white fixed overflow-y-auto scrollbar z-50`}
    >
      <div className="flex justify-between items-center">
        <Link
          to="/admin"
          className="items-center gap-2 ml-3 mt-4 flex text-l font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          <GiCash className="max-sm:hidden" />
          {isSidebarOpen && (
            <span className="max-2sm:hidden">InstantCashPick</span>
          )}
        </Link>
        <button
          onClick={() => {
            toggleSidebar();
          }}
          className="px-1"
        >
          {isSidebarOpen ? (
            <LuPanelLeftClose className="text-xl" />
          ) : (
            <IoOpenOutline className="text-xl" />
          )}
        </button>
      </div>

      <div className="mt-5">
        {links.map((item) => (
          <div key={item.title}>
            <p className="text-gray-400 text-sm dark:text-gray-400 mx-2 mt-2 uppercase">
              {isSidebarOpen ? item.title : item.title.substring(0, 5)}
            </p>
            {/* <Suspense fallback={<div>Loading...</div>}>
              {item.links.map((link) => (
                <NavLink
                  to={`/admin/${link.name}`}
                  key={link.name}
                  onClick={() => handleClick(e, `/admin/${link.name}`)}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {link.icon}
                  {isSidebarOpen && (
                    <span className="capitalize max-md:text-sm">
                      {link.name}
                    </span>
                  )}
                </NavLink>
              ))}
            </Suspense> */}
            {item.links.map((link) => (
              <NavLink
                to={`/admin/${link.name}`}
                key={link.name}
                // onClick={() => handleClick(e, `/admin/${link.name}`)}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {link.icon}
                {isSidebarOpen && (
                  <span className="capitalize max-md:text-sm">{link.name}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      {/* <ul className="flex flex-col my-28 items-center">
        {sideBarLinks.map(({ text, url }, i) => {
          return (
            <li className={`my-4 `} key={i}>
              <button className="text-xl">
                <Link to={`/admin/${url}`}>{text}</Link>
              </button>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default SideBar;
