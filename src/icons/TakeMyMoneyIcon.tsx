import { FC, memo } from "react";
import { IconProps } from "./types";

// TODO: not good icon, unused
export const TakeMyMoneyIcon: FC<IconProps> = memo(
  ({ size = 18, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M12 7v6" />
      <path d="M15.5 9a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0z" />
    </svg>
  )
);
