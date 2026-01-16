import { baseApi } from "@features/api";
import { IVQResponse } from "./types";
import {
  VARIANT_QUESTIONS_API_PATHS,
  VARIANT_QUESTIONS_API_TAG,
} from "./constant";

export const variantQuestionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleVariantQuestions: build.query<IVQResponse, string>({
      query: (variantQuestionId) =>
        VARIANT_QUESTIONS_API_PATHS.BY_ID(variantQuestionId),
      providesTags: [VARIANT_QUESTIONS_API_TAG],
    }),
    getVariantsQuestionsByCategory: build.query<IVQResponse[], string>({
      query: (categoryId) =>
        VARIANT_QUESTIONS_API_PATHS.BY_CATEGORY_ID(categoryId),
      providesTags: [VARIANT_QUESTIONS_API_TAG],
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
      invalidatesTags: [VARIANT_QUESTIONS_API_TAG],
    }),
    updateVariantQuestions: build.mutation<
      any,
      { variantQuestionsId: string; data: { deductions: any } }
    >({
      query: ({ variantQuestionsId, data }) => ({
        url: VARIANT_QUESTIONS_API_PATHS.BY_ID(variantQuestionsId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [VARIANT_QUESTIONS_API_TAG],
    }),
    deleteVariantQuestions: build.mutation({
      query: (variantQuestionsId) => ({
        url: VARIANT_QUESTIONS_API_PATHS.BY_ID(variantQuestionsId),
        method: "DELETE",
      }),
      invalidatesTags: [VARIANT_QUESTIONS_API_TAG],
    }),
  }),
});

export const {
  useGetSingleVariantQuestionsQuery,
  useLazyGetVariantsQuestionsByCategoryQuery,
  useCreateVariantQuestionsMutation,
  useUpdateVariantQuestionsMutation,
  useDeleteVariantQuestionsMutation,
} = variantQuestionsApi;
