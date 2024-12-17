import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaUser, FaWhatsapp } from "react-icons/fa";
import { SiXdadevelopers } from "react-icons/si";
import { FcServices } from "react-icons/fc";

const Footer = () => {
  return (
    <div className="w-full sm:pt-10 sm:pb-5 mt-2 bg-cyan-500 px-4 pt-2 pb-[4px] max-sm:text-md max-sm:px-[2px] max-lg:pb-10 max-sm:pb-16">
      <div className="px-4 sm:px-0 flex flex-col items-center sm:hidden max-sm:flex-row max-sm:justify-center max-sm:gap-5">
        <div>
          {/* <img
            // src="/LOGO1.png"
            src="/images/footer-logo.png"
            alt="logo"
            // className="w-[88%] h-16 my-[1px] max-sm:w-[95%]"
            className="w-[95px] h-[75px] my-[1px] max-sm:w-[60px] max-sm:h-[50px]"
          /> */}
          <p className="flex flex-col gap-1">
            <span className="font-serif text-3xl max-sm:text-lg">Instant</span>
            <span className="font-serif text-2xl max-sm:text-sm">
              Cash Pick
            </span>
          </p>
        </div>
        <div>
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
      <div className="mx-auto max-w-screen-xl flex gap-4 justify-evenly max-md:gap-1 max-sm:flex-col max-sm:pl-5">
        <div className="px-4 sm:px-0 flex flex-col items-center max-sm:hidden">
          <div>
            {/* <img
              // src="/LOGO1.png"
              src="/images/footer-logo.png"
              alt="logo"
              // className="w-[88%] h-16 my-[1px] max-sm:w-[95%]"
              className="w-[95px] h-[75px] my-[1px] max-sm:w-[60px] max-sm:h-[50px]"
            /> */}
            <p className="flex flex-col gap-1">
              <span className="font-serif text-3xl max-sm:text-lg">
                Instant
              </span>
              <span className="font-serif text-2xl max-sm:text-sm">
                Cash Pick
              </span>
            </p>
          </div>

          {/* Follow Us */}
          <div>
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

        {/* Company  - Support  - More */}
        {/* <div className="flex justify-around w-full max-sm:flex-wrap"> */}
        <div className="grid grid-cols-4 w-full max-sm:grid-cols-2 max-sm:gap-2">
          {/* Company */}
          <div className="flex flex-col justify-start items-center max-sm:items-start">
            <div className="text-white font-bold py-1 max-sm:text-sm">
              <span>Company</span>
            </div>
            <div className="pl-2">
              <ul className="flex flex-col text-[13px] leading-8 font-thin max-sm:leading-6">
                <li>
                  <Link to={`/about`}>
                    <span className="hover:text-white max-sm:text-xs">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span className="hover:text-white max-sm:text-xs">
                      Partner with Us
                    </span>
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
              <ul className="flex flex-col text-[13px] leading-8 font-thin max-sm:leading-6">
                <li>
                  <Link>
                    <span className="hover:text-white max-sm:text-xs">FAQ</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/contact-us`}>
                    <span className="hover:text-white max-sm:text-xs">
                      Contact Us
                    </span>
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
              <ul className="flex flex-col text-[13px] leading-8 font-thin max-sm:leading-6">
                <li>
                  <Link to={`/terms-conditions`}>
                    <span className="hover:text-white max-sm:text-xs">
                      Terms & Conditions
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={`/privacy-policies`}>
                    <span className="hover:text-white max-sm:text-xs">
                      Privary Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={`/service-policy`}>
                    <span className="hover:text-white max-sm:text-xs">
                      Service Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={`/terms-of-use`}>
                    <span className="hover:text-white max-sm:text-xs">
                      Terms Of Use
                    </span>
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
            <div className="pl-2 flex flex-col font-thin text-sm max-sm:text-[10px]">
              <p className="">
                Sy. No. 92, R Greens A.C, <br />
                Sarjapur Outer Ring Road Marathahalli <br />
                Bengaluru - 37
              </p>
              <p className="">Ph: +91 8722288017</p>
              <p className="">sale@instantcashpick.com</p>
              <p className="">info@instantcashpick.com</p>
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
            <p className="text-xs">sale@instantcashpick.com</p>
            <p className="text-xs">info@instantcashpick.com</p>
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
