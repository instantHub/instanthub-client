export const BRAND_API_TAG = "Brands";

export const BRAND_API_PATHS = {
  BASE: "/api/brand",
  BY_ID: (id: string) => `/api/brand/${id}`,
  BY_CATEGORY: (categoryUniqueURL: string) =>
    `/api/brand/category/${categoryUniqueURL}`,
} as const;
