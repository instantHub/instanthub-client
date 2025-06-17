import { baseApi } from "@features/api";
import { CATEGORY_API_PATHS, CATEGORY_API_TAG } from "./constants";
import {
  ICategoryResponse,
  IDeleteCategory,
  ITopSellingProductsResponse,
} from "./types";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<ICategoryResponse[], void>({
      query: () => CATEGORY_API_PATHS.BASE,
      providesTags: [CATEGORY_API_TAG],
    }),

    // getCategory: build.query<ICategoryResponse, string>({
    //   query: (categoryId) => CATEGORY_API_PATHS.BY_ID(categoryId),
    //   providesTags: [CATEGORY_API_TAG],
    // }),

    getCategory: build.query<ICategoryResponse, string>({
      query: (categoryUniqueURL) => CATEGORY_API_PATHS.BY_ID(categoryUniqueURL),
      providesTags: [CATEGORY_API_TAG],
    }),

    getTopSellingProducts: build.query<ITopSellingProductsResponse[], string>({
      query: (categoryName) => CATEGORY_API_PATHS.TOP_PROD(categoryName),
      providesTags: [CATEGORY_API_TAG],
    }),

    uploadCategoryImage: build.mutation({
      query: (data) => ({
        url: CATEGORY_API_PATHS.UPLOAD,
        method: "POST",
        body: data,
      }),
    }),

    createCategory: build.mutation<ICategoryResponse, string>({
      query: (catData) => ({
        url: CATEGORY_API_PATHS.BASE,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: catData,
      }),
      invalidatesTags: [CATEGORY_API_TAG],
    }),

    updateCategory: build.mutation({
      query: ({ catId, data }) => ({
        url: CATEGORY_API_PATHS.BY_ID(catId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [CATEGORY_API_TAG],
    }),

    deleteCategory: build.mutation<IDeleteCategory, string>({
      query: (catId) => ({
        url: CATEGORY_API_PATHS.BY_ID(catId),
        method: "DELETE",
      }),
      invalidatesTags: [CATEGORY_API_TAG],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useLazyGetTopSellingProductsQuery,
  useUploadCategoryImageMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
