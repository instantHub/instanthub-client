import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductScreenCondition,
  addProductPhysicalCondition,
} from "../../features/deductionSlice";

import { BsCircle } from "react-icons/bs";

const DeductionItems = ({
  conditionName,
  conditionLabels,
  handleLabelSelection,
  setPhysicalCondition,
  handleContinue,
  setScreenCondition,
}) => {
  const deductionData = useSelector((state) => state.deductions.deductions);
  const deductionSliceData = useSelector((state) => state.deductions);
  // console.log("deductionData", deductionData);
  // console.log("deductionSliceData", deductionSliceData);

  const dispatch = useDispatch();

  // Determine if the image should be shown based on the condition name
  const shouldShowImage = !(
    conditionName.toLowerCase().includes("screen size") ||
    conditionName.toLowerCase().includes("physical condition") ||
    conditionName.toLowerCase().includes("screen condition")
  );

  // console.log("shouldHideImage", shouldShowImage);

  return (
    // <div key={index}>
    <div
      className={`
      ${
        conditionName.toLowerCase().includes("screen condition")
          ? `grid lg:grid-cols-2 md:grid-cols-1 gap-2 items-center px-2`
          : //grid grid-cols-2 gap-4 items-center px-4 max-sm:grid-cols-1 max-sm:gap-2

            `${
              !shouldShowImage
                ? `grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 items-center px-4 `
                : `grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 items-center px-4 `
            }`
      }
      
      `}
    >
      {conditionLabels.map((label, index) => (
        <div
          key={index}
          className={`${
            shouldShowImage
              ? `flex flex-col 
              ${
                deductionData.some(
                  (condLabel) =>
                    condLabel.conditionLabel == label.conditionLabel
                )
                  ? " border-cyan-500"
                  : ""
              }`
              : `flex px-2 ${
                  deductionSliceData.productPhysicalCondition.conditionLabel ===
                    label.conditionLabel ||
                  deductionSliceData.productScreenCondition.conditionLabel ===
                    label.conditionLabel
                    ? "border-cyan-500"
                    : ""
                }`
          } 
           border rounded items-center`}
          // } flex flex-col border rounded items-center`}
          onClick={() => {
            if (shouldShowImage) {
              handleLabelSelection(
                label.conditionLabel,
                label.priceDrop,
                label.operation
              );
            }

            if (conditionName.includes("Screen Size")) {
              // console.log("Screen Size");
            } else if (
              conditionName.toLowerCase().includes("physical condition")
            ) {
              // console.log("phyical condition");
              dispatch(
                addProductPhysicalCondition({
                  conditionLabel: label.conditionLabel,
                  priceDrop: label.priceDrop,
                  operation: label.operation,
                })
              );

              setPhysicalCondition({
                conditionLabel: label.conditionLabel,
                priceDrop: label.priceDrop,
                operation: label.operation,
              });
            } else if (
              conditionName.toLowerCase().includes("screen condition")
            ) {
              dispatch(
                addProductScreenCondition({
                  conditionLabel: label.conditionLabel,
                  priceDrop: label.priceDrop,
                  operation: label.operation,
                })
              );
              setScreenCondition({
                conditionLabel: label.conditionLabel,
                priceDrop: label.priceDrop,
                operation: label.operation,
              });
            }
          }}
        >
          {shouldShowImage && label.conditionLabelImg && (
            <div className="p-4">
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}${
                  label.conditionLabelImg
                }`}
                alt="LabelImg"
                className="size-20 max-sm:size-24"
              />
            </div>
          )}

          <div
            key={label.conditonLabelId}
            className={`${
              deductionData.some(
                (condLabel) => condLabel.conditionLabel == label.conditionLabel
              )
                ? `bg-cyan-500 ${
                    shouldShowImage ? "text-white " : "text-black"
                  } `
                : "bg-slate-100"
            } 
            ${
              shouldShowImage
                ? "py-2 text-center w-full h-[100px] flex items-center justify-center lg:text-[12px] max-md:text-[12px] max-sm:text-xs "
                : "flex justify-between text-sm h-[90px] items-center gap-1 py-4 bg-white "
            }
            `}
          >
            {!shouldShowImage ? (
              <>
                <span
                  className={`${
                    deductionData.some(
                      (condLabel) =>
                        condLabel.conditionLabel == label.conditionLabel
                    )
                      ? "text-cyan-500"
                      : deductionSliceData.productPhysicalCondition
                          .conditionLabel === label.conditionLabel ||
                        deductionSliceData.productScreenCondition
                          .conditionLabel === label.conditionLabel
                      ? "text-cyan-500"
                      : "opacity-30 "
                  } `}
                >
                  <BsCircle />
                </span>
              </>
            ) : null}
            <span className="block">{label.conditionLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeductionItems;
