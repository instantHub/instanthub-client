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

const LaptopsQuestions = (props) => {
  //   const { productsData, deductions } = props;
  const { productsData, deductions, handleLabelSelection } = props;
  //   console.log(productsData, deductions, handleLabelSelection);
  const [processor, setProcessor] = useState();
  const [hardDisk, setHardDisk] = useState();
  const [ram, setRam] = useState();

  // const age = "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const laptopSlice = useSelector((state) => state.laptopDeductions);
  const laptopsConList = useSelector((state) => state.laptopDeductionsList);
  const deductionData = useSelector((state) => state.deductions.deductions);
  console.log("laptopSlice", laptopSlice);
  // console.log("deductionData", deductionData);
  console.log("deductions", deductions);
  console.log("laptopsConList", laptopsConList);

  //   const deductionsPerPage = 3; // Number of deductions to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Function to get deductions to display on the current page
  // const getDeductionsForPage = () => {
  //   if (currentPage === 1) {
  //     return deductions.slice(0, 3);
  //     // return laptopsConList.slice(0, 3);
  //   } else {
  //     return deductions.slice(currentPage + 1, currentPage + 2);
  //     // return laptopsConList.slice(currentPage + 1, currentPage + 2);
  //   }
  // };

  const data = useSelector((state) => state.deductions);
  console.log("useSelector", data);

  const [age, setAge] = useState(false);

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

  const getDeductionsForPage = () => {
    // Filter deductions into two groups
    const groupedDeductions = deductions.reduce(
      (acc, deduction) => {
        if (deduction.conditionName === "Processor") {
          acc.group1.unshift(deduction); // Add Processor to the beginning of group1
        } else if (
          deduction.conditionName === "Ram" ||
          deduction.conditionName === "Hard Disk"
        ) {
          acc.group1.push(deduction); // Add Ram and Hard Disk to the end of group1
        } else {
          acc.group2.push(deduction); // Add other deductions to group2
        }
        return acc;
      },
      { group1: [], group2: [] }
    );

    if (currentPage === 1) {
      // Return the first group for the first page
      return groupedDeductions.group1;
    } else {
      // Calculate startIndex for subsequent pages
      const startIndex = currentPage - 2; // Assuming each page after the first one displays one deduction
      // Return the deduction at startIndex from the second group
      return groupedDeductions.group2.slice(startIndex, startIndex + 1);
    }
  };

  // Function to handle moving to the next page
  const handleContinue = () => {
    // If in 1st page all fields must be selected
    if (currentPage === 1) {
      if (
        processor === undefined ||
        hardDisk === undefined ||
        ram === undefined
      ) {
        toast.error("select all system configurations");
        return;
      }
    }

    if (currentPage < deductions.length - 2) {
      setCurrentPage(currentPage + 1);
    } else {
      dispatch(addDeductions(laptopSlice.processor));
      dispatch(addDeductions(laptopSlice.hardDisk));
      dispatch(addDeductions(laptopSlice.ram));
      dispatch(addDeductions(data.productAge));

      // Handle if there are no more conditions
      console.log("No more conditions to display.");
      navigate(`/sell/deductions/finalPrice?productId=${productsData.id}`);
    }
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

  useEffect(() => {
    deductions.map((d) => {
      if (d.conditionName === "Processor") {
        console.log("useffect", d.conditionName);
        dispatch(addFirst(d));
      } else if (d.conditionName === "Ram") {
        console.log("useffect", d.conditionName);
        dispatch(addSecond(d));
      } else if (d.conditionName === "Hard Disk") {
        console.log("useffect", d.conditionName);
        dispatch(addThird(d));
      } else {
        dispatch(addRest(d));
      }
    });
  }, [deductions]);

  //   console.log("state", processor, hardDisk, ram);
  //   console.log("selectedLabels", selectedLabels);

  return (
    <div>
      <div className="flex flex-col">
        {/* testing */}
        {/* <h1>Page {currentPage}</h1> */}
        {currentPage === 1 && (
          <h1 className="text-center font-semibold">
            Select the system configuration of your device?
          </h1>
        )}
        <div>
          {laptopsConList.length !== 0 &&
            getDeductionsForPage().map((deduction, index) => (
              <div key={index} className="px-8 py-4">
                {/* Condtion Name */}
                {currentPage === 1 ? (
                  <div className="px-1 py-2 font-extrabold text-lg">
                    <h1>{deduction.conditionName}</h1>
                  </div>
                ) : (
                  <div className="px-5 py-2 text-center font-extrabold text-lg">
                    <h1>{deduction.conditionName}</h1>
                  </div>
                )}
                {/* Processor, Ram & HardDisk Questions */}
                {currentPage === 1 ? (
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
                        {deduction.conditionLabels.map((label, index) => (
                          <option
                            key={index}
                            data-arg1={label.conditionLabel}
                            data-arg2={label.priceDrop}
                            data-arg3={deduction.conditionName}
                            data-arg4={label.operation}
                          >
                            {label.conditionLabel}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 items-center px-4">
                      {!deduction.conditionName.includes("Age")
                        ? deduction.conditionLabels.map((label, index) => (
                            <>
                              <div key={index}>
                                <div
                                  className={`${
                                    deductionData.some(
                                      (condLabel) =>
                                        condLabel.conditionLabel ==
                                        label.conditionLabel
                                    )
                                      ? "border-[#E27D60] border-cyan-500"
                                      : ""
                                  } flex flex-col border rounded items-center`}
                                  onClick={() =>
                                    handleLabelSelection(
                                      label.conditionLabel,
                                      label.priceDrop,
                                      label.operation
                                    )
                                  }
                                >
                                  <div className="p-4">
                                    <img
                                      src={
                                        import.meta.env.VITE_APP_BASE_URL +
                                        label.conditionLabelImg
                                      }
                                      alt="LabelImg"
                                      className="size-20 max-sm:size-24"
                                    />
                                  </div>
                                  <div
                                    key={label.conditonLabelId}
                                    className={`${
                                      deductionData.some(
                                        (condLabel) =>
                                          condLabel.conditionLabel ==
                                          label.conditionLabel
                                      )
                                        ? "bg-[#E27D60] bg-cyan-500 text-white"
                                        : "bg-slate-100 "
                                    } py-2  text-center w-full h-[100px] flex items-center justify-center lg:text-[13px] max-md:text-[12px] max-sm:text-sm`}
                                  >
                                    {label.conditionLabel}
                                  </div>
                                </div>
                              </div>
                            </>
                          ))
                        : // deduction.conditionName.includes("Age") && (
                          //     // <div className="flex flex-col">
                          //     <div className="flex flex-col gap-2 w-full">
                          //       {/* <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 items-center px-4 max-sm:grid-cols-1 max-sm:w-fi"> */}
                          //       <div>
                          //         {
                          deduction.conditionLabels.map((label) => (
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
                      {/* </div>
                            </div>
                          )} */}
                    </div>
                    {!deduction.conditionName.includes("Age") ? (
                      <button
                        onClick={handleContinue}
                        className="px-2 py-1 border rounded w-1/2 m-2"
                      >
                        Continue
                      </button>
                    ) : age ? (
                      <button
                        onClick={handleContinue}
                        className="px-2 py-1 border rounded w-1/2 m-2"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        className="px-2 py-1 border rounded w-1/2 m-2 bg-gray-400 opacity-35"
                        disabled
                      >
                        Select Age To Continue
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>

        {currentPage === 1 && (
          <button
            onClick={handleContinue}
            className="px-2 py-1 border rounded w-1/2 m-2"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default LaptopsQuestions;
