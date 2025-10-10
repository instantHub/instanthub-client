import { ICategoryResponse } from "../categories/types";
import { IConditions } from "../productsApi/types";

export interface IProcessorDeductionResponse {
  id: string;
  category: Pick<ICategoryResponse, "name" | "id">;
  processorId: string;
  processorName: string;
  deductions: IConditions[];
}
