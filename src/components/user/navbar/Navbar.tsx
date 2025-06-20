// import { useEffect, useState } from "react";
// import SearchBar2 from "./search/SearchBar2";
// import { useGetCategoriesQuery } from "@api";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ROUTES } from "@routes";
// import { generatePathWithParams } from "@utils/general/generatePathWithParams";
// import {
//   ArrowDownIcon,
//   ArrowUpIcon,
//   HomeIcon,
//   RecycleIcon,
//   ServiceIcon,
// } from "@icons";

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { data: categoryData, isLoading: categoryLoading } =
//     useGetCategoriesQuery();
//   // console.log("categoryData from NAV", categoryData);

//   const geoLocation = localStorage.getItem("location");

//   const location = useLocation();
//   const navigate = useNavigate();

//   // console.log("Current Pathname:", location.pathname.substring(0, 6));
//   // console.log("Current URL:", window.location.href);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const navOptions = [
//     {
//       name: "Home",
//       url: ROUTES.user.root,
//     },
//     {
//       name: "About",
//       url: ROUTES.user.about,
//     },
//     {
//       name: "Contact",
//       url: ROUTES.user.contactUs,
//     },
//   ];

//   const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

//   const handleMouseEnter = (categoryId) => {
//     setHoveredCategoryId(categoryId);
//   };

//   const handleMouseLeave = () => {
//     setHoveredCategoryId(null);
//   };

//   const [activePath, setActivePath] = useState({
//     home: false,
//     service: false,
//     recycle: false,
//   });

//   const pathSubStr = location.pathname.substring(0, 4);

//   const activeLink =
//     "text-secondary text-xl transition-colors transition-all duration-1000 ease-in-out";
//   const activeLinkName = "font-extrabold text-secondary";
//   const activeButton =
//     "bg-secondary-light/40 transition-all ease-in-out duration-1000";

//   function handleScrollTop() {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   function handleNavigation(to, uniqueURL) {
//     const location = localStorage.getItem("location");
//     if (to === "brands")
//       // navigate(generatePathWithParams(ROUTES.user.brands, uniqueURL));
//       navigate(`${location}/${uniqueURL}`);
//     else if (to === "products")
//       navigate(generatePathWithParams(ROUTES.user.products, uniqueURL));
//   }

//   useEffect(() => {
//     // console.log("Updating Active Path");
//     switch (pathSubStr) {
//       case "/":
//         setActivePath({
//           home: true,
//           sell: false,
//           service: false,
//           recycle: false,
//         });
//         break;
//       case "/ser":
//         setActivePath({
//           home: false,
//           sell: false,
//           service: true,
//           recycle: false,
//         });
//         break;
//       case "/rec":
//         setActivePath({
//           home: false,
//           sell: false,
//           service: false,
//           recycle: true,
//         });
//         break;
//       default:
//         setActivePath(activePath);
//     }
//     if (pathSubStr == "/cat" || pathSubStr == "sell") {
//       setActivePath({
//         home: false,
//         service: false,
//         recycle: false,
//       });
//     }
//   }, [pathSubStr]);

//   return (
//     <>
//       {/* <nav className="bg-white text-black py-2 pr-4 pl-2 w-full rounded-xl mt-4 mx-4 sticky top-0 z-50 border-b max-14inch:py-0 max-2sm:mx-1"> */}
//       <nav className="bg-white text-black p-2 max-sm:py-1 max-sm:rounded-xl w-full mt-1 sticky top-0 z-50 border-b max-14inch:py-0 font-serif">
//         <div className="max-w-full mx-auto px-4 max-2sm:px-1">
//           <div className="flex items-center">
//             {/* LOGO Image */}
//             <div className="flex items-center sm:grow">
//               <Link to="/" onClick={handleScrollTop}>
//                 <img
//                   // src="/images/NavLogo.jpg"
//                   src="/images/instanthg-logo.png"
//                   alt="InstantHub"
//                   // className="w-[120px] h-[65px] my-[1px] max-sm:w-[80px] max-sm:h-[55px] max-sm:p-[7px] p-[5px]"
//                   className="w-[65px] sm:w-[75px] p-1 sm:p-0 ml-0 sm:ml-2"
//                   loading="lazy" // Native lazy loading
//                 />
//               </Link>
//             </div>

//             {/* custom debounce hook */}
//             {/* <SearchBar /> */}

//             {/* Debounce used in below search */}
//             <SearchBar2 />

