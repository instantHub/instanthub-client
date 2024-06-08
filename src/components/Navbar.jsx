import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Logo from "../assets/LOGO.png";
import Slider from "./Slider";
import Categories from "../pages/categories/Categories";
import { Link, Outlet } from "react-router-dom";
import { useGetCategoryQuery } from "../features/api";
// import LOGO 'LOGO1.png'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery();
  console.log("categoryData from NAV", categoryData);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

  const handleMouseEnter = (categoryId) => {
    setHoveredCategoryId(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategoryId(null);
  };

  if (categoryData) {
    console.log("last cat", categoryData[categoryData.length - 1]);
  }

  return (
    <>
      <nav className="bg-white text-black py-2 pr-4 pl-2 rounded-xl mt-4 mx-4 sticky top-0 z-50 border-b">
        {/* Main */}
        {/* <nav className="bg-[#E27D60] bg-cyan-500 text-white py-2 pr-4 pl-2 rounded-xl mt-4 mx-4 sticky z-50 top-2 border-b border-[#E27D60] shadow-xl"> */}
        {/* <nav className="bg-gradient-to-r from-cyan-400  to-yellow-700 text-white p-4 rounded-xl mt-4 mx-4 sticky top-2 border-b border-[#E27D60] shadow-xl"> */}
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center">
            {/* <div className="grid grid-cols-3 items-center"> */}
            <div className="flex items-center grow">
              <Link to="/">
                <h2>
                  <img
                    // src="/LOGO1.png"
                    src="/2.png"
                    alt="logo"
                    // className="w-[88%] h-16 my-[1px] max-sm:w-[95%]"
                    className="w-[88px] h-[70px] my-[1px] max-sm:w-[95%]"
                  />
                </h2>
              </Link>
            </div>

            <SearchBar />

            <div className="hidden  md:flex ">
              <ul className="flex space-x-4">
                <li className="">
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={`/about`}>About</Link>
                </li>
                <li>
                  <a href="#" className="">
                    Services
                  </a>
                </li>
                <li>
                  <Link to={`/contact-us`}>Contact</Link>
                </li>
                {/* <li>
                  <a href="src/components/emailcheck.html">Email check</a>
                </li>
                <li>
                  <a href="src/components/emailcheck2.html">Email check2</a>
                </li> */}
                {/* <li>
                  <a href="/admin/login" className="">
                    Admin
                  </a>
                </li> */}
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
          <div className="md:hidden mt-2 text-center  float-right absolute right-0">
            <ul className="flex flex-col bg-white text-black border p-4 items-center justify-around space-y-2 rounded">
              <li className="px-2 py-1 border border-white rounded hover:border-cyan-500">
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
              </li>
            </ul>
          </div>
        )}
      </nav>

      <div className="min-w-0 hidden sm:flex basis-0 sm:basis-full md:basis-full pb-4 border-b">
        <div className="hidden sm:flex flex-col items-center bg-primary-bg shadow-bottom1 w-full flex">
          <div className="flex flex-row w-full max-w-screen-xl justify-between px-4 ">
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
          </div>
        </div>
      </div>

      {/* <Outlet />

      <div>Footer</div> */}
    </>
  );
};

export default Navbar;
