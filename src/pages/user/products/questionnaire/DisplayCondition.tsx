import { FC } from "react";
import { IConditions } from "@features/api/productsApi/types";
import DeductionItems from "./DeductionItems";
import { FlexBox, Typography } from "@components/general";

interface IDisplayConditionProps {
  condition: IConditions;
}

export const DisplayCondition: FC<IDisplayConditionProps> = ({ condition }) => {
  return (
    <FlexBox direction="col" gap={5} fullWidth>
      <FlexBox direction="col" gap={2}>
        <Typography variant="h4">{condition.conditionName}</Typography>

        <Typography variant="body" className="font-medium text-gray-600">
          {condition.description}
        </Typography>
      </FlexBox>

      {/* Displaying Condition Labels */}
      <DeductionItems condition={condition} />
    </FlexBox>
  );
};
