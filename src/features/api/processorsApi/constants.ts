export const PROCESSOR_API_TAG = "Processors";

const PROCESSOR_BASE_ENDPOINTS = "/api/processor";

export const PROCESSOR_API_PATHS = {
  BASE: PROCESSOR_BASE_ENDPOINTS,
  DEDUCTIONS_BY_ID: (processorId: string) =>
    `${PROCESSOR_BASE_ENDPOINTS}/${processorId}/deductions`,

  PB_SINGLE_CONFIG_PRICEDROP: (productId: string) =>
    `${PROCESSOR_BASE_ENDPOINTS}/${productId}/pricing/pb/single/config/pricedrop`,
} as const;
