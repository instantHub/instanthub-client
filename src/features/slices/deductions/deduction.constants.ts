import { IProductResponse } from "@features/api/productsApi/types";

export const CONFIG_ITEMS = ["Hard Disk", "Ram"] as const;
export const PROCESSOR_TYPE = "Processor" as const;
export const ADD_OPERATION = "add" as const;

export const INITIAL_STATE = {
  selectedProduct: {} as IProductResponse,
  theme: "client",
  getUpTo: {
    variantName: "",
    price: null,
  },
  toBeAdded: 0,
  toBeDeducted: 0,
  offerPrice: 0,
  deductions: [],
  singleDeductions: {},
} as const;
