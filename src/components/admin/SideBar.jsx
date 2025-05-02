import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
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
import { IoMdClose } from "react-icons/io";
import { setCurrentPage } from "@features/adminSlices/adminPanelSlice";
import { useDispatch } from "react-redux";
import { SideBarContext } from "@pages/admin/adminLayout/AdminLayout";

const SideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SideBarContext);

  const dispatch = useDispatch();

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

    // BRANDS and SERIES
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
        {
          name: "add-series",
          icon: <SiDatabricks />,
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
    // {
    //   title: "Series",
    //   links: [
    //     {
    //       name: "add-series",
    //       icon: <SiDatabricks />,
    //     },
    //   ],
    // },

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

    // Complaints
    {
      title: "Complaints",
      links: [
        {
          name: "complaints",
          icon: <SiSlides />,
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
  const normalLink = `flex items-center gap-3 pl-4 pt-1 pb-1 rounded-lg text-md text-white hover:text-black hover:bg-gray-200 m-2`;
  // const normalLink = `flex items-center gap-3 pl-4 pt-1 pb-1 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-secondary dark:hover:bg-secondary-light hover:bg-light-gray m-2`;

  return (
    <div className={`w-ful z-30 bg-gray-900/50 fixed `}>
      <div
        className={`
            ${isSidebarOpen ? `w-full h-full` : `hidden`}
             md h-full bg-secondary/20 fixed overflow-y-auto scrollbar text-white z-30
            `}
      >
        <div className=" bg-secondary w-fit px-2">
          {/* Instant Hub Sidebar Name */}
          <div className="flex justify-between items-center font-serif gap-2 bg-secondary w-full pt-5 pb-2 pl-3 max-sm:pl-2">
            {/* InstantHub Name */}
            <div>
              <Link
                to="/admin"
                className="gap-2 flex items-center font-extrabold tracking-tight text-white"
              >
                <GiCash />
                <span className="max-sm:text-sm text-lg tracking-widest">
                  Instant Hub
                </span>
              </Link>
            </div>

            {/* Close button */}
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
              <p className="text-white text-sm px-2 mt-2 uppercase">
                {isSidebarOpen ? item.title : item.title.substring(0, 5)}
              </p>

              {item.links.map((link) => (
                <NavLink
                  to={`/admin/${link.name}`}
                  key={link.name}
                  // onClick={() => handleClick(e, `/admin/${link.name}`)}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "lightgray" : "",
                    color: isActive ? "black" : "",
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
