import { Button, FlexBox, Typography } from "@components/general";
import { FC } from "react";

interface INoDataBlockProps {}

export const NoDataBlock: FC<INoDataBlockProps> = () => {
  const goBack = (): void => {
    window.history.back();
  };
  return (
    <FlexBox direction="col" className="min-h-80">
      <Typography variant="h5" align="center">
        Currently there is no data available, kindly come back later.
      </Typography>
      <Typography variant="h4">Thank you!</Typography>
      <Button variant="instanthub" onClick={goBack}>
        Go Back
      </Button>
    </FlexBox>
  );
};
