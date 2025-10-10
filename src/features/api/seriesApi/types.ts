import { IBrandResponse } from "../brands/types";
import { ICategoryResponse } from "../categories/types";

export interface ISeriesResponse {
  id: string;
  name: string;
  category: Pick<ICategoryResponse, "id" | "name">;
  brand: Pick<IBrandResponse, "id" | "name">;
  products: Array<any>;
}
