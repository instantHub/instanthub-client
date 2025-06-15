import { FC, memo } from "react";
import { IconProps } from "./types";

export const CalendarScheduleFillIcon: FC<IconProps> = memo(
  ({ size = 18, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M8 2a1 1 0 0 0-2 0v1H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2V2a1 1 0 1 0-2 0v1H8V2zm6 7a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2h4zm2 4a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2h6zm0 4a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2h10z" />
    </svg>
  )
);
