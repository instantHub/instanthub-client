import { FC, memo } from "react";
import { IconProps } from "../types";

export const ListCheck2Icon: FC<IconProps> = memo(
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
      <path d="M3 6l3 3 6-6" />
      <path d="M3 12l3 3 6-6" />
      <path d="M3 18l3 3 6-6" />
      <path d="M16 6h6" />
      <path d="M16 12h6" />
      <path d="M16 18h6" />
    </svg>
  )
);
