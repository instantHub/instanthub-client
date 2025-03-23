import React, { useEffect, useMemo, useState } from "react";
import { useGetProductDetailsQuery } from "../../../features/api/products/productsApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setProductData,
  clearDeductions,
} from "../../../features/slices/deductionSlice";
import { toast } from "react-toastify";
import ProdDeductionsRight from "./ProdQuestionsRight";
import LaptopsQuestions from "./LaptopsQuestions";
import OtpGenerator from "../../otp/OTPGenerator";
import DeductionItems from "./DeductionItems";
import { Helmet } from "react-helmet-async";
import Loading from "../../../components/loader/Loading";
import ProgressBar from "../../../components/ProgressBar";
import { LAPTOP_DESKTOP } from "../../../utils/constants";
import NextPrevButton from "./NextPrevButton";
import { groupConditionsByPage } from "../../../utils/helper";
import DisplayCondition from "./DisplayCondition";

const ProductQuestions = () => {
  // Query Params
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const selectedVariant = searchParams.get("variant");

  const dispatch = useDispatch();

  const { data: productsData, isLoading } =
    useGetProductDetailsQuery(productId);
  // console.log("productsData", productsData);

  const [deductions, setDeductions] = useState();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [aboutDevice, setAboutDevice] = useState({
    isDeviceOn: false,
    isDeviceChecked: false,
  });

  const [showOTP, setShowOTP] = useState(false);

  const [progressPercentage, setProgressPercentage] = useState(0);

  const handleContinue = () => {
    let conditionStatus = { notSelected: false, keyword: "" };
    // console.log("condition selected or not", conditionStatus);

    function setConditionStatus(selected, keyword) {
      conditionStatus.notSelected = selected;
      conditionStatus.keyword = keyword;
    }

    sortedConditions[currentPageIndex].conditions.forEach((condition) => {
      if (condition.isMandatory && !condition.isSelected.selected) {
        setConditionStatus(true, condition.keyword);
        return;
      }
    });

    if (conditionStatus.notSelected) {
      toast.error(`Select ${conditionStatus.keyword} to proceed..!`);
      setConditionStatus(false, "");
      return;
    }

    if (currentPageIndex < sortedConditions.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setConditionStatus(false, "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // console.log("No more conditions to display.");
      setShowOTP(true);
    }
  };

  const closeModal = () => {
    setShowOTP(false);
  };

  const sortedConditions = useMemo(() => {
    return deductions ? groupConditionsByPage(deductions) : [];
  }, [deductions]);

  // UseEffect to clear Deductions on initial render from reducer
  useEffect(() => {
    // Dispatch the action to clear deductions on initial render
    dispatch(clearDeductions());

    // Event listener to handle browser back button
    const handlePopstate = () => {
      // Dispatch the action to clear deductions when the user navigates back using the browser back button
      dispatch(clearDeductions());
    };

    // Add event listener for the popstate event
    window.addEventListener("popstate", handlePopstate);

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [dispatch]); // include dispatch in the dependency array to ensure that it has access to the latest dispatch function.

  // useEffect to set deductions and priceUpTo value from productsData
  useEffect(() => {
    if (productsData) {
      const { category, variants, variantDeductions, simpleDeductions } =
        productsData;

      const variant = variants.find(
        (variant) => variant.name == selectedVariant
      );

      // Setting deductions and its pages
      if (category.name === "Mobile") {
        const varDeduction = variantDeductions.find(
          (vd) => vd.variantName === selectedVariant
        );
        // console.log("Mobile Deductions", d[0].deductions);
        setDeductions(varDeduction.deductions);
      } else if (category.name !== "Mobile") {
        setDeductions(simpleDeductions);
      }

      // Initial State in reducer
      let prodData = {
        selectedProduct: productsData,
        getUpTo: {
          variantName: selectedVariant,
          price: variant.price,
        },
      };

      dispatch(setProductData(prodData));
    }
    // console.log("selectedVariant", selectedVariant, priceGetUpTo);
  }, [productsData]);

  // calculate progressbar
  useEffect(() => {
    if (currentPageIndex > 0) {
      setProgressPercentage(
        (currentPageIndex / Object.keys(sortedConditions).length) * 100
      );
    }
  }, [sortedConditions, currentPageIndex]);

  if (isLoading) return <Loading />;

  /* If the product if switched off */
  if (aboutDevice.isDeviceChecked && !aboutDevice.isDeviceOn)
    return <SwitchedOff productsData={productsData} />;

  // console.log("deductions", deductions);
  // console.log("sortedConditions ProductQuestions", sortedConditions);

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${`${productsData?.category?.name}`} Online and Get Instant Cash for used ${`${productsData?.category?.name}s`} | InstantHub`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
      </Helmet>

      <div className=" mt-4 ">
        <div className="flex  gap-3 justify-center my-auto max-sm:flex-col max-sm:items-center">
          <div className="relative w-[55%] flex flex-col sm:min-h-[450px] border py-6 rounded my-auto max-sm:w-[95%] overflow-hidden">
            <ProgressBar progressPercentage={progressPercentage} />

            <h2 className="mx-auto pb-0 font-semibold text-xl max-sm:text-sm">
              Tell Us More About Your Device
            </h2>

            {/* Is device Switched On YES or NO */}
            {!aboutDevice.isDeviceChecked && (
              <DeviceCheck
                productsData={productsData}
                setAboutDevice={setAboutDevice}
              />
            )}

            {/* Products that are not under Laptop Category */}
            {aboutDevice.isDeviceOn &&
            deductions &&
            !LAPTOP_DESKTOP.includes(
              productsData.category.name.toLowerCase()
            ) ? (
              <div
                key={sortedConditions[currentPageIndex].page}
                className="flex flex-col gap-5"
              >
                {sortedConditions[currentPageIndex].conditions.map(
                  (condition) => (
                    <DisplayCondition
                      key={condition.conditionId}
                      condition={condition}
                    />
                  )
                )}

                <NextPrevButton
                  prevHandler={() => setCurrentPageIndex((prev) => prev - 1)}
                  nextHandler={handleContinue}
                  currentPageIndex={currentPageIndex}
                />
              </div>
            ) : (
              aboutDevice.isDeviceOn &&
              productsData &&
              deductions && (
                <LaptopsQuestions
                  productsData={productsData}
                  deductions={deductions}
                />
              )
            )}
          </div>

          {/* Right Side Div */}
          <ProdDeductionsRight />
        </div>

        {showOTP && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <OtpGenerator closeModal={closeModal} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductQuestions;

const SwitchedOff = ({ productsData }) => {
  const { id, category, name } = productsData;
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center text-center min-h-svh ">
      <div className="flex flex-col items-center">
        <h2 className="my-3">
          Your {category?.name}
          <span className="font-semibold"> {name} </span>
          is <span className="text-red-500 font-semibold">Switched Off.</span>
        </h2>
        <p className="text-lg max-sm:text-sm px-4 text-[#E27D60]">
          Please Contact Customer Support 8722288017
        </p>
        <button
          onClick={() =>
            navigate(
              `/recycle-categories/recycle-brands/recycle-productDetails/${id}`
            )
          }
          className="bg-green-600 px-2 py-1 mt-4 rounded text-white"
        >
          Recycle this product
        </button>
      </div>
    </div>
  );
};

const DeviceCheck = ({ productsData, setAboutDevice }) => {
  function DeviceCheckButton(innerText) {
    return (
      <div
        onClick={() =>
          setAboutDevice({
            isDeviceOn: innerText === "Yes" ? true : false,
            isDeviceChecked: true,
          })
        }
        className={`flex pr-16 max-sm:pr-8 items-center border rounded-md cursor-pointer p-2.5 max-sm:p-1.5 ring-0 ring-transparent shadow hover:border-secondary`}
      >
        <span className="border border-solid rounded-full w-5 h-5 max-sm:w-4 max-sm:h-4 mr-1.5"></span>
        <span className="text-sm  flex-1 flex justify-center">{innerText}</span>
      </div>
    );
  }
  return (
    <div className="px-5 py-2 mt-10 text-lg max-sm:text-sm">
      <h2 className="justify-center text-center pb-4">
        Is your {productsData?.category?.name} Switched On?
      </h2>

      <div className="flex gap-4 justify-center">
        {DeviceCheckButton("Yes")}
        {DeviceCheckButton("No")}
      </div>
    </div>
  );
};

// Important and Needed
{
  // // if no deduction questions found
  // if (productsData?.category?.name === "Mobile") {
  //   // const { category } = productsData;
  //   if (productsData?.variantDeductions.length < 1) {
  //     return (
  //       <h2 className="my-[10%] mx-auto text-center">
  //         No Questions Available Yet for Category{" "}
  //         <b>{productsData.category.name}</b>
  //       </h2>
  //     );
  //   }
  // } else if (productsData?.category?.name !== "Mobile") {
  //   // const { category } = productsData;
  //   if (productsData?.simpleDeductions.length < 1) {
  //     return (
  //       <h2 className="my-[10%] mx-auto text-center">
  //         No Questions Available Yet for Category{" "}
  //         <b>{productsData.category.name}</b>
  //       </h2>
  //     );
  //   }
  // }
}

// getConditionSubTitle
{
  // function getConditionSubTitle(conditionName) {
  //   const subTitleMap = {
  //     functional:
  //       "Please choose appropriate condition to get an accurate quote",
  //     accessories: (
  //       <>
  //         <span className="block text-lg max-sm:text-sm">
  //           Do you have the following?
  //         </span>
  //         <span className="text-sm max-sm:text-xs font-medium text-gray-600">
  //           Please select accessories which are available
  //         </span>
  //       </>
  //     ),
  //     age: "Let us know how old your device is. Valid bill is needed for devices less than 3 years.",
  //     "screen condition":
  //       "The better condition your device is in, the more we will pay you.",
  //     defect: "Please provide correct details",
  //     "physical condition": "Please provide correct details",
  //   };
  //   for (const [condition, subTitle] of Object.entries(subTitleMap)) {
  //     if (conditionName.toLowerCase().includes(condition)) {
  //       return subTitle;
  //     }
  //   }
  //   return null;
  // }
}
