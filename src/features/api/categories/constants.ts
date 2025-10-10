export const CATEGORY_API_TAG = "Categories";

export const CATEGORY_API_PATHS = {
  BASE: "/api/category",
  UPLOAD: "/api/upload/categories",
  BY_ID: (id: string) => `/api/category/${id}`,
  TOP_PROD: (name: string) => `/api/category/top-products/${name}`,
} as const;
