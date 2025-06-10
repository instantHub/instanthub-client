import { ICategoryResponse } from "../categoriesApi/types";

export interface IBrandResponse {
  id: string;
  name: string;
  image: string;
  uniqueURL: string;
  series: Array<Object>;
  products: Array<string>;
  category: ICategoryResponse;
}

export type IBrandLite = Pick<IBrandResponse, "id" | "name">;
