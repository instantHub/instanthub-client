import { baseApi } from "@features/api";

// Define the types for your data for type safety and autocompletion
export type SliderStatus = "Active" | "Block";

export interface Slider {
  id: string; // Or _id if you use MongoDB's default
  image: string;
  status: SliderStatus;
  createdAt?: string; // Optional timestamp
  updatedAt?: string; // Optional timestamp
}

// A generic response type for mutations that return a message
export interface MutationResponse {
  message: string;
  slider?: Slider;
}

export const slidersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all active sliders
    getActiveSlidersList: build.query<Slider[], void>({
      query: () => `/api/sliders/active-sliders`,
      providesTags: ["Sliders"],
    }),

    // GET all sliders
    getAllSliders: build.query<Slider[], void>({
      query: () => `/api/sliders/all-sliders`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Sliders" as const, id })),
              "Sliders",
            ]
          : ["Sliders"],
    }),

    // GET a single slider by its ID
    getSliderById: build.query<Slider, string>({
      query: (sliderId) => `/api/sliders/${sliderId}`,
      providesTags: (result, error, id) => [{ type: "Sliders", id }],
    }),

    // POST to create a new slider
    createSlider: build.mutation<MutationResponse, FormData>({
      query: (formData) => ({
        url: "/api/sliders/create-slider",
        method: "POST",
        body: formData, // Browser will set Content-Type automatically for FormData
      }),
      invalidatesTags: ["Sliders"],
    }),

    // PUT to update a slider
    updateSlider: build.mutation<
      MutationResponse,
      { sliderId: string; data: FormData }
    >({
      query: ({ sliderId, data }) => ({
        url: `/api/sliders/update-slider/${sliderId}`,
        method: "PUT",
        body: data, // Browser handles Content-Type for FormData
      }),
      // Invalidate the specific slider tag and the general list tag
      invalidatesTags: (result, error, { sliderId }) => [
        { type: "Sliders", id: sliderId },
        "Sliders",
      ],
    }),

    // DELETE a slider
    deleteSlider: build.mutation<{ message: string }, string>({
      query: (sliderId) => ({
        url: `/api/sliders/delete-slider/${sliderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sliders"],
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