//             <div className="hidden md:flex max-14inch:text-sm">
//               <div className="flex items-center space-x-4 text-[16px] max-sm:text-sm">
//                 {navOptions?.map((d, i) => (
//                   <span
//                     aria-label={`${d.name} Button`}
//                     key={i}
//                     className={`px-2 py-1 border border-white rounded ${
//                       location.pathname === d.url
//                         ? "bg-secondary text-white "
//                         : ""
//                     }  hover:border-secondary`}
//                   >
//                     <Link to={`${d.url}`}>{d.name}</Link>
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div className="md:hidden ">
//               <button
//                 aria-label="menu"
//                 aria-expanded="false"
//                 aria-controls="menu"
//                 onClick={toggleMenu}
//                 className=" focus:outline-none"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   {isOpen ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16m-7 6h7"
//                     ></path>
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//         {isOpen && (
//           <div className="md:hidden  mt-2 text-center  float-right absolute right-0">
//             <ul className="flex  flex-col bg-white text-black border p-4 items-center justify-around space-y-2 rounded text-[16px] max-sm:text-sm">
//               {navOptions?.map((d, i) => (
//                 <li
//                   key={i}
//                   className={`px-2 py-1 border border-white rounded ${
//                     location.pathname === d.url
//                       ? "bg-secondary text-white "
//                       : ""
//                   }  hover:border-secondary`}
//                 >
//                   <Link to={`${d.url}`}>{d.name}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </nav>

//       <header className="w-full">
//         {/* BUTTONS -> Services - Home - Recylce on Large Screen */}
//         <div className="max-sm:hidden h-12 grid grid-cols-3 border-t border bg-white w-full text-sm font-thin">
//           {/* Service */}
//           <button
//             aria-label="Service button"
//             className={`flex justify-center items-center gap-1 text-center py-2 border-r ${
//               activePath.service && activeButton
//             }`}
//             onClick={() => {
//               navigate(`/services`);
//             }}
//           >
//             <span
//               className={`${activePath.service && activeLink} text-gray-400`}
//             >
//               {/* <MdHomeRepairService /> */}
//               <ServiceIcon size={16} />
//             </span>
//             <span className={`${activePath.service && activeLinkName}`}>
//               Services
//             </span>
//           </button>

//           {/* Home */}
//           <button
//             aria-label="Home button"
//             className={`flex justify-center items-center text-center gap-1 p-2 border-r ${
//               activePath.home && activeButton
//             }`}
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             <span className={`${activePath.home && activeLink} text-gray-400`}>
//               {/* <FaHome /> */}
//               <HomeIcon size={16} />
//             </span>
//             <span className={`${activePath.home && activeLinkName}`}>Home</span>
//           </button>

//           {/* Recycle */}
//           <button
//             aria-label="Recycle button"
//             className={`flex justify-center items-center gap-1 text-center p-2 ${
//               activePath.recycle && activeButton
//             }`}
//             onClick={() => {
//               navigate(ROUTES.user.recycleCategories);
//             }}
//           >
//             <span
//               className={`${activePath.recycle && activeLink} text-gray-400`}
//             >
//               {/* <FaRecycle /> */}
//               <RecycleIcon size={16} />
//             </span>
//             <span className={`${activePath.recycle && activeLinkName}`}>
//               Recycle
//             </span>
//           </button>
//         </div>

//         {/* All Categories row list */}
//         <div className="relative min-w-0 hidden sm:flex basis-0 sm:basis-full md:basis-full pb-3 border-b max-14inch:text-sm text-sm">
//           <div className="hidden sm:flex flex-col items-center bg-primary-bg shadow-bottom1 w-full flex">
//             <div className="flex flex-row w-full max-w-screen-xl justify-between px-4 max-14inch:px-14">
//               {!categoryLoading &&
//                 categoryData?.map((category, i) => (
//                   <div
//                     aria-label={`Hover or Click on Category ${category.name}`}
//                     key={i}
//                     onClick={() => {
//                       setHoveredCategoryId(null);
//                       handleNavigation("brands", category.uniqueURL);
//                     }}
//                   >
//                     <div
//                       key={i}
//                       className="relative flex flex-row items-center cursor-pointer group/navigation pt-4 hover:border-t-[3px] hover:border-t-secondary hover:pt-[13px]"
//                       onMouseEnter={() => handleMouseEnter(category.id)}
//                       onMouseLeave={() => handleMouseLeave()}
//                     >
//                       <span className="flex flex-col items-center justify-center w-full h-full no-underline">
//                         <div
//                           key={i}
//                           className="hover:text-secondary flex items-center gap-1"
//                         >
//                           <span>Sell {category.name}</span>
//                           {hoveredCategoryId === category.id ? (
//                             <ArrowUpIcon size={16} />
//                           ) : (
//                             <ArrowDownIcon size={16} />
//                           )}
//                         </div>

