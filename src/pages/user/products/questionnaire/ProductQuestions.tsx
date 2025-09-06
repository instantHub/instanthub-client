import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useGetProductDetailsQuery } from "@api";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductData,
  clearDeductions,
  selectDeductionState,
} from "@features/slices";
import { toast } from "react-toastify";
import ProdDeductionsRight from "./ProdQuestionsRight";
import LaptopsQuestions from "./LaptopsQuestions";
import { OtpGenerator } from "@pages/user";
import { Loading, NoDataBlock, ProgressBar } from "@components/user";
import NextPrevButton from "./NextPrevButton";
import { DisplayCondition } from "./DisplayCondition";
import { groupConditionsByPage } from "@utils/user";
import { ISortedConditionsByPage } from "@utils/types";
import { DeviceCheck, SwitchedOff } from "../components";
import { Typography } from "@components/general";

export interface AboutDevice {
  isDeviceOn: boolean;
  isDeviceChecked: boolean;
}

interface IProductQuestionsProps {
  isReQuote?: boolean;
}

interface ConditionStatus {
  notSelected: boolean;
  keyword: string;
}

// Main Component
export const ProductQuestions: FC<IProductQuestionsProps> = ({
  isReQuote = false,
}) => {
  // Query Params
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product");
  const selectedVariant = searchParams.get("variant");

  const dispatch = useDispatch();

  const deductionsState = useSelector(selectDeductionState);
  console.log("deductionsState", deductionsState);

  const { data: productsData, isLoading } = useGetProductDetailsQuery(product!);

  // State
  const [deductions, setDeductions] = useState<any[]>();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [aboutDevice, setAboutDevice] = useState<AboutDevice>({
    isDeviceOn: false,
    isDeviceChecked: false,
  });
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  // Memoized sorted conditions
  const sortedConditions = useMemo((): ISortedConditionsByPage[] => {
    return deductions ? groupConditionsByPage(deductions) : [];
  }, [deductions]);

  // Event Handlers
  const handleContinue = useCallback(() => {
    const conditionStatus: ConditionStatus = {
      notSelected: false,
      keyword: "",
    };

    const setConditionStatus = (selected: boolean, keyword: string) => {
      conditionStatus.notSelected = selected;
      conditionStatus.keyword = keyword;
    };

    // Check for mandatory conditions
    for (const condition of sortedConditions[currentPageIndex].conditions) {
      if (condition.isMandatory && !condition.isSelected.selected) {
        setConditionStatus(true, condition.keyword);
        break;
      }
    }

    if (conditionStatus.notSelected) {
      toast.error(`Select ${conditionStatus.keyword} to proceed..!`);
      return;
    }

    if (currentPageIndex < sortedConditions.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (!isReQuote) {
        setShowOTP(true);
      }
    }
  }, [currentPageIndex, sortedConditions, isReQuote]);

  const handlePrevious = useCallback(() => {
    setCurrentPageIndex((prev) => prev - 1);
  }, []);

  const closeModal = useCallback(() => {
    setShowOTP(false);
  }, []);

  useEffect(() => {
    dispatch(clearDeductions(undefined));

    const handlePopstate = () => {
      dispatch(clearDeductions(undefined));
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!productsData || !selectedVariant) return;

    const { category, variants, variantDeductions, simpleDeductions } =
      productsData;

    const variant = variants.find((v) => v.name === selectedVariant);
    if (!variant) return;

    // Set deductions based on category type
    if (category.categoryType.multiVariants) {
      const varDeduction = variantDeductions.find(
        (vd) => vd.variantName === selectedVariant
      );
      if (varDeduction) {
        setDeductions(varDeduction.deductions);
      }
    } else {
      setDeductions(simpleDeductions);
    }

    // Set initial product data in reducer
    const prodData = {
      selectedProduct: productsData,
      getUpTo: {
        variantName: selectedVariant,
        price: variant.price,
      },
    };

    dispatch(setProductData(prodData));
  }, [productsData, selectedVariant, dispatch]);

  // Calculate progress bar percentage
  useEffect(() => {
    if (currentPageIndex > 0 && sortedConditions.length > 0) {
      setProgressPercentage((currentPageIndex / sortedConditions.length) * 100);
    }
  }, [sortedConditions, currentPageIndex]);

  // Loading state
  if (isLoading) return <Loading />;

  // Device switched off state
  if (aboutDevice.isDeviceChecked && !aboutDevice.isDeviceOn) {
    return <SwitchedOff />;
  }

  // No data state
  if (!sortedConditions.length) return <NoDataBlock />;

  const currentConditions = sortedConditions[currentPageIndex];
  const isProcessorBased = productsData?.category.categoryType.processorBased;

  return (
    <div className="mt-4 w-full">
      <div className="flex gap-3 justify-center my-auto max-sm:flex-col max-sm:items-center">
        <div className="relative w-[55%] flex flex-col sm:min-h-[450px] border py-6 rounded my-auto max-sm:w-[95%] overflow-hidden">
          <ProgressBar progressPercentage={progressPercentage} />

          <Typography variant="h5" className=" mx-auto font-semibold">
            Tell Us More About Your Device
          </Typography>

          {!aboutDevice.isDeviceChecked && productsData && (
            <DeviceCheck setAboutDevice={setAboutDevice} />
          )}

          {/* Non-processor based products */}
          {aboutDevice.isDeviceOn && deductions && !isProcessorBased && (
            <div
              key={currentConditions?.page}
              className="flex flex-col gap-5 mt-5"
            >
              {currentConditions?.conditions?.map((condition) => (
                <DisplayCondition
                  key={condition.conditionId}
                  condition={condition}
                />
              ))}

              <NextPrevButton
                prevHandler={handlePrevious}
                nextHandler={handleContinue}
                currentPageIndex={currentPageIndex}
              />
            </div>
          )}

          {/* Processor-based products (Laptops) */}
          {aboutDevice.isDeviceOn &&
            productsData &&
            deductions &&
            isProcessorBased && (
              <LaptopsQuestions
                productsData={productsData}
                deductions={deductions}
              />
            )}
        </div>

        {/* Right Side Component */}
        <ProdDeductionsRight />
      </div>

      {/* OTP Modal */}
      {showOTP && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <OtpGenerator closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};
