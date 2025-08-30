import { IBrandResponse } from "../brandsApi/types";
import { ICategoryResponse } from "../categoriesApi/types";

export interface ISeriesResponse {
  id: string;
  name: string;
  category: Pick<ICategoryResponse, "id" | "name">;
  brand: Pick<IBrandResponse, "id" | "name">;
  products: Array<any>;
}
