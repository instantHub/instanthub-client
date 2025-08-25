import { IConditions } from "../productsApi/types";

export type TOperation = "Add" | "Subtrack";

export interface IVQResponse {
  _id: string;
  name: string;
  category: string;
  deductions: IConditions[];
}
