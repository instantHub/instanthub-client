import React from "react";
import { BiSolidCommentError } from "react-icons/bi";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorComponent = ({ message }) => {
  return (
    <>
      <div
        // className="text-center mx-auto mt-[10%] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="text-center text-2xl mx-auto mt-[15%]  text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <div className="flex flex-col items-center justify-center gap-">
          <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Oops!</h2>
          <div className="opacity-75">
            <span className="block sm:inline">{message}</span>
          </div>
          <div>{/* <BiSolidCommentError className="text-5xl" /> */}</div>
        </div>
      </div>
    </>
  );
};

export default ErrorComponent;
