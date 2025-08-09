import { FC } from "react";

interface ILoadingProps {
  message?: string;
  height?: number;
}

export const Loading: FC<ILoadingProps> = ({
  message = "Loading...",
  height,
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center h-32 min-h-[350px]`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      <span aria-hidden="true">{message}</span>
    </div>
  );
};
