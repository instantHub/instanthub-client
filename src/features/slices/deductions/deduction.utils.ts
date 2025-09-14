import {
  ADD_OPERATION,
  CONFIG_ITEMS,
  PROCESSOR_TYPE,
} from "./deduction.constants";
import { ISingleDeduction } from "./deduction.types";

export const calculatePercentage = (
  price: number,
  priceDrop: number
): number => {
  return Math.ceil((price * Number(priceDrop)) / 100);
};

export const isAddOperation = (operation: string): boolean => {
  return operation.toLowerCase() === ADD_OPERATION;
};

const isConfigItem = (type: string): boolean => {
  return CONFIG_ITEMS.includes(type as (typeof CONFIG_ITEMS)[number]);
};

export const processDeductionCalculation = (
  deduction: ISingleDeduction,
  basePrice: number,
  isProcessorCategory: boolean,
  currentAdded: number,
  currentDeducted: number
): { toAdd: number; toDeduct: number } => {
  const { operation, priceDrop, type } = deduction;
  const isAdd = isAddOperation(operation);
  // console.log("deduction from processDeductionCalculation", deduction);
  // console.log("type", type);

  // Skip processor calculation for processor-based categories
  if (isProcessorCategory && type === PROCESSOR_TYPE) {
    console.log("Skip Processor calculation");
    return { toAdd: 0, toDeduct: 0 };
  }

  // Handle Hard Disk and RAM for processor-based categories
  if (isProcessorCategory && type && isConfigItem(type)) {
    console.log("Hard Disk or Ram", deduction);

    if (isAdd) {
      return { toAdd: Math.ceil(priceDrop + currentAdded), toDeduct: 0 };
    } else {
      console.log("Perform subtract on Hard Disk & Ram");
      return { toAdd: 0, toDeduct: Math.ceil(priceDrop + currentDeducted) };
    }
  }

  // Standard percentage calculation
  const calculatedAmount = calculatePercentage(basePrice, priceDrop);

  return {
    toAdd: isAdd ? calculatedAmount : 0,
    toDeduct: isAdd ? 0 : calculatedAmount,
  };
};
