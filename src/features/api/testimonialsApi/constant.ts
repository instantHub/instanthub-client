export const TESTIMONIAL_API_TAG = "Testimonial";

const TESTIMONIAL_BASE_API = "/api/testimonials";

export const TESTIMONIAL_API_PATHS = {
  BASE: TESTIMONIAL_BASE_API,
  PUBLIC: `${TESTIMONIAL_BASE_API}/public`,
  BY_ID: (id: string) => `${TESTIMONIAL_BASE_API}/${id}`,
  TOGGLE_FEATURED: (id: string) =>
    `${TESTIMONIAL_BASE_API}/${id}/toggle-status`,
  TOGGLE_STATUS: (id: string) =>
    `${TESTIMONIAL_BASE_API}/${id}/toggle-featured`,
} as const;
