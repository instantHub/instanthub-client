import { FlexBox, Typography } from "@components/general";
import { FC, ReactNode } from "react";

interface IReadyToSellProps {
  title: string;
  subTitle: string;
  bgColor?: string;
  children?: ReactNode;
}

export const ReadyToSell: FC<IReadyToSellProps> = ({
  title,
  subTitle,
  bgColor = "bg-instant-mid/10",
  children,
}) => {
  return (
    <FlexBox
      direction="col"
      gap={4}
      className={`min-h-[250px] sm:min-h-[350px] ${bgColor}`}
    >
      <Typography variant="h1">{title}</Typography>
      <Typography variant="h5">{subTitle}</Typography>
      {children}
    </FlexBox>
  );
};
