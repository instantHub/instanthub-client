import { baseApi } from "@features/api";
import { SLIDERS_API_PATHS, SLIDERS_API_TAG } from "./constants";
import { ISlider } from "./types";

export const slidersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all active sliders
    getActiveSlidersList: build.query<ISlider[], void>({
      query: () => SLIDERS_API_PATHS.ACTIVE_SLIDERS,
      providesTags: [SLIDERS_API_TAG],
    }),

    // GET all sliders
    getAllSliders: build.query<ISlider[], void>({
      query: () => SLIDERS_API_PATHS.BASE,
      providesTags: [SLIDERS_API_TAG],
    }),

    // GET a single slider by its ID
    getSliderById: build.query<ISlider, string>({
      query: (sliderId) => SLIDERS_API_PATHS.BY_ID(sliderId),
      providesTags: [SLIDERS_API_TAG],
    }),

    // POST to create a new slider
    createSlider: build.mutation<any, FormData>({
      query: (formData) => ({
        url: SLIDERS_API_PATHS.BASE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [SLIDERS_API_TAG],
    }),

    // PUT to update a slider
    updateSlider: build.mutation<any, { sliderId: string; data: FormData }>({
      query: ({ sliderId, data }) => ({
        url: SLIDERS_API_PATHS.BY_ID(sliderId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [SLIDERS_API_TAG],
    }),

    // DELETE a slider
    deleteSlider: build.mutation<{ message: string }, string>({
      query: (sliderId) => ({
        url: SLIDERS_API_PATHS.BY_ID(sliderId),
        method: "DELETE",
      }),
      invalidatesTags: [SLIDERS_API_TAG],
    }),
  }),
});

// Export hooks for use in your components
export const {
  useGetActiveSlidersListQuery,
  useGetAllSlidersQuery,
  useGetSliderByIdQuery, // New hook
  useCreateSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = slidersApi;
