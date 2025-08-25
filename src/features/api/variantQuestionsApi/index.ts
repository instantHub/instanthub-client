import { baseApi } from "@features/api";
import { IVQResponse } from "./types";
import { VARIANT_QUESTIONS_API_PATHS } from "./constant";

export const variantQuestionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleVariantQuestions: build.query<IVQResponse, string>({
      query: (variantQuestionId) =>
        `${VARIANT_QUESTIONS_API_PATHS.BASE}/single/${variantQuestionId}`,
      providesTags: ["Variants Questions"],
    }),
    getVariantsQuestions: build.query<IVQResponse[], string>({
      query: (categoryId) => VARIANT_QUESTIONS_API_PATHS.BY_ID(categoryId),
      providesTags: ["Variants Questions"],
    }),
    getProductsWithDeductionsByCategory: build.query<IVQResponse[], string>({
      query: (categoryId) =>
        `${VARIANT_QUESTIONS_API_PATHS.BASE}/deductionsByCategory/${categoryId}`,
      providesTags: ["Variants Questions"],
    }),
    createVariantQuestions: build.mutation({
      query: (data) => ({
        url: VARIANT_QUESTIONS_API_PATHS.BASE,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Variants Questions"],
    }),
    updateVariantQuestions: build.mutation({
      query: ({ variantQuestionsId, data }) => ({
        url: VARIANT_QUESTIONS_API_PATHS.BY_ID(variantQuestionsId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Variants Questions"],
    }),
    deleteVariantQuestions: build.mutation({
      query: (variantQuestionsId) => ({
        url: VARIANT_QUESTIONS_API_PATHS.BY_ID(variantQuestionsId),
        method: "DELETE",
      }),
      invalidatesTags: ["Variants Questions"],
    }),

    getProductByCategory: build.query({
      query: (categoryId) => `/api/questions/single-product/${categoryId}`,
      providesTags: ["Variants Questions"],
    }),
  }),
});

export const {
  useGetSingleVariantQuestionsQuery,
  useLazyGetVariantsQuestionsQuery,
  useLazyGetProductsWithDeductionsByCategoryQuery,
  useCreateVariantQuestionsMutation,
  useUpdateVariantQuestionsMutation,
  useDeleteVariantQuestionsMutation,
  useLazyGetProductByCategoryQuery,
} = variantQuestionsApi;
