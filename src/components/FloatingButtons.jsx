// FloatingButtons.jsx
import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaPhoneAlt,
  FaRecycle,
  FaHome,
  FaAngleDown,
  FaAngleUp,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { GiSellCard } from "react-icons/gi";
import { MdHomeRepairService } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../features/api";
// import { FaPhone } from "react-icons/fa";

const FloatingButtons = () => {
  const { data: categories, categoriesLoading: categoriesLoading } =
    useGetCategoryQuery();

  const defaultMessage =
    "Hi There! Need help to sell on https://www.instanthub.in/";

  const navigate = useNavigate();
  const pathSubStr = location.pathname.substring(0, 4);
  // console.log("pathSubStr", pathSubStr);

  const [activePath, setActivePath] = useState({
    home: false,
    sell: false,
    service: false,
    recycle: false,
  });

  const [showCategories, setShowCategories] = useState(false);

  const activeLink =
    "text-secondary text-lg transition-colors transition-all duration-1000 ease-in-out";
  const activeLinkName = "font-extrabold text-xs text-secondary";

  const activeLinkButton =
    "bg-secondary-light/40 transition-all duration-1000 ease-linear";

  const [isScrolled, setIsScrolled] = useState(false);
  // console.log("isScrolled", isScrolled);

  // Scroll handle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Updates state whenever the user scrolls
    };

    window.addEventListener("scroll", handleScroll); // Attaches the scroll listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []); // Empty dependency array ensures the listener is added only once

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); // Scrolls to the bottom
  };

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
      case "/cat":
        setActivePath({
          home: false,
          sell: true,
          service: false,
          recycle: false,
        });
        break;
      case "/sel":
        setActivePath({
          home: false,
          sell: true,
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
  }, [pathSubStr]);

  // console.log("activePath", activePath, "showCategories:", showCategories);

  return (
    <>
      {/* Buttons on right of screen - WhatsApp - Call - Email */}
      <div
        className={` ${isScrolled ? "top-[58%]" : "top-[63%]"} 
        fixed bottom-0 h-11 z-10  -translate-y-1/2 right-4 max-sm:right-2 w-auto flex flex-col items-center space-y-4 bg-gray-800 bg-transparent`}
      >
        {isScrolled && (
          <button
            onClick={scrollToTop}
            className="flex-none text-gray-500 max-sm:text-gray-900 text-2xl hover:text-gray-900
                      w-fit flex justify-center items-center rounded-md transition-all ease-in-out duration-300"
          >
            <FaAngleUp />
            {/* <FaChevronUp /> */}
          </button>
        )}
        <a
          href={`https://wa.me/+918722288017?text=${defaultMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none bg-green-500 text-white p-4 max-sm:p-3 w-fit flex justify-center items-center rounded-full shadow-lg hover:bg-green-600 transition "
        >
          <FaWhatsapp className="size-6 max-sm:size-6" />
        </a>
        <a
          href="tel:8722288017"
          className="flex-none bg-blue-500 text-white p-4 max-sm:p-3 w-fit flex justify-center items-center rounded-full shadow-lg hover:bg-blue-600 transition "
        >
          <FaPhoneAlt size={24} />
        </a>
        <a
          href="mailto:instantcashpick@gmail.com"
          className="flex-none bg-red-500 text-white p-4 max-sm:p-3 w-fit flex justify-center items-center rounded-full shadow-lg hover:bg-red-600 transition "
        >
          <FaEnvelope size={24} />
        </a>
        <button
          onClick={scrollToBottom}
          className="flex-none text-gray-700 text-2xl hover:text-[29px] hover:text-gray-900 hover:pt-1 
                    w-fit flex justify-center items-center rounded-md transition-all ease-in-out duration-300 max-sm:hidden"
        >
          <FaAngleDown />
          {/* <FaChevronDown /> */}
        </button>
      </div>

      {/* Home - Sell */}
      <div className="fixed bottom-0 h-[52px] w-full z-10 flex">
        <div className="grid grid-cols-4 border-t shadow-xl bg-white w-full sm:hidden text-sm font-thin">
          {/* Home */}
          <div
            className={`flex justify-center text-center p-2 border-r ${
              activePath.home && activeLinkButton
            }`}
            onClick={() => {
              navigate("/");
            }}
          >
            <button className="flex flex-col items-center gap-1 text-center">
              <span
                className={`${activePath.home && activeLink} text-gray-400`}
              >
                <FaHome />
              </span>
              <span className={`${activePath.home && activeLinkName} `}>
                Home
              </span>
            </button>
          </div>

          {/* Sell */}
          <div
            className={`relative flex justify-center text-center p-2 border-r ${
              activePath.sell && activeLinkButton
            }`}
            onClick={() => {
              // navigate("/");
              setShowCategories((prev) => !prev);
            }}
          >
            {showCategories && (
              <div
                // className={`absolute bottom-12 flex flex-col items-center bg-slate-50 border border-black border-b-secondary-light px-2 rounded-lg py-2 transition-all duration-1000 ease-in `}
                className={`absolute bottom-12 flex flex-col items-center bg-secondary text-white border border-black border-b-secondary-light px-2 rounded-lg py-2 transition-all duration-1000 ease-in `}
              >
                {categories?.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/brands/${cat.id}`}
                    className="py-2 font-[400] hover:font-semibold text-sm border-b w-[130px]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
            <button className="flex flex-col items-center gap-1 text-center">
              <span
                className={`${activePath.sell && activeLink} text-gray-400`}
              >
                <GiSellCard />
              </span>
              <span className={`${activePath.sell && activeLinkName}`}>
                Sell
              </span>
            </button>
          </div>

          {/* Service */}
          <div
            className={`flex justify-center text-center py-2 border-r ${
              activePath.service && activeLinkButton
            }`}
            onClick={() => {
              navigate("/services");
            }}
          >
            <button className="flex flex-col items-center gap-1 text-center">
              <span
                className={`${activePath.service && activeLink} text-gray-400`}
              >
                <MdHomeRepairService />
              </span>
              <span className={`${activePath.service && activeLinkName}`}>
                Services
              </span>
            </button>
          </div>

          {/* Recycle */}
          <div
            className={`flex justify-center text-center p-2 ${
              activePath.recycle && activeLinkButton
            }`}
            onClick={() => {
              navigate("/recycle-categories");
            }}
          >
            <button className="flex flex-col items-center gap-1 text-center">
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
        </div>
      </div>
    </>
  );
};

