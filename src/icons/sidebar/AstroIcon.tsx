import { FC, memo } from "react";
import { IconProps } from "../types";

export const AstroIcon: FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M12 2.5L9.5 8.5 3 9.5l4.5 4.5L6.5 20.5 12 18l5.5 2.5-1-6.5L21 9.5l-6.5-1L12 2.5z" />
      <path d="M12 6v12" stroke="white" strokeWidth="1" />
      <path d="M8 10l8 4" stroke="white" strokeWidth="1" />
      <path d="M16 10l-8 4" stroke="white" strokeWidth="1" />
      <circle cx="12" cy="12" r="2" fill="white" />
    </svg>
  )
);
