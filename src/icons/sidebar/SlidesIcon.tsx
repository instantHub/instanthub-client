import { FC, memo } from "react";
import { IconProps } from "../types";

export const SlidesIcon: FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M2 3v18h20V3H2zm18 16H4V5h16v14z" />
      <path d="M6 7h4v2H6V7z" />
      <path d="M12 7h6v1h-6V7z" />
      <path d="M12 9h4v1h-4V9z" />
      <path d="M6 11h12v1H6v-1z" />
      <path d="M6 13h12v1H6v-1z" />
      <path d="M6 15h8v1H6v-1z" />
      <circle cx="17" cy="15" r="1" />
      <circle cx="19" cy="15" r="1" />
      <circle cx="18" cy="17" r="1" />
    </svg>
  )
);
