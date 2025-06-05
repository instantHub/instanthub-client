import { memo } from "react";

export const ProgressBar = memo(({ progressPercentage = 20 }) => {
  return (
    <div
      style={{
        width: `${progressPercentage}%`,
      }}
      className={`h-2 bg-secondary absolute top-0 left-0 overflow-hidden`}
    ></div>
  );
});
