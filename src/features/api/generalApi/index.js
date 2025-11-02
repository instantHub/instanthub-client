import { baseApi } from "@features/api";

export const generalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteImage: build.mutation({
      query: (data) => ({
        url: `/api/delete/delete-image`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const { useDeleteImageMutation } = generalApi;
