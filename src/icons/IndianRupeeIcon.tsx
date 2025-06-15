import { FC, memo } from "react";
import { IconProps } from "./types";

// TODO: Indian rupee is not accurate, must update
export const IndianRupeeIcon: FC<IconProps> = memo(
  ({ size = 18, className = "", color = "currentColor" }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 320 512"
      fill="currentColor"
      className={className}
    >
      <path d="M0 64C0 46.3 14.3 32 32 32h64c42.4 0 76.7 16.9 96 41.3C212.7 48.9 247 32 289.4 32H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H289.4c-13.8 0-26.8 4.6-37.3 12.8C267.3 121.1 278.8 140.5 285.3 162H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H285.3c-6.5 21.5-18 40.9-33.2 53.1c10.5 8.2 23.5 12.8 37.3 12.8H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H289.4c-42.4 0-76.7-16.9-96-41.3C173.3 339.1 139 356 96.6 356H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96.6c13.8 0 26.8-4.6 37.3-12.8C120.7 266.9 109.2 247.5 102.7 226H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h70.7c6.5-21.5 18-40.9 33.2-53.1C125.4 100.6 112.4 96 98.6 96H32C14.3 96 0 81.7 0 64z" />
    </svg>
  )
);
