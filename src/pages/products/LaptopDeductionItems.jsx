import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addScreenSize,
  addGraphic,
  addScreenCondition,
  addPhysicalCondition,
  addAge,
  addModelYear,
} from "../../features/laptopDeductionSlice";
import { BsCircle } from "react-icons/bs";
import { addProductAge } from "../../features/deductionSlice";
import { setMode } from "../../features/globalSlice";

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
  setModelYear,
}) => {
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
  ].some((c) => conditionName.toLowerCase().includes(c));

  const type = conditionName;
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

  const isLabelSelected = (conditionLabel) => {
    return [
      laptopSliceData.screenSize.conditionLabel,
      laptopSliceData.graphic.conditionLabel,
      laptopSliceData.screenCondition.conditionLabel,
      laptopSliceData.physicalCondition.conditionLabel,
      laptopSliceData.age.conditionLabel,
      laptopSliceData.modelYear.conditionLabel,
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
    const actionMap = {
      "screen size": {
        action: addScreenSize,
        setState: setScreenSize,
        type: "Screen Size",
      },
      graphic: { action: addGraphic, setState: setGraphic, type: "Graphics" },
      "screen condition": {
        action: addScreenCondition,
        setState: setScreenCondition,
        type: "Screen Condition",
      },
      physical: {
        action: addPhysicalCondition,
        setState: setPhysicalCondition,
        type: "Physical Condition",
      },
      age: { action: addAge, setState: setAge, type: "Age of the Device" },
      "model launch year": {
        action: addModelYear,
        setState: setModelYear,
        type: "Model Launch Year",
      },
    };

    const matchedCondition = Object.entries(actionMap).find(([key]) =>
      conditionName.toLowerCase().includes(key)
    );

    if (matchedCondition) {
      const [, { action, setState, type }] = matchedCondition;
      dispatch(action({ ...label, type }));
      setState(label);

      // Additional action for age
      if (matchedCondition[0] === "age") {
        dispatch(addProductAge(label));
      }
    }
  };

  // console.log("shouldHideImage", shouldShowImage);

  return (
    <div
      className={
        conditionName.toLowerCase().includes("screen condition")
          ? "grid lg:grid-cols-2 md:grid-cols-1 gap-2 items-center px-2"
          : `grid ${
              shouldShowImage
                ? "grid-cols-2 lg:grid-cols-5"
                : "grid-cols-1 lg:grid-cols-3"
            } md:grid-cols-3 gap-4 items-center px-4`
      }
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
                  isLabelSelected(label.conditionLabel)
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
            className={`text-lg  max-sm:text-xs ${
              deductionData.some(
                (condLabel) => condLabel.conditionLabel == label.conditionLabel
              )
                ? `bg-cyan-500  ${
                    shouldShowImage ? "text-white " : "text-black"
                  } `
                : `${
                    isLabelSelected(label.conditionLabel)
                      ? " bg-white"
                      : "bg-slate-100"
                  }`
            }
            ${
              shouldShowImage
                ? "py-2 text-center w-full h-[100px] max-sm:h-[80px] flex items-center justify-center lg:text-[12px] max-md:text-[12px] max-sm:text-xs"
                : "flex text-sm h-[90px] max-sm:h-[65px] items-center gap-1 py-4 bg-slate-100"
              // : "flex text-sm items-center gap-1 py-4 bg-white"
            }

            ${functionalProblems && "bg-red-500"}
            `}
          >
            {!shouldShowImage ? (
              <>
                <span
                  className={` ${
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
            <span className="block max-sm:text-[11px] px-1">
              {label.conditionLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LaptopDeductionItems;

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
