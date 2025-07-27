import { baseApi } from "@features/api";
import { IServiceBrand, IServiceCategory, IServiceProblem } from "./types";
import {
  SERVICE_API_PATHS,
  SERVICE_BRAND_API_TAG,
  SERVICE_CATEGORY_API_TAG,
  SERVICE_PROBLEM_API_TAG,
} from "./constants";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Category
    getServiceCategories: build.query<IServiceCategory[], void>({
      query: () => SERVICE_API_PATHS.CATEGORY,
      providesTags: [SERVICE_CATEGORY_API_TAG],
    }),
    createServiceCategory: build.mutation<
      IServiceCategory,
      Partial<IServiceCategory>
    >({
      query: (body) => ({
        url: SERVICE_API_PATHS.CATEGORY,
        method: "POST",
        body,
      }),
      invalidatesTags: [SERVICE_CATEGORY_API_TAG],
    }),
    updateServiceCategory: build.mutation<
      IServiceCategory,
      { id: string; body: Partial<IServiceCategory> }
    >({
      query: ({ id, body }) => ({
        url: SERVICE_API_PATHS.CATEGORY_BY_ID(id),
        method: "PUT",
        body,
      }),
      invalidatesTags: [SERVICE_CATEGORY_API_TAG],
    }),
    deleteServiceCategory: build.mutation<void, string>({
      query: (id) => ({
        url: SERVICE_API_PATHS.CATEGORY_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: [SERVICE_CATEGORY_API_TAG],
    }),

    // Brand
    getServiceBrands: build.query<IServiceBrand[], void>({
      query: () => SERVICE_API_PATHS.BRAND,
      providesTags: [SERVICE_BRAND_API_TAG],
    }),

    getServiceBrandByCategory: build.query<IServiceBrand[], string>({
      query: (id) => SERVICE_API_PATHS.BRAND_BY_CAT(id),
      providesTags: [SERVICE_BRAND_API_TAG],
    }),

    createServiceBrand: build.mutation<IServiceBrand, Partial<IServiceBrand>>({
      query: (body) => ({ url: SERVICE_API_PATHS.BRAND, method: "POST", body }),
      invalidatesTags: [SERVICE_BRAND_API_TAG],
    }),
    updateServiceBrand: build.mutation<
      IServiceBrand,
      { id: string; body: Partial<IServiceBrand> }
    >({
      query: ({ id, body }) => ({
        url: SERVICE_API_PATHS.BRAND_BY_ID(id),
        method: "PUT",
        body,
      }),
      invalidatesTags: [SERVICE_BRAND_API_TAG],
    }),
    deleteServiceBrand: build.mutation<void, string>({
      query: (id) => ({
        url: SERVICE_API_PATHS.BRAND_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: [SERVICE_BRAND_API_TAG],
    }),

    // Problem
    getServiceProblemsByCategory: build.query<IServiceProblem[], string>({
      query: (id) => SERVICE_API_PATHS.PROBLEM_BY_CAT(id),
      providesTags: [SERVICE_PROBLEM_API_TAG],
    }),
    createServiceProblem: build.mutation<
      IServiceProblem,
      Partial<IServiceProblem>
    >({
      query: (body) => ({
        url: SERVICE_API_PATHS.PROBLEM,
        method: "POST",
        body,
      }),
      invalidatesTags: [SERVICE_PROBLEM_API_TAG],
    }),
    updateServiceProblem: build.mutation<
      IServiceProblem,
      { id: string; body: Partial<IServiceProblem> }
    >({
      query: ({ id, body }) => ({
        url: SERVICE_API_PATHS.PROBLEM_BY_ID(id),
        method: "PUT",
        body,
      }),
      invalidatesTags: [SERVICE_PROBLEM_API_TAG],
    }),
    deleteServiceProblem: build.mutation<void, string>({
      query: (id) => ({
        url: SERVICE_API_PATHS.PROBLEM_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: [SERVICE_PROBLEM_API_TAG],
    }),

    // Upload
    uploadServiceImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/services",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetServiceCategoriesQuery,
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
  useGetServiceBrandsQuery,
  useLazyGetServiceBrandByCategoryQuery,
  useCreateServiceBrandMutation,
  useUpdateServiceBrandMutation,
  useDeleteServiceBrandMutation,
  useLazyGetServiceProblemsByCategoryQuery,
  useCreateServiceProblemMutation,
  useUpdateServiceProblemMutation,
  useDeleteServiceProblemMutation,
  useUploadServiceImageMutation,
} = serviceApi;
