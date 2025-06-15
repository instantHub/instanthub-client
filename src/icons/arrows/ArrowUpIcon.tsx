import { memo } from "react";
import { IconProps } from "../types";

export const ArrowUpIcon: React.FC<IconProps> = memo(
  ({ size = 18, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="18,15 12,9 6,15" />
    </svg>
  )
);
