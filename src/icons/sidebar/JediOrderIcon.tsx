import { FC, memo } from "react";
import { IconProps } from "../types";

export const JediOrderIcon: FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M12 2L8.5 8.5 2 12l6.5 3.5L12 22l3.5-6.5L22 12l-6.5-3.5L12 2z" />
      <circle cx="12" cy="12" r="3" fill="white" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  )
);
