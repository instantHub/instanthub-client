import { FC, memo } from "react";
import { IconProps } from "../types";

export const StockpilesIcon: FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M3 21h18v-2H3v2z" />
      <path d="M5 19h4v-6H5v6z" />
      <path d="M10 19h4v-8h-4v8z" />
      <path d="M15 19h4v-4h-4v4z" />
      <path
        d="M3 12l9-9 9 9"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="16" r="1" fill="white" />
      <circle cx="12" cy="14" r="1" fill="white" />
      <circle cx="17" cy="16.5" r="1" fill="white" />
    </svg>
  )
);
