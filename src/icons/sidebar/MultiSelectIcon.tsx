import { FC, memo } from "react";
import { IconProps } from "../types";

export const MultiSelectIcon: FC<IconProps> = memo(
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
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6l2 2 4-4" />
      <path d="M3 12l2 2 4-4" />
      <path d="M3 18l2 2 4-4" />
    </svg>
  )
);
