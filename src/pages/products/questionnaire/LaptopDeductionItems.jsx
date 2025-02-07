import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addScreenSize,
  addGraphic,
  addScreenCondition,
  addPhysicalCondition,
  addAge,
  addModelYear,
} from "../../../features/slices/laptopDeductionSlice";

import {
  addProductGSTBill,
  addProductBox,
  addProductCharger,
} from "../../../features/slices/deductionSlice";

import { BsCircle } from "react-icons/bs";
import { addProductAge } from "../../../features/slices/deductionSlice";

const LaptopDeductionItems = ({
  setConfig,
  condition,
  handleLabelSelection,
}) => {
  const { conditionName, conditionLabels, keyword, isYesNoType } = condition;

  const deductionSlice = useSelector((state) => state.deductions);
  const deductionData = useSelector((state) => state.deductions.deductions);

  const dispatch = useDispatch();

  const laptopSliceData = useSelector((state) => state.laptopDeductions);
  // console.log("laptopSliceData", laptopSliceData);

  // Determine if the image should be shown based on the condition name
  const shouldShowImage = ![
    "screen size",
    "graphic",
    "screen condition",
    "physical",
    "age",
    "model launch year",

    // Accessorie
    "bill",
    "box",
    "charger",
  ].some((c) => conditionName.toLowerCase().includes(c));

  let largerConditionLabel = ["screen condition", "physical condition"].some(
    (c) => conditionName.toLowerCase().includes(c)
  );

  let shorterConditionLabel = [
    "screen size",
    "graphics",
    "model launch year",
  ].some((c) => conditionName.toLowerCase().includes(c));

  const type = conditionName;
  const functionalProblems = conditionName.toLowerCase().includes("functional");

  const isLabelSelected = (conditionLabel) => {
    return [
      laptopSliceData.screenSize.conditionLabel,
      laptopSliceData.graphic.conditionLabel,
      laptopSliceData.screenCondition.conditionLabel,
      laptopSliceData.physicalCondition.conditionLabel,
      laptopSliceData.age.conditionLabel,
      laptopSliceData.modelYear.conditionLabel,

      // Accessories
      deductionSlice.productBox.conditionLabel,
      deductionSlice.productBill.conditionLabel,
      deductionSlice.productCharger.conditionLabel,
    ].includes(conditionLabel);
  };

  const handleOnClick = (label) => {
    if (shouldShowImage)
      handleLabelSelection(
        label.conditionLabel,
        label.priceDrop,
        label.operation,
        type
      );
    dispatchConditionAction(label);
  };

  const dispatchConditionAction = (label) => {
    function setState(type, label) {
      setConfig((prev) => ({ ...prev, [type]: label }));
    }

    const actionMap2 = {
      "screen size": {
        action: addScreenSize,
        setState,
        type: keyword,
        configType: "screenSize",
      },
      graphic: {
        action: addGraphic,
        setState,
        type: keyword,
        configType: "graphic",
      },
      "screen condition": {
        action: addScreenCondition,
        setState,
        type: keyword,
        configType: "screenCondition",
      },
      physical: {
        action: addPhysicalCondition,
        setState,
        type: keyword,
        configType: "physicalCondition",
      },
      age: {
        action: addAge,
        setState,
        type: keyword,
        configType: "age",
      },
      "model launch year": {
        action: addModelYear,
        setState,
        type: keyword,
        configType: "modelYear",
      },

      // Accessories
      bill: {
        action: addProductGSTBill,
        setState,
        type: keyword,
        configType: "bill",
      },
      box: {
        action: addProductBox,
        setState,
        type: keyword,
        configType: "box",
      },
      charger: {
        action: addProductCharger,
        setState,
        type: keyword,
        configType: "charger",
      },
    };

    const matchedCondition2 = Object.entries(actionMap2).find(([key]) =>
      conditionName.toLowerCase().includes(key)
    );

    if (matchedCondition2) {
      const [, { action, setState, type, configType }] = matchedCondition2;
      dispatch(action({ ...label, type }));
      setState(configType, label);

      // Additional action for age
      if (matchedCondition2[0] === "age") {
        dispatch(addProductAge(label));
      }
    }
  };

  // console.log("shouldHideImage", shouldShowImage);

  return (
    <div
      // className={
      //   largerConditionLabel
      //     ? "grid lg:grid-cols-2 md:grid-cols-1 gap-2 items-center px-2"
      //     : `grid ${
      //         shouldShowImage
      //           ? "grid-cols-2 lg:grid-cols-4"
      //           : `grid-cols-1 lg:grid-cols-4 ${
      //               shorterConditionLabel && "max-sm:grid-cols-2"
      //             }`
      //       } md:grid-cols-3 gap-4 max-sm:gap-2 items-center px-4 max-sm:px-1`
      // }

      className={`grid items-center gap-4 px-4 ${
        largerConditionLabel
          ? "lg:grid-cols-2 grid-cols-1 "
          : !shouldShowImage
          ? isYesNoType
            ? "grid-cols-2"
            : shorterConditionLabel
            ? "grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 lg:grid-cols-3"
          : "grid-cols-2 lg:grid-cols-5 md:grid-cols-3 "
      }`}
    >
      {conditionLabels.map((label, index) => {
        const isSelected = deductionData.some(
          (condLabel) => condLabel.conditionLabel === label.conditionLabel
        );

        const borderClass = isSelected
          ? functionalProblems
            ? "border-red-500"
            : "border-secondary"
          : "";

        const backgroundClass = isSelected
          ? functionalProblems
            ? "bg-red-500 text-white"
            : "bg-secondary text-white"
          : isLabelSelected(label.conditionLabel)
          ? "bg-white"
          : "bg-slate-100 text-black";

        return (
          <div
            key={index}
            className={`border rounded flex items-center ${
              shouldShowImage ? "flex-col" : `px-2 ${backgroundClass}`
            } ${borderClass}`}
            onClick={() => handleOnClick(label)}
          >
            {shouldShowImage && label.conditionLabelImg && (
              <div className="p-4">
                <img
                  src={`${import.meta.env.VITE_APP_BASE_URL}${
                    label.conditionLabelImg
                  }`}
                  alt="LabelImg"
                  className="size-20 max-sm:size-24"
                  loading="lazy" // Native lazy loading for better performance
                />
              </div>
            )}

            <div
              key={label.conditonLabelId}
              // className={`text-lg max-sm:text-xs ${backgroundClass} ${
              //   shouldShowImage
              //     ? "py-2 text-center w-full h-[100px] max-sm:h-[80px] flex items-center justify-center lg:text-[12px] max-md:text-[12px] max-sm:text-xs"
              //     : `flex text-sm items-center gap-1 py-4 bg-slate-100 ${
              //         shorterConditionLabel
              //           ? "h-fit"
              //           : "h-[90px] max-sm:h-[65px]"
              //       }`
              // }`}

              className={`${backgroundClass} ${
                shouldShowImage
                  ? "py-2 text-center w-full h-[100px] max-sm:h-[80px] flex items-center justify-center lg:text-[12px] max-md:text-[12px] max-sm:text-xs"
                  : `flex justify-between text-sm items-center gap-1 py-4
                      ${isYesNoType ? "h-[40px]" : "h-[70px]"}`
              }`}
            >
              {!shouldShowImage && (
                <span
                  className={
                    isSelected ? "border-secondary" : "border-surface-dark"
                  }
                >
                  <BsCircle />
                </span>
              )}
              <span className="block max-sm:text-[11px] px-1">
                {label.conditionLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LaptopDeductionItems;

// Old render
{
  // return (
  //   <div
  //     className={
  //       largerConditionLabel
  //         ? "grid lg:grid-cols-2 md:grid-cols-1 gap-2 items-center px-2"
  //         : `grid ${
  //             shouldShowImage
  //               ? "grid-cols-2 lg:grid-cols-4"
  //               : `grid-cols-1 lg:grid-cols-3 ${
  //                   shorterConditionLabel && "max-sm:grid-cols-2"
  //                 }`
  //           } md:grid-cols-3 gap-4 max-sm:gap-2 items-center px-4 max-sm:px-1`
  //     }
  //   >
  //     {conditionLabels.map((label, index) => (
  //       <div
  //         key={index}
  //         className={`${
  //           shouldShowImage
  //             ? `flex flex-col ${
  //                 deductionData.some(
  //                   (condLabel) =>
  //                     condLabel.conditionLabel == label.conditionLabel
  //                 )
  //                   ? ` ${
  //                       functionalProblems
  //                         ? "border-red-500"
  //                         : "border-secondary"
  //                     }`
  //                   : ""
  //               }`
  //             : `flex px-2 bg-slate-100  ${
  //                 isLabelSelected(label.conditionLabel)
  //                   ? "border-secondary bg-white"
  //                   : ""
  //               }`
  //         }  border rounded items-center`}
  //         onClick={() => handleOnClick(label)}
  //       >
  //         {shouldShowImage && label.conditionLabelImg && (
  //           <div className="p-4">
  //             <img
  //               src={`${import.meta.env.VITE_APP_BASE_URL}${
  //                 label.conditionLabelImg
  //               }`}
  //               alt="LabelImg"
  //               className="size-20 max-sm:size-24"
  //               loading="lazy" // Native lazy loading
  //             />
  //           </div>
  //         )}
  //         <div
  //           key={label.conditonLabelId}
  //           className={`text-lg max-sm:text-xs ${
  //             deductionData.some(
  //               (condLabel) => condLabel.conditionLabel == label.conditionLabel
  //             )
  //               ? `${functionalProblems ? "bg-red-500" : "bg-secondary"}
  //               ${shouldShowImage ? "text-white " : "text-black"} `
  //               : `${
  //                   isLabelSelected(label.conditionLabel)
  //                     ? " bg-white"
  //                     : "bg-slate-100"
  //                 }`
  //           }
  //           ${
  //             shouldShowImage
  //               ? `py-2 text-center w-full h-[100px] max-sm:h-[80px] flex items-center justify-center lg:text-[12px] max-md:text-[12px] max-sm:text-xs`
  //               : `flex text-sm items-center gap-1 py-4 bg-slate-100 ${
  //                   shorterConditionLabel ? "h-fit" : "h-[90px] max-sm:h-[65px]"
  //                 }`
  //             // : "flex text-sm items-center gap-1 py-4 bg-white"
  //           }
  //           `}
  //         >
  //           {!shouldShowImage ? (
  //             <>
  //               <span
  //                 className={` ${
  //                   deductionData.some(
  //                     (condLabel) =>
  //                       condLabel.conditionLabel == label.conditionLabel
  //                   )
  //                     ? "border-secondary "
  //                     : "border-surface-dark"
  //                 } `}
  //               >
  //                 <BsCircle />
  //               </span>
  //             </>
  //           ) : null}
  //           <span className="block max-sm:text-[11px] px-1">
  //             {label.conditionLabel}
  //           </span>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
}

// const handleOnClick2 = (label) => {
//   let condName = conditionName.toLowerCase();

//   if (shouldShowImage) {
//     handleLabelSelection(
//       label.conditionLabel,
//       label.priceDrop,
//       label.operation,
//       type
//     );
//   }

//   if (condName.includes("screen size")) {
//     dispatch(
//       addScreenSize({
//         conditionLabel: label.conditionLabel,
//         priceDrop: label.priceDrop,
//         operation: label.operation,
//         type: "Screen Size",
//       })
//     );
//     setScreenSize({
//       conditionLabel: label.conditionLabel,
//       priceDrop: label.priceDrop,
//       operation: label.operation,
//     });
//   } else if (condName.includes("graphic")) {
//     dispatch(
//       addGraphic({
//         conditionLabel: label.conditionLabel,
//         priceDrop: label.priceDrop,
//         operation: label.operation,
//         type: "Graphics",
//       })
//     );
//     setGraphic({
//       conditionLabel: label.conditionLabel,
//       priceDrop: label.priceDrop,
//       operation: label.operation,
//     });
//   } else if (condName.includes("screen condition")) {
//     dispatch(
//       addScreenCondition({
//         conditionLabel: label.conditionLabel,
//         priceDrop: label.priceDrop,
//         operation: label.operation,
//         type: "Screen Condition",
//       })
//     );
//     setScreenCondition({
//       conditionLabel: label.conditionLabel,
//       priceDrop: label.priceDrop,
//       operation: label.operation,
//     });
//   } else if (condName.includes("physical")) {
//     dispatch(
//       addPhysicalCondition({
//         conditionLabel: label.conditionLabel,
//         priceDrop: label.priceDrop,
//         operation: label.operation,
//         type: "Physical Condition",
//       })
//     );
//     setPhysicalCondition({
//       conditionLabel: label.conditionLabel,
//       priceDrop: label.priceDrop,
//       operation: label.operation,
//     });
//   } else if (condName.includes("age")) {
//     dispatch(
//       addAge({
//         conditionLabel: label.conditionLabel,
//         priceDrop: label.priceDrop,
//         operation: label.operation,
//       })
//     );
//     dispatch(
//       addProductAge({
//         conditionLabel: label.conditionLabel,
//         priceDrop: label.priceDrop,
//         operation: label.operation,
//       })
//     );
//     setAge({
//       conditionLabel: label.conditionLabel,
//       priceDrop: label.priceDrop,
//       operation: label.operation,
//     });
//   }
// };
