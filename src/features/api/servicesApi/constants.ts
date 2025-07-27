export const SERVICE_CATEGORY_API_TAG = "ServiceCategory";
export const SERVICE_BRAND_API_TAG = "ServiceBrand";
export const SERVICE_PROBLEM_API_TAG = "ServiceProblem";

export const SERVICE_API_PATHS = {
  BASE: "/api/services",
  CATEGORY: "/api/services/categories",
  CATEGORY_BY_ID: (id: string) => `/api/services/categories/${id}`,
  BRAND: "/api/services/brands",
  BRAND_BY_ID: (id: string) => `/api/services/brands/${id}`,
  BRAND_BY_CAT: (id: string) => `/api/services/brands/category/${id}`,
  PROBLEM: "/api/services/problems",
  PROBLEM_BY_ID: (id: string) => `/api/services/problems/${id}`,
  PROBLEM_BY_CAT: (id: string) => `/api/services/problems/category/${id}`,
} as const;
