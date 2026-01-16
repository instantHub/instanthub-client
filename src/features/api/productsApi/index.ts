import { baseApi } from "@features/api";
import {
  IAllProductsResponse,
  IGetAllProductsParams,
  IGetProductsByBrandParams,
  IProductResponse,
  IProductsResponse,
  ISearchParams,
} from "./types";
import { PRODUCT_API_PATHS, PRODUCT_API_TAG } from "./constant";
import { VARIANT_QUESTIONS_API_TAG } from "../variantQuestionsApi/constant";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchProducts: build.query<IAllProductsResponse, ISearchParams>({
      query: ({ search, page = 1, limit = 10 }) => ({
        url: PRODUCT_API_PATHS.BASE,
        params: { search: search.trim(), page, limit },
      }),
      transformResponse: (response: { data: IAllProductsResponse }) =>
        response.data,
      // Keep previous results while fetching new ones
      keepUnusedDataFor: 60,
    }),

    getAllProducts: build.query<IProductsResponse, IGetAllProductsParams>({
      query: ({
        page = 1,
        limit = 20,
        search = "",
        categoryId = "",
        status = "",
      }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (search) params.append("search", search);
        if (categoryId) params.append("categoryId", categoryId);
        if (status) params.append("status", status);

        return `${PRODUCT_API_PATHS.BASE}?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.products.map(({ _id }) => ({
                type: PRODUCT_API_TAG,
                _id,
              })),
              { type: PRODUCT_API_TAG, id: "LIST" },
            ]
          : [{ type: PRODUCT_API_TAG, id: "LIST" }],
      keepUnusedDataFor: 300,
    }),

    getPendingPricing: build.query<any[], void>({
      query: () => `/api/products/check-empty-pricing`,
      providesTags: [PRODUCT_API_TAG],
    }),

    getProducts: build.query<
      Omit<IProductResponse[], "simpleDeductions" | "variantDeductions">[],
      IGetProductsByBrandParams
    >({
      query: ({ brandUniqueURL, search }) => ({
        url: `${PRODUCT_API_PATHS.BASE}/${brandUniqueURL}?search=${search}`,
      }),
      providesTags: [PRODUCT_API_TAG],
    }),

    getProductDetails: build.query<IProductResponse, string>({
      query: (productUniqueURL) =>
        PRODUCT_API_PATHS.DETAILS_UNIQUE_URL(productUniqueURL),
      providesTags: [PRODUCT_API_TAG],
    }),

    getSingleProductByCategory: build.query({
      query: (categoryId) => PRODUCT_API_PATHS.SP_BY_CATEGORYID(categoryId),
      providesTags: [VARIANT_QUESTIONS_API_TAG],
    }),

    createProduct: build.mutation({
      query: (data) => ({
        url: PRODUCT_API_PATHS.CREATE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [PRODUCT_API_TAG],
    }),
    updateProduct: build.mutation({
      query: ({ productSlug, data }) => ({
        url: PRODUCT_API_PATHS.UPDATE(productSlug),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [PRODUCT_API_TAG],
    }),

    deleteProduct: build.mutation({
      query: (productId) => ({
        url: PRODUCT_API_PATHS.DELETE(productId),
        method: "DELETE",
      }),
      invalidatesTags: [PRODUCT_API_TAG],
    }),
  }),
});

export const {
  useSearchProductsQuery,

  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,

  useGetPendingPricingQuery,

  useGetProductsQuery,
  useLazyGetProductsQuery,

  useLazyGetSingleProductByCategoryQuery,

  useGetProductDetailsQuery,
  useLazyGetProductDetailsQuery,

  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
