import { baseApi } from "@features/api";
import { PRICING_API_PATHS, PRICING_API_TAG } from "./constants";
import { PROCESSOR_API_TAG } from "../processorsApi/constants";
import { IProductConditions } from "../productsApi/types";

export const pricing = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateMVPriceDrop: builder.mutation<
      any,
      {
        productId: string;
        variantInfo: { variantName: string; deductions: IProductConditions[] };
      }
    >({
      query: ({ productId, variantInfo }) => ({
        url: PRICING_API_PATHS.MV_PRICEDROP_BY_ID(productId),
        method: "PUT",
        body: variantInfo,
      }),
      invalidatesTags: [PRICING_API_TAG],
    }),

    // Update SINGLE Laptop Configuration
    updatePBSingleProductConfigPriceDrop: builder.mutation({
      query: ({ productId, simpleDeductions }) => ({
        url: PRICING_API_PATHS.PB_SINGLE_CONFIG_PRICEDROP(productId),
        method: "PUT",
        body: simpleDeductions,
      }),
    }),

    // Update ALL Laptop Configurations
    updatePBAllProductsConfigPriceDropByBrand: builder.mutation({
      query: ({ productId, brandId, simpleDeductions }) => ({
        url: PRICING_API_PATHS.PB_ALL_CONFIG_PRICEDROP_BY_BRAND(
          productId,
          brandId
        ),
        method: "PUT",
        body: simpleDeductions,
      }),
    }),

    // Update SINGLE Laptop Processor Problems
    updatePBSingleProcessorProblemsPriceDrop: builder.mutation({
      query: ({ productId, processorId, updatedDeductions }) => ({
        url: PRICING_API_PATHS.PB_SINGLE_PROCESSOR_PROBLEMS_PRICEDROP(
          productId,
          processorId
        ),
        method: "PUT",
        body: updatedDeductions,
      }),
      invalidatesTags: [PROCESSOR_API_TAG],
    }),

    // Update ALL Laptop Processor Problems
    updatePBAllProcessorsProblemsPriceDropByCategory: builder.mutation({
      query: ({ productId, categoryId, updatedDeductions }) => ({
        url: PRICING_API_PATHS.PB_ALL_PROCESSORS_PROBLEMS_PRICEDROP_BY_CATEGORY(
          productId,
          categoryId
        ),
        method: "PUT",
        body: updatedDeductions,
      }),
      invalidatesTags: [PROCESSOR_API_TAG],
    }),
  }),
});

export const {
  useUpdateMVPriceDropMutation,

  useUpdatePBSingleProductConfigPriceDropMutation,
  useUpdatePBAllProductsConfigPriceDropByBrandMutation,

  useUpdatePBSingleProcessorProblemsPriceDropMutation,
  useUpdatePBAllProcessorsProblemsPriceDropByCategoryMutation,
} = pricing;
