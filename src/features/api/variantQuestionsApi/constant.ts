export const VARIANT_QUESTIONS_API_PATHS = {
  BASE: "/api/variant/questions",
  BY_ID: (id: string) => `/api/variant/questions/${id}`,
} as const;
