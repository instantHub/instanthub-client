import { FC, memo } from "react";
import { IconProps } from "../types";

export const MultipleIcon: FC<IconProps> = memo(
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
      <rect x="3" y="3" width="16" height="16" />
      <rect x="5" y="5" width="4" height="4" />
      <rect x="11" y="5" width="4" height="4" />
      <rect x="17" y="5" width="4" height="4" />
      <rect x="5" y="11" width="4" height="4" />
      <rect x="11" y="11" width="4" height="4" />
      <rect x="17" y="11" width="4" height="4" />
    </svg>
  )
);
