import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { SideBarContext } from "@pages/admin";
import * as ICON from "@icons";

export const SideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SideBarContext);

  const dispatch = useDispatch();

  const links = [
    // DASHBOARD
    {
      title: "Dashboard",
      links: [
        {
          name: "dashboard",
          icon: <ICON.DashboardIcon />,
        },
      ],
    },

    // CATEGORY
    {
      title: "Category",
      links: [
        {
          name: "add-category",
          icon: <ICON.CategoryIcon />,
        },
        {
          name: "categories-list",
          icon: <ICON.ListIndefiniteIcon />,
        },
      ],
      // show: hasPermission("create"),
    },

    // BRANDS and SERIES
    {
      title: "Brands",
      links: [
        {
          name: "add-brands",
          icon: <ICON.AirtableIcon />,
        },
        {
          name: "brands-list",
          icon: <ICON.ListIndefiniteIcon />,
        },
        {
          name: "add-series",
          icon: <ICON.DatabricksIcon />,
        },
      ],
    },

    // PRODUCTS
    {
      title: "Products",
      links: [
        {
          name: "add-products",
          icon: <ICON.AstroIcon />,
        },
        {
          name: "products-list",
          icon: <ICON.ListIndefiniteIcon />,
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
          icon: <ICON.QuestionAnswerIcon />,
        },
      ],
    },

    // ORDERS
    {
      title: "Orders",
      links: [
        {
          name: "orders",
          icon: <ICON.ListCheck2Icon />,
        },
        {
          name: "phone-numbers",
          icon: <ICON.NumbersIcon />,
        },
      ],
    },

    // RECYCLE
    {
      title: "Recycle Order",
      links: [
        {
          name: "recycle-orders",
          icon: <ICON.ListCheck2Icon />,
        },
      ],
    },

    // Testimonials
    {
      title: "Testimonials",
      links: [
        {
          name: "testimonial",
          icon: <ICON.AstroIcon />,
        },
      ],
    },

    // Complaints
    {
      title: "Complaints",
      links: [
        {
          name: "complaints",
          // icon: <SiSlides />,
          icon: <ICON.QuestionAnswerIcon />,
        },
      ],
    },

    // MANAGE STOCKS
    {
      title: "Manage Stocks",
      links: [
        {
          name: "manage-stocks",
          icon: <ICON.StockpilesIcon />,
        },
      ],
    },

    // SLIDERS & COUPONS
    {
      title: "Sliders & Coupons",
      links: [
        {
          name: "add-sliders",
          icon: <ICON.SlidesIcon />,
          // icon: <MdSlideshow />,
        },
        {
          name: "add-coupons",
          icon: <ICON.CentSignIcon />,
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
          icon: <ICON.GitDiffIcon />,
        },
      ],
    },

    // POSTs
    {
      title: "Posts",
      links: [
        {
          name: "create-post",
          icon: <ICON.JediOrderIcon />,
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
          icon: <ICON.ProfileIcon />,
        },
      ],
    },
    // UPDATE PROFILE
    {
      title: "ADMIN Channel",
      links: [
        {
          name: "admin-channel",
          icon: <ICON.AlertCircle />,
        },
      ],
    },
  ];
  // ].filter((item) => item.show);

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
                <ICON.CashIcon />
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
                <ICON.CloseIcon />
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
