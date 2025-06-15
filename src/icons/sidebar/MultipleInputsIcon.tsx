import { FC, memo } from "react";
import { IconProps } from "../types";

export const MultipleInputsIcon: FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <rect x="2" y="4" width="20" height="3" rx="1" fill={color} />
      <rect x="2" y="10" width="20" height="3" rx="1" fill={color} />
      <rect x="2" y="16" width="20" height="3" rx="1" fill={color} />
      <circle cx="5" cy="5.5" r="0.5" fill="white" />
      <circle cx="5" cy="11.5" r="0.5" fill="white" />
      <circle cx="5" cy="17.5" r="0.5" fill="white" />
      <path
        d="M8 5.5h11"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M8 11.5h11"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M8 17.5h11"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
);
