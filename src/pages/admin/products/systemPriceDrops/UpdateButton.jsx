import React from "react";

const UpdateButton = ({ updateLoading, text }) => {
  return (
    <div className="py-3 px-2">
      <button
        type="submit"
        className="w-[20%] max-sm:w-fit max-sm:p-2 bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300"
        disabled={updateLoading}
      >
        {!updateLoading ? `${text}` : "Loading..."}
      </button>
    </div>
  );
};

export default UpdateButton;
