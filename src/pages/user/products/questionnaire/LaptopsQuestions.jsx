import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSingleDeductions,
  clearDeductions,
  setProductData,
} from "@features/slices/deductionSlice";
import { toast } from "react-toastify";
import OtpGenerator from "../../otp/OTPGenerator";
// import LaptopDeductionItems from "./LaptopDeductionItems";
import NextPrevButton from "./NextPrevButton";
import DisplayCondition from "./DisplayCondition";

const LaptopsQuestions = (props) => {
  console.log("LaptopsQuestions");
  const { productsData, deductions } = props;
  // console.log("productsData from laptop", productsData);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [lastPageIndex, setLastPageIndex] = useState(0);
  const [showOTP, setShowOTP] = useState(false);

  const [processorBasedDeductions, setProcessorBasedDeductions] =
    useState(null);

  const deductionSliceDate = useSelector((state) => state.deductions);
  // console.log("deductionSliceDate", deductionSliceDate);

  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false);

  const groupConditionsByPage = (conditions) => {
    console.log("IN groupConditionsByPage laptop");
    const grouped = conditions.reduce((acc, condition) => {
      const { page } = condition;
      if (!acc[page]) {
        acc[page] = [];
      }
      // acc[page].push(condition);
      const isSelected = { selected: false, selectedLabel: null };
      // const multiSelect = condition.conditionName.includes("Problem");
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

    // console.log("sortedPages from function", sortedPages);

    return sortedPages;
  };

  // const sortedConditions = deductions ? groupConditionsByPage(deductions) : [];
  const sortedConditions = useMemo(() => {
    if (!deductions) return [];
    return groupConditionsByPage(deductions);
  }, [deductions]);

  // console.log("sortedConditions LaptopQuestions", sortedConditions);

  const handleContinue = () => {
    console.log("handleContinue");

    let conditionStatus = { notSelected: false, keyword: "" };
    console.log("condition selected or not", conditionStatus);

    function setConditionStatus(selected, keyword) {
      conditionStatus.notSelected = selected;
      conditionStatus.keyword = keyword;
    }

    if (currentPageIndex > 0) {
      processorBasedDeductions[currentPageIndex - 1].conditions.forEach(
        (condition) => {
          console.log(condition.isMandatory, !condition.isSelected.selected);
          if (condition.isMandatory && !condition.isSelected.selected) {
            console.log("condition isMandatory", condition);
            setConditionStatus(true, condition.keyword);
            return;
          }
        }
      );
    } else {
      sortedConditions[0].conditions.forEach((condition) => {
        if (condition.isMandatory && !condition.isSelected.selected) {
          console.log("condition isMandatory", condition);
          setConditionStatus(true, condition.keyword);
          return;
        }
      });
    }

    // Toast Notification to customer
    if (conditionStatus.notSelected) {
      toast.error(`Select ${conditionStatus.keyword} to proceed..!`);
      setConditionStatus(false, "");
      return;
    }

    // console.log("conditionNotSelected after checking", conditionStatus);

    if (currentPageIndex < lastPageIndex - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
      setConditionStatus(false, "");
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
          return;
        }
      });
    }

    if (conditionName === "Processor") {
      const procBasedDed = await getProcessorDeductions(conditionLabelId);
      // console.log("procBasedDed", procBasedDed);

      setSelectedFunc();

      let cl = {
        conditionLabel,
        priceDrop,
        operation,
        type: "Processor",
      };

      let processor = sortedConditions[0].conditions.find(
        (d) => d.conditionName == "Processor"
      );
      dispatch(
        addSingleDeductions({ condition: processor, conditionLabel: cl })
      );

      const sorted = groupConditionsByPage(procBasedDed.deductions);
      // console.log("sorted", sorted);
      setProcessorBasedDeductions(sorted);

      let maxIndex = procBasedDed.deductions.reduce((acc, condition) => {
        return condition.page > acc ? condition.page : acc;
      }, 0);
      setLastPageIndex(maxIndex);

      let prodData = {
        selectedProduct: productsData,
        getUpTo: {
          variantName: productsData.variants[0].name,
          price: priceDrop,
        },
      };

      dispatch(setProductData(prodData));
    } else if (conditionName === "Hard Disk") {
      setSelectedFunc();

      let cl = { conditionLabel, priceDrop, operation, type: "Hard Disk" };

      let hardDisk = sortedConditions[0].conditions.find(
        (d) => d.conditionName == "Hard Disk"
      );
      dispatch(
        addSingleDeductions({ condition: hardDisk, conditionLabel: cl })
      );
    } else if (conditionName === "Ram") {
      setSelectedFunc();

      let cl = { conditionLabel, priceDrop, operation, type: "Ram" };

      let ram = sortedConditions[0].conditions.find(
        (d) => d.conditionName == "Ram"
      );
      dispatch(addSingleDeductions({ condition: ram, conditionLabel: cl }));
    }
  };

  async function getProcessorDeductions(processorId) {
    try {
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
    dispatch(clearDeductions());
  }

  // console.log("processorBasedDeductions", processorBasedDeductions);
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
          <div className="flex flex-col gap-5">
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
                          value={label}
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
                (condition) => (
                  <DisplayCondition
                    key={condition.conditionId}
                    condition={condition}
                  />
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
