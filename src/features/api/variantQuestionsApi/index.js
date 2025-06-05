import { baseApi } from "@features/api";

export const variantQuestionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getVariantsQuestions: build.query({
      query: () => `/api/questions/variants-questions`,
      providesTags: ["Variants Questions"],
    }),
    createVariantQuestions: build.mutation({
      query: (data) => ({
        url: "/api/questions/add-variant-questions",
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
        url: `/api/questions/update-variant-questions/${variantQuestionsId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Variants Questions"],
    }),
    deleteVariantQuestions: build.mutation({
      query: (variantQuestionsId) => ({
        url: `/api/questions/delete-variant-questions/${variantQuestionsId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Variants Questions"],
    }),

    getSingleProduct: build.query({
      query: () => `/api/questions/single-product`,
      providesTags: ["Variants Questions"],
    }),
  }),
});

export const {
  useGetVariantsQuestionsQuery,
  useCreateVariantQuestionsMutation,
  useUpdateVariantQuestionsMutation,
  useDeleteVariantQuestionsMutation,
  useGetSingleProductQuery,
} = variantQuestionsApi;
