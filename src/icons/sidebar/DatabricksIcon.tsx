import { FC, memo } from "react";
import { IconProps } from "../types";

export const DatabricksIcon: FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" />
      <path d="M2 7l10 5v10" fill="none" stroke="white" strokeWidth="1" />
      <path d="M22 7l-10 5v10" fill="none" stroke="white" strokeWidth="1" />
      <path d="M2 7l10-5 10 5" fill="none" stroke="white" strokeWidth="1" />
    </svg>
  )
);
