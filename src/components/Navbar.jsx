import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchBar2 from "./SearchBar2";
import Logo from "../assets/LOGO.png";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../features/api";
import { FaAngleDown, FaAngleUp, FaHome, FaRecycle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { MdHomeRepairService } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery();
  // console.log("categoryData from NAV", categoryData);

  const location = useLocation();
  const navigate = useNavigate();

  // console.log("Current Pathname:", location.pathname.substring(0, 6));
  // console.log("Current URL:", window.location.href);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navOptions = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    // {
    //   name: "Services",
    //   url: "/services",
    // },
    {
      name: "Contact",
      url: "/contact-us",
    },
  ];

  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

  const handleMouseEnter = (categoryId) => {
    setHoveredCategoryId(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategoryId(null);
  };

  const [activePath, setActivePath] = useState({
    home: false,
    service: false,
    recycle: false,
  });

  const pathSubStr = location.pathname.substring(0, 4);

  const activeLink =
    "text-secondary text-xl transition-colors transition-all duration-1000 ease-in-out";
  const activeLinkName = "font-extrabold text-secondary";
  const activeButton =
    "bg-secondary-light/40 transition-all ease-in-out duration-1000";

  function handleScrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    // console.log("Updating Active Path");
    switch (pathSubStr) {
      case "/":
        setActivePath({
          home: true,
          sell: false,
          service: false,
          recycle: false,
        });
        break;
      case "/ser":
        setActivePath({
          home: false,
          sell: false,
          service: true,
          recycle: false,
        });
        break;
      case "/rec":
        setActivePath({
          home: false,
          sell: false,
          service: false,
          recycle: true,
        });
        break;
      default:
        setActivePath(activePath);
    }
    if (pathSubStr == "/cat" || pathSubStr == "sell") {
      setActivePath({
        home: false,
        service: false,
        recycle: false,
      });
    }
  }, [pathSubStr]);

  return (
    <>
      {/* <nav className="bg-white text-black py-2 pr-4 pl-2 w-full rounded-xl mt-4 mx-4 sticky top-0 z-50 border-b max-14inch:py-0 max-2sm:mx-1"> */}
      <nav className="bg-white text-black py-2 pr-4 pl-2 w-full rounded-xl mt-4 sticky top-0 z-50 border-b max-14inch:py-0">
        <div className="max-w-full mx-auto px-4 max-2sm:px-1">
          <div className="flex items-center">
            {/* <div className="grid grid-cols-3 items-center"> */}
            <div className="flex items-center grow">
              <Link to="/" onClick={handleScrollTop}>
                <h2>
                  <img
                    // src="/images/NewLogoW.jpeg"
                    src="/images/NavLogo.jpg"
                    alt="InstantHub"
                    // className="w-[88px] h-[65px] my-[1px] max-2sm:w-[60px] max-2sm:h-[50px] max-2sm:py-[2px] "
                    // className="w-[115px] h-[60px] my-[1px] max-2sm:w-[60px] max-2sm:h-[45px] max-2sm:py-[2px] "
                    className="w-[90%] h-[65px] my-[1px] max-sm:w-[85%] max-sm:h-[55px] max-sm:p-[5px] p-[5px]"
                  />
                </h2>
              </Link>
            </div>

            {/* custom debounce hook */}
            {/* <SearchBar /> */}

            {/* Debounce used in below search */}
            <SearchBar2 />

            <div className="hidden md:flex max-14inch:text-sm">
              <ul className="flex items-center space-x-4 text-[16px] max-sm:text-sm">
                {navOptions?.map((d, i) => (
                  <li
                    key={i}
                    className={`px-2 py-1 border border-white rounded ${
                      location.pathname === d.url
                        ? "bg-secondary text-white "
                        : ""
                    }  hover:border-secondary`}
                  >
                    <Link to={`${d.url}`}>{d.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:hidden ">
              <button onClick={toggleMenu} className=" focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden  mt-2 text-center  float-right absolute right-0">
            <ul className="flex  flex-col bg-white text-black border p-4 items-center justify-around space-y-2 rounded text-[16px] max-sm:text-sm">
              {navOptions?.map((d, i) => (
                <li
                  key={i}
                  className={`px-2 py-1 border border-white rounded ${
                    location.pathname === d.url
                      ? "bg-secondary text-white "
                      : ""
                  }  hover:border-secondary`}
                >
                  <Link to={`${d.url}`}>{d.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <header>
        {/* BUTTONS -> Services - Home - Recylce on Large Screen */}
        <div className="max-sm:hidden h-12 grid grid-cols-3 border-t border bg-white w-full text-sm font-thin">
          {/* Service */}
          <button
            aria-label="Service button"
            className={`flex justify-center items-center gap-1 text-center py-2 border-r ${
              activePath.service && activeButton
            }`}
            onClick={() => {
              navigate("/services");
            }}
          >
            <span
              className={`${activePath.service && activeLink} text-gray-400`}
            >
              <MdHomeRepairService />
            </span>
            <span className={`${activePath.service && activeLinkName}`}>
              Services
            </span>
          </button>

          {/* Home */}
          <button
            aria-label="Home button"
            className={`flex justify-center items-center text-center gap-1 p-2 border-r ${
              activePath.home && activeButton
            }`}
            onClick={() => {
              navigate("/");
            }}
          >
            <span className={`${activePath.home && activeLink} text-gray-400`}>
              <FaHome />
            </span>
            <span className={`${activePath.home && activeLinkName}`}>Home</span>
          </button>

          {/* Recycle */}
          <button
            aria-label="Recycle button"
            className={`flex justify-center items-center gap-1 text-center p-2 ${
              activePath.recycle && activeButton
            }`}
            onClick={() => {
              navigate("/recycle-categories");
            }}
          >
            <span
              className={`${activePath.recycle && activeLink} text-gray-400`}
            >
              <FaRecycle />
            </span>
            <span className={`${activePath.recycle && activeLinkName}`}>
              Recycle
            </span>
          </button>
        </div>

        {/* All Categories row list */}
        <div className="relative min-w-0 hidden sm:flex basis-0 sm:basis-full md:basis-full pb-3 border-b max-14inch:text-sm text-sm">
          <div className="hidden sm:flex flex-col items-center bg-primary-bg shadow-bottom1 w-full flex">
            <div className="flex flex-row w-full max-w-screen-xl justify-between px-4 max-14inch:px-14">
              {!categoryLoading &&
                categoryData?.map((category, i) => (
                  <div
                    // to={`/categories/brands/${category.id}`}
                    key={i}
                    onClick={() => {
                      setHoveredCategoryId(null);
                      navigate(`/categories/brands/${category.id}`);
                    }}
                  >
                    <div
                      key={i}
                      className="relative flex flex-row items-center cursor-pointer group/navigation pt-4 hover:border-t-[3px] hover:border-t-secondary hover:pt-[13px]"
                      onMouseEnter={() => handleMouseEnter(category.id)}
                      onMouseLeave={() => handleMouseLeave()}
                    >
                      <span className="flex flex-col items-center justify-center w-full h-full no-underline">
                        <div
                          key={i}
                          className="hover:text-secondary flex items-center gap-1"
                        >
                          <span>Sell {category.name}</span>
                          {hoveredCategoryId === category.id ? (
                            <FaAngleUp />
                          ) : (
                            <FaAngleDown />
                          )}
                        </div>

                        {hoveredCategoryId === category.id && (
                          <div
                            className={`${
                              categoryData[categoryData.length - 1].id ===
                              hoveredCategoryId
                                ? `right-0`
                                : `${
                                    categoryData[0].id === hoveredCategoryId &&
                                    `left-0`
                                  }`
                            } absolute z-10 top-full mt-0 pt-3 bg-white shadow-md p-2  w-[150%]`}
                            onMouseEnter={() => handleMouseEnter(category.id)}
                          >
                            <h2 className="py-2 font-bold">Brands</h2>
                            <ul>
                              {category.brands.length > 0 ? (
                                category.brands?.map((brand, index) => (
                                  <Link
                                    key={index}
                                    to={`/categories/brands/products/${brand.id}`}
                                    onClick={() => setHoveredCategoryId(null)}
                                  >
                                    <li className="py-1 px-2 rounded hover:bg-gray-100">
                                      {brand.name}
                                    </li>
                                  </Link>
                                ))
                              ) : (
                                <div>
                                  <div>
                                    <h2 className="text-sm">No Brands</h2>
                                  </div>
                                </div>
                              )}
                            </ul>
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                ))}

              {/* <Link to={`/services`}>
                <div className="relative flex flex-row items-center cursor-pointer group/navigation pt-4 hover:border-t-[3px] hover:border-t-secondary-light hover:pt-[13px]">
                  <span className="">
                    <div className="hover:text-secondary flex items-center gap-1">
                      <span>Services</span>
                    </div>
                  </span>
                </div>
              </Link> */}
            </div>
          </div>
        </div>

        {/* Small Screen - Services - Sell - Recylce  */}
        {/* <div className="min-w-0 flex sm:hidden mt-1 max-14inch:text-sm">
        <div className="grid grid-cols-3 bg-gray-50 bg-white mx-1 w-full shadow border-l border-r border-b-0 rounded-xl sm:hidden">
          <div
            className={`flex justify-center text-center py-2 rounded-tl-xl rounded-bl-xl ${
              location.pathname.substring(0, 6).includes("/ser")
                ? `bg-green-600 text-white transition-colors duration-1000 ease-in-out `
                : ``
            }`}
            onClick={() => {
              navigate("/services");
            }}
          >
            <button className="flex items-center gap-1 text-center">
              <span className="">Services</span>
              <span>
                <MdHomeRepairService />
              </span>
            </button>
          </div>

          <div
            className={`flex justify-center text-center p-2 ${
              location.pathname.substring(0, 6).includes("/cat")
                ? `bg-green-600 text-white rounded transition-colors duration-1000 ease-in-out `
                : location.pathname === "/" ||
                  location.pathname.substring(0, 6).includes("/sell")
                ? `bg-green-600 text-white rounded transition-colors duration-1000 ease-in-out `
                : ``
            }`}
            onClick={() => {
              navigate("/");
            }}
          >
            <button className="flex items-center gap-1 text-center">
              <span>Sell</span>
              <span>
                <GiSellCard />
              </span>
            </button>
          </div>

          <div
            // className={`text-center p-2 rounded-tr-full rounded-br-full  ${
            className={`flex justify-center text-center p-2 rounded-tr-xl rounded-br-xl  ${
              location.pathname.includes("/recycle-categories")
                ? `bg-green-600 text-white p-2 transition-colors duration-1000 ease-in-out `
                : ``
            }`}
            onClick={() => {
              navigate("/recycle-categories");
            }}
          >
            <button className="flex items-center gap-1 text-center">
              <span>Recycle</span>
              <span>
                <FaRecycle />
              </span>
            </button>
          </div>
        </div>
      </div> */}

        {/* <Outlet />
      <div>Footer</div> */}
      </header>
    </>
  );
};

export default Navbar;
