import { FC, memo } from "react";
import { IconProps } from "../types";

export const ProfileIcon: FC<IconProps> = memo(
  ({ size = 20, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect x="4" y="18" width="16" height="2" rx="1" fill="white" />
    </svg>
  )
);
