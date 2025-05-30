import { createSlice } from "@reduxjs/toolkit";
import { LAPTOP } from "@utils/user/constants";

const initialState = {
  selectedProduct: {},

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
    setProductData: (state, action) => {
      const { selectedProduct, getUpTo } = action.payload;

      state.selectedProduct = selectedProduct;
      state.getUpTo = getUpTo;
    },

    addDeductions: (state, action) => {
      // console.log("addDeduction Reducer", action.payload);

      let { condition, conditionLabel } = action.payload;
      // console.log(condition, conditionLabel);

      // Check if conditionLabel Already Exists
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
      // console.log("addSingleDeductions Reducer", action.payload);
      let { condition, conditionLabel } = action.payload;
      // console.log(condition, conditionLabel);

      const exisitingCondition = Object.entries(state.singleDeductions).some(
        ([keyword, _]) => keyword === condition.keyword
      );
      // console.log("exisitingCondition", exisitingCondition);

      // Single Selection but not mandatory like Display Defects
      if (exisitingCondition && !condition.isMandatory) {
        if (
          state.singleDeductions[condition.keyword].conditionLabel ==
          conditionLabel.conditionLabel
        ) {
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

      // let category = state.selectedProduct.category.name.toLowerCase();
      // let PROCESSOR_CATEGORY = LAPTOP_DESKTOP.includes(category);
      let PROCESSOR_CATEGORY =
        state.selectedProduct.category.categoryType.processorBased;
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
  // setGetUpto,
  setProductData,

  addDeductions,
  addSingleDeductions,

  performCalculation,

  clearDeductions,
} = deductionSlice.actions;

export default deductionSlice.reducer;

// Good code to include multi select data as well in singleDeductions
{
  // if (condition.multiSelect) {
  //   const dataExists =
  //     state.singleDeductions[condition.keyword]?.length > 0;
  //   if (dataExists) {
  //     // Check if conditionLabel Already Exists
  //     const isExisting = state.singleDeductions[condition.keyword].some(
  //       (deduction) => {
  //         return deduction.conditionLabel === conditionLabel.conditionLabel;
  //       }
  //     );
  //     if (!isExisting) {
  //       state.singleDeductions[condition.keyword].push(conditionLabel);
  //     } else {
  //       const filteredData = state.singleDeductions[
  //         condition.keyword
  //       ].filter((d) => d.conditionLabel !== conditionLabel.conditionLabel);
  //       state.singleDeductions[condition.keyword] = filteredData;
  //     }
  //   } else {
  //     state.singleDeductions[condition.keyword] = [conditionLabel];
  //   }
  //   return;
  // }
}
