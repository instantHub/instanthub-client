export const CATEGORY_API_TAG = "Categories";

export const CATEGORY_API_PATHS = {
  BASE: "/api/category",
  BY_ID: (id: string) => `/api/category/${id}`,
  TOP_PROD: (name: string) => `/api/category/top-products/${name}`,
} as const;
