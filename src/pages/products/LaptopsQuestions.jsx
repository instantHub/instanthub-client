import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeductions,
  removeDeductions,
  addProductAge,
} from "../../features/deductionSlice";
import {
  addProcessor,
  addHardDisk,
  addRam,
} from "../../features/laptopDeductionSlice";
import {
  addFirst,
  addRest,
  addSecond,
  addThird,
} from "../../features/laptopDeductionsList";
import { toast } from "react-toastify";
import OtpGenerator from "../otp/OTPGenerator";
import DeductionItems from "./DeductionItems";
import { Helmet } from "react-helmet-async";

const LaptopsQuestions = (props) => {
  //   const { productsData, deductions } = props;
  const { productsData, deductions, handleLabelSelection } = props;
  //   console.log(productsData, deductions, handleLabelSelection);
  console.log("deductions", deductions);
  const [processor, setProcessor] = useState();
  const [hardDisk, setHardDisk] = useState();
  const [ram, setRam] = useState();

  // const age = "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const laptopSlice = useSelector((state) => state.laptopDeductions);
  // const laptopsConList = useSelector((state) => state.laptopDeductionsList);
  const deductionData = useSelector((state) => state.deductions.deductions);
  const [showOTP, setShowOTP] = useState(false);

  console.log("laptopSlice", laptopSlice);
  // console.log("deductionData", deductionData);
  // console.log("deductions", deductions);
  // console.log("laptopsConList", laptopsConList);

  //   const deductionsPerPage = 3; // Number of deductions to display per page
  // const [currentPage, setCurrentPage] = useState(1);

  const data = useSelector((state) => state.deductions);
  console.log("useSelector", data);

  const [age, setAge] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleAge = async (ageLabel, price, operation) => {
    setAge(true);
    dispatch(
      addProductAge({
        conditionLabel: ageLabel,
        priceDrop: price,
        operation: operation,
      })
    );
  };

  // const getDeductionsForPage = () => {
  //   // Filter deductions into two groups
  //   const groupedDeductions = deductions.reduce(
  //     (acc, deduction) => {
  //       if (deduction.conditionName === "Processor") {
  //         acc.group1.unshift(deduction); // Add Processor to the beginning of group1
  //       } else if (
  //         deduction.conditionName === "Hard Disk" ||
  //         deduction.conditionName === "Ram"
  //       ) {
  //         acc.group1.push(deduction); // Add Ram and Hard Disk to the end of group1
  //       } else {
  //         acc.group2.push(deduction); // Add other deductions to group2
  //       }
  //       return acc;
  //     },
  //     { group1: [], group2: [] }
  //   );

  //   if (currentPage === 1) {
  //     // Return the first group for the first page
  //     return groupedDeductions.group1;
  //   } else {
  //     // Calculate startIndex for subsequent pages
  //     const startIndex = currentPage - 2; // Assuming each page after the first one displays one deduction
  //     // Return the deduction at startIndex from the second group
  //     return groupedDeductions.group2.slice(startIndex, startIndex + 1);
  //   }
  // };

  const groupConditionsByPage = (conditions) => {
    console.log("IN groupConditionsByPage laptop", conditions);
    const grouped = conditions.reduce((acc, condition) => {
      const { page } = condition;
      if (!acc[page]) {
        acc[page] = [];
      }
      acc[page].push(condition);
      return acc;
    }, {});

    console.log("grouped", grouped);
    // Convert the grouped object into an array of pages with conditions
    const sortedPages = Object.keys(grouped)
      .sort((a, b) => a - b)
      .map((page) => ({
        page,
        conditions: grouped[page],
      }));

    console.log("sortedPages", sortedPages);

    return sortedPages;
  };

  // Usage
  // const sortedConditions = groupConditionsByPage(deductions);
  let sortedConditions;
  if (deductions) {
    sortedConditions = groupConditionsByPage(deductions);
  }

  // Function to handle moving to the next page
  // const handleContinue = () => {
  //   // If in 1st page all fields must be selected
  //   if (currentPage === 1) {
  //     if (
  //       processor === undefined ||
  //       hardDisk === undefined ||
  //       ram === undefined
  //     ) {
  //       toast.error("select all system configurations");
  //       return;
  //     }
  //   }

  //   if (currentPage < deductions.length - 2) {
  //     setCurrentPage(currentPage + 1);
  //   } else {
  //     // dispatch(addDeductions(laptopSlice.processor));
  //     // dispatch(addDeductions(laptopSlice.hardDisk));
  //     // dispatch(addDeductions(laptopSlice.ram));
  //     // dispatch(addDeductions(data.productAge));

  //     // Handle if there are no more conditions
  //     console.log("No more conditions to display.");
  //     setShowOTP(true);

  //     // navigate(`/sell/deductions/finalPrice?productId=${productsData.id}`);
  //   }
  // };

  const handleContinue = () => {
    // If in 1st page all fields must be selected
    if (currentPageIndex === 0) {
      if (
        processor === undefined ||
        hardDisk === undefined ||
        ram === undefined
      ) {
        toast.error("select all system configurations");
        return;
      }
    }
    if (currentPageIndex < sortedConditions.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      //     setCurrentPage(currentPage + 1);
    } else {
      // dispatch(addDeductions(laptopSlice.processor));
      // dispatch(addDeductions(laptopSlice.hardDisk));
      // dispatch(addDeductions(laptopSlice.ram));
      // dispatch(addDeductions(data.productAge));

      // Handle if there are no more conditions
      console.log("No more conditions to display.");
      setShowOTP(true);

      // navigate(`/sell/deductions/finalPrice?productId=${productsData.id}`);
    }
  };

  const closeModal = () => {
    setShowOTP(false);
  };

  const handleSelectChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];

    const conditionLabel = selectedOption.getAttribute("data-arg1");
    const priceDrop = Number(selectedOption.getAttribute("data-arg2"));
    const conditionName = selectedOption.getAttribute("data-arg3");
    const operation = selectedOption.getAttribute("data-arg4");
    console.log("arg", conditionLabel, priceDrop, conditionName);

    if (conditionName === "Processor") {
      setProcessor({ conditionLabel, priceDrop });
      dispatch(addProcessor({ conditionLabel, priceDrop, operation }));
    } else if (conditionName === "Hard Disk") {
      setHardDisk({ conditionLabel, priceDrop });
      dispatch(addHardDisk({ conditionLabel, priceDrop, operation }));
    } else if (conditionName === "Ram") {
      setRam({ conditionLabel, priceDrop });
      dispatch(addRam({ conditionLabel, priceDrop, operation }));
    }

    // Call your function with the selected option's arguments
    // handleLabelSelection(arg1, arg2);
    // handleLaptopLabelSelection();
  };

  // useEffect(() => {
  //   deductions.map((d) => {
  //     if (d.conditionName === "Processor") {
  //       console.log("useffect", d.conditionName);
  //       dispatch(addFirst(d));
  //     } else if (d.conditionName === "Ram") {
  //       console.log("useffect", d.conditionName);
  //       dispatch(addSecond(d));
  //     } else if (d.conditionName === "Hard Disk") {
  //       console.log("useffect", d.conditionName);
  //       dispatch(addThird(d));
  //     } else {
  //       dispatch(addRest(d));
  //     }
  //   });
  // }, [deductions]);

  //   console.log("state", processor, hardDisk, ram);
  //   console.log("selectedLabels", selectedLabels);

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
          content="Get instant cash payments with InstantCashPick. No more waiting for checks to clear or funds to transfer. Receive cash on the spot quickly and easily."
        />

        <meta
          name="keywords"
          content="Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <link rel="canonical" href="https://instantcashpick.com/" />
      </Helmet>
      <div>
        <div className="flex flex-col">
          {currentPageIndex === 0 && (
            <h1 className="text-center font-semibold">
              Select the system configuration of your device?
            </h1>
          )}
          <div>
            {/* {laptopsConList.length !== 0 && */}
            {/* {getDeductionsForPage().map((deduction, index) => ( */}
            {sortedConditions[currentPageIndex].conditions.map(
              (condition, index) => (
                <>
                  <div key={index} className="px-8 py-4">
                    {currentPageIndex === 0 ? (
                      <div className="px-1 py-2 font-extrabold text-lg">
                        <h1>{condition.conditionName}</h1>
                      </div>
                    ) : (
                      <div className="px-5 py-2 text-center font-extrabold text-lg">
                        <h1>{condition.conditionName}</h1>
                      </div>
                    )}

                    {currentPageIndex === 0 ? (
                      <>
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
                            {condition.conditionLabels.map((label, index) => (
                              <option
                                key={index}
                                data-arg1={label.conditionLabel}
                                data-arg2={label.priceDrop}
                                data-arg3={condition.conditionName}
                                data-arg4={label.operation}
                              >
                                {label.conditionLabel}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    ) : (
                      <div>
                        {!condition.conditionName.includes("Age") ? (
                          <>
                            <DeductionItems
                              // key={index}
                              conditionName={condition.conditionName}
                              conditionLabels={condition.conditionLabels}
                              handleLabelSelection={handleLabelSelection}
                              handleContinue={handleContinue}
                            />
                            {/* <div>
                              <button
                                onClick={handleContinue}
                                className="px-2 py-1 bg-cyan-500 text-white border mx-auto  rounded w-[35%] mt-6 hover:bg-white hover:border-cyan-500 hover:text-cyan-500"
                              >
                                Continue
                              </button>
                            </div> */}
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col">
                              <div className="grid grid-cols-2 gap-4 items-center px-4 max-sm:grid-cols-1 max-sm:gap-2">
                                {condition.conditionLabels.map((label) => (
                                  <div
                                    className={`${
                                      //   selectedLabels.includes(label.conditionLabel)
                                      data.productAge.conditionLabel ===
                                      label.conditionLabel
                                        ? "border-cyan-500"
                                        : "bg-gray-100"
                                    } flex pl-3 border rounded items-center`}
                                    onClick={() =>
                                      handleAge(
                                        label.conditionLabel,
                                        label.priceDrop,
                                        label.operation
                                      )
                                    }
                                  >
                                    <div className="flex text-sm items-center gap-1 py-4">
                                      <span
                                        className={`${
                                          data.productAge.conditionLabel ===
                                          label.conditionLabel
                                            ? "border-cyan-500"
                                            : "border-surface-dark"
                                        } border border-solid rounded-full w-5 h-5 mr-1.5`}
                                      ></span>
                                      <span className="text-sm flex-1 flex justify-center">
                                        {label.conditionLabel}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div>
                                {age ? (
                                  <div className="flex items-center">
                                    <button
                                      onClick={handleContinue}
                                      className="px-2 py-1 bg-cyan-500 text-white border mx-auto  rounded w-[35%] mt-6 hover:bg-white hover:border-cyan-500 hover:text-cyan-500"
                                    >
                                      Continue
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <button
                                      className="px-2 py-1 text-white border mx-auto rounded w-[35%] mt-6 bg-gray-400 opacity-35"
                                      disabled
                                    >
                                      Select Age To Continue
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )
            )}
          </div>
          {!sortedConditions[
            currentPageIndex
          ].conditions[0].conditionName.includes("Age") && (
            <div className="flex items-center">
              <button
                onClick={handleContinue}
                className="px-2 py-1 bg-cyan-500 text-white border mx-auto rounded w-[35%] mt-6 hover:bg-white hover:border-cyan-500 hover:text-cyan-500"
              >
                Continue
              </button>
            </div>
          )}
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
