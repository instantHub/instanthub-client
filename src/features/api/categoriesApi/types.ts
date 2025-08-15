import { IBrandLite } from "../brandsApi/types";
import { IProductResponse } from "../productsApi/types";

export interface ICategoryResponse {
  id: string;
  name: string;
  image: string;
  uniqueURL: string;
  brands: IBrandLite[];
  categoryType: ICategoryType;
  // Add SEO fields
  metaTitle: string;
  metaDescription: string;
  metaKeywords: Array<string>;
  canonicalUrl: string;
}

export interface ICategoryType {
  multiVariants: boolean;
  processorBased: boolean;
  simple: boolean;
}

export interface ICreateCategoryRequest {
  name: string;
  description?: string;
}

export interface IUpdateCategoryRequest {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface IDeleteCategory {
  DeletedCategory: ICategoryResponse;
  message: string;
}

export interface ITopSellingProductsResponse {
  productId: IProductResponse;
}

// [
//   { productId: IProductResponse },
//   { productId: IProductResponse },
//   { productId: IProductResponse },
// ];
