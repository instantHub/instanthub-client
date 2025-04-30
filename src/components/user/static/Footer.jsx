import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import ComplaintBox from "../ComplaintBox";

const Footer = () => {
  const [openComplaintBox, setOpenComplaintBox] = useState(false);

  const listItemStyle =
    "px-2 py-1 max-sm:text-xs text-sm hover:text-[16px] hover:bg-secondary-light hover:text-secondary rounded-md transition-all ease-in-out duration-1000";
  return (
    <div
      className={`bg-secondary w-full sm:pt-10 sm:pb-5 mt-2 px-4 pt-2 pb-[4px] max-sm:text-md max-sm:px-[2px] max-lg:pb-10 max-sm:pb-16`}
    >
      <div className="mx-auto max-w-screen-xl flex gap-4 justify-evenly max-md:gap-1 max-sm:flex-col max-sm:pl-5">
        {/* Large Screen */}
        <div className="px-4 sm:px-0 flex flex-col items-center max-sm:hidden">
          <div className="pb-5">
            <img
              src="/images/NewLogoB.jpeg"
              alt="logo"
              className="w-[150px] h-[80px] my-[1px] max-sm:w-[60px] max-sm:h-[50px]"
              loading="lazy" // Native lazy loading
            />
            {/* <p className="flex flex- items-center gap-1 text-white ">
              <span className="font-serif text-3xl max-sm:text-lg">
                Instant
              </span>
              <span className="font-serif text-3xl max-sm:text-sm">Hub</span>
            </p> */}
          </div>

          {/* Follow Us for large screen */}
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
        {/* Company  - Support  - More */}
        <div className="grid grid-cols-3 w-full max-sm:grid-cols-2 max-sm:gap-2">
          {/* Business Name */}
          <div className="md:hidden flex items-center">
            <img
              src="/images/NewLogoB.jpeg"
              alt="logo"
              // className="w-full h-[75px] my-[1px] max-sm:w-[75%] max-sm:h-[75px] p-1"
              className="w-[60px] h-[75px] my-[1px] max-sm:w-[150px] max-sm:h-[80px] p-1"
              loading="lazy" // Native lazy loading
            />

            {/* <p className="flex items-center gap-1 font-serif text-2xl text-white">
              <span className="">Instant</span>
              <span className="">Hub</span>
            </p> */}
          </div>

          {/* Follow Us for small screen */}
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
            <div className="text-white hover:text-secondary font-bold py-1 max-sm:text-sm">
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
                    <p className={`${listItemStyle} flex flex-col`}>
                      <span>Partner with Us</span>
                      <span className="text-[9px] p-0 m-0">coming soon</span>
                    </p>
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
                <li>
                  <span
                    className={`${listItemStyle}`}
                    onClick={() => setOpenComplaintBox(!openComplaintBox)}
                  >
                    Drop Your Complaint
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* More */}
          {/* <div className="flex flex-col justify-start items-center max-sm:items-start">
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
          </div> */}

          {/* Address */}
          <div className="max-sm:col-span-2 flex flex-col justify-start items-center max-sm:items-start">
            <div className="text-white font-bold py-2 max-sm:text-sm">
              <p>Our Office</p>
            </div>
            <div className="pl-2 text-white flex flex-col font-thin text-sm max-sm:text-[11px]">
              <p>
                {/* Sy. No. 92, R Greens A.C, <br /> */}
                Sarjapur Outer Ring Road Marathahalli <br />
                Bengaluru - 37
              </p>
              <p>Ph: +91 8722288017</p>
              <p>support@instanthub.in</p>
              <p>info@instanthub.in</p>
              <p>GST: 29CSJPA4571K1ZE</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center items-center text-white">
        <div>All Rights Reserved @ 2024</div>
        <div>
          <Link to={`/terms-conditions`}>
            <span className={`${listItemStyle}`}>Terms & Conditions</span>
          </Link>
        </div>
        <div>
          <Link to={`/privacy-policies`}>
            <span className={`${listItemStyle}`}>Privacy Policy</span>
          </Link>
        </div>
        <div>
          <Link to={`/service-policy`}>
            <span className={`${listItemStyle}`}>Service Policy</span>
          </Link>
        </div>
        <div>
          <Link to={`/terms-of-use`}>
            <span className={`${listItemStyle}`}>Terms Of Use</span>
          </Link>
        </div>
      </div> */}

      <div className="mb-3 flex flex-wrap max-sm:flex-col gap-1 justify-center items-center gap-x-6 text-white text-xs max-sm:text-[10px] py-4">
        <div>All Rights Reserved © 2025 - Instant Hub</div>
        <div className="flex gap-5 items-center max-sm:gap-4">
          <Link
            to="/terms-conditions"
            className=" border-b border-b-gray-500 pb-1"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy-policies"
            className="border-b border-b-gray-500 pb-1"
          >
            Privacy Policy
          </Link>
          <Link
            to="/service-policy"
            className="border-b border-b-gray-500 pb-1"
          >
            Service Policy
          </Link>
          <Link to="/terms-of-use" className="border-b border-b-gray-500 pb-1">
            Terms of Use
          </Link>
        </div>
      </div>

      {openComplaintBox && (
        <ComplaintBox setOpenComplaintBox={setOpenComplaintBox} />
      )}
    </div>
  );
};

export default Footer;
