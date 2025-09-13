// import { IDeductionState } from "./deduction.types";

// export const selectSelectedProduct = (state: { deductions: IDeductionState }) =>
//   state.deductions.selectedProduct;

// export const selectGetUpTo = (state: { deductions: IDeductionState }) =>
//   state.deductions.getUpTo;

// export const selectDeductions = (state: { deductions: IDeductionState }) =>
//   state.deductions.deductions;

// export const selectSingleDeductions = (state: {
//   deductions: IDeductionState;
// }) => state.deductions.singleDeductions;

// export const selectCalculatedAmounts = (state: {
//   deductions: IDeductionState;
// }) => ({
//   toBeAdded: state.deductions.toBeAdded,
//   toBeDeducted: state.deductions.toBeDeducted,
//   finalPrice:
//     (state.deductions.getUpTo.price ?? 0) +
//     state.deductions.toBeAdded -
//     state.deductions.toBeDeducted,
// });

// export const selectIsProcessorBased = (state: {
//   deductions: IDeductionState;
// }) =>
//   state.deductions.selectedProduct.category?.categoryType?.processorBased ??
//   false;

// SECOND
// import type { IDeductionState } from "./deduction.types";

// type RootState = { deductions: IDeductionState };

// export const selectSelectedProduct = (state: RootState) =>
//   state.deductions.selectedProduct;

// export const selectGetUpTo = (state: RootState) => state.deductions.getUpTo;

// export const selectDeductions = (state: RootState) =>
//   state.deductions.deductions;

// export const selectSingleDeductions = (state: RootState) =>
//   state.deductions.singleDeductions;

// export const selectCalculatedAmounts = (state: RootState) => ({
//   toBeAdded: state.deductions.toBeAdded,
//   toBeDeducted: state.deductions.toBeDeducted,
//   finalPrice:
//     (state.deductions.getUpTo.price ?? 0) +
//     state.deductions.toBeAdded -
//     state.deductions.toBeDeducted,
// });

// export const selectIsProcessorBased = (state: RootState) =>
//   state.deductions.selectedProduct.category?.categoryType?.processorBased ??
//   false;

// export const selectBasePrice = (state: RootState) =>
//   state.deductions.getUpTo.price ?? 0;

// export const selectVariantName = (state: RootState) =>
//   state.deductions.getUpTo.variantName;

// 3rd - Optimised
// ==================================================
// File: selectors/deduction.selectors.ts (Optimized Version)
// ==================================================

import { createSelector } from "@reduxjs/toolkit";
import type { IDeductionState } from "./deduction.types";

type RootState = { deductions: IDeductionState };

// ===== BASE SELECTORS (Direct state access) =====
// These are simple selectors that just extract data from state
// They don't need memoization as they're just property access

export const selectDeductionState = (state: RootState): IDeductionState =>
  state.deductions;

export const selectSelectedProduct = (state: RootState) =>
  state.deductions.selectedProduct;

export const selectGetUpTo = (state: RootState) => state.deductions.getUpTo;

export const selectDeductions = (state: RootState) =>
  state.deductions.deductions;

export const selectSingleDeductions = (state: RootState) =>
  state.deductions.singleDeductions;

export const selectToBeAdded = (state: RootState) => state.deductions.toBeAdded;

export const selectToBeDeducted = (state: RootState) =>
  state.deductions.toBeDeducted;

// ===== MEMOIZED SELECTORS (Computed values) =====
// These use createSelector for memoization since they perform calculations

export const selectBasePrice = createSelector(
  [selectGetUpTo],
  (getUpTo) => getUpTo.price ?? 0
);

export const selectOfferPrice = createSelector(
  [selectDeductionState],
  ({ offerPrice }) => offerPrice
);

export const selectVariantName = createSelector(
  [selectGetUpTo],
  (getUpTo) => getUpTo.variantName
);

export const selectCategory = createSelector(
  [selectSelectedProduct],
  (selectedProduct) => selectedProduct.category
);

export const selectCategoryType = createSelector(
  [selectCategory],
  (category) => category?.categoryType
);

export const selectIsProcessorBased = createSelector(
  [selectCategoryType],
  (categoryType) => categoryType?.processorBased ?? false
);

export const selectIsMultiVariant = createSelector(
  [selectCategoryType],
  (categoryType) => categoryType?.multiVariants ?? false
);

