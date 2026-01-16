import { IBrandResponse } from "../brands/types";
import { ICategoryResponse } from "../categories/types";

export interface ISeriesResponse {
  _id: string;
  name: string;
  category: Pick<ICategoryResponse, "_id" | "name">;
  brand: Pick<IBrandResponse, "_id" | "name">;
  products: Array<any>;
}
