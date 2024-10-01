import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGetUpto } from "../../features/deductionSlice";
import {
  addProcessor,
  addHardDisk,
  addRam,
} from "../../features/laptopDeductionSlice";

import { toast } from "react-toastify";
import OtpGenerator from "../otp/OTPGenerator";
import { Helmet } from "react-helmet-async";
import LaptopDeductionItems from "./LaptopDeductionItems";

const LaptopsQuestions = (props) => {
  //   const { productsData, deductions } = props;
  const { productsData, deductions, handleLabelSelection } = props;
  // console.log("deductions", deductions);
  // console.log("productsData from laptop", productsData);
  const [processor, setProcessor] = useState(null);
  const [hardDisk, setHardDisk] = useState(null);
  const [ram, setRam] = useState(null);
  const [screenSize, setScreenSize] = useState(null);
  const [screenSizePage, setScreenSizePage] = useState(null);
  const [graphic, setGraphic] = useState(null);
  const [graphicPage, setGraphicPage] = useState(null);
  const [screenCondition, setScreenCondition] = useState(null);
  const [screenConditionPage, setScreenConditionPage] = useState(null);
  const [physicalCondition, setPhysicalCondition] = useState(null);
  const [physicalConditionPage, setPhysicalConditionPage] = useState(null);
  const [age, setAge] = useState(null);
  const [agePage, setAgePage] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [lastPageIndex, setLastPageIndex] = useState(0);

  const [processorBasedDeductions, setProcessorBasedDeductions] =
    useState(null);

  // const age = "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const laptopSlice = useSelector((state) => state.laptopDeductions);
  // const laptopsConList = useSelector((state) => state.laptopDeductionsList);
  const deductionData = useSelector((state) => state.deductions.deductions);
  const [showOTP, setShowOTP] = useState(false);

  // console.log("laptopSlice", laptopSlice);
  // console.log("deductionData", deductionData);

  const data = useSelector((state) => state.deductions);
  // console.log("useSelector", data);

  const groupConditionsByPage = (conditions) => {
    console.log("IN groupConditionsByPage laptop");
    //   console.log(conditions);
    const grouped = conditions.reduce((acc, condition) => {
      const { page } = condition;
      if (!acc[page]) {
        acc[page] = [];
      }
      acc[page].push(condition);
      return acc;
    }, {});

    // Custom order for page 1
    const customOrder = ["Processor", "Ram", "Hard Disk"];
    if (grouped[1]) {
      grouped[1].sort((a, b) => {
        return (
          customOrder.indexOf(a.conditionName) -
          customOrder.indexOf(b.conditionName)
        );
      });
    }

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
  let sortedConditions;
  if (deductions) {
    sortedConditions = groupConditionsByPage(deductions);
  }

  // console.log("screenConditionPage", screenConditionPage, screenCondition);

  const handleContinue = () => {
    console.log("handleContinue");
    // If in 1st page all fields must be selected
    if (currentPageIndex === 0) {
      if (processor === null || hardDisk === null || ram === null) {
        toast.error("select all system configurations");
        return;
      }
    }

    if (currentPageIndex === agePage - 1 && age === null) {
      toast.error("Select Age to proceed..!");
      return;
    }

    if (currentPageIndex === screenSizePage - 1 && screenSize === null) {
      toast.error("Select ScreenSize to proceed..!");
      return;
    }

    if (currentPageIndex === graphicPage - 1 && graphic === null) {
      toast.error("Select Graphics to proceed..!");
      return;
    }
    if (
      currentPageIndex === screenConditionPage - 1 &&
      screenCondition === null
    ) {
      toast.error("Select Screen Condition to proceed..!");
      return;
    }

    // if (currentPageIndex < sortedConditions.length - 1) {
    console.log("lastPageIndex from continue", lastPageIndex);

    if (currentPageIndex < lastPageIndex - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      // Handle if there are no more conditions
      // console.log("No more conditions to display.");
      setShowOTP(true);
    }
  };

  const closeModal = () => {
    setShowOTP(false);
  };

  const handleSelectChange = async (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];

    const conditionLabel = selectedOption.getAttribute("data-arg1");
    const priceDrop = Number(selectedOption.getAttribute("data-arg2"));
    const conditionName = selectedOption.getAttribute("data-arg3");
    const operation = selectedOption.getAttribute("data-arg4");
    const conditionLabelId = selectedOption.getAttribute("data-arg5");
    // console.log(
    //   "arg",
    //   conditionName,
    //   conditionLabel,
    //   priceDrop,
    //   conditionLabelId
    // );
    console.log("laptops handle change");

    if (conditionName === "Processor") {
      const procBasedDed = await getProcessorDeductions(conditionLabelId);
      console.log("procBasedDed", procBasedDed);

      setPagesFunc(procBasedDed);

      setProcessor({ conditionLabel, priceDrop, conditionLabelId });
      dispatch(
        addProcessor({
          conditionLabel,
          priceDrop,
          operation,
          type: "Processor",
        })
      );

      // const procBasedDed = productsData.processorBasedDeduction.find(
      //   (pbd) => pbd.processorId === conditionLabelId
      // );

      const sorted = groupConditionsByPage(procBasedDed.deductions);
      // console.log("sorted", sorted);
      setProcessorBasedDeductions(sorted);

      let maxIndex = procBasedDed.deductions.reduce((acc, condition) => {
        return condition.page > acc ? condition.page : acc;
      }, 0);
      setLastPageIndex(maxIndex);

      let getUpTo = {
        productCategory: productsData.category.name,
        productName: productsData.name,
        productImage: productsData.image,
        variantName: productsData.variants[0].name,
        price: priceDrop,
      };

      dispatch(setGetUpto(getUpTo));
    } else if (conditionName === "Hard Disk") {
      setHardDisk({ conditionLabel, priceDrop });
      dispatch(
        addHardDisk({ conditionLabel, priceDrop, operation, type: "Hard Disk" })
      );
    } else if (conditionName === "Ram") {
      setRam({ conditionLabel, priceDrop });
      dispatch(addRam({ conditionLabel, priceDrop, operation, type: "RAM" }));
    }
  };

  async function getProcessorDeductions(processorId) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/products/processor-deductions/${processorId}`,
        {
          method: "GET", // HTTP method
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Processor Deductions:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch processor deductions:", error);
    }
  }

  async function setPagesFunc(selectedProcessor) {
    console.log("Function to set page number");

    selectedProcessor.deductions.map((d) => {
      if (d.conditionName.toLowerCase().includes("screen size")) {
        setScreenSizePage(d.page);
      } else if (d.conditionName.toLowerCase().includes("graphic")) {
        setGraphicPage(d.page);
      } else if (d.conditionName.toLowerCase().includes("screen condition")) {
        setScreenConditionPage(d.page);
      } else if (d.conditionName.toLowerCase().includes("physical")) {
        setPhysicalConditionPage(d.page);
      } else if (d.conditionName.toLowerCase().includes("age")) {
        setAgePage(d.page);
      }
    });
  }

  // UseEffect to set page number
  // useEffect(() => {
  //   console.log("UseEffect to set page number");
  //   // console.log("UseEffect", deductions);
  //   // deductions.map((d) => {
  //   productsData.processorBasedDeduction[0].deductions.map((d) => {
  //     if (d.conditionName.toLowerCase().includes("screen size")) {
  //       setScreenSizePage(d.page);
  //     } else if (d.conditionName.toLowerCase().includes("graphic")) {
  //       setGraphicPage(d.page);
  //     } else if (d.conditionName.toLowerCase().includes("screen condition")) {
  //       setScreenConditionPage(d.page);
  //     } else if (d.conditionName.toLowerCase().includes("physical")) {
  //       setPhysicalConditionPage(d.page);
  //     } else if (d.conditionName.toLowerCase().includes("age")) {
  //       setAgePage(d.page);
  //     }
  //   });
  // }, []);

  //   console.log("selectedLabels", selectedLabels);
  // console.log("processorBasedDeductions", processorBasedDeductions);

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
          content="sell old mobiles online, sell old mobile online, sell old laptops online, sell old laptop online,sell old products on Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <link rel="canonical" href="https://instantcashpick.com/" />
      </Helmet>
      <div>
        <div className="flex flex-col">
          {currentPageIndex === 0 && (
            <h1 className="text-center font-semibold text-2xl max-2sm:text-xl mt-5">
              Select the system configuration of your device?
            </h1>
          )}
          <div>
            {/* {laptopsConList.length !== 0 && */}

            {/* List of Configurations(Processor, Ram, Hard Disk) to select */}
            {currentPageIndex === 0 &&
              sortedConditions[0].conditions.map((condition, index) => (
                <div key={index} className="px-4 py-4">
                  <div className="px-1 py-2 font-extrabold text-lg ">
                    <h1>{condition.conditionName}</h1>
                  </div>
                  <div className="flex">
                    <select
                      className="block appearance-none w-full bg-white border border-gray-0 hover:border-gray-200 px-4 py-4 pr-8 rounded shadow-lg leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleSelectChange}
                    >
                      <option
                        value=""
                        className="py-2 bg-transparent hover:bg-gray-200"
                      >
                        search
                      </option>
                      {productsData.brand.name === "Apple" &&
                      condition.conditionName === "Processor"
                        ? condition.conditionLabels
                            .filter((label) =>
                              label.conditionLabel
                                .toLowerCase()
                                .includes("apple")
                            )
                            .map((label, index) => (
                              <option
                                key={index}
                                data-arg1={label.conditionLabel}
                                data-arg2={label.priceDrop}
                                data-arg3={condition.conditionName}
                                data-arg4={label.operation}
                                data-arg5={label.conditionLabelId}
                              >
                                {label.conditionLabel}
                              </option>
                            ))
                        : condition.conditionLabels
                            .filter(
                              (label) =>
                                !label.conditionLabel
                                  .toLowerCase()
                                  .includes("apple")
                            )
                            .map((label, index) => (
                              <option
                                key={index}
                                data-arg1={label.conditionLabel}
                                data-arg2={label.priceDrop}
                                data-arg3={condition.conditionName}
                                data-arg4={label.operation}
                                data-arg5={label.conditionLabelId}
                              >
                                {label.conditionLabel}
                              </option>
                            ))}
                    </select>
                  </div>
                </div>
              ))}

            {/* List all other conditions to select based on the processor selected */}
            {currentPageIndex > 0 &&
              processorBasedDeductions[currentPageIndex - 1].conditions.map(
                (condition, index) => (
                  <div key={index} className="px-4 py-4">
                    {/* Condition Name Headings */}
                    <div className="px-5 py-2 text-center font-extrabold text-2xl max-2sm:text-xl">
                      <h1>{condition.conditionName}</h1>
                    </div>
                    <div>
                      {condition.conditionName
                        .toLowerCase()
                        .includes("age") && (
                        <div className="text-center mb-5">
                          <p className="text-lg font-medium text-gray-600 max-2sm:text-sm">
                            Let us know how old your device is. Valid bill is
                            needed for device less than 3 years.
                          </p>
                        </div>
                      )}
                      {condition.conditionName
                        .toLowerCase()
                        .includes("screen condition") && (
                        <div className="text-center mb-5">
                          <p className="text-lg font-medium text-gray-600 max-2sm:text-sm px-2">
                            The better condition your device is in, we will pay
                            you more.
                          </p>
                        </div>
                      )}
                      {condition.conditionName
                        .toLowerCase()
                        .includes("graphic") && (
                        <div className="text-center mb-5">
                          <p className="text-lg font-medium text-gray-600 max-2sm:text-sm px-2">
                            Check your device's external graphics cards
                          </p>
                        </div>
                      )}
                      {condition.conditionName
                        .toLowerCase()
                        .includes("screen size") && (
                        <div className="text-center mb-5">
                          <p className="text-lg font-medium text-gray-600 max-2sm:text-sm px-2">
                            Check your device's screen size
                          </p>
                        </div>
                      )}
                      {condition.conditionName
                        .toLowerCase()
                        .includes("functional") && (
                        <div className="text-center mb-5">
                          <p className="text-lg font-medium text-gray-600 max-2sm:text-sm px-2">
                            Please choose appropriate condition to get accurate
                            quote
                          </p>
                        </div>
                      )}
                      {condition.conditionName
                        .toLowerCase()
                        .includes("accessories") && (
                        <div className="flex flex-col justify-start items-start">
                          <p className="text-lg max-sm:[16px]">
                            Do you have the following?
                          </p>
                          <span className="text-sm font-medium text-gray-600">
                            please select accessories which are available
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Condition Labels */}
                    <div>
                      {/* {!condition.conditionName.includes("Age") && ( */}
                      <>
                        <LaptopDeductionItems
                          // key={index}
                          conditionName={condition.conditionName}
                          conditionLabels={condition.conditionLabels}
                          handleLabelSelection={handleLabelSelection}
                          handleContinue={handleContinue}
                          setScreenSize={setScreenSize}
                          setGraphic={setGraphic}
                          setScreenCondition={setScreenCondition}
                          setPhysicalCondition={setPhysicalCondition}
                          setAge={setAge}
                        />
                      </>

                      {/* )} */}
                    </div>
                  </div>
                )
              )}
          </div>

          {/* {!sortedConditions[0].conditions[0].conditionName.includes("Age") && ( */}
          <div className="flex items-center">
            <button
              onClick={handleContinue}
              className="px-2 py-1 bg-cyan-500 text-white border mx-auto rounded w-[35%] mt-6 hover:bg-white hover:border-cyan-500 hover:text-cyan-500"
            >
              Continue
            </button>
          </div>
          {/* )} */}
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
export default LaptopsQuestions;
