import { baseApi } from "@api";

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
    dashboardDetails: build.query({
      query: () => "/api/admin/dashboard",
    }),
  }),
});

export const { useDeleteImageMutation, useDashboardDetailsQuery } = generalApi;
