import { baseApi } from "@features/api";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => "/api/category",
      providesTags: ["Categories"],
    }),
    getCategory: build.query({
      query: (categoryId) => `/api/category/${categoryId}`,
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
        url: `api/category`,
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
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUploadCategoryImageMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
