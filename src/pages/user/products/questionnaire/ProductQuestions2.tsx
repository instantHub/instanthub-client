import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useGetProductDetailsQuery } from "@api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductData,
  clearDeductions,
  selectIsReQuoteTheme,
  performCalculation,
} from "@features/slices";
import { toast } from "react-toastify";
import ProdDeductionsRight from "./ProdQuestionsRight";
import LaptopsQuestions from "./LaptopsQuestions";
import { OtpGenerator } from "@pages/user";
import { Loading, NoDataBlock, ProgressBar } from "@components/user";
import NextPrevButton from "./NextPrevButton";
import { groupConditionsByPage } from "@utils/user";
import { ISortedConditionsByPage } from "@utils/types";
import { DeviceCheck, SwitchedOff } from "../components";
import { Typography } from "@components/general";
import { CheckCircle } from "lucide-react";
import { DisplayCondition2 } from "./DisplayCondition2";
import ProdDeductionsRight2 from "./ProdQuestionsRight2";
import LaptopsQuestions2 from "./LaptopsQuestions2";

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

export const ProductQuestions2: FC<IProductQuestionsProps> = ({
  isReQuote = false,
}) => {
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product");
  const selectedVariant = searchParams.get("variant");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reQuoteTheme = useSelector(selectIsReQuoteTheme);

  const { data: productsData, isLoading } = useGetProductDetailsQuery(product!);

  const [deductions, setDeductions] = useState<any[]>();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [aboutDevice, setAboutDevice] = useState<AboutDevice>({
    isDeviceOn: false,
    isDeviceChecked: false,
  });
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  const sortedConditions = useMemo((): ISortedConditionsByPage[] => {
    return deductions ? groupConditionsByPage(deductions) : [];
  }, [deductions]);

  const handleContinue = useCallback(() => {
    const conditionStatus: ConditionStatus = {
      notSelected: false,
      keyword: "",
    };

    for (const condition of sortedConditions[currentPageIndex].conditions) {
      if (condition.isMandatory && !condition.isSelected.selected) {
        conditionStatus.notSelected = true;
        conditionStatus.keyword = condition.keyword;
        break;
      }
    }

    if (conditionStatus.notSelected) {
      toast.error(`Please select ${conditionStatus.keyword} to proceed`);
      return;
    }

    if (currentPageIndex < sortedConditions.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (!isReQuote) {
        setShowOTP(true);
      } else {
        navigate("completion");
        dispatch(performCalculation());
      }
    }
  }, [currentPageIndex, sortedConditions, isReQuote, navigate, dispatch]);

  const handlePrevious = useCallback(() => {
    setCurrentPageIndex((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [dispatch]);

  useEffect(() => {
    if (!productsData || !selectedVariant) return;

    const { category, variants, variantDeductions, simpleDeductions } =
      productsData;
    const variant = variants.find((v) => v.name === selectedVariant);
    if (!variant) return;

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

    const prodData = {
      selectedProduct: productsData,
      getUpTo: {
        variantName: selectedVariant,
        price: variant.price,
      },
    };

    dispatch(setProductData(prodData));
  }, [productsData, selectedVariant, dispatch]);

  useEffect(() => {
    if (currentPageIndex >= 0 && sortedConditions.length > 0) {
      setProgressPercentage(
        ((currentPageIndex + 1) / sortedConditions.length) * 100
      );
    }
  }, [sortedConditions, currentPageIndex]);

  if (isLoading) return <Loading />;
  if (aboutDevice.isDeviceChecked && !aboutDevice.isDeviceOn) {
    return <SwitchedOff />;
  }
  if (!sortedConditions.length) return <NoDataBlock />;

  const currentConditions = sortedConditions[currentPageIndex];
  const isProcessorBased = productsData?.category.categoryType.processorBased;

  return (
    <div className="min-h-screen py-6">
      <div className="w-full min-w-[380px] lg:min-w-5xl mx-">
        {/* Progress Indicator */}
        <div className="">
          <div className="bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-instant-mid">
                  Step {currentPageIndex + 1} of {sortedConditions.length}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <ProgressBar progressPercentage={progressPercentage} />
          </div>
        </div>

        <div className="flex gap-6 justify-center lg:flex-row flex-col px-2">
          {/* Main Questions Section */}
          <div className="w-full lg:max-w-[750px]">
            <div className="bg-white rounded-lg shadow-xl overflow-visible">
              {/* Header */}
              <div className="w-full lg:w-[750px] bg-gradient-to-r from-instant-mid/20 to-instant-end/20 p-6 text-instant-mid">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <Typography variant="h4" className="font-bold">
                    Tell Us About Your Device
                  </Typography>
                </div>
                <p className="text-instant-mid/80 text-sm">
                  Answer a few questions to get an accurate price
                </p>
              </div>

              {/* Content */}
              <div className="p-4 md:p-8 min-h-[450px]">
                {!aboutDevice.isDeviceChecked && productsData && (
                  <DeviceCheck setAboutDevice={setAboutDevice} />
                )}

                {/* Non-processor based products */}
                {aboutDevice.isDeviceOn && deductions && !isProcessorBased && (
                  <div className="space-y-6 lg:space-y-8 animate-fadeIn">
                    {currentConditions?.conditions?.map((condition, index) => (
                      <div
                        key={condition.conditionId}
                        className="animate-slideIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <DisplayCondition2 condition={condition} />
                      </div>
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
                    <LaptopsQuestions2
                      productsData={productsData}
                      deductions={deductions}
                    />
                  )}
              </div>
            </div>
          </div>

          {/* Right Side Component - Sticky */}
          <div className="w-[350px s">
            <div className="lg:sticky lg:top-6">
              <ProdDeductionsRight2 />
              {/* <ProdDeductionsRight /> */}
            </div>
          </div>
        </div>
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
