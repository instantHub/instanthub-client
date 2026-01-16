import { baseApi } from "@features/api";
import { IBrandResponse } from "./types";
import { BRAND_API_PATHS } from "./constants";

export const brands = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBrand: build.query<IBrandResponse[], void>({
      query: () => BRAND_API_PATHS.BASE,
      providesTags: ["Brands"],
    }),

    getBrandsByCategory: build.query<IBrandResponse[], string>({
      query: (categoryUniqueURL) =>
        BRAND_API_PATHS.BY_CATEGORY(categoryUniqueURL),
      providesTags: ["CreateBrands"],
    }),

    getSingleBrand: build.query<IBrandResponse, string>({
      query: (brandId) => BRAND_API_PATHS.BY_ID(brandId),
      providesTags: ["CreateBrands"],
    }),

    createBrand: build.mutation({
      query: (data) => ({
        url: BRAND_API_PATHS.BASE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),

    updateBrand: build.mutation({
      query: ({ brandId, data }) => ({
        url: BRAND_API_PATHS.BY_ID(brandId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: build.mutation({
      query: (brandId) => ({
        url: BRAND_API_PATHS.BY_ID(brandId),
        method: "DELETE",
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useGetAllBrandQuery,
  useGetBrandsByCategoryQuery,
  useLazyGetBrandsByCategoryQuery,
  useGetSingleBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brands;
