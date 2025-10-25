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

const LaptopsQuestions: React.FC<LaptopsQuestionsProps> = ({
  productsData,
  deductions,
}) => {
  console.log("LaptopsQuestions");

  // State management
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [lastPageIndex, setLastPageIndex] = useState<number>(0);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [processorBasedDeductions, setProcessorBasedDeductions] = useState<
    GroupedCondition[] | null
  >(null);

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
      console.log("IN groupConditionsByPage laptop");

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

  const resetStateData = useCallback(() => {
    dispatch(clearDeductions(undefined));
  }, [dispatch]);

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
        console.log("condition isMandatory", condition);
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

        // Handle non-Apple brands - create a new object to avoid mutation
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

          const data: IProcessorDeductionResponse = {
            ...originalData,
            deductions: modifiedDeductions,
          };

          console.log("Checking for model Launch Year:", data.deductions);
          return data;
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

  // Event handlers
  const handleContinue = useCallback(() => {
    console.log("handleContinue");

    const conditionStatus = validateMandatoryConditions();

    if (conditionStatus.notSelected) {
      toast.error(`Select ${conditionStatus.keyword} to proceed..!`);
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
  ]);

  const handlePrevious = useCallback(() => {
    setCurrentPageIndex((prev) => prev - 1);
    if (currentPageIndex === 1) {
      // TODO: Need to refactor to clear data properly
      window.location.reload();
      // resetStateData();
    }
  }, [currentPageIndex, resetStateData]);

  const updateConditionSelection = useCallback(
    (
      conditionName: string,
      conditionLabelId: string,
      conditionLabel: string,
      priceDrop: number,
      operation: string
    ) => {
      const targetConditions = sortedConditions[0]?.conditions || [];

      for (const condition of targetConditions) {
        if (condition.conditionName === conditionName) {
          condition.isSelected = {
            selected: true,
            selectedLabel: {
              conditionLabelId,
              conditionLabel,
              priceDrop,
              operation,
            },
          };
          break;
        }
      }
    },
    [sortedConditions]
  );

  const handleSelectChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedIndex = event.target.selectedIndex;
      const selectedOption = event.target.options[selectedIndex];

      const conditionLabel = selectedOption.getAttribute("data-arg1") || "";
      const priceDrop = Number(selectedOption.getAttribute("data-arg2")) || 0;
      const conditionName = selectedOption.getAttribute("data-arg3") || "";
      const operation = selectedOption.getAttribute("data-arg4") || "";
      const conditionLabelId = selectedOption.getAttribute("data-arg5") || "";

      // Update selection state
      updateConditionSelection(
        conditionName,
        conditionLabelId,
        conditionLabel,
        priceDrop,
        operation
      );

      const conditionLabelData = {
        conditionLabel,
        priceDrop,
        operation: operation as TOperation,
        type: conditionName,
      };

      // Handle different condition types
      switch (conditionName) {
        case CONDITION_NAMES.PROCESSOR: {
          const procBasedDed = await getProcessorDeductions(conditionLabelId);
          console.log("procBasedDed", procBasedDed);

          if (procBasedDed) {
            const processor = sortedConditions[0]?.conditions.find(
              (d) => d.conditionName === CONDITION_NAMES.PROCESSOR
            );

            if (processor) {
              dispatch(
                addSingleDeductions({
                  condition: processor,
                  conditionLabel: conditionLabelData,
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
                price: priceDrop,
              },
            };

            dispatch(setProductData(prodData));
          }
          break;
        }

        case CONDITION_NAMES.HARD_DISK: {
          const hardDisk = sortedConditions[0]?.conditions.find(
            (d) => d.conditionName === CONDITION_NAMES.HARD_DISK
          );
          if (hardDisk) {
            dispatch(
              addSingleDeductions({
                condition: hardDisk,
                conditionLabel: conditionLabelData,
              })
            );
          }
          break;
        }

        case CONDITION_NAMES.RAM: {
          const ram = sortedConditions[0]?.conditions.find(
            (d) => d.conditionName === CONDITION_NAMES.RAM
          );
          if (ram) {
            dispatch(
              addSingleDeductions({
                condition: ram,
                conditionLabel: conditionLabelData,
              })
            );
          }
          break;
        }

        default:
          console.warn(`Unknown condition name: ${conditionName}`);
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

  // Early return if no sorted conditions
  if (!sortedConditions.length) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-500">No conditions available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col">
        {currentPageIndex === 0 && (
          <h2 className="text-center font-semibold text-2xl sm:text-xl max-sm:text-sm mt-5">
            Select the system configuration of your device?
          </h2>
        )}

        <div className="flex flex-col gap-5">
          {/* Configuration selection for first page */}
          {currentPageIndex === 0 &&
            sortedConditions[0]?.conditions.map((condition) => (
              <div
                key={condition.conditionId}
                className="px-4 py-4 max-sm:py-2"
              >
                <h2 className="px-1 py-2 font-extrabold text-lg max-sm:text-sm">
                  {condition.conditionName}
                  {condition.isMandatory && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </h2>
                <div className="flex">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-4 pr-8 max-sm:px-2 max-sm:py-2 rounded shadow-lg max-sm:text-xs leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors duration-200"
                    onChange={handleSelectChange}
                    defaultValue=""
                  >
                    <option
                      value=""
                      className="py-2 bg-transparent hover:bg-gray-200"
                    >
                      Select {condition.conditionName.toLowerCase()}
                    </option>
                    {condition.conditionLabels.map((label) => (
                      <option
                        key={label.conditionLabelId}
                        value={label.conditionLabel}
                        data-arg1={label.conditionLabel}
                        data-arg2={label.priceDrop}
                        data-arg3={condition.conditionName}
                        data-arg4={label.operation}
                        data-arg5={label.conditionLabelId}
                        className="py-2"
                      >
                        {label.conditionLabel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

          {/* Processor-based conditions for subsequent pages */}
          {currentPageIndex > 0 &&
            processorBasedDeductions?.[currentPageIndex - 1]?.conditions?.map(
              (condition) => (
                <DisplayCondition
                  key={condition.conditionId}
                  condition={condition}
                />
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <OtpGenerator closeModal={closeModal} isOpen={showOTP} />
        </div>
      )}
    </div>
  );
};

export default LaptopsQuestions;
