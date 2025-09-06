import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeductions,
  addSingleDeductions,
  selectDeductionState,
} from "@features/slices";
import { CircleIcon } from "@icons";
import { IConditionLabels, IConditions } from "@features/api/productsApi/types";
import { RootState } from "@features/store";

interface DeductionItemsProps {
  condition: IConditions;
}

interface DisplayConditionLabelsProps {
  shouldShowImage: boolean;
  isYesNoType: boolean;
  style: {
    backgroundClass: string;
    borderClass: string;
  };
  label: IConditionLabels;
  handleOnClick: (label: IConditionLabels) => void;
}

interface ShowImageProps {
  label: IConditionLabels;
}

// Constants for condition type checking
const LARGER_CONDITION_LABELS = ["screen condition", "physical condition"];
const SHORTER_CONDITION_LABELS = [
  "screen size",
  "graphics",
  "model launch year",
];
const FUNCTIONAL_PROBLEM_KEYWORD = "functional";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// Utility functions
const checkConditionType = (
  conditionName: string,
  types: string[]
): boolean => {
  const lowerCaseName = conditionName.toLowerCase();
  return types.some((type) => lowerCaseName.includes(type));
};

const getGridColumnsClass = (
  largerConditionLabel: boolean,
  shouldShowImage: boolean,
  isYesNoType: boolean,
  shorterConditionLabel: boolean
): string => {
  if (largerConditionLabel) {
    return "lg:grid-cols-2 grid-cols-1";
  }

  if (!shouldShowImage) {
    if (isYesNoType) {
      return "grid-cols-2";
    }
    return shorterConditionLabel
      ? "grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 lg:grid-cols-3";
  }

  return "grid-cols-2 lg:grid-cols-5 md:grid-cols-3";
};

const getStyleClasses = (
  isSelected: boolean,
  isFunctionalProblem: boolean
): { backgroundClass: string; borderClass: string } => {
  if (!isSelected) {
    return {
      backgroundClass: "bg-slate-100 text-black",
      borderClass: "",
    };
  }

  const isError = isFunctionalProblem;
  return {
    backgroundClass: isError
      ? "bg-red-500 text-white"
      : "bg-instant-mid text-white",
    borderClass: isError ? "border-red-500" : "border-instant-mid",
  };
};

// Main Component
const DeductionItems: React.FC<DeductionItemsProps> = ({ condition }) => {
  const {
    conditionName,
    conditionLabels,
    keyword,
    isYesNoType,
    isMandatory,
    showLabelsImage: shouldShowImage,
    multiSelect,
  } = condition;

  const { deductions: deductionData, singleDeductions } =
    useSelector(selectDeductionState);

  console.log("deductionData", deductionData);
  console.log("singleDeductions", singleDeductions);

  const dispatch = useDispatch();

  // Memoized condition type checks
  const conditionTypes = useMemo(
    () => ({
      largerConditionLabel: checkConditionType(
        conditionName,
        LARGER_CONDITION_LABELS
      ),
      shorterConditionLabel: checkConditionType(
        conditionName,
        SHORTER_CONDITION_LABELS
      ),
      functionalProblems: conditionName
        .toLowerCase()
        .includes(FUNCTIONAL_PROBLEM_KEYWORD),
    }),
    [conditionName]
  );

  // Memoized grid class
  const gridClass = useMemo(
    () =>
      getGridColumnsClass(
        conditionTypes.largerConditionLabel,
        shouldShowImage,
        isYesNoType,
        conditionTypes.shorterConditionLabel
      ),
    [
      conditionTypes.largerConditionLabel,
      shouldShowImage,
      isYesNoType,
      conditionTypes.shorterConditionLabel,
    ]
  );

  // Click handler
  const handleOnClick = useCallback(
    (label: IConditionLabels) => {
      if (multiSelect) {
        dispatch(addDeductions({ condition, conditionLabel: label }));
      } else {
        dispatch(addSingleDeductions({ condition, conditionLabel: label }));
      }

      // Update condition's selected state
      condition.isSelected.selected = true;
      condition.isSelected.selectedLabel = label;
    },
    [condition, multiSelect, dispatch]
  );

  // Function to determine if a label is selected
  const isLabelSelected = useCallback(
    (label: IConditionLabels): boolean => {
      if (multiSelect) {
        return (
          deductionData?.some(
            (deduction: IConditionLabels) =>
              deduction.conditionLabel === label.conditionLabel
          ) || false
        );
      }

      // For single select mandatory conditions
      if (isMandatory) {
        return (
          condition?.isSelected?.selectedLabel?.conditionLabel ===
          label.conditionLabel
        );
      }

      // For non-mandatory single select conditions
      const exists = Boolean(singleDeductions[keyword]);
      return (
        exists &&
        singleDeductions[keyword]?.conditionLabel === label.conditionLabel
      );
    },
    [
      multiSelect,
      deductionData,
      isMandatory,
      condition,
      singleDeductions,
      keyword,
    ]
  );

  return (
    <div className={`w-full grid items-center gap-4 px-4 ${gridClass}`}>
      {conditionLabels.map((label, index) => {
        const isSelected = isLabelSelected(label);
        const styleClasses = getStyleClasses(
          isSelected,
          conditionTypes.functionalProblems
        );

        return (
          <DisplayConditionLabels
            key={`${label.conditionLabelId}-${index}`}
            shouldShowImage={shouldShowImage}
            isYesNoType={isYesNoType}
            style={styleClasses}
            label={label}
            handleOnClick={handleOnClick}
          />
        );
      })}
    </div>
  );
};

