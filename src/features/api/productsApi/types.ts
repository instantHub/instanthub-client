import { IBrandResponse } from "../brandsApi/types";
import { ICategoryResponse } from "../categoriesApi/types";

export type TOperation = "Add" | "Subtrack";

export interface IProductResponse {
  id: string;
  name: string;
  image: string;
  uniqueURL: string;
  status: string;
  brands: Omit<IBrandResponse, "series" | "products">;
  category: Omit<ICategoryResponse, "brands">;
  simpleDeductions: IConditions[] | [];
  variantDeductions: IVariantDeductions[] | [];
  variants: IVariants[];
}

export interface IVariants {
  id: string;
  name: string;
  price: number;
}

export interface IConditions {
  id: string;
  conditionId: string;
  conditionName: string;
  description: string;
  isMandatory: boolean;
  isYesNoType: boolean;
  multiSelect: boolean;
  showLabelsImage: boolean;
  keyword: string;
  page: number;
  conditionLabels: IConditionLabels[];
}

export interface IConditionLabels {
  id: string;
  conditionLabel: string;
  conditionLabelId: string;
  conditionLabelImg?: string;
  operation: TOperation;
  priceDrop: number;
}

export interface IVariantDeductions {
  id: string;
  variantId: string;
  variantName: string;
  deductions: IConditions[];
}

export interface IGetAllProductsParams {
  page: string;
  limit: string;
  search: string;
  categoryId: string;
}

export interface IGetProductsByBrandParams {
  brandUniqueURL: string;
  search?: string;
}
