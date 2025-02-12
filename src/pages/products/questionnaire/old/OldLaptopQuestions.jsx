import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDeductions,
  setGetUpto,
} from "../../features/slices/deductionSlice";
import {
  addProcessor,
  addHardDisk,
  addRam,
  clearLaptopDeductions,
} from "../../features/slices/laptopDeductionSlice";
import { toast } from "react-toastify";
import OtpGenerator from "../otp/OTPGenerator";
import LaptopDeductionItems from "./questionnaire/LaptopDeductionItems";

const LaptopsQuestions = (props) => {
  console.log("LaptopsQuestions");
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
  const [modelYear, setModelYear] = useState(null);
  const [modelYearPage, setModelYearPage] = useState(null);
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
  const deductionData = useSelector((state) => state.deductions.deductions);
  const [showOTP, setShowOTP] = useState(false);

  // console.log("laptopSlice", laptopSlice);
  // console.log("deductionData", deductionData);

  const data = useSelector((state) => state.deductions);
  // console.log("useSelector", data);

  const groupConditionsByPage = (conditions) => {
    // console.log("IN groupConditionsByPage laptop");
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

  // console.log("sortedConditions LaptopQuestions", sortedConditions);

  const handleContinue = () => {
    console.log("handleContinue");

    const validationSteps = [
      {
        condition:
          currentPageIndex === 0 &&
          (processor === null || hardDisk === null || ram === null),
        message: "Select all system configurations",
      },
      {
        condition: currentPageIndex === agePage - 1 && age === null,
        message: "Select Age to proceed..!",
      },
      {
        condition:
          currentPageIndex === screenSizePage - 1 && screenSize === null,
        message: "Select ScreenSize to proceed..!",
      },
      {
        condition: currentPageIndex === graphicPage - 1 && graphic === null,
        message: "Select Graphics to proceed..!",
      },
      {
        condition:
          currentPageIndex === screenConditionPage - 1 &&
          screenCondition === null,
        message: "Select Screen Condition to proceed..!",
      },
      {
        condition: currentPageIndex === modelYearPage - 1 && modelYear === null,
        message: "Select Model Launch Year to proceed..!",
      },
    ];

    for (let { condition, message } of validationSteps) {
      if (condition) {
        toast.error(message);
        return;
      }
    }

    if (currentPageIndex < lastPageIndex - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
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
      dispatch(addRam({ conditionLabel, priceDrop, operation, type: "Ram" }));
    }
  };

  async function getProcessorDeductions(processorId) {
    try {
      let URL =
        import.meta.env.VITE_BUILD === "development"
          ? `http://localhost:8000/api/processors/deductions/${processorId}`
          : `https://api.instantpick.in/api/processors/deductions/${processorId}`;

      console.log("URL of processor", URL);

      const response = await fetch(URL, {
        method: "GET", // HTTP method
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); // Parse the JSON response
      // console.log("Processor Deductions:", data);

      if (productsData.brand.name !== "Apple") {
        // data.deductions = data.deductions.filter(
        //   (condition) => condition.conditionName !== "Model Launch Year"
        // );
        data.deductions = data.deductions.map((condition) => {
          if (condition.conditionName === "Model Launch Year") {
            return {
              conditionId: condition.conditionId,
              conditionName: "Skip this Condition & Continue for the next!!",
              page: condition.page,
              conditionLabels: [],
            };
          } else return condition;
        });
        console.log("Checking for model Launch Year:", data.deductions);
      }

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
      } else if (d.conditionName.toLowerCase().includes("model launch year")) {
        setModelYearPage(d.page);
      }
    });
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
      graphic: "Check your device's external graphics cards",
      age: " Let us know how old your device is. Valid bill is needed for device less than 3 years.",
      "screen condition":
        "The better condition your device is in, the more we will pay you.",
      "physical condition": "Please provide correct details",
      "screen size": "Check your device's screen size",
    };

    for (const [condition, subTitle] of Object.entries(subTitleMap)) {
      if (conditionName.toLowerCase().includes(condition)) {
        return subTitle;
      }
    }

    return null;
  }

  function resetStateData() {
    dispatch(clearLaptopDeductions());
    dispatch(clearDeductions());
    setProcessor(null);
    setHardDisk(null);
    setRam(null);
    setScreenSize(null);
    setGraphic(null);
    setScreenCondition(null);
    setPhysicalCondition(null);
    setModelYear(null);
    setAge(null);
  }

  // console.log("selectedLabels", selectedLabels);
  // console.log("processorBasedDeductions", processorBasedDeductions);
  // console.log("productsData", productsData);

  // console.log(
  //   "processorBasedDeductions[currentPageIndex - 1]",
  //   processorBasedDeductions && processorBasedDeductions[currentPageIndex - 1]
  // );

  return (
    <>
      <div>
        <div className="flex flex-col">
          {currentPageIndex === 0 && (
            <h2 className="text-center font-semibold text-2xl max-sm:text-sm mt-5">
              Select the system configuration of your device?
            </h2>
          )}
          <div>
            {/* List of Configurations(Processor, Ram, Hard Disk) to select */}
            {currentPageIndex === 0 &&
              sortedConditions[0].conditions.map((condition, index) => (
                <div key={index} className="px-4 py-4 max-sm:py-2">
                  <div className="px-1 py-2 font-extrabold text-lg max-sm:text-sm">
                    <h2>{condition.conditionName}</h2>
                  </div>
                  <div className="flex">
                    <select
                      className="block appearance-none w-full bg-white border border-gray-0 hover:border-gray-200 px-4 py-4 pr-8 max-sm:px-2 max-sm:py-2 rounded shadow-lg max-sm:text-xs leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleSelectChange}
                    >
                      <option
                        value=""
                        className="py-2 bg-transparent hover:bg-gray-200"
                      >
                        search
                      </option>
                      {condition.conditionLabels.map((label, index) => (
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
              processorBasedDeductions[currentPageIndex - 1]?.conditions?.map(
                (condition, index) => (
                  <div key={index} className="px-4 py-4 max-sm:px-1">
                    {/* Condition Name Headings */}
                    <div className="px-5 py-2 max-sm:px-2 text-center font-extrabold text-2xl max-sm:text-lg">
                      <h2>{condition.conditionName}</h2>
                    </div>

                    <div>
                      <div className="text-center mb-5">
                        <p className="text-lg font-medium text-gray-600 max-sm:text-xs">
                          {getConditionSubTitle(condition.conditionName)}
                        </p>
                      </div>
                    </div>

                    {/* Condition Labels */}
                    <div>
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
                          setModelYear={setModelYear}
                        />
                      </>
                    </div>
                  </div>
                )
              )}
          </div>

          <div className="flex items-center gap-5 max-sm:gap-2">
            <button
              onClick={() => {
                setCurrentPageIndex((prev) => prev - 1);
                // console.log("Prev Btn", currentPageIndex);
                if (currentPageIndex === 1) resetStateData();
              }}
              className={`px-2 py-1 bg-secondary-light text-secondary border border-secondary mx-auto rounded w-[35%] mt-6 
                              hover:bg-secondary hover:text-secondary-light ${
                                currentPageIndex === 0 && "hidden"
                              }`}
            >
              Previous
            </button>

            <button
              onClick={handleContinue}
              className="px-2 py-1 text-lg max-sm:text-sm bg-secondary text-white border mx-auto rounded w-[35%] mt-6 hover:bg-white hover:border-secondary hover:text-secondary"
            >
              Next
            </button>
          </div>
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

{
  /* <select
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
                    </select> */
}

{
  /* <div>
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
                    </div> */
}
