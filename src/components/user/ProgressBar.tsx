import { FC, memo } from "react";

interface IProgressBarProps {
  progressPercentage?: number;
}

export const ProgressBar: FC<IProgressBarProps> = memo(
  ({ progressPercentage = 20 }) => {
    return (
      <div
        style={{
          width: `${progressPercentage}%`,
        }}
        className={`h-2 bg-instant-mid absolute top-0 left-0 overflow-hidden`}
      ></div>
    );
  }
);
