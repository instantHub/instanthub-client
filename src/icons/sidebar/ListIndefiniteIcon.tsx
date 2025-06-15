import { FC, memo } from "react";
import { IconProps } from "../types";

export const ListIndefiniteIcon: FC<IconProps> = memo(
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
      <line x1="3" y1="6" x2="6" y2="6" />
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="3" y1="18" x2="6" y2="18" />
      <path d="M9 6h12" />
      <path d="M9 12h12" />
      <path d="M9 18h12" />
      <circle cx="4.5" cy="6" r="0.5" fill={color} />
      <circle cx="4.5" cy="12" r="0.5" fill={color} />
      <circle cx="4.5" cy="18" r="0.5" fill={color} />
    </svg>
  )
);
