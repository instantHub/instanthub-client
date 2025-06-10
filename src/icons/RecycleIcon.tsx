import { IconProps } from "./types";

export const RecycleIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
  color = "currentColor",
}) => (
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
    <path d="M7 19H4.815a1.83 1.83 0 01-1.57-.881 1.785 1.785 0 01-.004-1.784L7.196 9.5" />
    <path d="M11 19h8.203a1.83 1.83 0 001.556-.89 1.784 1.784 0 000-1.775l-1.226-2.12" />
    <path d="M14 16l-3 3 3 3" />
    <path d="M8.293 13.596L7.196 9.5l3.1 1.598" />
    <path d="M9.344 5.811L11.196 9.5l1.037-3.684" />
    <path d="M3 3l18 18" />
  </svg>
);
