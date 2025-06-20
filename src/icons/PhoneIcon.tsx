import { FC, memo } from "react";
import { IconProps } from "./types";

export const PhoneIcon: FC<IconProps> = memo(
  ({ size = 18, className = "", color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="currentColor">
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A1.9 1.9 0 0 1 304 384.1c-85.15-17.9-140.7-73.45-158.6-158.6a1.9 1.9 0 0 1 2.8-3.9l60.6-49.6a24 24 0 0 0 6.9-28L167.8 31.6a24 24 0 0 0-25.8-13.6l-104 24A24 24 0 0 0 16 66.4C16 281.8 230.2 496 445.6 496a24 24 0 0 0 24.4-22l24-104a24 24 0 0 0-13.6-25.8z" />
    </svg>
  )
);
