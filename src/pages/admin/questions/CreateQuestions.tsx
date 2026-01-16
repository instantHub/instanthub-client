import { ConditionManagement } from "./conditions/ConditionManagement";
import { LabelsManagement } from "./conditionLabels/LabelsManagement";

export const CreateQuestions = () => {
  return (
    <div className="flex flex-col items-center jus gap-10 m-10 max-sm:m-2 h-full">
      {/* Conditions */}
      <ConditionManagement />

      {/* ConditionLabels */}
      <LabelsManagement />
    </div>
  );
};
