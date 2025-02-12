import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeductions,
  // addProductScreenCondition,
  // addProductPhysicalCondition,
  // addProductDisplayDefect,
  // addProductAge,
  // addProductBox,
  // addProductGSTBill,
  // addProductCharger,
  addSingleDeductions,
} from "../../../features/slices/deductionSlice";

import { BsCircle } from "react-icons/bs";

const DeductionItems = ({ condition, handleLabelSelection }) => {
  const {
    conditionName,
    conditionLabels,
    keyword,
    isYesNoType,
    isMandatory,
    showLabelsImage: shouldShowImage,
  } = condition;

  // console.log("DeductionItems Component Re-rendering");

  const [selected, setSelected] = useState(false);

  const deductionData = useSelector((state) => state.deductions.deductions);
  const deductionSliceData = useSelector((state) => state.deductions);
  // console.log("deductionData", deductionData);
  console.log("deductionSliceData", deductionSliceData);

  const dispatch = useDispatch();

  const handleOnClick = (label) => {
    if (condition.multiSelect)
      dispatch(addDeductions({ condition, conditionLabel: label }));
    else dispatch(addSingleDeductions({ condition, conditionLabel: label }));

    setSelected((prev) => !prev);
    condition.isSelected.selected = true;
    condition.isSelected.selectedLabel = label;
    console.log("checking condition", condition);
  };

  const type = conditionName;
  const functionalProblems = conditionName.toLowerCase().includes("functional");

  // console.log("shouldHideImage", shouldShowImage);

  return (
    <div
      className={`grid  ${
        conditionName.toLowerCase().includes("screen condition")
          ? "lg:grid-cols-2 md:grid-cols-1 gap-2 items-center px-2"
          : !shouldShowImage
          ? `gap-4 items-center px-4 ${
              isYesNoType ? "grid-cols-2" : "grid-cols-1 lg:grid-cols-3"
            }`
          : "grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 items-center px-4"
      }`}
    >
      {conditionLabels.map((label, index) => {
        const isSelected =
          condition?.isSelected?.selectedLabel?.conditionLabel ===
          label.conditionLabel;

        const borderClass = isSelected
          ? functionalProblems
            ? "border-red-500"
            : "border-secondary"
          : "";

        const backgroundClass = isSelected
          ? functionalProblems
            ? "bg-red-500 text-white"
            : "bg-secondary text-white"
          : "bg-slate-100 text-black";

        return (
          <div
            key={index}
            className={`border rounded items-center flex  ${
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
                  className="size-20 max-sm:size-20"
                />
              </div>
            )}

            <div
              key={label.conditonLabelId}
              className={`${backgroundClass} ${
                shouldShowImage
                  ? "py-2 text-center w-full h-[100px] max-sm:h-[80px] flex items-center justify-center lg:text-[12px] max-md:text-[12px] max-sm:text-xs"
                  : `flex justify-between text-sm max-sm:h-[30px] items-center gap-1 py-4
                      ${isYesNoType ? "h-[40px]" : "h-[90px]"}`
              }`}
            >
              {!shouldShowImage && (
                <span
                  className={`${
                    deductionData.some(
                      (condLabel) =>
                        condLabel.conditionLabel === label.conditionLabel
                    )
                      ? "text-secondary bg-white"
                      : "opacity-30"
                  }`}
                >
                  <BsCircle />
                </span>
              )}
              <span className="block text-sm max-sm:text-xs px-1">
                {label.conditionLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(DeductionItems);

// Old Render
{
  // return (
  //   <div
  //     className={`grid
  //     ${
  //       conditionName.toLowerCase().includes("screen condition")
  //         ? `lg:grid-cols-2 md:grid-cols-1 gap-2 items-center px-2`
  //         : `${
  //             !shouldShowImage
  //               ? `grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 items-center px-4 `
  //               : `grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 items-center px-4 `
  //           }`
  //     }
  //     `}
  //   >
  //     {conditionLabels.map((label, index) => (
  //       <div
  //         key={index}
  //         className={`${
  //           shouldShowImage
  //             ? `flex flex-col
  //             ${
  //               deductionData.some(
  //                 (condLabel) =>
  //                   condLabel.conditionLabel == label.conditionLabel
  //               ) ||
  //               deductionSliceData.productDisplayDefect.conditionLabel ===
  //                 label.conditionLabel
  //                 ? ` ${
  //                     functionalProblems ? "border-red-500" : "border-secondary"
  //                   }`
  //                 : ""
  //             }`
  //             : `flex px-2 bg-slate-100 ${
  //                 isLabelSelected(label.conditionLabel)
  //                   ? "border-secondary bg-white"
  //                   : ""
  //               }`
  //         } border rounded items-center`}
  //         onClick={() => {
  //           handleOnClick(label);
  //         }}
  //       >
  //         {shouldShowImage && label.conditionLabelImg && (
  //           <div className="p-4">
  //             <img
  //               src={`${import.meta.env.VITE_APP_BASE_URL}${
  //                 label.conditionLabelImg
  //               }`}
  //               alt="LabelImg"
  //               className="size-20 max-sm:size-20"
  //             />
  //           </div>
  //         )}
  //         <div
  //           key={label.conditonLabelId}
  //           className={`${
  //             deductionData.some(
  //               (condLabel) => condLabel.conditionLabel == label.conditionLabel
  //             ) ||
  //             deductionSliceData.productDisplayDefect.conditionLabel ===
  //               label.conditionLabel
  //               ? `${functionalProblems ? "bg-red-500" : "bg-secondary"}  ${
  //                   shouldShowImage ? "text-white" : "text-black"
  //                 } `
  //               : `${
  //                   isLabelSelected(label.conditionLabel)
  //                     ? " bg-white"
  //                     : "bg-slate-100"
  //                 }`
  //           }
  //           ${
  //             shouldShowImage
  //               ? "py-2 text-center w-full h-[100px] max-sm:h-[80px] flex items-center justify-center lg:text-[12px] max-md:text-[12px] max-sm:text-xs "
  //               : "flex justify-between text-sm h-[90px] max-sm:h-[30px] items-center gap-1 py-4"
  //           }
  //           `}
  //         >
  //           {!shouldShowImage ? (
  //             <>
  //               <span
  //                 className={`${
  //                   deductionData.some(
  //                     (condLabel) =>
  //                       condLabel.conditionLabel == label.conditionLabel
  //                   )
  //                     ? "text-secondary"
  //                     : deductionSliceData.productPhysicalCondition
  //                         .conditionLabel === label.conditionLabel ||
  //                       deductionSliceData.productScreenCondition
  //                         .conditionLabel === label.conditionLabel
  //                     ? "text-secondary bg-white"
  //                     : "opacity-30 "
  //                 } `}
  //               >
  //                 <BsCircle />
  //               </span>
  //             </>
  //           ) : null}
  //           <span className="block text-sm max-sm:text-xs px-1">
  //             {label.conditionLabel}
  //           </span>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
}
