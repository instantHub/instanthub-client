import { FC } from "react";
import { FlexBox, Typography } from "@components/general";
import { IConditions } from "@features/api/productsApi/types";

interface IDisplayConfigurationProps {
  deductions: IConditions[];
  isEditing?: boolean;
}
export const DisplayConfiguration: FC<IDisplayConfigurationProps> = ({
  deductions,
  isEditing = false,
}) => {
  return deductions?.map((condition) => (
    <div
      key={condition.id}
      className={`w-full sm:w-1/2 mx-auto mb-10 border my-2 py- px- rounded`}
    >
      <Typography variant="h3" className="py-2" align="center">
        {condition.conditionName}
      </Typography>
      <hr />

      <FlexBox direction="col" gap={4} className="p-4">
        {condition.conditionLabels?.map((conditionLabel, idx) => (
          <FlexBox
            key={idx + condition.page}
            justify="around"
            className="border-b-2 pb-1"
            fullWidth
          >
            <FlexBox direction="col">
              <Typography>Label Name:</Typography>
              <Typography variant="h5">
                {conditionLabel.conditionLabel}
              </Typography>
            </FlexBox>

            <FlexBox direction="col">
              <Typography>Price Drop:</Typography>
              <Typography variant="h5">{conditionLabel.priceDrop}</Typography>
            </FlexBox>

            <FlexBox direction="col">
              <Typography>Operation:</Typography>
              <Typography
                variant="h5"
                className={`${
                  conditionLabel.operation === "Subtrack"
                    ? "bg-red-200 px-2"
                    : "bg-blue-200 px-4"
                } text-black py-1 rounded`}
              >
                {conditionLabel?.operation}
              </Typography>
            </FlexBox>
          </FlexBox>
        ))}
      </FlexBox>
    </div>
  ));
};
