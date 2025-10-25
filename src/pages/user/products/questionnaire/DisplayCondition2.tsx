import { FC } from "react";
import { IConditions } from "@features/api/productsApi/types";
import { Typography } from "@components/general";
import DeductionItems2 from "./DeductionItems2";

interface IDisplayConditionProps {
  condition: IConditions;
}

export const DisplayCondition2: FC<IDisplayConditionProps> = ({
  condition,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-x p-5 lg:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-8 h-8 bg-instant-mid/20 rounded-lg flex items-center justify-center">
            <span className="text-instant-mid font-bold text-sm">?</span>
          </div>
          <div className="flex-1">
            <Typography variant="h5" className="font-bold text-gray-900 mb-2">
              {condition.conditionName}
              {condition.isMandatory && (
                <span className="ml-2 text-red-500 text-sm">*</span>
              )}
            </Typography>
            <Typography
              variant="body"
              className="text-gray-600 text-sm leading-relaxed"
            >
              {condition.description}
            </Typography>
          </div>
        </div>
      </div>

      {/* Displaying Condition Labels */}
      <DeductionItems2 condition={condition} />
    </div>
  );
};
