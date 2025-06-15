import { FC, memo } from "react";
import { IconProps } from "./types";

export const DeleteForeverIcon: FC<IconProps> = memo(
  ({ size = 18, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 
      1H5v2h14V4zM15.59 8.59L12 12.17l-3.59-3.58L7 10l3.59 
      3.59L7 17.17 8.41 18.59 12 15 15.59 18.59 17 17.17l-3.59-3.58L17 
      10z"
      />
    </svg>
  )
);