export default FloatingButtons;

{
  /* <a
          href={`https://wa.me/+918722288017?text=${defaultMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 lg:flex-none bg-green-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-green-600 transition "
        >
          <FaWhatsapp size={24} />
        </a>
        <a
          href="tel:8722288017"
          className="flex-1 lg:flex-none bg-blue-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-blue-600 transition "
        >
          <FaPhoneAlt size={24} />
        </a>
        <a
          href="mailto:instantcashpick@gmail.com"
          className="flex-1 lg:flex-none bg-red-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-red-600 transition "
        >
          <FaEnvelope size={24} />
        </a> */
}

/* Button on left of screen */
{
  /* <div className="fixed bottom-0 h-11 right-0 w-full z-10 lg:top-[65%] lg:-translate-y-1/2 lg:right-4 lg:w-auto flex lg:flex-col lg:space-y-4 bg-gray-800 lg:bg-transparent">
        <a
          href={`https://wa.me/+918722288017?text=${defaultMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 lg:flex-none bg-green-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-green-600 transition "
        >
          <FaWhatsapp size={24} />
        </a>
        <a
          href="tel:8722288017"
          className="flex-1 lg:flex-none bg-blue-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-blue-600 transition "
        >
          <FaPhoneAlt size={24} />
        </a>
        <a
          href="mailto:instantcashpick@gmail.com"
          className="flex-1 lg:flex-none bg-red-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-red-600 transition "
        >
          <FaEnvelope size={24} />
        </a>
      </div> */
}

// className={`flex justify-center text-center p-2 border-r ${
//   location.pathname.substring(0, 6).includes("/cat")
//     ? ` text-secondary transition-colors duration-1000 ease-in-out `
//     : location.pathname === "/" ||
//       location.pathname.substring(0, 6).includes("/sell")
//     ? ` text-secondary transition-colors duration-1000 ease-in-out `
//     : ``
// }`}
