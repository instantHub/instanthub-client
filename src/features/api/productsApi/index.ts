import { baseApi } from "@features/api";
import {
  IAllProductsResponse,
  IGetAllProductsParams,
  IGetProductsByBrandParams,
  IProductResponse,
  ISearchParams,
} from "./types";

export const productsURL = "/api/products";

interface Service {
  name: string;
  uniqueURL: string;
}

interface ServiceResponse {
  services: Service[];
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchProducts: build.query<IAllProductsResponse, ISearchParams>({
      query: ({ search, page = 1, limit = 10 }) => ({
        url: "/api/products",
        params: { search: search.trim(), page, limit },
      }),
      // Keep previous results while fetching new ones
      keepUnusedDataFor: 60,
    }),
    searchServices: build.query<ServiceResponse, ISearchParams>({
      query: ({ search, page = 1, limit = 10 }) => ({
        url: "/services",
        params: { search: search.trim(), page, limit },
      }),
      keepUnusedDataFor: 60,
    }),
    getAllProducts: build.query<IAllProductsResponse, IGetAllProductsParams>({
      query: ({ page, limit, search, categoryId }) => ({
        url: productsURL,
        method: "GET",
        params: { page, limit, search, categoryId },
      }),
      providesTags: ["Products"],
    }),
    getProducts: build.query<
      Omit<IProductResponse[], "simpleDeductions" | "variantDeductions">[],
      IGetProductsByBrandParams
    >({
      query: ({ brandUniqueURL, search }) => ({
        url: `/api/products/${brandUniqueURL}?search=${search}`,
      }),
      providesTags: ["Products"],
    }),

    getProductDetails: build.query<IProductResponse, string>({
      query: (productUniqueURL) =>
        `/api/products/product-details/${productUniqueURL}`,
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
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/products",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ productSlug, data }) => ({
        url: `/api/products/update-product/${productSlug}`,
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

    updateLaptopConfigurationsPriceDrop: build.mutation({
      query: ({ productId, data, type, brand }) => ({
        url: `/api/products/updateLaptopConfigurationsPriceDrop/${productId}?type=${type}&brand=${brand}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useSearchProductsQuery,
  useSearchServicesQuery,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductDetailsQuery,
  useLazyGetProductDetailsQuery,
  useGetProductQuestionsQuery,
  useCreateProductMutation,
  useUploadProductImageMutation,
  useUpdateProductMutation,
  useUpdatePriceDropMutation,
  useDeleteProductMutation,
  useUpdateLaptopConfigurationsPriceDropMutation,
} = productsApi;
