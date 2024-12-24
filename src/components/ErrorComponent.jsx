import React from "react";
import { BiSolidCommentError } from "react-icons/bi";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";

const ErrorComponent = ({ message }) => {
  return (
    <>
      <div
        // className="text-center mx-auto mt-[10%] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="text-center text-2xl mx-auto mt-[5%] flex items-center justify-center  text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <div className="flex flex-col items-center justify-center gap-">
          <FaExclamationTriangle className="text-5xl max-sm:text-3xl text-red-500 mb-4" />
          <h2 className="text-3xl max-sm:text-xl font-bold mb-2">Oops!</h2>
          <div className="flex flex-col opacity-75">
            <span className="block sm:inline max-sm:text-xl">{message}</span>
            <span className="block sm:inline opacity-65 text-xl max-sm:text-lg">
              Or Refresh the page below
            </span>
          </div>
          <div>{/* <BiSolidCommentError className="text-5xl" /> */}</div>
          <button
            className="mt-5 flex items-center gap-1 bg-green-600 text-lg max-sm:text-sm text-white px-2 py-1 rounded border"
            onClick={() => {
              window.location.reload();
            }}
          >
            <span>Refresh</span>
            <span>
              <MdOutlineRefresh className="text-xl" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorComponent;
