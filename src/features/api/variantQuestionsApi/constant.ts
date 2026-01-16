export const VARIANT_QUESTIONS_API_TAG = "Variants Questions";

export const VARIANT_QUESTIONS_API_PATHS = {
  BASE: "/api/variant/questions",
  BY_ID: (id: string) => `/api/variant/questions/${id}`,
  BY_CATEGORY_ID: (categoryId: string) =>
    `/api/variant/questions/${categoryId}/by-category`,
} as const;
