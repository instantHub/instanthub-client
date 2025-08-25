import { baseApi } from "@features/api";
import { IProcessorDeductionResponse } from "./type";

export const processorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProcessors: build.query({
      query: () => "/api/processors",
      providesTags: ["Processors"],
    }),
    getProcessorDeductions: build.query<IProcessorDeductionResponse, string>({
      query: (processorId) => `/api/processors/deductions/${processorId}`,
      providesTags: ["Processors"],
    }),

    // Update ALL Laptop Configurations
    updateAllLaptopConfigurations: build.mutation({
      query: ({ productId, brand, updatedProduct }) => ({
        url: `/api/questions/pricing/configurations/all?brand=${brand}`,
        method: "PUT",
        body: { productId, updatedProduct },
      }),
    }),

    // Update SINGLE Laptop Configuration
    updateSingleLaptopConfiguration: build.mutation({
      query: ({ productId, updatedProduct }) => ({
        url: `/api/questions/pricing/configurations/single/${productId}`,
        method: "PUT",
        body: { updatedProduct },
      }),
    }),

    // Update SINGLE Laptop Processor Problems
    updateSingleLaptopProcessorProblems: build.mutation({
      query: ({ updatedData }) => ({
        url: `/api/questions/pricing/problems/single`,
        method: "PUT",
        body: { updatedData },
      }),
      invalidatesTags: ["Processors"],
    }),

    // Update ALL Laptop Processor Problems
    updateAllLaptopProcessorProblems: build.mutation({
      query: ({ updatedData }) => ({
        url: `/api/questions/pricing/problems/all`,
        method: "PUT",
        body: { updatedData },
      }),
      invalidatesTags: ["Processors"],
    }),
  }),
});

export const {
  useGetAllProcessorsQuery,
  useLazyGetProcessorDeductionsQuery,
  useUpdateSingleLaptopConfigurationMutation,
  useUpdateAllLaptopConfigurationsMutation,
  useUpdateSingleLaptopProcessorProblemsMutation,
  useUpdateAllLaptopProcessorProblemsMutation,
} = processorApi;
