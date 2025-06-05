import { baseApi } from "@features/api";

export const seriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSeries: build.query({
      query: () => `/api/series`,
      providesTags: ["Series"],
    }),
    getBrandSeries: build.query({
      query: (brandUniqueURL) => `/api/series/${brandUniqueURL}`,
      // providesTags: ["Brands"],
      providesTags: ["Series"],
    }),
    createSeries: build.mutation({
      query: (data) => ({
        url: "/api/series/create-series",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Series"],
    }),
    updateSeries: build.mutation({
      query: ({ seriesId, data }) => ({
        url: `/api/series/update-series/${seriesId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Series"],
    }),
    deleteSeries: build.mutation({
      query: (seriesId) => ({
        url: `/api/series/delete-series/${seriesId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Series"],
    }),
  }),
});

export const {
  useGetAllSeriesQuery,
  useGetBrandSeriesQuery,
  useCreateSeriesMutation,
  useUpdateSeriesMutation,
  useDeleteSeriesMutation,
} = seriesApi;
