import { FC, memo } from "react";
import { IconProps } from "../types";

export const ListCheck3Icon: FC<IconProps> = memo(
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
      <rect x="2" y="4" width="4" height="4" rx="1" />
      <rect x="2" y="10" width="4" height="4" rx="1" />
      <rect x="2" y="16" width="4" height="4" rx="1" />
      <path d="M8 6h14" />
      <path d="M8 12h14" />
      <path d="M8 18h14" />
      <path d="M3 6l1 1 2-2" />
      <path d="M3 12l1 1 2-2" />
    </svg>
  )
);
