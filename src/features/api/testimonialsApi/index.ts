import { baseApi } from "@features/api";
import { TESTIMONIAL_API_PATHS, TESTIMONIAL_API_TAG } from "./constant";
import { ITestimonial, ITestimonialResponse } from "./types";

export const testimonialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTestimonials: build.query<
      ITestimonialResponse,
      { page: number; limit: number; search: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `${TESTIMONIAL_API_PATHS.BASE}?page=${page}&limit=${limit}&search=${search}`,
      providesTags: [TESTIMONIAL_API_TAG],
    }),
    getPublicTestimonials: build.query<ITestimonial[], string>({
      query: () => TESTIMONIAL_API_PATHS.PUBLIC,
      providesTags: [TESTIMONIAL_API_TAG],
    }),
    getSingleTestimonial: build.query({
      query: (id) => TESTIMONIAL_API_PATHS.BY_ID(id),
      providesTags: [TESTIMONIAL_API_TAG],
    }),
    createTestimonial: build.mutation({
      query: (data) => ({
        url: TESTIMONIAL_API_PATHS.BASE,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [TESTIMONIAL_API_TAG],
    }),
    updateTestimonial: build.mutation({
      query: ({ id, data }) => ({
        url: TESTIMONIAL_API_PATHS.BY_ID(id),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [TESTIMONIAL_API_TAG],
    }),
    deleteTestimonial: build.mutation({
      query: (id) => ({
        url: TESTIMONIAL_API_PATHS.BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: [TESTIMONIAL_API_TAG],
    }),
    toggleTestimonialStatus: build.mutation({
      query: ({ id }) => ({
        url: TESTIMONIAL_API_PATHS.TOGGLE_STATUS(id),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [TESTIMONIAL_API_TAG],
    }),
    toggleTestimonialFeatured: build.mutation({
      query: ({ id }) => ({
        url: TESTIMONIAL_API_PATHS.TOGGLE_FEATURED(id),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [TESTIMONIAL_API_TAG],
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useLazyGetTestimonialsQuery,
  useGetPublicTestimonialsQuery,
  useGetSingleTestimonialQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useToggleTestimonialStatusMutation,
  useToggleTestimonialFeaturedMutation,
} = testimonialApi;
