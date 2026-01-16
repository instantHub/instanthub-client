export const SLIDERS_API_TAG = "Sliders";

const BASE_API_PATH = "/api/sliders";

export const SLIDERS_API_PATHS = {
  BASE: BASE_API_PATH,
  ACTIVE_SLIDERS: `${BASE_API_PATH}/active`,
  BY_ID: (id: string) => `${BASE_API_PATH}/${id}`,
} as const;
