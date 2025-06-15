import { memo } from "react";
import { IconProps } from "../types";

export const CategoryIcon: React.FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 4.5L10.5 9.5 7.5 10l2.25 2.25-.5 3L12 14l2.75 1.25-.5-3L16.5 10l-3-.5L12 6.5z" />
    </svg>
  )
);
