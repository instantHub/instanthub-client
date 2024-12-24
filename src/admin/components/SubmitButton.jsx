import React from "react";

export const SubmitButton = (props) => {
  // console.log("Submit Button", props.handleLoading);
  return (
    <div>
      <button
        type="submit"
        className={`w-[20%] max-md:w-full bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300`}
        disabled={props.handleLoading}
      >
        {!props.productCreationLoading ? `${props.value}` : `${props.loading}`}
      </button>
    </div>
  );
};
