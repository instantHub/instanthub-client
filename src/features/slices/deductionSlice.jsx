import { createSlice } from "@reduxjs/toolkit";
import { LAPTOP, LAPTOP_DESKTOP } from "../../utils/constants";

const initialState = {
  productName: "",
  productImage: "",
  productCategory: "",

  getUpTo: {
    variantName: "",
    price: null,
  },

  toBeAdded: 0,
  toBeDeducted: 0,
  // finalPrice: 0,

  deductions: [],
  singleDeductions: {},
};

export const deductionSlice = createSlice({
  name: "deductions",
  initialState,
  reducers: {
    setGetUpto: (state, action) => {
      // console.log("setGetUpto reducer");
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

      let { condition, conditionLabel } = action.payload;
      // console.log(condition, conditionLabel);

      // Check if action.payload already exists in deductions
      const isExisting = state.deductions.some((deduction) => {
        return deduction.conditionLabel === conditionLabel.conditionLabel;
      });

      if (!isExisting) {
        state.deductions = [
          ...state.deductions,
          { ...conditionLabel, type: condition.keyword },
        ];
      } else {
        const filteredData = state.deductions.filter(
          (d) => d.conditionLabel !== conditionLabel.conditionLabel
        );
        state.deductions = filteredData;
      }
    },

    addSingleDeductions: (state, action) => {
      console.log("addSingleDeductions Reducer", action.payload);
      let { condition, conditionLabel } = action.payload;
      // console.log(condition, conditionLabel);

      const exisitingCondition = Object.entries(state.singleDeductions).some(
        ([keyword, _]) => keyword === condition.keyword
      );
      console.log("exisitingCondition", exisitingCondition);

      // Single Selection but not mandatory like Display Defects
      if (exisitingCondition && !condition.isMandatory) {
        if (
          state.singleDeductions[condition.keyword].conditionLabel ==
          conditionLabel.conditionLabel
        ) {
          // state.singleDeductions[condition.keyword] = {};
          delete state.singleDeductions[condition.keyword];
          return;
        }
      }

      if (exisitingCondition) {
        Object.entries(state.singleDeductions).forEach(([keyword, _]) => {
          if (keyword == condition.keyword) {
            state.singleDeductions[keyword] = conditionLabel;
          }
        });
      } else {
        state.singleDeductions[condition.keyword] = conditionLabel;
      }
    },

    performCalculation: (state, _) => {
      console.log("performCalculation Reducer");

      let category = state.productCategory.toLowerCase();
      let PROCESSOR_CATEGORY = LAPTOP_DESKTOP.includes(category);
      console.log("PROCESSOR_CATEGORY", PROCESSOR_CATEGORY);

      const CONFIG_ITEMS = ["Hard Disk", "Ram"];

      function percentageCal(priceDrop) {
        return Math.ceil((state.getUpTo.price * Number(priceDrop)) / 100);
      }

      let amountToBeAdded = 0;
      let amountToBeDeducted = 0;

      // Calculation on single deduction entries
      const deductionEntries = Object.entries(state.singleDeductions);
      deductionEntries.forEach(([_, label]) => {
        const ADD_OPERATION = label?.operation?.toLowerCase() === "add";
        const { priceDrop, type } = label;

        // Do not perform calculation on processor
        if (PROCESSOR_CATEGORY && label.type === "Processor") {
          console.log("Skip Processor calculation");
          return;
        }

        // Normal calculation for Hard Disk and Ram
        if (PROCESSOR_CATEGORY && CONFIG_ITEMS.includes(type)) {
          console.log("Hard Disk or Ram", label);

          if (ADD_OPERATION) {
            amountToBeAdded += Math.ceil(priceDrop + state.toBeAdded);
          } else {
            console.log("Perfrom subract on Hard Disk & Ram");
            amountToBeDeducted += Math.ceil(priceDrop + state.toBeDeducted);
          }

          return;
        }

        if (ADD_OPERATION) {
          amountToBeAdded += percentageCal(priceDrop);
        } else {
          amountToBeDeducted += percentageCal(priceDrop);
        }
      });

      // Calculation on deductions entries
      state.deductions.forEach((deduction) => {
        const ADD_OPERATION = deduction.operation.toLowerCase() === "add";
        if (ADD_OPERATION)
          amountToBeAdded += percentageCal(deduction.priceDrop);
        else amountToBeDeducted += percentageCal(deduction.priceDrop);
      });

      state.toBeAdded = amountToBeAdded;
      state.toBeDeducted = amountToBeDeducted;

      console.log(
        `amountToBeAdded: ${amountToBeAdded}, amountToBeDeducted: ${amountToBeDeducted}`
      );
    },

    clearDeductions: (state, _) => {
      return {
        ...state,
        toBeDeducted: 0,
        toBeAdded: 0,

        deductions: [],
        singleDeductions: {},
      };
    },
  },
});

export const {
  setGetUpto,

  addDeductions,
  addSingleDeductions,

  performCalculation,

  clearDeductions,
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
