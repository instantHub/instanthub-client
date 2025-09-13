import { selectIsReQuoteTheme } from "@features/slices";
import { FC, memo } from "react";
import { useSelector } from "react-redux";

interface IProgressBarProps {
  progressPercentage?: number;
}

export const ProgressBar: FC<IProgressBarProps> = memo(
  ({ progressPercentage = 20 }) => {
    const reQuoteTheme = useSelector(selectIsReQuoteTheme);

    return (
      <div
        style={{
          width: `${progressPercentage}%`,
        }}
        className={`${
          reQuoteTheme ? "bg-gray-600" : "bg-instant-mid"
        } h-2 absolute top-0 left-0 overflow-hidden`}
      ></div>
    );
  }
);