// ===== COMPLEX COMPUTED SELECTORS =====

// TODO: Update or remove this as this returns wrong data
export const selectCalculatedAmounts = createSelector(
  [selectBasePrice, selectOfferPrice, selectToBeAdded, selectToBeDeducted],
  (basePrice, toBeAdded, toBeDeducted, offerPrice) => ({
    basePrice,
    offerPrice,
    toBeAdded,
    toBeDeducted,
    finalPrice: basePrice + toBeAdded - toBeDeducted,
    totalAdjustment: toBeAdded - toBeDeducted,
    priceChange: {
      amount: toBeAdded - toBeDeducted,
      percentage:
        basePrice > 0 ? ((toBeAdded - toBeDeducted) / basePrice) * 100 : 0,
    },
  })
);

export const selectDeductionCounts = createSelector(
  [selectDeductions, selectSingleDeductions],
  (deductions, singleDeductions) => ({
    multiSelectCount: deductions.length,
    singleSelectCount: Object.keys(singleDeductions).length,
    totalSelections: deductions.length + Object.keys(singleDeductions).length,
  })
);

export const selectDeductionsByType = createSelector(
  [selectDeductions],
  (deductions) => {
    const grouped = deductions.reduce((acc, deduction) => {
      const type = deduction.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(deduction);
      return acc;
    }, {} as Record<string, typeof deductions>);

    return grouped;
  }
);

export const selectSingleDeductionsByOperation = createSelector(
  [selectSingleDeductions],
  (singleDeductions) => {
    const additions: typeof singleDeductions = {};
    const subtractions: typeof singleDeductions = {};

    Object.entries(singleDeductions).forEach(([key, deduction]) => {
      if (deduction.operation.toLowerCase() === "add") {
        additions[key] = deduction;
      } else {
        subtractions[key] = deduction;
      }
    });

    return { additions, subtractions };
  }
);

export const selectPriceBreakdown = createSelector(
  [selectBasePrice, selectDeductions, selectSingleDeductions],
  (basePrice, deductions, singleDeductions) => {
    const breakdown = {
      basePrice,
      multiSelectAdjustments: [] as Array<{
        type: string;
        amount: number;
        operation: string;
      }>,
      singleSelectAdjustments: [] as Array<{
        type: string;
        amount: number;
        operation: string;
      }>,
    };

    // Process multi-select deductions
    deductions.forEach((deduction) => {
      const amount = Math.ceil((basePrice * deduction.priceDrop) / 100);
      breakdown.multiSelectAdjustments.push({
        type: deduction.type,
        amount,
        operation: deduction.operation,
      });
    });

    // Process single-select deductions
    Object.values(singleDeductions).forEach((deduction) => {
      const amount = Math.ceil((basePrice * deduction.priceDrop) / 100);
      breakdown.singleSelectAdjustments.push({
        type: deduction?.type ?? "",
        amount,
        operation: deduction.operation,
      });
    });

    return breakdown;
  }
);

// ===== UTILITY SELECTORS =====

export const selectHasDeductions = createSelector(
  [selectDeductions, selectSingleDeductions],
  (deductions, singleDeductions) =>
    deductions.length > 0 || Object.keys(singleDeductions).length > 0
);

export const selectProductInfo = createSelector(
  [selectSelectedProduct, selectGetUpTo],
  (selectedProduct, getUpTo) => ({
    productName: selectedProduct.name || "",
    categoryName: selectedProduct.category?.name || "",
    variantName: getUpTo.variantName,
    basePrice: getUpTo.price ?? 0,
  })
);

export const selectIsConfigurationComplete = createSelector(
  [selectSelectedProduct, selectGetUpTo],
  (selectedProduct, getUpTo) =>
    Boolean(selectedProduct.id) &&
    Boolean(getUpTo.variantName) &&
    getUpTo.price !== null
);

// ===== FILTERED SELECTORS =====

export const selectDeductionsByKeyword = (keyword: string) =>
  createSelector([selectDeductions], (deductions) =>
    deductions.filter((deduction) => deduction.type === keyword)
  );

export const selectSingleDeductionByKeyword = (keyword: string) =>
  createSelector(
    [selectSingleDeductions],
    (singleDeductions) => singleDeductions[keyword] || null
  );

