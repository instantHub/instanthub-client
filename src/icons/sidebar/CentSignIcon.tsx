import { FC, memo } from "react";
import { IconProps } from "../types";

export const CentSignIcon: FC<IconProps> = memo(
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
      <path d="M16.5 8.5c-1.5-1.5-3.5-2.5-5.5-2.5s-4 1-5.5 2.5S3 12 3 14s1 4 2.5 5.5S9 22 11 22s4-1 5.5-2.5" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  )
);
