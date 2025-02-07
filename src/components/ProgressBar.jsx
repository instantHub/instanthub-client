import React, { memo } from "react";

const ProgressBar = ({ progressPercentage = 20 }) => {
  return (
    <div
      style={{
        width: `${progressPercentage}%`,
      }}
      className={`h-2 bg-secondary absolute top-0 left-0 overflow-hidden`}
    ></div>
  );
};

export default memo(ProgressBar);
