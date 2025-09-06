import {
  IConditionLabels,
  IConditions,
  IProductResponse,
} from "@features/api/productsApi/types";
import { TMakePartial } from "@utils/types";

export interface IGetUpTo {
  variantName: string;
  price: number | null;
}

export interface IDeduction extends IConditionLabels {
  type: string;
}

export interface ISingleDeduction
  extends TMakePartial<
    IConditionLabels,
    "id" | "conditionLabelImg" | "conditionLabelId"
  > {
  type?: string;
}

export interface ISingleDeductions {
  [keyword: string]: ISingleDeduction;
}

type TTheme = "admin" | "client";

export interface IDeductionState {
  selectedProduct: IProductResponse;
  theme: TTheme;
  getUpTo: IGetUpTo;
  toBeAdded: number;
  toBeDeducted: number;
  deductions: IDeduction[];
  singleDeductions: ISingleDeductions;
}

// Action Payload Types
export interface ISetProductDataPayload {
  selectedProduct: IProductResponse;
  getUpTo: IGetUpTo;
}

export interface IAddDeductionPayload {
  condition: IConditions;
  conditionLabel: IConditionLabels;
}

export interface IAddSingleDeductionPayload {
  condition: IConditions;
  conditionLabel: ISingleDeduction;
}
