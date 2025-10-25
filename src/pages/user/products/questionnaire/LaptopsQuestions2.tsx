import React, { useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSingleDeductions,
  clearDeductions,
  performCalculation,
  selectIsReQuoteTheme,
  setProductData,
} from "@features/slices";
import { toast } from "react-toastify";
import { OtpGenerator } from "@pages/user";
import NextPrevButton from "./NextPrevButton";
import { DisplayCondition } from "./DisplayCondition";
import { useLazyGetProcessorDeductionsQuery } from "@features/api";
import {
  IConditionLabels,
  IConditions,
  IProductResponse,
} from "@features/api/productsApi/types";
import { IProcessorDeductionResponse } from "@features/api/processorsApi/type";
import { TOperation } from "@features/api/productsApi/types";
import { useNavigate } from "react-router-dom";
import { CustomSelect } from "@components/general"; // Adjust the import path
import { DisplayCondition2 } from "./DisplayCondition2";

interface SelectedState {
  selected: boolean;
  selectedLabel: IConditionLabels | null;
}

interface GroupedCondition {
  page: string;
  conditions: IConditions[];
}

interface LaptopsQuestionsProps {
  productsData: IProductResponse;
  deductions: IConditions[];
}

interface ConditionStatus {
  notSelected: boolean;
  keyword: string;
}

interface SelectionState {
  processor: IConditionLabels | null;
  ram: IConditionLabels | null;
  hardDisk: IConditionLabels | null;
}

