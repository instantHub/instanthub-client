import { FC, memo } from "react";
import { IconProps } from "../types";

export const QuestionAnswerIcon: FC<IconProps> = memo(
  ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M15 4v7H5.17l-.59.59-.58.58V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z" />
    </svg>
  )
);
