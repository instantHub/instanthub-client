import { baseApi } from "@features/api";
import { IProcessorDeductionResponse } from "./type";
import { PROCESSOR_API_PATHS } from "./constants";

export const processorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProcessorDeductions: build.query<IProcessorDeductionResponse, string>({
      query: (processorId) => PROCESSOR_API_PATHS.DEDUCTIONS_BY_ID(processorId),
      providesTags: ["Processors"],
    }),
  }),
});

export const { useLazyGetProcessorDeductionsQuery } = processorApi;
