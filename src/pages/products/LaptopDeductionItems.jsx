import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addScreenSize,
  addGraphic,
  addScreenCondition,
  addPhysicalCondition,
  addAge,
} from "../../features/laptopDeductionSlice";
import { BsCircle } from "react-icons/bs";
import { addProductAge } from "../../features/deductionSlice";

const LaptopDeductionItems = ({
  conditionName,
  conditionLabels,
  handleLabelSelection,
  handleContinue,
  setScreenSize,
  setGraphic,
  setScreenCondition,
  setPhysicalCondition,
  setAge,
}) => {
  const deductionData = useSelector((state) => state.deductions.deductions);

  const dispatch = useDispatch();

  const laptopSliceData = useSelector((state) => state.laptopDeductions);
  // console.log("laptopSliceData", laptopSliceData);

  // Determine if the image should be shown based on the condition name
  const shouldShowImage = !(
    conditionName.toLowerCase().includes("screen size") ||
    conditionName.toLowerCase().includes("graphic") ||
    conditionName.toLowerCase().includes("screen condition") ||
    conditionName.toLowerCase().includes("physical") ||
    conditionName.toLowerCase().includes("age")
  );
  // || conditionName.toLowerCase().includes("screen")

  const functionalProblems = conditionName.toLowerCase().includes("functional");

  const checkIfSelected = (conditionLabel) => {
    let sliceConditionLabels = [
      laptopSliceData.screenSize.conditionLabel,
      laptopSliceData.graphic.conditionLabel,
      laptopSliceData.screenCondition.conditionLabel,
      laptopSliceData.physicalCondition.conditionLabel,
      laptopSliceData.age.conditionLabel,
    ];
    if (sliceConditionLabels.includes(conditionLabel)) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnClick = (label) => {
    let condName = conditionName.toLowerCase();

    if (shouldShowImage) {
      handleLabelSelection(
        label.conditionLabel,
        label.priceDrop,
        label.operation
      );
    }

    if (condName.includes("screen size")) {
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
    } else if (condName.includes("graphic")) {
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
    } else if (condName.includes("screen condition")) {
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
    } else if (condName.includes("physical")) {
      dispatch(
        addPhysicalCondition({
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
    } else if (condName.includes("age")) {
      dispatch(
        addAge({
          conditionLabel: label.conditionLabel,
          priceDrop: label.priceDrop,
          operation: label.operation,
        })
      );
      dispatch(
        addProductAge({
          conditionLabel: label.conditionLabel,
          priceDrop: label.priceDrop,
          operation: label.operation,
        })
      );
      setAge({
        conditionLabel: label.conditionLabel,
        priceDrop: label.priceDrop,
        operation: label.operation,
      });
    }
  };

  // console.log("shouldHideImage", shouldShowImage);

  return (
    <div
      className={`
      ${
        conditionName.toLowerCase().includes("screen condition")
          ? `grid lg:grid-cols-2 md:grid-cols-1 gap-2 items-center px-2`
          : `${
              !shouldShowImage
                ? `grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 items-center px-4 `
                : `grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 items-center px-4`
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
                  checkIfSelected(label.conditionLabel)
                    ? "border-cyan-500 bg-white"
                    : ""
                }`
          }  border rounded items-center`}
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
                : `${
                    checkIfSelected(label.conditionLabel)
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
