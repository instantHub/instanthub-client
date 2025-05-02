import React from "react";
import DeductionItems from "./DeductionItems";

const DisplayCondition = ({ condition }) => {
  return (
    <div className="flex flex-col">
      <h2 className="px-5 py-2 max-sm:px-2 text-center font-extrabold text-2xl max-sm:text-lg">
        {condition.conditionName}
      </h2>

      <p className="text-center text-lg font-medium text-gray-600 max-sm:text-xs mb-5">
        {condition.description}
      </p>

      {/* Displaying Condition Labels */}
      <DeductionItems condition={condition} />
    </div>
  );
};

export default DisplayCondition;