// ===== PERFORMANCE OPTIMIZED HOOKS =====
// File: hooks/useOptimizedDeduction.ts

import { useSelector, shallowEqual } from "react-redux";
import { useMemo } from "react";

// Custom hook with shallow equality for better performance
export const useDeductionState = () => {
  return useSelector(
    (state: RootState) => ({
      selectedProduct: state.deductions.selectedProduct,
      getUpTo: state.deductions.getUpTo,
      deductions: state.deductions.deductions,
      singleDeductions: state.deductions.singleDeductions,
    }),
    shallowEqual // Prevents re-renders when objects have same properties
  );
};

// Optimized calculated amounts hook
export const useCalculatedAmounts = () => {
  return useSelector(selectCalculatedAmounts);
};

// Optimized product info hook
export const useProductInfo = () => {
  return useSelector(selectProductInfo);
};

// Hook for specific deduction type with memoization
export const useDeductionByType = (keyword: string) => {
  const selector = useMemo(() => selectDeductionsByKeyword(keyword), [keyword]);

  return useSelector(selector);
};

// ===== RESELECT ALTERNATIVES FOR EVEN BETTER PERFORMANCE =====
// File: selectors/deduction.selectors.advanced.ts

import { weakMapMemoize } from "reselect";

// Using weakMapMemoize for better memory management with dynamic selectors
export const selectDeductionsByKeywordAdvanced = weakMapMemoize(
  (keyword: string) =>
    createSelector([selectDeductions], (deductions) =>
      deductions.filter((deduction) => deduction.type === keyword)
    )
);

// Parametric selector with better caching
export const makeSelectDeductionsByOperation = () =>
  createSelector(
    [selectDeductions, (_state: RootState, operation: string) => operation],
    (deductions, operation) =>
      deductions.filter(
        (deduction) =>
          deduction.operation.toLowerCase() === operation.toLowerCase()
      )
  );

// ===== PERFORMANCE MONITORING SELECTORS =====
// These help identify performance bottlenecks

export const selectSelectorPerformanceInfo = createSelector(
  [selectDeductionState],
  (state) => ({
    stateSize: JSON.stringify(state).length,
    deductionsCount: state.deductions.length,
    singleDeductionsCount: Object.keys(state.singleDeductions).length,
    timestamp: Date.now(),
  })
);

// ===== EXPORT ORGANIZED BY USAGE =====

// Basic selectors (frequent use, no memoization needed)
export const basicSelectors = {
  selectDeductionState,
  selectSelectedProduct,
  selectGetUpTo,
  selectDeductions,
  selectSingleDeductions,
  selectToBeAdded,
  selectToBeDeducted,
};

// Computed selectors (infrequent use, memoized)
export const computedSelectors = {
  selectCalculatedAmounts,
  selectDeductionCounts,
  selectDeductionsByType,
  selectSingleDeductionsByOperation,
  selectPriceBreakdown,
  selectProductInfo,
  selectIsProcessorBased,
  selectHasDeductions,
};

// Dynamic selectors (parametric)
export const dynamicSelectors = {
  selectDeductionsByKeyword,
  selectSingleDeductionByKeyword,
  selectDeductionsByKeywordAdvanced,
  makeSelectDeductionsByOperation,
};

// ===== USAGE EXAMPLES AND BEST PRACTICES =====

/*
// ✅ Good - Use basic selectors for simple state access
const deductions = useSelector(selectDeductions);

// ✅ Good - Use computed selectors for calculations
const calculatedAmounts = useSelector(selectCalculatedAmounts);

// ✅ Good - Use custom hooks for multiple related values
const { selectedProduct, getUpTo } = useDeductionState();

// ✅ Good - Memoize dynamic selectors
const getDeductionsByType = useMemo(
  () => selectDeductionsByKeyword('problems'),
  []
);
const problemDeductions = useSelector(getDeductionsByType);

// ❌ Avoid - Don't create objects in selectors without memoization
const badSelector = (state) => ({
  data: state.deductions,
  timestamp: Date.now() // This will cause re-renders on every call
});

// ❌ Avoid - Don't use complex calculations directly in components
const MyComponent = () => {
  const state = useSelector(selectDeductionState);
  
  // This calculation runs on every render
  const finalPrice = state.getUpTo.price + state.toBeAdded - state.toBeDeducted;
  
  // Use selectCalculatedAmounts instead
};
*/