//                         {hoveredCategoryId === category.id && (
//                           <div
//                             className={`${
//                               categoryData[categoryData.length - 1].id ===
//                               hoveredCategoryId
//                                 ? `right-0`
//                                 : `${
//                                     categoryData[0].id === hoveredCategoryId &&
//                                     `left-0`
//                                   }`
//                             } absolute z-10 top-full mt-0 pt-3 bg-white shadow-md p-2  w-[150%]`}
//                             onMouseEnter={() => handleMouseEnter(category.id)}
//                           >
//                             <h2 className="py-2 font-bold">Brands</h2>
//                             <ul>
//                               {category.brands.length > 0 ? (
//                                 category.brands?.map((brand, index) => (
//                                   <Link
//                                     key={index}
//                                     onClick={() => {
//                                       setHoveredCategoryId(null);
//                                       handleNavigation(
//                                         "products",
//                                         brand.uniqueURL
//                                       );
//                                     }}
//                                   >
//                                     <li className="py-1 px-2 rounded hover:bg-gray-100">
//                                       {brand.name}
//                                     </li>
//                                   </Link>
//                                 ))
//                               ) : (
//                                 <div>
//                                   <div>
//                                     <h2 className="text-sm">No Brands</h2>
//                                   </div>
//                                 </div>
//                               )}
//                             </ul>
//                           </div>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@routes";
import { NavMenu } from "./components";
import { NavCategoriesList } from "./components/NavCategoriesList";
import { SearchBar } from "../search";

export interface IActivePath {
  home: boolean;
  service: boolean;
  recycle: boolean;
}

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navOptions = useMemo(
    () => [
      { name: "Home", url: ROUTES.user.root },
      { name: "About", url: ROUTES.user.about },
      { name: "Contact", url: ROUTES.user.contactUs },
    ],
    []
  );

  const pathPrefix = location.pathname.substring(0, 4);

  const [activePath, setActivePath] = useState({
    home: false,
    service: false,
    recycle: false,
  });

  useEffect(() => {
    const newPath = {
      home:
        pathPrefix === "/" &&
        !["/ser", "/rec", "/cat", "sell"].includes(pathPrefix),
      service: pathPrefix === "/ser",
      recycle: pathPrefix === "/rec",
    };
    setActivePath(newPath);
  }, [location.pathname]);

  const getNavLinkClass = (url: string) =>
    `px-2 py-1 border border-white rounded ${
      location.pathname === url ? "bg-instant-mid text-white" : ""
    } hover:border-secondary`;

  return (
    <>
      <nav className="bg-white text-black p-2 max-sm:py-1 max-sm:rounded-xl w-full mt-1 sticky top-0 z-50 border-b font-serif">
        <div className="max-w-full mx-auto px-4 max-2sm:px-1">
          <div className="flex items-center">
            <div className="flex items-center sm:grow">
              <Link to="/" onClick={scrollToTop}>
                <img
                  src="/images/instanthg-logo.png"
                  alt="InstantHub"
                  className="w-[65px] sm:w-[75px] p-1 sm:p-0"
                  loading="lazy"
                />
              </Link>
            </div>

            <SearchBar />

            <div className="hidden md:flex max-14inch:text-sm">
              <div className="flex items-center space-x-4 text-[16px] max-sm:text-sm">
                {navOptions.map((d, i) => (
                  <span key={i} className={getNavLinkClass(d.url)}>
                    <Link to={d.url}>{d.name}</Link>
                  </span>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-2 text-center absolute right-0">
            <ul className="flex flex-col bg-white text-black border p-4 items-center space-y-2 rounded text-[16px] max-sm:text-sm">
              {navOptions.map((d, i) => (
                <li key={i} className={getNavLinkClass(d.url)}>
                  <Link to={d.url}>{d.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <header className="w-full mx-auto">
        <NavMenu activePath={activePath} />

        <NavCategoriesList />
      </header>
    </>
  );
};
