import { FC, memo } from "react";
import { IconProps } from "./types";

export const DotFillIcon: FC<IconProps> = memo(
  ({ size = 18, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <circle cx="12" cy="12" r="8" />
    </svg>
  )
);
