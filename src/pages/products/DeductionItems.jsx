import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductScreenCondition,
  addProductPhysicalCondition,
  addProductDisplayDefect,
  addProductAge,
} from "../../features/deductionSlice";

import { BsCircle } from "react-icons/bs";

const DeductionItems = ({
  conditionName,
  conditionLabels,
  handleLabelSelection,
  setPhysicalCondition,
  handleContinue,
  setScreenCondition,
  setDisplayDefectCondition,
  setAge,
}) => {
  const deductionData = useSelector((state) => state.deductions.deductions);
  const deductionSliceData = useSelector((state) => state.deductions);
  // console.log("deductionData", deductionData);
  console.log("deductionSliceData", deductionSliceData);

  const dispatch = useDispatch();

  // Determine if the image should be shown based on the condition name
  const shouldShowImage = ![
    "screen size",
    "screen condition",
    "physical condition",
    "age",
  ].some((c) => conditionName.toLowerCase().includes(c));

  const isLabelSelected = (conditionLabel) => {
    return [
      deductionSliceData.productPhysicalCondition.conditionLabel,
      deductionSliceData.productScreenCondition.conditionLabel,
      deductionSliceData.productAge.conditionLabel,
    ].includes(conditionLabel);
  };

  const handleOnClick = (label) => {
    console.log("handleOnClick");
    if (shouldShowImage) {
      if (!conditionName.toLowerCase().includes("defects")) {
        handleLabelSelection(
          label.conditionLabel,
          label.priceDrop,
          label.operation,
          type
        );
      }
    }
    dispatchConditionAction(label);
  };

  const dispatchConditionAction = (label) => {
    const actionMap = {
      defects: {
        action: addProductDisplayDefect,
        setState: setDisplayDefectCondition,
        type: "Defects",
      },
      "screen condition": {
        action: addProductScreenCondition,
        setState: setScreenCondition,
        type: "Screen Condition",
      },
      "physical condition": {
        action: addProductPhysicalCondition,
        setState: setPhysicalCondition,
        type: "Physical Condition",
      },
      age: {
        action: addProductAge,
        setState: setAge,
        type: "Age of the Device",
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
      // if (matchedCondition[0] === "age") {
      //   dispatch(addProductAge({ ...label, type }));
      // }
    }
  };

  const type = conditionName;
  const functionalProblems = conditionName.toLowerCase().includes("functional");

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
                ) ||
                deductionSliceData.productDisplayDefect.conditionLabel ===
                  label.conditionLabel
                  ? ` ${
                      functionalProblems ? "border-red-500" : "border-secondary"
                    }`
                  : ""
              }
                  `
              : `flex px-2 bg-slate-100 ${
                  isLabelSelected(label.conditionLabel)
                    ? "border-secondary bg-white"
                    : ""
                }
                    
                `
          } 
          
           border rounded items-center`}
          // } flex flex-col border rounded items-center`}
          onClick={() => {
            handleOnClick(label);
          }}
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
            className={`${
              deductionData.some(
                (condLabel) => condLabel.conditionLabel == label.conditionLabel
              ) ||
              deductionSliceData.productDisplayDefect.conditionLabel ===
                label.conditionLabel
                ? `${functionalProblems ? "bg-red-500" : "bg-secondary"}  ${
                    shouldShowImage ? "text-white" : "text-black"
                  } `
                : `${
                    isLabelSelected(label.conditionLabel)
                      ? " bg-white"
                      : "bg-slate-100"
                  }`
            } 
            ${
              shouldShowImage
                ? "py-2 text-center w-full h-[100px] max-sm:h-[80px] flex items-center justify-center lg:text-[12px] max-md:text-[12px] max-sm:text-xs "
                : "flex justify-between text-sm h-[90px] max-sm:h-[30px] items-center gap-1 py-4"
              // "flex justify-between text-sm h-[90px] items-center gap-1 py-4 bg-white"
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
                      ? "text-secondary"
                      : deductionSliceData.productPhysicalCondition
                          .conditionLabel === label.conditionLabel ||
                        deductionSliceData.productScreenCondition
                          .conditionLabel === label.conditionLabel
                      ? "text-secondary bg-white"
                      : "opacity-30 "
                  } `}
                >
                  <BsCircle />
                </span>
              </>
            ) : null}
            <span className="block text-sm max-sm:text-xs px-1">
              {label.conditionLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeductionItems;

// if (conditionName.toLowerCase().includes("defects")) {
//   console.log("display defects");
//   dispatch(
//     addProductDisplayDefect({
//       conditionLabel: label.conditionLabel,
//       priceDrop: label.priceDrop,
//       operation: label.operation,
//       type,
//     })
//   );

//   setDisplayDefectCondition({
//     conditionLabel: label.conditionLabel,
//     priceDrop: label.priceDrop,
//     operation: label.operation,
//   });
// } else if (conditionName.toLowerCase().includes("physical condition")) {
//   // console.log("phyical condition");
//   dispatch(
//     addProductPhysicalCondition({
//       conditionLabel: label.conditionLabel,
//       priceDrop: label.priceDrop,
//       operation: label.operation,
//       type,
//     })
//   );

//   setPhysicalCondition({
//     conditionLabel: label.conditionLabel,
//     priceDrop: label.priceDrop,
//     operation: label.operation,
//   });
// } else if (conditionName.toLowerCase().includes("screen condition")) {
//   dispatch(
//     addProductScreenCondition({
//       conditionLabel: label.conditionLabel,
//       priceDrop: label.priceDrop,
//       operation: label.operation,
//       type,
//     })
//   );
//   setScreenCondition({
//     conditionLabel: label.conditionLabel,
//     priceDrop: label.priceDrop,
//     operation: label.operation,
//   });
// }

// onClick={() => {
//   // if (shouldShowImage) {
//   //   //
//   //   if (!conditionName.toLowerCase().includes("defects")) {
//   //     handleLabelSelection(
//   //       label.conditionLabel,
//   //       label.priceDrop,
//   //       label.operation,
//   //       type
//   //     );
//   //   }
//   // }

//   // if (conditionName.toLowerCase().includes("defects")) {
//   //   console.log("display defects");
//   //   dispatch(
//   //     addProductDisplayDefect({
//   //       conditionLabel: label.conditionLabel,
//   //       priceDrop: label.priceDrop,
//   //       operation: label.operation,
//   //       type,
//   //     })
//   //   );

//   //   setDisplayDefectCondition({
//   //     conditionLabel: label.conditionLabel,
//   //     priceDrop: label.priceDrop,
//   //     operation: label.operation,
//   //   });
//   // } else if (
//   //   conditionName.toLowerCase().includes("physical condition")
//   // ) {
//   //   // console.log("phyical condition");
//   //   dispatch(
//   //     addProductPhysicalCondition({
//   //       conditionLabel: label.conditionLabel,
//   //       priceDrop: label.priceDrop,
//   //       operation: label.operation,
//   //       type,
//   //     })
//   //   );

//   //   setPhysicalCondition({
//   //     conditionLabel: label.conditionLabel,
//   //     priceDrop: label.priceDrop,
//   //     operation: label.operation,
//   //   });
//   // } else if (
//   //   conditionName.toLowerCase().includes("screen condition")
//   // ) {
//   //   dispatch(
//   //     addProductScreenCondition({
//   //       conditionLabel: label.conditionLabel,
//   //       priceDrop: label.priceDrop,
//   //       operation: label.operation,
//   //       type,
//   //     })
//   //   );
//   //   setScreenCondition({
//   //     conditionLabel: label.conditionLabel,
//   //     priceDrop: label.priceDrop,
//   //     operation: label.operation,
//   //   });
//   // }
//   handleOnClick(label);
// }}
