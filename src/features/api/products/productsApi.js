import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  }),
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  endpoints: (build) => ({
    // Products
    getAllProducts: build.query({
      query: ({ page, limit, search, categoryId }) => ({
        url: `/api/products`,
        method: "GET",
        params: { page, limit, search, categoryId },
      }),
      providesTags: ["Products"],
    }),
    getProducts: build.query({
      query: ({ brandId, search }) => ({
        url: `/api/products/${brandId}?search=${search}`,
      }),
      providesTags: ["Products"],
    }),
    getProductDetails: build.query({
      query: (prodId) => `/api/products/product-details/${prodId}`,
      providesTags: ["Products"],
    }),
    getProductQuestions: build.query({
      query: (prodId) => `/api/products/product/product-questions/${prodId}`,
      providesTags: ["Products"],
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: "/api/products/add-product",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      providesTags: ["Products"],
    }),
    uploadProductImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/products",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ productId, data }) => ({
        url: `/api/products/update-product/${productId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    updatePriceDrop: build.mutation({
      query: ({ productId, data }) => ({
        url: `/api/products/update-pricedrop/${productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (productId) => ({
        url: `/api/products/delete-product/${productId}`,
        method: "DELETE",
        // body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductQuestionsQuery,
  useCreateProductMutation,
  useUploadProductImageMutation,
  useUpdateProductMutation,
  useUpdatePriceDropMutation,
  useDeleteProductMutation,
} = productsApi;
