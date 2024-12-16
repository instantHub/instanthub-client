import React, { useEffect, useRef, useState } from "react";
import { useGetProductDetailsQuery } from "../../features/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeductions,
  setGetUpto,
  clearDeductions,
  removeDeductions,
  addProductAge,
} from "../../features/deductionSlice";
import { clearLaptopDeductions } from "../../features/laptopDeductionSlice";
import { toast } from "react-toastify";
import ProdDeductionsRight from "./ProdQuestionsRight";
import LaptopsQuestions from "./LaptopsQuestions";
import OtpGenerator from "../otp/OTPGenerator";
import DeductionItems from "./DeductionItems";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading";

const ProductQuestions = () => {
  // Query Params
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const selectedVariant = searchParams.get("variant");

  //   Fetching Product details
  const { data: productsData, isLoading } =
    useGetProductDetailsQuery(productId);
  const [priceGetUpTo, setPriceGetUpTo] = useState();
  const [deductions, setDeductions] = useState();
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  // const [currentConditionIndex, setCurrentConditionIndex] = useState(0);

  const [checkIsOn, setCheckIsOn] = useState(false);
  const [checkIsOff, setCheckIsOff] = useState(false);

  const [aboutDevice, setAboutDevice] = useState({
    isDeviceOn: false,
    isDeviceChecked: false,
  });

  const [showOTP, setShowOTP] = useState(false);

  const [physicalCondition, setPhysicalCondition] = useState();
  const [physicalConditionPage, setPhysicalConditionPage] = useState();
  const [screenCondition, setScreenCondition] = useState();
  const [screenConditionPage, setScreenConditionPage] = useState();
  const [displayDefectCondition, setDisplayDefectCondition] = useState();
  const [displayDefectConditionPage, setDisplayDefectConditionPage] =
    useState();

  // console.log(
  //   "physicalConditionPage",
  //   physicalConditionPage,
  //   "screenConditionPage",
  //   screenConditionPage
  // );

  const [age, setAge] = useState(null);
  const [agePage, setAgePage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deductionData = useSelector((state) => state.deductions.deductions);
  const data = useSelector((state) => state.deductions);
  // console.log("useSelector", data);

  const handleAge = async (ageLabel, price, operation) => {
    setAge(true);
    dispatch(
      addProductAge({
        conditionLabel: ageLabel,
        priceDrop: price,
        operation: operation,
        type: "Age of the Device",
      })
    );
  };

  const handleLabelSelection = (label, price, operation, type) => {
    // console.log("handleLabelSelection");
    if (!selectedLabels.some((sl) => sl.conditionLabel == label)) {
      setSelectedLabels([
        ...selectedLabels,
        { conditionLabel: label, priceDrop: price },
      ]);
      dispatch(
        addDeductions({
          conditionLabel: label,
          priceDrop: price,
          operation,
          type,
        })
      );
    } else if (selectedLabels.some((sl) => sl.conditionLabel == label)) {
      setSelectedLabels(
        selectedLabels.filter(
          (selectedLabel) => selectedLabel.conditionLabel !== label
        )
      );
      dispatch(
        removeDeductions({
          conditionLabel: label,
          priceDrop: price,
          operation,
          type,
        })
      );
    }
  };

  const handleContinue = () => {
    // console.log("physicalCondition", physicalConditionPage);
    if (
      currentPageIndex === physicalConditionPage - 1 &&
      physicalCondition === undefined
    ) {
      toast.error("Select Physical Condition to proceed..!");
      return;
    }

    if (
      currentPageIndex === screenConditionPage - 1 &&
      screenCondition === undefined
    ) {
      toast.error("Select Screen Condition to proceed..!");
      return;
    }

    if (currentPageIndex === agePage - 1 && age === null) {
      toast.error("Select Age to proceed..!");
      return;
    }

    // if (
    //   currentPageIndex === displayDefectConditionPage - 1 &&
    //   displayDefectCondition === undefined
    // ) {
    //   toast.error("Select Display Defects to proceed.!");
    //   return;
    // }

    if (currentPageIndex < sortedConditions.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      // console.log("No more conditions to display.");
      setShowOTP(true);
    }
  };

  // if no deduction questions found
  if (productsData) {
    if (productsData.category.name === "Mobile") {
      if (productsData.variantDeductions.length < 1) {
        return (
          <h2 className="my-[10%] mx-auto text-center">
            No Questions Available Yet for Category{" "}
            <span className="font-bold"> {productsData.category.name}</span>
          </h2>
        );
      }
    } else if (productsData.category.name !== "Mobile") {
      if (productsData.simpleDeductions.length < 1) {
        return (
          <h2 className="my-[10%] mx-auto text-center">
            No Questions Available Yet for Category{" "}
            <span className="font-bold"> {productsData.category.name}</span>
          </h2>
        );
      }
    }
  }

  const closeModal = () => {
    setShowOTP(false);
  };

  // UseEffect to clear Deductions on initial render from reducer
  useEffect(() => {
    // Dispatch the action to clear deductions on initial render
    dispatch(clearDeductions());
    dispatch(clearLaptopDeductions());

    // Event listener to handle browser back button
    const handlePopstate = () => {
      // Dispatch the action to clear deductions when the user navigates back using the browser back button
      dispatch(clearDeductions());
      dispatch(clearLaptopDeductions());
    };

    // Add event listener for the popstate event
    window.addEventListener("popstate", handlePopstate);

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [dispatch]); // include dispatch in the dependency array to ensure that it has access to the latest dispatch function.

  // useEffect to set deductions and priceUpTo value from productsData and set conditions PAGE numbers
  useEffect(() => {
    if (productsData) {
      // const variant = productsData.variants.filter(
      const variant = productsData.variants.find(
        (variant) => variant.name == selectedVariant
      );
      setPriceGetUpTo(variant.price);
      // setPriceGetUpTo(variant[0].price);

      // setDeductions(productsData.deductions);
      // Setting deductions and its pages
      if (productsData.category.name === "Mobile") {
        const d = productsData.variantDeductions.filter(
          (vd) => vd.variantName === selectedVariant
        );
        // console.log("Mobile Deductions", d[0].deductions);
        setDeductions(d[0].deductions);
        d[0].deductions.map((d) => {
          if (d.conditionName.toLowerCase().includes("physical condition")) {
            setPhysicalConditionPage(d.page);
          } else if (
            d.conditionName.toLowerCase().includes("screen condition")
          ) {
            setScreenConditionPage(d.page);
          } else if (d.conditionName.toLowerCase().includes("defect")) {
            setDisplayDefectConditionPage(d.page);
          } else if (d.conditionName.toLowerCase().includes("age")) {
            setAgePage(d.page);
          }
        });
      } else if (productsData.category.name !== "Mobile") {
        setDeductions(productsData.simpleDeductions);
        productsData.simpleDeductions.map((d) => {
          if (d.conditionName.toLowerCase().includes("physical condition")) {
            setPhysicalConditionPage(d.page);
          } else if (
            d.conditionName.toLowerCase().includes("screen condition")
          ) {
            setScreenConditionPage(d.page);
          }
        });
      }

      // Initial State(productName,productCategory,productImage,variantName,price) in reducer
      let prodVariant = {
        productCategory: productsData.category.name,
        productName: productsData.name,
        productImage: productsData.image,
        variantName: selectedVariant,
        price: variant.price,
      };
      dispatch(setGetUpto(prodVariant));
    }
    // console.log("selectedVariant", selectedVariant, priceGetUpTo);
  }, [productsData]);

  // useEffect to set initial State(productName,productCategory,productImage,variantName,price) in reducer
  // useEffect(() => {
  //   let prodVariant = undefined;
  //   if (productsData) {
  //     prodVariant = {
  //       productCategory: productsData.category.name,
  //       productName: productsData.name,
  //       productImage: productsData.image,
  //       variantName: selectedVariant,
  //       price: priceGetUpTo,
  //     };
  //     dispatch(setGetUpto(prodVariant));
  //   }
  // }, [priceGetUpTo]);

  // console.log("priceGetUpTo", priceGetUpTo);
  // console.log("Deductions", deductions);

  const groupConditionsByPage = (conditions) => {
    // console.log("IN groupConditionsByPage", conditions);
    const grouped = conditions.reduce((acc, condition) => {
      const { page } = condition;
      if (!acc[page]) {
        acc[page] = [];
      }
      acc[page].push(condition);
      return acc;
    }, {});

    // console.log("grouped", grouped);
    // Convert the grouped object into an array of pages with conditions
    const sortedPages = Object.keys(grouped)
      .sort((a, b) => a - b)
      .map((page) => ({
        page,
        conditions: grouped[page],
      }));

    // console.log("sortedPages", sortedPages);

    return sortedPages;
  };

  // Usage
  // const sortedConditions = groupConditionsByPage(deductions);
  // const [sortedConditions]
  let sortedConditions;
  // if (deductions && productsData.category.name === "Mobile") {
  if (deductions) {
    sortedConditions = groupConditionsByPage(deductions);
  }

  function getConditionSubTitle(conditionName) {
    const subTitleMap = {
      functional:
        "Please choose appropriate condition to get an accurate quote",
      accessories: (
        <>
          <span className="block text-lg max-sm:[16px]">
            Do you have the following?
          </span>
          <span className="text-sm font-medium text-gray-600">
            Please select accessories which are available
          </span>
        </>
      ),
      age: "Let us know how old your device is. Valid bill is needed for devices less than 3 years.",
      "screen condition":
        "The better condition your device is in, the more we will pay you.",
      defect: "Please provide correct details",
      "physical condition": "Please provide correct details",
    };

    for (const [condition, subTitle] of Object.entries(subTitleMap)) {
      if (conditionName.toLowerCase().includes(condition)) {
        return subTitle;
      }
    }

    return null;
  }

  const conditionNameSubHeading =
    "text-lg font-medium text-gray-600 max-2sm:text-sm";

  const laptopDesktop = ["laptop", "desktop"];

  if (isLoading) return <Loading />;

  /* If the product if switched off */
  if (aboutDevice.isDeviceChecked && !aboutDevice.isDeviceOn)
    return <SwitchedOff productsData={productsData} />;

  // console.log("deductions", deductions);
  console.log("sortedConditions ProductQuestions", sortedConditions);

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${
          productsData ? `${productsData.category.name}` : null
        } Online and Get Instant Cash for used ${
          productsData ? `${productsData.category.name}s` : null
        } | InstantCashPick`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content="sell products on online, sell old mobiles online, sell old mobile online, sell old laptops online, sell old laptop online,sell old products on Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <link rel="canonical" href="https://instantcashpick.com/" />
      </Helmet>

      <div className=" mt-4 ">
        <div className="flex  gap-3 justify-center my-auto max-sm:flex-col max-sm:items-center">
          <div className="w-[55%] flex flex-col sm:min-h-[450px] border py-6 rounded my-auto max-sm:w-[95%] ">
            <div className="mx-auto pb-0 font-semibold">
              <h2 className="">Tell Us More About Your Device</h2>
            </div>

            {/* Is device Switched On YES or NO */}
            {!aboutDevice.isDeviceChecked && (
              <DeviceCheck
                productsData={productsData}
                setAboutDevice={setAboutDevice}
              />
            )}

            {/* Products that are not under Laptop Category */}
            {aboutDevice.isDeviceOn &&
            // productsData &&
            deductions &&
            !laptopDesktop.includes(
              productsData.category.name.toLowerCase()
            ) ? (
              <div key={sortedConditions[currentPageIndex].page}>
                {sortedConditions[currentPageIndex].conditions.map(
                  (condition, index) => (
                    <div
                      className="flex flex-col"
                      key={condition.conditionId + index}
                    >
                      <div className="px-5 py-2 text-center font-extrabold text-2xl max-2sm:text-xl">
                        <h2>{condition.conditionName}</h2>
                        <div>
                          <div className="text-center mb-5">
                            <p className={conditionNameSubHeading}>
                              {getConditionSubTitle(condition.conditionName)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <DeductionItems
                        conditionName={condition.conditionName}
                        conditionLabels={condition.conditionLabels}
                        setPhysicalCondition={setPhysicalCondition}
                        setScreenCondition={setScreenCondition}
                        setDisplayDefectCondition={setDisplayDefectCondition}
                        handleLabelSelection={handleLabelSelection}
                        setAge={setAge}
                      />
                    </div>
                  )
                )}

                <div className="flex items-center">
                  <button
                    onClick={handleContinue}
                    className="px-2 py-1 bg-cyan-500 text-white border mx-auto rounded w-[35%] mt-6 hover:bg-white hover:border-cyan-500 hover:text-cyan-500"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              aboutDevice.isDeviceOn &&
              productsData &&
              deductions && (
                <LaptopsQuestions
                  productsData={productsData}
                  deductions={deductions}
                  handleContinue={handleContinue}
                  handleLabelSelection={handleLabelSelection}
                  rtkData={data}
                />
              )
            )}
          </div>

          {/* Right Side Div */}
          <ProdDeductionsRight />
        </div>

        {showOTP ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <OtpGenerator closeModal={closeModal} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProductQuestions;
// export default ProductDeductions;

const SwitchedOff = ({ productsData }) => {
  const navigate = useNavigate();
  return (
    <div className="my-10 text-center">
      <div className="flex flex-col items-center">
        <h2 className="my-3">
          Your {productsData?.category?.name}
          <span className="font-semibold"> {productsData?.name} </span>
          is <span className="text-red-500 font-semibold">Switched Off.</span>
        </h2>
        <span className="text-lg px-4 text-[#E27D60]">
          Please Contact Customer Support 8722288017
        </span>
        <button
          onClick={() =>
            navigate(
              `/recycle-categories/recycle-brands/recycle-productDetails/${productsData.id}`
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
        className={`flex pr-16 items-center border rounded-md cursor-pointer p-2.5 ring-0 ring-transparent shadow hover:border-cyan-500`}
      >
        <span className="border border-solid rounded-full w-5 h-5 mr-1.5"></span>
        <span className="text-sm  flex-1 flex justify-center">{innerText}</span>
      </div>
    );
  }
  return (
    <div className="px-5 py-2 mt-10">
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
