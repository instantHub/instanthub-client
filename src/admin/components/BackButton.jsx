import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = ({ location, text }) => {
  return (
    <div
      className={`${
        text ? `bg-blue-700 rounded` : `bg-black rounded hover:bg-gray-700`
      }  text-white inline-block m-2 px-2 py-1  `}
    >
      <Link className="flex items-center justify-between" to={location}>
        <IoIosArrowBack /> {text ? text : "Back"}
      </Link>
    </div>
  );
};

export default BackButton;
