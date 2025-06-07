import { IBrandLite } from "../brandsApi/types";

export interface ICategoryResponse {
  id: string;
  name: string;
  image: string;
  uniqueURL: string;
  brands: IBrandLite[];
  categoryType: ICategoryType;
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
