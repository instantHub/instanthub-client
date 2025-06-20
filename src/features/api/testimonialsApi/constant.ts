export const TESTIMONIAL_API_TAG = "Testimonial";

export const TESTIMONIAL_API_PATHS = {
  BASE: "/api/testimonial",
  PUBLIC: "/api/testimonial/public",
  BY_ID: (id: string) => `/api/testimonial/${id}`,
  TOGGLE_FEATURED: (id: string) => `/api/testimonial/${id}/toggle-status`,
  TOGGLE_STATUS: (id: string) => `/api/testimonial/${id}/toggle-featured`,
} as const;
