import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeductions,
  addSingleDeductions,
} from "@features/userSlices/deductionSlice";
import { CircleIcon } from "@icons";

const DeductionItems = ({ condition }) => {
  const {
    conditionName,
    conditionLabels,
    keyword,
    isYesNoType,
    isMandatory,
    showLabelsImage: shouldShowImage,
    multiSelect,
  } = condition;

  // console.log("DeductionItems Component Re-rendering");

  const { deductions: deductionData, singleDeductions } = useSelector(
    (state) => state.deductions
  );
  // console.log("deductionData", deductionData, singleDeductions);

  const dispatch = useDispatch();

  const handleOnClick = (label) => {
    if (condition.multiSelect)
      dispatch(addDeductions({ condition, conditionLabel: label }));
    else dispatch(addSingleDeductions({ condition, conditionLabel: label }));

    // Setting this values helps to show user selected data in UI
    condition.isSelected.selected = true;
    condition.isSelected.selectedLabel = label;
  };

  let largerConditionLabel = ["screen condition", "physical condition"].some(
    (c) => conditionName.toLowerCase().includes(c)
  );

  let shorterConditionLabel = [
    "screen size",
    "graphics",
    "model launch year",
  ].some((c) => conditionName.toLowerCase().includes(c));

  const functionalProblems = conditionName.toLowerCase().includes("functional");

  return (
    <div
      className={`grid items-center gap-4 px-4 ${
        largerConditionLabel
          ? "lg:grid-cols-2 grid-cols-1 "
          : !shouldShowImage
          ? isYesNoType
            ? "grid-cols-2"
            : shorterConditionLabel
            ? "grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 lg:grid-cols-3"
          : "grid-cols-2 lg:grid-cols-5 md:grid-cols-3 "
      }`}
    >
      {conditionLabels.map((label, index) => {
        let isSelected = false;
        if (multiSelect) {
          isSelected = deductionData?.some(
            (deduction) => deduction.conditionLabel === label.conditionLabel
          );
        } else {
          isSelected =
            condition?.isSelected?.selectedLabel?.conditionLabel ===
            label.conditionLabel;
        }

        if (!isMandatory && !condition.multiSelect) {
          let exists = singleDeductions[keyword] ? true : false;
          isSelected =
            exists &&
            singleDeductions[keyword]?.conditionLabel === label.conditionLabel;
        }

        const borderClass = isSelected
          ? functionalProblems
            ? "border-red-500"
            : "border-instant-mid"
          : "";

        const backgroundClass = isSelected
          ? functionalProblems
            ? "bg-red-500 text-white"
            : "bg-instant-mid text-white"
          : "bg-slate-100 text-black";

        return (
          <DisplayCondtionLabels
            key={index}
            shouldShowImage={shouldShowImage}
            isYesNoType={isYesNoType}
            style={{ backgroundClass, borderClass }}
            label={label}
            handleOnClick={handleOnClick}
          />
        );
      })}
    </div>
  );
};

export default memo(DeductionItems);

function DisplayCondtionLabels({
  shouldShowImage,
  isYesNoType,
  style,
  label,
  handleOnClick,
}) {
  return (
    <div
      className={`border rounded flex items-center ${
        shouldShowImage ? "flex-col" : `px-2 ${style.backgroundClass}`
      } ${style.borderClass}`}
      onClick={() => handleOnClick(label)}
    >
      {shouldShowImage && label.conditionLabelImg && (
        <ShowImage label={label} />
      )}

      <div
        key={label.conditonLabelId}
        className={`text-center flex items-center py- 
          ${style.backgroundClass}  ${
          shouldShowImage
            ? "w-full h-[100px] max-sm:h-[80px] justify-center"
            : `gap-1 ${isYesNoType ? "h-[40px]" : "h-[75px]"}`
        }`}
      >
        {!shouldShowImage && <CircleIcon size={16} />}
        <span className="block text-xs max-sm:text-[11px] px-1">
          {label.conditionLabel}
        </span>
      </div>
    </div>
  );
}

function ShowImage({ label }) {
  return (
    <div className="p-4">
      <img
        src={`${import.meta.env.VITE_APP_BASE_URL}${label.conditionLabelImg}`}
        alt="LabelImg"
        className="size-20 max-sm:size-20"
        loading="lazy" // Native lazy loading for better performance
      />
    </div>
  );
}

// Old Class
{
  // className={`grid  ${
  //   conditionName.toLowerCase().includes("screen condition")
  //     ? "lg:grid-cols-2 md:grid-cols-1 gap-2 items-center px-2"
  //     : !shouldShowImage
  //     ? `gap-4 items-center px-4 ${
  //         isYesNoType ? "grid-cols-2" : "grid-cols-1 lg:grid-cols-3"
  //       }`
  //     : "grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 items-center px-4"
  // }`}
}

// Circle class
{
  // className={`${
  //   deductionData.some(
  //     (condLabel) =>
  //       condLabel.conditionLabel === label.conditionLabel
  //   )
  //     ? "text-secondary bg-white"
  //     : "opacity-30"
  // }`}
}
