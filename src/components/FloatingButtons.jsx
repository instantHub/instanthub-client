// FloatingButtons.jsx
import React from "react";
import { FaWhatsapp, FaPhone, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
// import { FaPhone } from "react-icons/fa";

const FloatingButtons = () => {
  const defaultMessage =
    "Hi There! Need help to sell on https://instantcashpick.com/";
  return (
    <>
      {/* Button on left of screen */}
      {/* <div className="fixed bottom-0 left-0 w-full lg:top-[75%] lg:-translate-y-1/2 lg:left-4 lg:w-auto flex lg:flex-col lg:space-y-4 bg-gray-800 lg:bg-transparent">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 lg:flex-none bg-green-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <FaWhatsapp size={24} />
        </a>
        <a
          href="tel:1234567890"
          className="flex-1 lg:flex-none bg-blue-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <FaPhone size={24} />
        </a>
        <a
          href="mailto:someone@example.com"
          className="flex-1 lg:flex-none bg-red-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-red-600 transition"
        >
          <FaEnvelope size={24} />
        </a>
      </div> */}

      {/* Buttons on right of screen */}
      <div className="fixed bottom-0 h-11 right-0 w-full z-10 lg:top-[65%] lg:-translate-y-1/2 lg:right-4 lg:w-auto flex lg:flex-col lg:space-y-4 bg-gray-800 lg:bg-transparent">
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
          {/* <FaPhone size={24} /> */}
          <FaPhoneAlt size={24} />
        </a>
        <a
          href="mailto:instantcashpick@gmail.com"
          className="flex-1 lg:flex-none bg-red-500 text-white p-4 flex justify-center items-center lg:rounded-full shadow-lg hover:bg-red-600 transition "
        >
          <FaEnvelope size={24} />
        </a>
      </div>
    </>
  );
};

export default FloatingButtons;
