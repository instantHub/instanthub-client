import { PRODUCT_API_PATHS } from "../productsApi/constant";

export const PRICING_API_TAG = "Pricing";

const PRICING_BASE_ENDPOINTS = "/api/pricing";

export const PRICING_API_PATHS = {
  BASE: PRICING_BASE_ENDPOINTS,
  MV_PRICEDROP_BY_ID: (productId: string) =>
    `${PRODUCT_API_PATHS.BASE}/${productId}/pricing/mv/pricedrop`,

  PB_SINGLE_CONFIG_PRICEDROP: (productId: string) =>
    `${PRODUCT_API_PATHS.BASE}/${productId}/pricing/pb/single/config/pricedrop`,
  PB_ALL_CONFIG_PRICEDROP_BY_BRAND: (productId: string, brandId: string) =>
    `${PRODUCT_API_PATHS.BASE}/${productId}/pricing/pb/all/config/brand/${brandId}/products/pricedrop`,

  PB_SINGLE_PROCESSOR_PROBLEMS_PRICEDROP: (
    productId: string,
    // categoryId: string,
    processorId: string
  ) =>
    `${PRODUCT_API_PATHS.BASE}/${productId}/pricing/pb/single/processor/${processorId}/problems/pricedrop`,
  PB_ALL_PROCESSORS_PROBLEMS_PRICEDROP_BY_CATEGORY: (
    productId: string,
    categoryId: string
  ) =>
    `${PRODUCT_API_PATHS.BASE}/${productId}/pricing/pb/all/processors/problems/category/${categoryId}/problems/pricedrop`,
} as const;
