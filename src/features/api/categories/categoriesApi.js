import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  }),
  reducerPath: "categoriesApi",
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    // Categories
    getCategory: build.query({
      query: () => "/api/category",
      providesTags: ["Categories"],
    }),
    uploadCategoryImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/categories",
        method: "POST",
        body: data,
      }),
    }),
    createCategory: build.mutation({
      query: (catData) => ({
        url: `api/category/add-category`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: catData,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: build.mutation({
      query: ({ catId, data }) => ({
        url: `/api/category/update-category/${catId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: build.mutation({
      query: (catId) => ({
        url: `/api/category/delete-category/${catId}`,
        method: "DELETE",
        // body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useUploadCategoryImageMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
