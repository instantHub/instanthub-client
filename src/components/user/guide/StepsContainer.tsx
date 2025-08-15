import { FlexBox, Typography } from "@components/general";
import { FC } from "react";
import { IGuideStep } from "src/data";

interface IStepsContainerProps {
  data: IGuideStep;
}
export const StepsContainer: FC<IStepsContainerProps> = ({ data }) => {
  return (
    <FlexBox direction="col" align="start">
      <Typography variant="h4" className="mb-2">
        {data.title}
      </Typography>
      {data.description && (
        <Typography variant="h5" className="mb-3">
          {data.description}
        </Typography>
      )}
      <div className="space-y-1 max-sm:text-sm">
        {data.steps.map((step, stepIdx) => (
          <li key={stepIdx}>{step}</li>
        ))}
      </div>
    </FlexBox>
  );
};