const LaptopsQuestions2: React.FC<LaptopsQuestionsProps> = ({
  productsData,
  deductions,
}) => {
  // State management
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [lastPageIndex, setLastPageIndex] = useState<number>(0);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [processorBasedDeductions, setProcessorBasedDeductions] = useState<
    GroupedCondition[] | null
  >(null);
  console.log("processorBasedDeductions", processorBasedDeductions);

  // Selection state for each dropdown
  const [selections, setSelections] = useState<SelectionState>({
    processor: null,
    ram: null,
    hardDisk: null,
  });

  const isReQuote = useSelector(selectIsReQuoteTheme);
  const navigate = useNavigate();

  // Redux hooks
  const [getProcessorDeductionsRTK] = useLazyGetProcessorDeductionsQuery();
  const dispatch = useDispatch();

  // Constants
  const CUSTOM_ORDER = ["Processor", "Ram", "Hard Disk"] as const;
  const CONDITION_NAMES = {
    PROCESSOR: "Processor",
    HARD_DISK: "Hard Disk",
    RAM: "Ram",
    MODEL_LAUNCH_YEAR: "Model Launch Year",
  } as const;

  // Memoized functions
  const groupConditionsByPage = useCallback(
    (conditions: IConditions[]): GroupedCondition[] => {
      const grouped = conditions.reduce<Record<number, IConditions[]>>(
        (acc, condition) => {
          const { page } = condition;
          if (!acc[page]) {
            acc[page] = [];
          }

          const isSelected: SelectedState = {
            selected: false,
            selectedLabel: null,
          };
          acc[page].push({ ...condition, isSelected });
          return acc;
        },
        {}
      );

      // Custom order for page 1
      if (grouped[1]) {
        grouped[1].sort((a, b) => {
          const indexA = CUSTOM_ORDER.indexOf(a.conditionName as any);
          const indexB = CUSTOM_ORDER.indexOf(b.conditionName as any);
          return indexA - indexB;
        });
      }

      // Convert grouped object to sorted array
      return Object.keys(grouped)
        .sort((a, b) => Number(a) - Number(b))
        .map((page) => ({
          page,
          conditions: grouped[Number(page)],
        }));
    },
    []
  );

  const sortedConditions = useMemo(() => {
    return deductions ? groupConditionsByPage(deductions) : [];
  }, [deductions, groupConditionsByPage]);

  // Utility functions
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const closeModal = useCallback(() => {
    setShowOTP(false);
  }, []);

  // Validation function
  const validateMandatoryConditions = useCallback((): ConditionStatus => {
    const conditionStatus: ConditionStatus = {
      notSelected: false,
      keyword: "",
    };

    const conditionsToCheck =
      currentPageIndex > 0
        ? processorBasedDeductions?.[currentPageIndex - 1]?.conditions || []
        : sortedConditions[0]?.conditions || [];

    for (const condition of conditionsToCheck) {
      if (condition.isMandatory && !condition.isSelected.selected) {
        return { notSelected: true, keyword: condition.keyword || "" };
      }
    }

    return conditionStatus;
  }, [currentPageIndex, processorBasedDeductions, sortedConditions]);

  // API function
  const getProcessorDeductions = useCallback(
    async (
      processorId: string
    ): Promise<IProcessorDeductionResponse | undefined> => {
      try {
        const response = await getProcessorDeductionsRTK(processorId);
        const originalData = response?.data as IProcessorDeductionResponse;

        if (!originalData) return undefined;

        // Handle non-Apple brands
        if (productsData.brand.name !== "Apple") {
          const modifiedDeductions = originalData.deductions.map(
            (condition) => {
              if (
                condition.conditionName === CONDITION_NAMES.MODEL_LAUNCH_YEAR
              ) {
                return {
                  ...condition,
                  conditionName:
                    "Skip this Condition & Continue for the next!!",
                  conditionLabels: [],
                };
              }
              return condition;
            }
          );

          return {
            ...originalData,
            deductions: modifiedDeductions,
          };
        }

        return originalData;
      } catch (error) {
        console.error("Failed to fetch processor deductions:", error);
        toast.error("Failed to fetch processor deductions");
        return undefined;
      }
    },
    [getProcessorDeductionsRTK, productsData.brand.name]
  );

  // Update condition selection
  const updateConditionSelection = useCallback(
    (conditionName: string, selectedLabel: IConditionLabels) => {
      const targetConditions = sortedConditions[0]?.conditions || [];

      for (const condition of targetConditions) {
        if (condition.conditionName === conditionName) {
          condition.isSelected = {
            selected: true,
            selectedLabel,
          };
          break;
        }
      }
    },
    [sortedConditions]
  );

  // Handle processor selection
  const handleProcessorChange = useCallback(
    async (selectedLabel: IConditionLabels | null) => {
      if (!selectedLabel) {
        setSelections((prev) => ({ ...prev, processor: null }));
        return;
      }

      setSelections((prev) => ({ ...prev, processor: selectedLabel }));

      updateConditionSelection(CONDITION_NAMES.PROCESSOR, selectedLabel);

      const procBasedDed = await getProcessorDeductions(
        selectedLabel.conditionLabelId
      );

      if (procBasedDed) {
        const processor = sortedConditions[0]?.conditions.find(
          (d) => d.conditionName === CONDITION_NAMES.PROCESSOR
        );

        if (processor) {
          dispatch(
            addSingleDeductions({
              condition: processor,
              conditionLabel: {
                conditionLabel: selectedLabel.conditionLabel,
                priceDrop: selectedLabel.priceDrop,
                operation: selectedLabel.operation,
                type: CONDITION_NAMES.PROCESSOR,
              },
            })
          );
        }

        const sorted = groupConditionsByPage(procBasedDed.deductions);
        setProcessorBasedDeductions(sorted);

        const maxIndex = Math.max(
          ...procBasedDed.deductions.map((condition) => condition.page),
          0
        );
        setLastPageIndex(maxIndex);

        const prodData = {
          selectedProduct: productsData,
          getUpTo: {
            variantName: productsData.variants[0]?.name || "",
            price: selectedLabel.priceDrop,
          },
        };

        dispatch(setProductData(prodData));
      }
    },
    [
      updateConditionSelection,
      getProcessorDeductions,
      sortedConditions,
      dispatch,
      productsData,
      groupConditionsByPage,
    ]
  );

  // Handle RAM selection
  const handleRamChange = useCallback(
    (selectedLabel: IConditionLabels | null) => {
      if (!selectedLabel) {
        setSelections((prev) => ({ ...prev, ram: null }));
        return;
      }

      setSelections((prev) => ({ ...prev, ram: selectedLabel }));
      updateConditionSelection(CONDITION_NAMES.RAM, selectedLabel);

      const ram = sortedConditions[0]?.conditions.find(
        (d) => d.conditionName === CONDITION_NAMES.RAM
      );

      if (ram) {
        dispatch(
          addSingleDeductions({
            condition: ram,
            conditionLabel: {
              conditionLabel: selectedLabel.conditionLabel,
              priceDrop: selectedLabel.priceDrop,
              operation: selectedLabel.operation,
              type: CONDITION_NAMES.RAM,
            },
          })
        );
      }
    },
    [updateConditionSelection, sortedConditions, dispatch]
  );

  // Handle Hard Disk selection
  const handleHardDiskChange = useCallback(
    (selectedLabel: IConditionLabels | null) => {
      if (!selectedLabel) {
        setSelections((prev) => ({ ...prev, hardDisk: null }));
        return;
      }

      setSelections((prev) => ({ ...prev, hardDisk: selectedLabel }));
      updateConditionSelection(CONDITION_NAMES.HARD_DISK, selectedLabel);

      const hardDisk = sortedConditions[0]?.conditions.find(
        (d) => d.conditionName === CONDITION_NAMES.HARD_DISK
      );

      if (hardDisk) {
        dispatch(
          addSingleDeductions({
            condition: hardDisk,
            conditionLabel: {
              conditionLabel: selectedLabel.conditionLabel,
              priceDrop: selectedLabel.priceDrop,
              operation: selectedLabel.operation,
              type: CONDITION_NAMES.HARD_DISK,
            },
          })
        );
      }
    },
    [updateConditionSelection, sortedConditions, dispatch]
  );

  // Get handler based on condition name
  const getSelectionHandler = useCallback(
    (conditionName: string) => {
      switch (conditionName) {
        case CONDITION_NAMES.PROCESSOR:
          return handleProcessorChange;
        case CONDITION_NAMES.RAM:
          return handleRamChange;
        case CONDITION_NAMES.HARD_DISK:
          return handleHardDiskChange;
        default:
          return () => {};
      }
    },
    [handleProcessorChange, handleRamChange, handleHardDiskChange]
  );

  // Get current selection value
  const getSelectionValue = useCallback(
    (conditionName: string) => {
      switch (conditionName) {
        case CONDITION_NAMES.PROCESSOR:
          return selections.processor;
        case CONDITION_NAMES.RAM:
          return selections.ram;
        case CONDITION_NAMES.HARD_DISK:
          return selections.hardDisk;
        default:
          return null;
      }
    },
    [selections]
  );

  // Event handlers
  const handleContinue = useCallback(() => {
    const conditionStatus = validateMandatoryConditions();

    if (conditionStatus.notSelected) {
      toast.error(`Please select ${conditionStatus.keyword} to proceed`);
      return;
    }

    if (currentPageIndex < lastPageIndex - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
      scrollToTop();
    } else {
      if (!isReQuote) {
        setShowOTP(true);
      } else {
        navigate("completion");
        dispatch(performCalculation());
      }
    }
  }, [
    currentPageIndex,
    lastPageIndex,
    validateMandatoryConditions,
    scrollToTop,
    isReQuote,
    navigate,
    dispatch,
  ]);

  const handlePrevious = useCallback(() => {
    setCurrentPageIndex((prev) => prev - 1);
    if (currentPageIndex === 1) {
      window.location.reload();
    }
  }, [currentPageIndex]);

  // Early return if no sorted conditions
  if (!sortedConditions.length) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-500">No conditions available</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col space-y-6">
        {currentPageIndex === 0 && (
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Select System Configuration
            </h2>
            <p className="text-gray-600 text-sm">
              Choose your device specifications to get an accurate price
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Configuration selection for first page */}
          {currentPageIndex === 0 &&
            sortedConditions[0]?.conditions.map((condition) => (
              <div
                key={condition.conditionId}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {condition.conditionName}
                      {condition.isMandatory && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h3>
                    {condition.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {condition.description}
                      </p>
                    )}
                  </div>
                </div>

                <CustomSelect<IConditionLabels>
                  label=""
                  options={condition.conditionLabels}
                  value={getSelectionValue(condition.conditionName)}
                  onChange={getSelectionHandler(condition.conditionName)}
                  placeholder={`Select ${condition.conditionName.toLowerCase()}`}
                  displayKey="conditionLabel"
                  valueKey="conditionLabelId"
                  searchable={condition.conditionLabels.length > 5}
                  clearable={!condition.isMandatory}
                  required={condition.isMandatory}
                />
              </div>
            ))}

          {/* Processor-based conditions for subsequent pages */}
          {currentPageIndex > 0 &&
            processorBasedDeductions?.[currentPageIndex - 1]?.conditions?.map(
              (condition, index) => (
                <div
                  key={condition.conditionId}
                  className="animate-slideIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <DisplayCondition2 condition={condition} />
                </div>
              )
            )}
        </div>

        <NextPrevButton
          prevHandler={handlePrevious}
          nextHandler={handleContinue}
          currentPageIndex={currentPageIndex}
        />
      </div>

      {/* OTP Modal */}
      {showOTP && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 animate-fadeIn">
          <div className="animate-slideUp">
            <OtpGenerator closeModal={closeModal} isOpen={showOTP} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LaptopsQuestions2;
