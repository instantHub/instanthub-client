import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDeductions,
  setGetUpto,
} from "../../../features/slices/deductionSlice";
import {
  addProcessor,
  addHardDisk,
  addRam,
  clearLaptopDeductions,
} from "../../../features/slices/laptopDeductionSlice";
import { toast } from "react-toastify";
import OtpGenerator from "../../otp/OTPGenerator";
import LaptopDeductionItems from "./LaptopDeductionItems";
import NextPrevButton from "./NextPrevButton";

const LaptopsQuestions = (props) => {
  console.log("LaptopsQuestions");
  const { productsData, deductions, handleLabelSelection } = props;
  // console.log("productsData from laptop", productsData);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [lastPageIndex, setLastPageIndex] = useState(0);
  const [showOTP, setShowOTP] = useState(false);

  const [processorBasedDeductions, setProcessorBasedDeductions] =
    useState(null);

  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false);
  const [processorSelected, setProcessorSelected] = useState(false);

  // const data = useSelector((state) => state.deductions);
  // // console.log("useSelector", data);

  const groupConditionsByPage = (conditions) => {
    console.log("IN groupConditionsByPage laptop");
    const grouped = conditions.reduce((acc, condition) => {
      const { page } = condition;
      if (!acc[page]) {
        acc[page] = [];
      }
      // acc[page].push(condition);
      const isSelected = { selected: false, selectedLabel: null };
      acc[page].push({ ...condition, isSelected });
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

    console.log("sortedPages from function", sortedPages);

    return sortedPages;
  };

  // const sortedConditions = deductions ? groupConditionsByPage(deductions) : [];
  const sortedConditions = useMemo(() => {
    if (!deductions) return [];
    return groupConditionsByPage(deductions);
  }, [deductions]);

  console.log("sortedConditions LaptopQuestions", sortedConditions);

  const handleContinue = () => {
    console.log("handleContinue");

    let conditionNotSelected = false;
    console.log("conditionNotSelected", conditionNotSelected);

    console.log("currentPageIndex", currentPageIndex);
    if (currentPageIndex > 0) {
      console.log(
        "processorBasedDeductions[currentPageIndex].conditions",
        processorBasedDeductions[currentPageIndex - 1].conditions
      );
      processorBasedDeductions[currentPageIndex - 1].conditions.forEach(
        (condition) => {
          console.log(condition.isYesNoType, !condition.isSelected.selected);
          if (condition.isYesNoType && !condition.isSelected.selected) {
            console.log("condition isYesNoType", condition);
            conditionNotSelected = true;
            return;
          }
        }
      );
    } else {
      sortedConditions[0].conditions.forEach((condition) => {
        const config = ["Processor", "Hard Disk", "Ram"];
        const configCond = config.includes(condition.conditionName);
        console.log("object", condition);
        const notSelected = configCond
          ? !condition.isSelected.selected
            ? true
            : false
          : false;
        console.log("notSelected", configCond, notSelected);
        if (
          (condition.isYesNoType && !condition.isSelected.selected) ||
          notSelected
        ) {
          console.log("condition isYesNoType", condition);
          conditionNotSelected = true;
          return;
        }
      });
    }

    if (conditionNotSelected) {
      toast.error("Select All Mandatory Conditions to proceed..!");
      conditionNotSelected = false;
      return;
    }
    console.log("conditionNotSelected after checking", conditionNotSelected);

    if (currentPageIndex < lastPageIndex - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
      conditionNotSelected = false;
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

    function setSelectedFunc() {
      setSelected((prev) => !prev);
      sortedConditions[0].conditions.forEach((condition) => {
        if (condition.conditionName == conditionName) {
          condition.isSelected.selected = true;
          condition.isSelected.selectedLabel = {
            conditionLabelId,
            conditionLabel,
            priceDrop,
            operation,
          };
          // console.log("checking condition", condition);
          return;
        }
      });
    }

    if (conditionName === "Processor") {
      const procBasedDed = await getProcessorDeductions(conditionLabelId);
      // console.log("procBasedDed", procBasedDed);

      setPagesFunc(procBasedDed);
      setProcessorSelected((prev) => !prev);

      setSelectedFunc();

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
      setSelectedFunc();

      dispatch(
        addHardDisk({ conditionLabel, priceDrop, operation, type: "Hard Disk" })
      );
    } else if (conditionName === "Ram") {
      setSelectedFunc();

      dispatch(addRam({ conditionLabel, priceDrop, operation, type: "RAM" }));
    }
  };

  async function getProcessorDeductions(processorId) {
    try {
      // let URL =
      //   import.meta.env.VITE_BUILD === "development"
      //     ? `http://localhost:8000/api/processors/deductions/${processorId}`
      //     : `https://api.instantpick.in/api/processors/deductions/${processorId}`;

      const baseURL =
        import.meta.env.VITE_BUILD === "development"
          ? "http://localhost:8000"
          : "https://api.instantpick.in";

      const URL = `${baseURL}/api/processors/deductions/${processorId}`;

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

  function resetStateData() {
    dispatch(clearLaptopDeductions());
    dispatch(clearDeductions());
  }

  // console.log("selectedLabels", selectedLabels);
  console.log("processorBasedDeductions", processorBasedDeductions);
  // console.log("productsData", productsData);

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
                  <h2 className="px-1 py-2 font-extrabold text-lg max-sm:text-sm">
                    {condition.conditionName}
                  </h2>
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
                    {/* Condition Name & Headings */}
                    <h2 className="px-5 py-2 max-sm:px-2 text-center font-extrabold text-2xl max-sm:text-lg">
                      {condition.conditionName}
                    </h2>

                    <p className="text-center text-lg font-medium text-gray-600 max-sm:text-xs mb-5">
                      {condition.description}
                    </p>

                    {/* Condition Labels */}
                    <div>
                      <LaptopDeductionItems
                        condition={condition}
                        handleLabelSelection={handleLabelSelection}
                        handleContinue={handleContinue}
                      />
                    </div>
                  </div>
                )
              )}
          </div>

          <NextPrevButton
            prevHandler={() => {
              setCurrentPageIndex((prev) => prev - 1);
              if (currentPageIndex === 1) resetStateData();
            }}
            nextHandler={handleContinue}
            currentPageIndex={currentPageIndex}
          />
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
export default LaptopsQuestions;

// Next Prev Button
{
  /* <div className="flex items-center gap-5 max-sm:gap-2">
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
          </div> */
}
