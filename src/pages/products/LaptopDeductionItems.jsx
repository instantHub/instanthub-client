import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addScreenSize,
  addGraphic,
  addScreenCondition,
} from "../../features/laptopDeductionSlice";
import { BsCircle } from "react-icons/bs";

const LaptopDeductionItems = ({
  conditionName,
  conditionLabels,
  handleLabelSelection,
  handleContinue,
  setScreenSize,
  setGraphic,
  setScreenCondition,
}) => {
  const deductionData = useSelector((state) => state.deductions.deductions);

  const dispatch = useDispatch();

  const laptopSliceData = useSelector((state) => state.laptopDeductions);
  // console.log("laptopSliceData", laptopSliceData);

  // Determine if the image should be shown based on the condition name
  const shouldShowImage = !(
    conditionName.toLowerCase().includes("screen size") ||
    conditionName.toLowerCase().includes("graphic") ||
    conditionName.toLowerCase().includes("screen condition")
  );
  // || conditionName.toLowerCase().includes("screen")

  const functionalProblems = conditionName.toLowerCase().includes("functional");

  // console.log("shouldHideImage", shouldShowImage);

  return (
    // <div key={index}>
    <div
      className={`
      ${
        conditionName.toLowerCase().includes("screen condition")
          ? `grid lg:grid-cols-2 md:grid-cols-1 gap-2 items-center px-2`
          : `${
              !shouldShowImage
                ? `grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 items-center px-4 `
                : `grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 items-center px-4`
              // `grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 items-center px-4 `
            }`
      }
      
      `}
    >
      {conditionLabels.map((label, index) => (
        <div
          key={index}
          className={`${
            shouldShowImage
              ? `flex flex-col ${
                  deductionData.some(
                    (condLabel) =>
                      condLabel.conditionLabel == label.conditionLabel
                  )
                    ? ` ${
                        functionalProblems
                          ? "border-red-500"
                          : "border-cyan-500"
                      }`
                    : ""
                }`
              : `flex px-2 bg-slate-100  ${
                  laptopSliceData.screenSize.conditionLabel ===
                    label.conditionLabel ||
                  laptopSliceData.graphic.conditionLabel ===
                    label.conditionLabel ||
                  laptopSliceData.screenCondition.conditionLabel ===
                    label.conditionLabel
                    ? "border-cyan-500 bg-white"
                    : ""
                }`
          }  border rounded items-center`}
          onClick={() => {
            if (shouldShowImage) {
              handleLabelSelection(
                label.conditionLabel,
                label.priceDrop,
                label.operation
              );
            }
            if (conditionName.includes("Screen Size")) {
              dispatch(
                addScreenSize({
                  conditionLabel: label.conditionLabel,
                  priceDrop: label.priceDrop,
                  operation: label.operation,
                })
              );
              setScreenSize({
                conditionLabel: label.conditionLabel,
                priceDrop: label.priceDrop,
                operation: label.operation,
              });
            } else if (conditionName.includes("Graphic")) {
              dispatch(
                addGraphic({
                  conditionLabel: label.conditionLabel,
                  priceDrop: label.priceDrop,
                  operation: label.operation,
                })
              );
              setGraphic({
                conditionLabel: label.conditionLabel,
                priceDrop: label.priceDrop,
                operation: label.operation,
              });
            } else if (
              conditionName.toLowerCase().includes("screen condition")
            ) {
              dispatch(
                addScreenCondition({
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
                ? `bg-cyan-500  ${
                    shouldShowImage ? "text-white " : "text-black"
                  } `
                : // : "bg-slate-100"
                  `${
                    laptopSliceData.screenSize.conditionLabel ===
                      label.conditionLabel ||
                    laptopSliceData.graphic.conditionLabel ===
                      label.conditionLabel ||
                    laptopSliceData.screenCondition.conditionLabel ===
                      label.conditionLabel
                      ? " bg-white"
                      : "bg-slate-100"
                  }`
            } 
            ${
              shouldShowImage
                ? "py-2 text-center w-full h-[100px] flex items-center justify-center lg:text-[12px] max-md:text-[12px] max-sm:text-xs"
                : "flex text-sm items-center gap-1 py-4 bg-slate-100"
              // : "flex text-sm items-center gap-1 py-4 bg-white"
            }

            ${functionalProblems && "bg-red-500"}
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
                      ? "border-cyan-500 "
                      : "border-surface-dark"
                  } `}
                >
                  <BsCircle />
                </span>
              </>
            ) : null}
            {label.conditionLabel}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LaptopDeductionItems;
