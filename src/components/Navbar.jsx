import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Logo from "../assets/LOGO.png";
import Slider from "./Slider";
import Categories from "../pages/categories/Categories";
import { Link, Outlet } from "react-router-dom";
import { useGetCategoryQuery } from "../features/api";
// import LOGO 'LOGO1.png'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
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

  const data = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Services",
      url: "/services",
    },
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

  // if (categoryData) {
  //   console.log("last cat", categoryData[categoryData.length - 1]);
  // }

  return (
    <>
      <nav className="bg-white text-black py-2 pr-4 pl-2 w-full rounded-xl mt-4 mx-4 sticky top-0 z-50 border-b max-14inch:py-0 max-2sm:mx-1">
        {/* Main */}
        {/* <nav className="bg-[#E27D60] bg-cyan-500 text-white py-2 pr-4 pl-2 rounded-xl mt-4 mx-4 sticky z-50 top-2 border-b border-[#E27D60] shadow-xl"> */}
        {/* <nav className="bg-gradient-to-r from-cyan-400  to-yellow-700 text-white p-4 rounded-xl mt-4 mx-4 sticky top-2 border-b border-[#E27D60] shadow-xl"> */}
        <div className="max-w-full mx-auto px-4 max-2sm:px-1">
          <div className="flex items-center">
            {/* <div className="grid grid-cols-3 items-center"> */}
            <div className="flex items-center grow">
              <Link to="/">
                <h2>
                  <img
                    // src="/LOGO1.png"
                    src="/MainLogo.png"
                    alt="logo"
                    // className="w-[88%] h-16 my-[1px] max-sm:w-[95%]"
                    className="w-[88px] h-[70px] my-[1px] max-2sm:w-[60px] max-2sm:h-[55px] "
                  />
                </h2>
              </Link>
            </div>

            <SearchBar />

            <div className="hidden md:flex max-14inch:text-sm">
              <ul className="flex space-x-4">
                {data.map((d, i) => (
                  <li
                    key={i}
                    className="px-2 py-1 border border-white rounded hover:border-cyan-500"
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
            <ul className="flex  flex-col bg-white text-black border p-4 items-center justify-around space-y-2 rounded">
              {data.map((d, i) => (
                <li
                  key={i}
                  className="px-2 py-1 border border-white rounded hover:border-cyan-500"
                >
                  <Link to={`${d.url}`}>{d.name}</Link>
                </li>
              ))}
              {/* <li className="px-2 py-1 border border-white rounded hover:border-cyan-500">
                <Link to="/">Home</Link>
              </li>
              <li className="px-2 py-1 rounded hover:bg-cyan-500 hover:text-white">
                <Link to={`/about`}>About</Link>
              </li>
              <li className="px-2 py-1 rounded hover:bg-cyan-500 hover:text-white">
                <a href="#" className="">
                  Services
                </a>
              </li>
              <li className="px-2 py-1 rounded hover:bg-cyan-500 hover:text-white">
                <Link to={`/contact-us`}>Contact</Link>
              </li> */}
            </ul>
          </div>
        )}
      </nav>

      <div className="min-w-0 hidden sm:flex basis-0 sm:basis-full md:basis-full pb-4 border-b max-14inch:text-sm">
        <div className="hidden sm:flex flex-col items-center bg-primary-bg shadow-bottom1 w-full flex">
          <div className="flex flex-row w-full max-w-screen-xl justify-between px-4 max-14inch:px-14">
            {!categoryLoading &&
              categoryData.map((category, i) => (
                <Link
                  to={`/categories/brands/${category.id}`}
                  key={i}
                  onClick={() => setHoveredCategoryId(null)}
                >
                  <div
                    key={i}
                    className="relative flex flex-row items-center cursor-pointer group/navigation pt-4 hover:border-t-[3px] hover:border-t-cyan-500 hover:pt-[13px]"
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <span className="flex flex-col items-center justify-center w-full h-full no-underline">
                      <div
                        key={i}
                        className="hover:text-cyan-500 flex items-center gap-1"
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
                              category.brands.map((brand, index) => (
                                <Link
                                  to={`/categories/brands/products/${brand.id}`}
                                  onClick={() => setHoveredCategoryId(null)}
                                >
                                  <li
                                    key={index}
                                    className="py-1 px-2 rounded hover:bg-gray-100"
                                  >
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
                </Link>
              ))}

            <Link to={`/services`}>
              <div className="relative flex flex-row items-center cursor-pointer group/navigation pt-4 hover:border-t-[3px] hover:border-t-cyan-500 hover:pt-[13px]">
                <span className="">
                  <div className="hover:text-cyan-500 flex items-center gap-1">
                    <span>Services</span>
                  </div>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-sm:hidden relative bg-white px-1 mt-5 shadow-xl mx-auto w-full max-w-2xl rounded-2xl border-dashed border-2 border-gray-500">
        <div className="mx-auto flex w-full max-w-md flex-row items-center justify-around">
          <div
            className={`text-center py-2 w-1/2 ${
              location.pathname.substring(0, 6).includes("/ser")
                ? `text-green-600 text-2xl transition-colors duration-1000 ease-in-out w-full`
                : ``
            }`}
            onClick={() => {
              navigate("/services");
            }}
          >
            <button>Services</button>
          </div>
          <div
            className={`text-center p-2 w-1/2 ${
              location.pathname.substring(0, 6).includes("/cat")
                ? `bg-green-600 text-white rounded transition-colors duration-1000 ease-in-out w-full`
                : location.pathname === "/" ||
                  location.pathname.substring(0, 6).includes("/sell")
                ? `text-green-600 text-2xl rounded transition-colors duration-1000 ease-in-out w-full`
                : // ? `bg-green-600 text-white rounded transition-colors duration-1000 ease-in-out `
                  ``
            }`}
            onClick={() => {
              navigate("/");
            }}
          >
            <button>Sell</button>
          </div>
          <div
            className={`text-center p-2 w-1/2  ${
              location.pathname.includes("/recycle-categories")
                ? `text-green-600 text-2xl p-2 transition-colors duration-1000 ease-in-out w-full`
                : ``
            }`}
            onClick={() => {
              navigate("/recycle-categories");
            }}
          >
            <button>Recycle</button>
          </div>
        </div>
      </div>

      {/* <div className="min-w-0 flex sm:hidden mt-5 max-14inch:text-sm"> */}
      {/* <div className="grid grid-cols-3 bg-gray-100 justify-center w-[300px] items-center border rounded-full mx-auto sm:hidden"> */}
      <div className="min-w-0 flex sm:hidden mt-5 max-14inch:text-sm">
        <div className="grid grid-cols-3 bg-gray-50 bg-whit justify-center w-[300px] items-center border rounded-full mx-auto sm:hidden">
          <div
            className={`text-center py-2 rounded-tl-full rounded-bl-full ${
              location.pathname.substring(0, 6).includes("/ser")
                ? `bg-green-600 text-white transition-colors duration-1000 ease-in-out `
                : ``
            }`}
            // class={`text-center rounded-tl-full rounded-bl-full ${
            //   location.pathname.substring(0, 6).includes("/ser")
            //     ? `bg-green-600 text-white transition-colors duration-1000 ease-in-out `
            //     : ` inline-flex items-center px-4 py-2 text-sm font-medium  bg-transparent border rounded-s-lg hover:bg-white hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:text-white dark:border-gray-100 dark:text-black dark:hover:text-white dark:hover:bg-green-700 dark:focus:bg-green-700`
            // } `}
            onClick={() => {
              navigate("/services");
            }}
          >
            {/* <svg
              class="w-3 h-3 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg> */}
            <button>Services</button>
          </div>

          <div
            className={`text-center p-2 ${
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
            <button>Sell</button>
          </div>

          <div
            className={`text-center p-2 rounded-tr-full rounded-br-full  ${
              location.pathname.includes("/recycle-categories")
                ? `bg-green-600 text-white p-2 transition-colors duration-1000 ease-in-out `
                : ``
            }`}
            onClick={() => {
              navigate("/recycle-categories");
            }}
          >
            <button>Recycle</button>
          </div>
        </div>
      </div>

      {/* <Outlet />

      <div>Footer</div> */}
    </>
  );
};

export default Navbar;
