import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaUser, FaWhatsapp } from "react-icons/fa";
import { SiXdadevelopers } from "react-icons/si";
import { FcServices } from "react-icons/fc";

const Footer = () => {
  // useEffect(() => {
  //   function handleScroll() {
  //     var footer = document.querySelector(".footer");
  //     var developedBy = document.querySelector(".developed-by");
  //     if (isElementInViewport(footer)) {
  //       developedBy.classList.remove("translate-x-full");
  //     } else {
  //       developedBy.classList.add("translate-x-full");
  //     }
  //   }

  //   window.addEventListener("scroll", handleScroll);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // // Function to check if an element is in the viewport
  // function isElementInViewport(el) {
  //   var rect = el.getBoundingClientRect();
  //   return (
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <=
  //       (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  // }

  return (
    // JSX
    <div className=" w-full sm:pt-10 mt-2  bg-[#E27D60] bg-cyan-500 px-4 pt-2 pb-[4px] max-sm:text-md">
      <div className="mx-auto max-w-screen-xl flex gap-4 justify-evenly max-md:gap-1">
        <div className="px-4 sm:px-0 flex flex-col items-center">
          <div>
            <img
              // src="/LOGO1.png"
              src="/footer-logo.png"
              alt="logo"
              // className="w-[88%] h-16 my-[1px] max-sm:w-[95%]"
              className="w-[95px] h-[75px] h- my-[1px] max-sm:w-[95%]"
            />
          </div>
          <div>
            <span className="text-xs text-white">Follow Us On</span>
            <ul className="flex gap-3 text-md my-3">
              <li>
                <FaFacebookF />
              </li>
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaWhatsapp />
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="text-white font-bold py-2">
            <label htmlFor="">Company</label>
          </div>
          <div className="pl-2">
            <ul className="flex flex-col text-[13px] leading-8 font-thin">
              <li>
                <Link to={`/about`}>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span>Partner with Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="text-white font-bold py-2">
            <label htmlFor="">Support</label>
          </div>
          <div className="pl-2">
            <ul className="flex flex-col text-[13px] leading-8 font-thin">
              <li>
                <Link>
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link to={`/contact-us`}>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span>Warranty Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="text-white font-bold py-2">
            <label htmlFor="">More</label>
          </div>
          <div className="pl-2">
            <ul className="flex flex-col text-[13px] leading-8 font-thin">
              <li>
                <Link to={`/privacy-policy`}>
                  <span>Privary Policy</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-md:hidden">
          <div className="text-white font-bold py-2">
            <label htmlFor="">Our Office</label>
          </div>
          <div className="pl-2 flex flex-col items-center">
            <p className="text-xs">RT Nagar, Bangalore-560032</p>
            <p className="text-xs">Ph: +91 1234567890</p>
            <p className="text-xs">sale@instantcashpick.com</p>
            <p className="text-xs">info@instantcashpick.com</p>
          </div>
        </div>
      </div>
      {/* <div className="text-end p-0 m-0 text-xs text-white developed-by transition-transform duration-3000 transform translate-x-full md:translate-x-0">
        <h2>Developed by: Yusufulla Qureshi</h2>
      </div> */}
      <div className="flex items-center justify-end p-0 text-white">
        <div className="flex flex-col items-center">
          {/* Render the user icon */}
          <div className="flex items-center">
            <FcServices />
            <p className="text-sm flex items-center justify-center max-sm:text-[10px]">
              Developed by: Yusufulla Qureshi
            </p>
          </div>
          {/* <p className="text-[9px]">qureshiyusuff@gmail.com</p> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
