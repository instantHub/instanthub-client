import React, {
  startTransition,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { MdOutlineMenuOpen } from "react-icons/md";
import { setCurrentPage } from "../features/adminPanelSlice";
import { useDispatch } from "react-redux";
import { SideBarContext } from "../pages/layout/Layout";

const SideBar = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);

  const { isSidebarOpen, toggleSidebar } = useContext(SideBarContext);

  const dispatch = useDispatch();

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

    // POSTs
    {
      title: "Posts",
      links: [
        {
          name: "create-post",
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
    <div className={`w-ful z-30 bg-gray-900/50 fixed `}>
      {/* lg:w-[12%] max-md:w-[40%] */}
      <div
        // className={` ${isSidebarOpen ? `w-fit px-2` : `hidden`}
        // md-[15%] h-full bg-gray-900 text-white fixed overflow-y-auto scrollbar z-30`}
        className={`
            ${isSidebarOpen ? `w-full h-full` : `hidden`}
             md h-full bg-gray-900/20 fixed overflow-y-auto scrollbar text-white z-30
            `}
      >
        <div className="bg-gray-900 w-fit px-2">
          {/* Instant Cash Pick Sidebar Name */}
          <div className="flex items-center gap-2 bg-gray-900 w-fit pt-5 pb-2 pl-3 max-sm:pl-2">
            <div>
              <Link
                to="/admin"
                className="gap-2 flex items-center font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                <GiCash />
                <span className="max-sm:text-sm">InstantCashPick</span>
              </Link>
            </div>
            <div className="relative flex flex-col items-center ">
              <button
                onClick={() => {
                  toggleSidebar();
                }}
                className="text-3xl max-sm:text-2xl"
              >
                <IoMdClose />
              </button>
              <p className="absolute -bottom-2 text-[7px] opacity-80">close</p>
            </div>
          </div>

          {links.map((item) => (
            <div key={item.title}>
              <p className="text-gray-400 text-sm dark:text-gray-400 px-2 mt-2 uppercase">
                {isSidebarOpen ? item.title : item.title.substring(0, 5)}
              </p>

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
                  onClick={() => {
                    dispatch(setCurrentPage({ currentPage: link.name }));
                    toggleSidebar();
                  }}
                >
                  {link.icon}
                  {isSidebarOpen && (
                    <span className="capitalize max-md:text-sm">
                      {link.name}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

{
  /* <ul className="flex flex-col my-28 items-center">
{sideBarLinks.map(({ text, url }, i) => {
  return (
    <li className={`my-4 `} key={i}>
      <button className="text-xl">
        <Link to={`/admin/${url}`}>{text}</Link>
      </button>
    </li>
  );
})}
</ul> */
}
