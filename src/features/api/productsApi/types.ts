import { IBrandResponse } from "../brands/types";
import { ICategoryResponse } from "../categories/types";

export type TOperation = "Add" | "Subtrack";

export interface ISearchParams {
  search: string;
  page?: number;
  limit?: number;
}

export interface IProductResponse {
  _id: string;
  name: string;
  image: string;
  uniqueURL: string;
  status: string;
  brand: Omit<IBrandResponse, "series" | "products">;
  category: Omit<ICategoryResponse, "brands">;
  simpleDeductions: IProductConditions[] | [];
  variantDeductions: IVariantDeductions[] | [];
  variants: IVariants[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: Array<string>;
  canonicalUrl: string;
}

export interface IAllProductsResponse {
  products: IProductResponse[];
  page: number;
  totalPages: number;
  totalProducts: number;
}

export interface IVariants {
  _id: string;
  name: string;
  price: number;
}

export interface IProductConditions {
  // TODO: remove this 'isSelected' after Laptop Questionnaire refactoring is done
  isSelected: any;
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
  conditionLabels: IProductConditionLabels[];
}

export interface IProductConditionLabels {
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
  deductions: IProductConditions[];
}

export interface IGetAllProductsParams {
  page: number;
  limit: number;
  search: string;
  categoryId: string;
  status: string;
}

export interface IGetProductsByBrandParams {
  brandUniqueURL: string;
  search?: string;
}

export interface IProductsResponse {
  success: boolean;
  data: {
    products: IProduct[];
    pagination: {
      page: number;
      limit: number;
      totalProducts: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    filters: {
      search: string;
      categoryId: string;
      status: string;
    };
  };
}

export interface IProduct {
  _id: string;
  name: string;
  uniqueURL: string;
  image: string;
  status: "active" | "inactive";
  category: {
    id: string;
    name: string;
    image: string;
    categoryType: {
      multiVariants: boolean;
    };
  };
  brand: {
    id: string;
    name: string;
    image: string;
  };
  variants: IVariants[];
  variantDeductions: IVariantDeductions[];
}
