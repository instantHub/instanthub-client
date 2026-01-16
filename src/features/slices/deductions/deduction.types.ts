import {
  IProductConditionLabels,
  IProductConditions,
  IProductResponse,
} from "@features/api/productsApi/types";
import { TMakePartial } from "@utils/types";

export interface IGetUpTo {
  variantName: string;
  price: number;
}

export interface IDeduction extends IProductConditionLabels {
  type: string;
}

export interface ISingleDeduction
  extends TMakePartial<
    IProductConditionLabels,
    "id" | "conditionLabelImg" | "conditionLabelId"
  > {
  type?: string;
}

export interface IDeductionsByType {
  [key: string]: Array<Partial<IProductConditionLabels>>;
}

export interface IFinalDeductionSet {
  type: string;
  conditions: Partial<IProductConditionLabels>[];
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
  offerPrice: number;
  deductions: IDeduction[];
  singleDeductions: ISingleDeductions;
  finalDeductionsSetArray: IFinalDeductionSet[];
}

// Action Payload Types
export interface ISetProductDataPayload {
  selectedProduct: IProductResponse;
  getUpTo: IGetUpTo;
}

export interface IAddDeductionPayload {
  condition: IProductConditions;
  conditionLabel: IProductConditionLabels;
}

export interface IAddSingleDeductionPayload {
  condition: IProductConditions;
  conditionLabel: ISingleDeduction;
}
