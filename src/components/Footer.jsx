import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaUser, FaWhatsapp } from "react-icons/fa";
import { SiXdadevelopers } from "react-icons/si";
import { FcServices } from "react-icons/fc";

const Footer = () => {
  const listItemStyle =
    "hover:text-white px-2 py-1 max-sm:text-xs text-sm hover:text-[16px] hover:bg-secondary-light hover:text-secondary rounded-md transition-all ease-in-out duration-1000";
  return (
    // <div className="w-full sm:pt-10 sm:pb-5 mt-2 bg-secondary px-4 pt-2 pb-[4px] max-sm:text-md max-sm:px-[2px] max-lg:pb-10 max-sm:pb-16">
    <div
      className={`bg-secondary w-full sm:pt-10 sm:pb-5 mt-2 px-4 pt-2 pb-[4px] max-sm:text-md max-sm:px-[2px] max-lg:pb-10 max-sm:pb-16`}
    >
      <div className="mx-auto max-w-screen-xl flex gap-4 justify-evenly max-md:gap-1 max-sm:flex-col max-sm:pl-5">
        {/* Large Screen */}
        <div className="px-4 sm:px-0 flex flex-col items-center max-sm:hidden">
          <div className="pb-5">
            <img
              src="/images/NewLogoB.jpeg"
              // src="/images/NavLogo.jpg"
              alt="logo"
              // className="w-[88%] h-16 my-[1px] max-sm:w-[95%]"
              className="w-full h-[75px] my-[1px] max-sm:w-[60px] max-sm:h-[50px]"
            />
            {/* <p className="flex flex- items-center gap-1 text-white ">
              <span className="font-serif text-3xl max-sm:text-lg">
                Instant
              </span>
              <span className="font-serif text-3xl max-sm:text-sm">Hub</span>
            </p> */}
          </div>

          {/* Follow Us */}
          <div className="flex flex-col justify-center items-center">
            <p className="text-xs text-center text-white max-sm:text-[10px]">
              Follow Us On
            </p>
            <ul className="flex items-center gap-3 text-md my-3 text-xl">
              <li className="hover:text-white text-blue-600">
                <FaFacebookF />
              </li>
              <li className="hover:text-white text-orange-600">
                <FaInstagram />
              </li>
              <li className="hover:text-white bg-green-600 rounded-full text-white">
                <FaWhatsapp />
              </li>
            </ul>
          </div>
        </div>

        {/* Small Screen */}
        {/* <div className="px-4 sm:px-0 flex flex-col items-center sm:hidden max-sm:flex-row max-sm:justify-center max-sm:gap-5">
          <div className="flex flex-  gap-1 justify-between w-full">
            <div className="">
           
              <p className="flex items-center gap-1 text-white">
                <span className="font-serif text-3xl max-sm:text-lg">
                  Instant
                </span>
                <span className="font-serif text-3xl max-sm:text-lg">Hub</span>
              </p>
            </div>
            <div className="">
              <span className="text-xs text-center text-white max-sm:text-[10px]">
                Follow Us On
              </span>
              <ul className="flex gap-3 text-md my-3">
                <li className="hover:text-white">
                  <FaFacebookF />
                </li>
                <li className="hover:text-white">
                  <FaInstagram />
                </li>
                <li className="hover:text-white">
                  <FaWhatsapp />
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Small Screen */}
        {/* Company  - Support  - More */}
        <div className="grid grid-cols-4 w-full max-sm:grid-cols-2 max-sm:gap-2">
          {/* Business Name */}
          <div className="md:hidden flex items-center">
            <img
              src="/images/NewLogoB.jpeg"
              alt="logo"
              className="w-full h-[75px] my-[1px] max-sm:w-[75%] max-sm:h-[75px] p-1"
            />

            {/* <p className="flex items-center gap-1 font-serif text-2xl text-white">
              <span className="">Instant</span>
              <span className="">Hub</span>
            </p> */}
          </div>

          {/* Follow Us */}
          <div className="md:hidden flex flex-col gap-3 py-4">
            <p className="text-xs text-white">Follow Us On</p>
            <ul className="flex gap-3 text-md">
              <li className="hover:text-white text-blue-600">
                <FaFacebookF />
              </li>
              <li className="hover:text-white text-orange-600">
                <FaInstagram />
              </li>
              <li className="hover:text-white bg-green-600 rounded-full text-white">
                <FaWhatsapp />
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col justify-start items-center max-sm:items-start">
            <div className="text-white font-bold py-1 max-sm:text-sm">
              <span>Company</span>
            </div>
            <div className="pl-2">
              <ul className="flex flex-col text-[13px] text-white leading-8 font-thin max-sm:leading-6">
                <li>
                  <Link to={`/about`}>
                    <span className={`${listItemStyle}`}>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span className={`${listItemStyle}`}>Partner with Us</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support */}
          <div className="flex flex-col justify-start items-center max-sm:items-start">
            <div className="text-white font-bold py-1 max-sm:text-sm">
              <label htmlFor="">Support</label>
            </div>
            <div className="pl-2">
              <ul className="flex flex-col text-white text-[13px] leading-8 font-thin max-sm:leading-6">
                <li>
                  <Link>
                    <span className={`${listItemStyle}`}>FAQ</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/contact-us`}>
                    <span className={`${listItemStyle}`}>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* More */}
          <div className="flex flex-col justify-start items-center max-sm:items-start">
            <div className="text-white font-bold py-1 max-sm:text-sm">
              <label htmlFor="">More</label>
            </div>
            <div className="pl-2">
              <ul className="flex text-white flex-col text-[13px] leading-8 font-thin max-sm:leading-6">
                <li>
                  <Link to={`/terms-conditions`}>
                    <span className={`${listItemStyle}`}>
                      Terms & Conditions
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={`/privacy-policies`}>
                    <span className={`${listItemStyle}`}>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/service-policy`}>
                    <span className={`${listItemStyle}`}>Service Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/terms-of-use`}>
                    <span className={`${listItemStyle}`}>Terms Of Use</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col justify-start items-center max-sm:items-start">
            <div className="text-white font-bold py-2 max-sm:text-sm">
              <p>Our Office</p>
            </div>
            <div className="pl-2 text-white flex flex-col font-thin text-sm max-sm:text-[11px]">
              <p className="">
                Sy. No. 92, R Greens A.C, <br />
                Sarjapur Outer Ring Road Marathahalli <br />
                Bengaluru - 37
              </p>
              <p className="text-[12px]">GST: 29CSJPA4571K1ZE</p>
              <p className="">Ph: +91 8722288017</p>
              <p className="">sale@instanthub.in</p>
              <p className="">info@instanthub.in</p>
            </div>
          </div>
        </div>

        {/* Address */}
        {/* <div className="flex flex-col items-center max-md:hidden">
          <div className="text-white font-bold py-2">
            <p>Our Office</p>
          </div>
          <div className="pl-2 flex flex-col items-start">
            <p className="text-xs">
              Sy. No. 92, R Greens A.C, <br />
              Sarjapur Outer Ring Road Marathahalli <br />
              Bengaluru - 37
            </p>
            <p className="text-xs">Ph: +91 8722288017</p>
            <p className="text-xs">sale@instanthub.in</p>
            <p className="text-xs">info@instanthub.in</p>
          </div>
        </div> */}
      </div>
      {/* <div className="text-end p-0 m-0 text-xs text-white developed-by transition-transform duration-3000 transform translate-x-full md:translate-x-0">
        <h2>Developed by: Yusufulla Qureshi</h2>
      </div> */}
      {/* <div className="flex items-center justify-end p-0 text-white">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <FcServices />
            <p className="text-sm flex items-center justify-center max-sm:text-[10px]">
              Developed by: Yusufulla Qureshi
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
