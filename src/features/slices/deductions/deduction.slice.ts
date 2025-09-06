import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAddDeductionPayload,
  IAddSingleDeductionPayload,
  IDeductionState,
  ISetProductDataPayload,
} from "./deduction.types";
import { INITIAL_STATE } from "./deduction.constants";
import {
  calculatePercentage,
  isAddOperation,
  processDeductionCalculation,
} from "./deduction.utils";

export const deductionSlice = createSlice({
  name: "deductions",
  initialState: INITIAL_STATE as unknown as IDeductionState,
  reducers: {
    setProductData: (state, action: PayloadAction<ISetProductDataPayload>) => {
      const { selectedProduct, getUpTo } = action.payload;
      state.selectedProduct = selectedProduct;
      state.getUpTo = getUpTo;
    },

    addDeductions: (state, action: PayloadAction<IAddDeductionPayload>) => {
      const { condition, conditionLabel } = action.payload;

      // Check if conditionLabel already exists
      const existingIndex = state.deductions.findIndex(
        (deduction) =>
          deduction.conditionLabel === conditionLabel.conditionLabel
      );

      if (existingIndex === -1) {
        // Add new deduction
        state.deductions.push({
          ...conditionLabel,
          type: condition.keyword,
        });
      } else {
        // Remove existing deduction (toggle behavior)
        state.deductions.splice(existingIndex, 1);
      }
    },

    addSingleDeductions: (
      state,
      action: PayloadAction<IAddSingleDeductionPayload>
    ) => {
      const { condition, conditionLabel } = action.payload;
      const { keyword, isMandatory } = condition;

      const existingCondition = state.singleDeductions[keyword];

      // Handle non-mandatory single selection (toggle behavior)
      if (existingCondition && !isMandatory) {
        if (
          existingCondition.conditionLabel === conditionLabel.conditionLabel
        ) {
          delete state.singleDeductions[keyword];
          return;
        }
      }

      // Set or update the condition
      state.singleDeductions[keyword] = conditionLabel;
    },

    performCalculation: (state) => {
      console.log("performCalculation Reducer");

      const isProcessorCategory =
        state.selectedProduct.category?.categoryType?.processorBased ?? false;
      const basePrice = state.getUpTo.price ?? 0;

      console.log("PROCESSOR_CATEGORY", isProcessorCategory);

      let totalToBeAdded = 0;
      let totalToBeDeducted = 0;

      // Process single deductions
      Object.values(state.singleDeductions).forEach((deduction) => {
        const { toAdd, toDeduct } = processDeductionCalculation(
          deduction,
          basePrice,
          isProcessorCategory,
          state.toBeAdded,
          state.toBeDeducted
        );

        totalToBeAdded += toAdd;
        totalToBeDeducted += toDeduct;
      });

      // Process multi-select deductions
      state.deductions.forEach((deduction) => {
        const isAdd = isAddOperation(deduction.operation);
        const calculatedAmount = calculatePercentage(
          basePrice,
          deduction.priceDrop
        );

        if (isAdd) {
          totalToBeAdded += calculatedAmount;
        } else {
          totalToBeDeducted += calculatedAmount;
        }
      });

      state.toBeAdded = totalToBeAdded;
      state.toBeDeducted = totalToBeDeducted;

      console.log(
        `amountToBeAdded: ${totalToBeAdded}, amountToBeDeducted: ${totalToBeDeducted}`
      );
    },

    clearDeductions: (state) => {
      state.toBeDeducted = 0;
      state.toBeAdded = 0;
      state.deductions = [];
      state.singleDeductions = {};
    },

    // Additional utility actions for better state management
    removeDeduction: (
      state,
      action: PayloadAction<{ conditionLabel: string }>
    ) => {
      const { conditionLabel } = action.payload;
      state.deductions = state.deductions.filter(
        (deduction) => deduction.conditionLabel !== conditionLabel
      );
    },

    removeSingleDeduction: (
      state,
      action: PayloadAction<{ keyword: string }>
    ) => {
      const { keyword } = action.payload;
      delete state.singleDeductions[keyword];
    },

    resetCalculation: (state) => {
      state.toBeAdded = 0;
      state.toBeDeducted = 0;
    },

    updateProductPrice: (state, action: PayloadAction<{ price: number }>) => {
      const { price } = action.payload;
      state.getUpTo.price = price;
    },
  },
});

// Export actions
export const {
  setProductData,
  addDeductions,
  addSingleDeductions,
  performCalculation,
  clearDeductions,
  removeDeduction,
  removeSingleDeduction,
  resetCalculation,
  updateProductPrice,
} = deductionSlice.actions;

export default deductionSlice.reducer;
