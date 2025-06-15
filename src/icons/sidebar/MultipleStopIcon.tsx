import { FC, memo } from "react";
import { IconProps } from "../types";

export const MultipleStopIcon: FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
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
      <rect x="6" y="6" width="4" height="4" fill={color} />
      <rect x="14" y="6" width="4" height="4" fill={color} />
      <rect x="6" y="14" width="4" height="4" fill={color} />
      <rect x="14" y="14" width="4" height="4" fill={color} />
      <circle cx="8" cy="8" r="1" fill="white" />
      <circle cx="16" cy="8" r="1" fill="white" />
      <circle cx="8" cy="16" r="1" fill="white" />
      <circle cx="16" cy="16" r="1" fill="white" />
    </svg>
  )
);
