import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeductions,
  addSingleDeductions,
  selectDeductionState,
  selectIsReQuoteTheme,
} from "@features/slices";
import {
  IProductConditionLabels,
  IProductConditions,
} from "@features/api/productsApi/types";
import { CheckCircle } from "lucide-react";

interface DeductionItemsProps {
  condition: IProductConditions;
}

interface DisplayConditionLabelsProps {
  shouldShowImage: boolean;
  isYesNoType: boolean;
  isSelected: boolean;
  isFunctionalProblem: boolean;
  label: IProductConditionLabels;
  handleOnClick: (label: IProductConditionLabels) => void;
  reQuoteTheme: boolean;
}

interface ShowImageProps {
  label: IProductConditionLabels;
}

const LARGER_CONDITION_LABELS = ["screen condition", "physical condition"];
const SHORTER_CONDITION_LABELS = [
  "screen size",
  "graphics",
  "model launch year",
];
const FUNCTIONAL_PROBLEM_KEYWORD = "functional";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

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
  if (largerConditionLabel) return "grid-cols-1 sm:grid-cols-2 gap-3";
  if (!shouldShowImage) {
    if (isYesNoType) return "grid-cols-2 gap-3";
    return shorterConditionLabel
      ? "grid-cols-2 md:grid-cols-3 gap-3"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3";
  }
  return "grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3";
};

const DeductionItems_v2: React.FC<DeductionItemsProps> = ({ condition }) => {
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
  const reQuoteTheme = useSelector(selectIsReQuoteTheme);
  const dispatch = useDispatch();

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

  const gridClass = useMemo(
    () =>
      getGridColumnsClass(
        conditionTypes.largerConditionLabel,
        shouldShowImage,
        isYesNoType,
        conditionTypes.shorterConditionLabel
      ),
    [conditionTypes, shouldShowImage, isYesNoType]
  );

  const handleOnClick = useCallback(
    (label: IProductConditionLabels) => {
      if (multiSelect) {
        dispatch(addDeductions({ condition, conditionLabel: label }));
      } else {
        dispatch(addSingleDeductions({ condition, conditionLabel: label }));
      }
      condition.isSelected.selected = true;
      condition.isSelected.selectedLabel = label;
    },
    [condition, multiSelect, dispatch]
  );

  const isLabelSelected = useCallback(
    (label: IProductConditionLabels): boolean => {
      if (multiSelect) {
        return (
          deductionData?.some(
            (deduction: IProductConditionLabels) =>
              deduction.conditionLabel === label.conditionLabel
          ) || false
        );
      }

      if (isMandatory) {
        return (
          condition?.isSelected?.selectedLabel?.conditionLabel ===
          label.conditionLabel
        );
      }

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
    <div className={`w-full grid ${gridClass}`}>
      {conditionLabels.map((label, index) => {
        const isSelected = isLabelSelected(label);

        return (
          <DisplayConditionLabels
            key={`${label.conditionLabelId}-${index}`}
            shouldShowImage={shouldShowImage}
            isYesNoType={isYesNoType}
            isSelected={isSelected}
            isFunctionalProblem={conditionTypes.functionalProblems}
            label={label}
            handleOnClick={handleOnClick}
            reQuoteTheme={reQuoteTheme}
          />
        );
      })}
    </div>
  );
};

const DisplayConditionLabels: React.FC<DisplayConditionLabelsProps> = memo(
  ({
    shouldShowImage,
    isYesNoType,
    isSelected,
    isFunctionalProblem,
    label,
    handleOnClick,
    reQuoteTheme,
  }) => {
    const handleClick = useCallback(() => {
      handleOnClick(label);
    }, [handleOnClick, label]);

    const getButtonStyles = () => {
      if (isSelected) {
        if (isFunctionalProblem) {
          return "bg-red-500 border-red-600 text-white shadow-lg ring-2 ring-red-200 scale-105";
        }
        return reQuoteTheme
          ? "bg-gray-700 border-gray-800 text-white shadow-lg ring-2 ring-gray-300 scale-105"
          : "bg-instant-mid/5 text-instant-mid border-instant-mid shadow-lg ring-2 ring-instant-mid/20 scale-105";
        // : "bg-emerald-600 border-emerald-700 text-white shadow-lg ring-2 ring-emerald-200 scale-105";
      }
      return "bg-white border-gray-200 text-gray-700 hover:border-instant-mid hover:shadow-md";
    };

    return (
      <button
        onClick={handleClick}
        className={`
          relative rounded-xl border-2 transition-all duration-200 
          ${
            shouldShowImage
              ? "flex-col p-3"
              : `px-4 ${isYesNoType ? "py-3" : "py-4"}`
          }
          ${getButtonStyles()}
          flex items-center justify-center gap-2 group
          active:scale-95
        `}
        aria-label={`Select ${label.conditionLabel}`}
        aria-pressed={isSelected}
      >
        {shouldShowImage && label.conditionLabelImg && (
          <ShowImage label={label} />
        )}

        <div className="flex items-center justify-center gap-2 w-full">
          {isSelected && !shouldShowImage && (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm font-medium text-center leading-tight">
            {label.conditionLabel}
          </span>
        </div>

        {/* Selected indicator for image cards */}
        {isSelected && shouldShowImage && (
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
            <CheckCircle
              className={`w-5 h-5 ${
                isFunctionalProblem ? "text-red-500" : "text-instant-mid"
              }`}
            />
          </div>
        )}
      </button>
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
    <div className="w-full h-24 flex justify-center items-center mb-2 bg-gray-50 rounded-lg p-2">
      <img
        src={imageSrc}
        alt={`${label.conditionLabel} illustration`}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </div>
  );
});

ShowImage.displayName = "ShowImage";

export default memo(DeductionItems_v2);