// Sub Components
const DisplayConditionLabels: React.FC<DisplayConditionLabelsProps> = memo(
  ({ shouldShowImage, isYesNoType, style, label, handleOnClick }) => {
    const handleClick = useCallback(() => {
      handleOnClick(label);
    }, [handleOnClick, label]);

    const containerClass = useMemo(() => {
      const baseClass =
        "border rounded flex items-center cursor-pointer transition-all duration-200 hover:shadow-md";
      const layoutClass = shouldShowImage
        ? "flex-col"
        : `px-2 ${style.backgroundClass}`;
      return `${baseClass} ${layoutClass} ${style.borderClass}`;
    }, [shouldShowImage, style.backgroundClass, style.borderClass]);

    const contentClass = useMemo(() => {
      const baseClass = `text-center flex items-center ${style.backgroundClass}`;
      const sizeClass = shouldShowImage
        ? "w-full h-[100px] max-sm:h-[80px] justify-center"
        : `gap-1 ${isYesNoType ? "h-[40px]" : "h-[75px]"}`;
      return `${baseClass} ${sizeClass}`;
    }, [style.backgroundClass, shouldShowImage, isYesNoType]);

    return (
      <div
        className={containerClass}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`Select ${label.conditionLabel}`}
      >
        {shouldShowImage && label.conditionLabelImg && (
          <ShowImage label={label} />
        )}

        <div className={contentClass}>
          {!shouldShowImage && (
            <CircleIcon
              size={16}
              className="flex-shrink-0"
              aria-hidden="true"
            />
          )}
          <span className="block text-xs max-sm:text-[11px] px-1 leading-tight">
            {label.conditionLabel}
          </span>
        </div>
      </div>
    );
  }
);

DisplayConditionLabels.displayName = "DisplayConditionLabels";

const ShowImage: React.FC<ShowImageProps> = memo(({ label }) => {
  const imageSrc = useMemo(
    () => `${BASE_URL}${label.conditionLabelImg}`,
    [label.conditionLabelImg]
  );

  return (
    <div className="p-4 flex justify-center items-center">
      <img
        src={imageSrc}
        alt={`${label.conditionLabel} illustration`}
        className="size-20 max-sm:size-20 object-contain"
        loading="lazy"
        onError={(e) => {
          // Handle image loading errors gracefully
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          console.warn(`Failed to load image: ${imageSrc}`);
        }}
      />
    </div>
  );
});

ShowImage.displayName = "ShowImage";

export default memo(DeductionItems);
