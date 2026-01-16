export const CONDITIONS_API_TAG = "Conditions";

const CONDITIONS_BASE_API = "/api/questions/conditions";

export const CONDITIONS_API_PATHS = {
  BASE: CONDITIONS_BASE_API,
  BY_ID: (id: string) => `${CONDITIONS_BASE_API}/${id}`,
  BY_CATEGORY: (categoryId: string) =>
    `${CONDITIONS_BASE_API}/category/${categoryId}`,
} as const;
