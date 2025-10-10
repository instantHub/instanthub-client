import { baseApi } from "@features/api";
import { IBrandResponse } from "./types";

export const brands = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBrand: build.query<IBrandResponse[], void>({
      query: () => `/api/brand`,
      providesTags: ["Brands"],
    }),

    getBrandsByCategory: build.query<IBrandResponse[], string>({
      query: (categoryUniqueURL) => `/api/brand/${categoryUniqueURL}`,
      providesTags: ["CreateBrands"],
    }),

    getSingleBrand: build.query<IBrandResponse, string>({
      query: (brandId) => `/api/brand/single/${brandId}`,
      providesTags: ["CreateBrands"],
    }),

    createBrand: build.mutation({
      query: (data) => ({
        url: "/api/brand/add-brand",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    uploadBrandImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/brands",
        method: "POST",
        body: data,
      }),
    }),
    updateBrand: build.mutation({
      query: ({ brandId, data }) => ({
        url: `/api/brand/update-brand/${brandId}`,
        method: "PUT",
        // credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: build.mutation({
      query: (brandId) => ({
        url: `/api/brand/delete-brand/${brandId}`,
        method: "DELETE",
        // body: data,
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
  useUploadBrandImageMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brands;
