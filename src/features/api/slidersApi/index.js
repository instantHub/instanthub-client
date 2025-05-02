import { baseApi } from "@api";

export const slidersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveSlidersList: build.query({
      query: () => `/api/sliders/active-sliders`,
      providesTags: ["Sliders"],
    }),
    getAllSliders: build.query({
      query: () => `/api/sliders/all-sliders`,
      providesTags: ["Sliders"],
    }),
    createSlider: build.mutation({
      query: (data) => ({
        url: "/api/sliders/create-slider",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Sliders"],
    }),
    uploadSliderImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/sliders",
        method: "POST",
        body: data,
      }),
    }),
    updateSlider: build.mutation({
      query: ({ sliderId, data }) => ({
        url: `/api/sliders/update-slider/${sliderId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Sliders"],
    }),
    deleteSlider: build.mutation({
      query: (sliderId) => ({
        url: `/api/sliders/delete-slider/${sliderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sliders"],
    }),
  }),
});

export const {
  useGetActiveSlidersListQuery,
  useGetAllSlidersQuery,
  useCreateSliderMutation,
  useUploadSliderImageMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = slidersApi;
