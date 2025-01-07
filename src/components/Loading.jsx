import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-32">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      <span aria-hidden="true">Loading...</span>
    </div>
  );
};

export default Loading;
