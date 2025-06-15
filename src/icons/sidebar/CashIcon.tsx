import { FC } from "react";
import { IconProps } from "../types";

export const CashIcon: FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
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
      {/* Dollar bill outline */}
      <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />

      {/* Dollar sign */}
      <path d="M12 9v6" />
      <path d="M9 11h6" />
      <path d="M9 13h6" />

      {/* Corner decorative elements */}
      <circle cx="5" cy="9" r="1" fill={color} />
      <circle cx="19" cy="9" r="1" fill={color} />
      <circle cx="5" cy="15" r="1" fill={color} />
      <circle cx="19" cy="15" r="1" fill={color} />
    </svg>
  );
};
