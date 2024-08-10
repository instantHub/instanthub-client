import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productName: "",
  productImage: "",
  productCategory: "",
  productAge: {},
  productScreenCondition: {},
  productPhysicalCondition: {},
  productPanelCondition: {},
  productDisplayDefect: {},
  getUpTo: {
    variantName: "",
    price: undefined,
  },
  toBeDeducted: 0,
  toBeAdded: 0,
  finalPrice: 0,
  deductions: [],
};

export const deductionSlice = createSlice({
  name: "deductions",
  initialState,
  reducers: {
    setGetUpto: (state, action) => {
      // console.log("setGetUpto reducer");
      // console.log(
      //   action.payload.productName,
      //   action.payload.productImage,
      //   action.payload.variantName,
      //   action.payload.price
      // );
      const { productName, productImage, productCategory, variantName, price } =
        action.payload;
      return {
        ...state,
        productName,
        productImage,
        productCategory,
        getUpTo: {
          variantName,
          price,
        },
      };
    },
    addDeductions: (state, action) => {
      console.log("addDeduction Reducer", action.payload);
      console.log(state.productCategory);

      // Check if action.payload already exists in deductions
      const isExisting = state.deductions.some((condition) => {
        return condition.conditionLabel === action.payload.conditionLabel;
      });
      if (!isExisting) {
        if (action.payload.operation === "Subtrack") {
          return {
            ...state,
            // Deduction based on Product Category
            toBeDeducted: state.productCategory.toLowerCase().includes("mobile")
              ? Math.ceil(
                  state.toBeDeducted +
                    (state.getUpTo.price * Number(action.payload.priceDrop)) /
                      100
                )
              : Math.ceil(state.toBeDeducted + action.payload.priceDrop),
            // Push deduction into deductions array
            deductions: [...state.deductions, action.payload],
          };
        } else if (action.payload.operation === "Add") {
          return {
            ...state,
            // Deduction based on Product Category
            toBeAdded: state.productCategory.toLowerCase().includes("mobile")
              ? Math.ceil(
                  state.toBeAdded +
                    (state.getUpTo.price * Number(action.payload.priceDrop)) /
                      100
                )
              : Math.ceil(state.toBeAdded + action.payload.priceDrop),
            // Push deduction into deductions array
            deductions: [...state.deductions, action.payload],
          };
        }
      }
    },
    addProductAge: (state, action) => {
      // console.log("addProductAge reducer", action.payload);
      // console.log(initialState);
      return {
        ...state,
        productAge: {
          conditionLabel: action.payload.conditionLabel,
          priceDrop: action.payload.priceDrop,
          operation: action.payload.operation,
        },
      };
    },
    addProductScreenCondition: (state, action) => {
      return {
        ...state,
        productScreenCondition: {
          conditionLabel: action.payload.conditionLabel,
          priceDrop: action.payload.priceDrop,
          operation: action.payload.operation,
        },
      };
    },
    addProductPhysicalCondition: (state, action) => {
      // console.log("addProductPhysicalCondition Slice");
      return {
        ...state,
        productPhysicalCondition: {
          conditionLabel: action.payload.conditionLabel,
          priceDrop: action.payload.priceDrop,
          operation: action.payload.operation,
        },
      };
    },
    addProductDisplayDefect: (state, action) => {
      console.log("addProductDisplayDefect Slice");
      return {
        ...state,
        productDisplayDefect: {
          conditionLabel: action.payload.conditionLabel,
          priceDrop: action.payload.priceDrop,
          operation: action.payload.operation,
        },
      };
    },
    removeDeductions: (state, action) => {
      // console.log("removeDeductions reducer", action.payload);

      // Check if action.payload already exists in deductions
      const isExisting = state.deductions.some((condition) => {
        return condition.conditionLabel === action.payload.conditionLabel;
      });

      if (isExisting) {
        // Filter out the item from the deductions array if it exists
        const updatedDeductions = state.deductions.filter(
          (condition) =>
            condition.conditionLabel !== action.payload.conditionLabel
        );

        if (action.payload.operation === "Subtrack") {
          return {
            ...state,
            // Deduction based on Product Category
            toBeDeducted: state.productCategory.toLowerCase().includes("mobile")
              ? Math.ceil(
                  state.toBeDeducted -
                    (state.getUpTo.price * Number(action.payload.priceDrop)) /
                      100
                )
              : Math.ceil(state.toBeDeducted - action.payload.priceDrop),
            // Add updated deduction to deductions array
            deductions: updatedDeductions,
          };
        } else if (action.payload.operation === "Add") {
          return {
            ...state,
            // Deduction based on Product Category
            toBeAdded: state.productCategory.toLowerCase().includes("mobile")
              ? Math.ceil(
                  state.toBeAdded -
                    (state.getUpTo.price * Number(action.payload.priceDrop)) /
                      100
                )
              : Math.ceil(state.toBeAdded - action.payload.priceDrop),
            // Add updated deduction to deductions array
            deductions: updatedDeductions,
          };
        }

        // if (action.payload.operation === "Subtrack") {
        //   return {
        //     ...state,
        //     toBeDeducted: Math.ceil(
        //       state.toBeDeducted -
        //         (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
        //     ),
        //     deductions: updatedDeductions,
        //   };
        // } else if (action.payload.operation === "Add") {
        //   return {
        //     ...state,
        //     toBeAdded: Math.ceil(
        //       state.toBeAdded -
        //         (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
        //     ),
        //     deductions: updatedDeductions,
        //   };
        // }

        // return {
        //   ...state,
        //   toBeDeducted: state.toBeDeducted - Number(action.payload.priceDrop),
        //   deductions: updatedDeductions,
        // };
      }
    },
    clearDeductions: (state, action) => {
      return {
        ...state,
        toBeDeducted: 0,
        toBeAdded: 0,
        productAge: {},
        productScreenCondition: {},
        productPhysicalCondition: {},
        productDisplayDefect: {},
        deductions: [],
      };
    },
  },
});

