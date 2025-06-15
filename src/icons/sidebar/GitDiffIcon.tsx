import { FC, memo } from "react";
import { IconProps } from "../types";

export const GitDiffIcon: FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <path d="M11 18H8a2 2 0 0 1-2-2V9" />
      <path d="M16 16l2 2 2-2" />
      <path d="M8 8L6 6 4 8" />
    </svg>
  )
);
