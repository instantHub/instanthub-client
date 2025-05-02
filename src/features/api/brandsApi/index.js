import { baseApi } from "@api";

export const brandsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBrand: build.query({
      query: () => `/api/brand`,
      providesTags: ["Brands"],
    }),
    getBrand: build.query({
      query: (catId) => `/api/brand/${catId}`,
      providesTags: ["CreateBrands", "Brands"],
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
  useGetBrandQuery,
  useCreateBrandMutation,
  useUploadBrandImageMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