export const {
  setGetUpto,
  addDeductions,
  addProductAge,
  addProductScreenCondition,
  addProductPhysicalCondition,
  addProductDisplayDefect,
  clearDeductions,
  removeDeductions,
} = deductionSlice.actions;
export default deductionSlice.reducer;

// ADD DEDUCTIONS
// if (state.productCategory.toLowerCase().includes("mobile")) {
//   if (action.payload.operation === "Subtrack") {
//     return {
//       ...state,
//       toBeDeducted: Math.ceil(
//         state.toBeDeducted +
//           (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
//       ),
//       deductions: [...state.deductions, action.payload],
//     };
//   } else if (action.payload.operation === "Add") {
//     return {
//       ...state,
//       toBeAdded: Math.ceil(
//         state.toBeAdded +
//           (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
//       ),
//       deductions: [...state.deductions, action.payload],
//     };
//   }
// } else {
//   if (action.payload.operation === "Subtrack") {
//     return {
//       ...state,
//       toBeDeducted: Math.ceil(
//         state.toBeDeducted + action.payload.priceDrop
//       ),
//       deductions: [...state.deductions, action.payload],
//     };
//   } else if (action.payload.operation === "Add") {
//     return {
//       ...state,
//       toBeAdded: Math.ceil(state.toBeAdded + action.payload.priceDrop),
//       deductions: [...state.deductions, action.payload],
//     };
//   }
// }

// REMOVE DEDUCTIONS
// if (action.payload.operation === "Subtrack") {
//   return {
//     ...state,
//     toBeDeducted: Math.ceil(
//       state.toBeDeducted -
//         (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
//     ),
//     deductions: updatedDeductions,
//   };
// } else if (action.payload.operation === "Add") {
//   return {
//     ...state,
//     toBeAdded: Math.ceil(
//       state.toBeAdded -
//         (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
//     ),
//     deductions: updatedDeductions,
//   };
// }
