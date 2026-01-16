import { ICategoryResponse } from "../categories/types";
import { IProductConditions } from "../productsApi/types";

export interface IProcessorDeductionResponse {
  id: string;
  category: Pick<ICategoryResponse, "name" | "_id">;
  processorId: string;
  processorName: string;
  deductions: IProductConditions[];
}
