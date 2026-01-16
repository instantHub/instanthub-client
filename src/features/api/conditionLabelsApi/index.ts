import { baseApi } from "@features/api";
import {
  CONDITIONS_LABELS_API_PATHS,
  CONDITIONS_LABELS_API_TAG,
} from "./constants";

export const conditionLabelsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOneConditionLabel: build.query<any, string>({
      query: (conditionLabelId) =>
        CONDITIONS_LABELS_API_PATHS.BY_ID(conditionLabelId),
      providesTags: [CONDITIONS_LABELS_API_TAG],
    }),

    getConditionLabels: build.query<
      any,
      { categoryId: string; conditionId: string }
    >({
      query: ({ categoryId = undefined, conditionId = undefined }) => ({
        url: CONDITIONS_LABELS_API_PATHS.BASE,
        params: { categoryId, conditionId },
      }),

      providesTags: [CONDITIONS_LABELS_API_TAG],
    }),
    getConditionLabelsByCondition: build.query<any, { conditionId: string }>({
      query: ({ conditionId }) =>
        CONDITIONS_LABELS_API_PATHS.BY_CONDITION(conditionId),
      providesTags: [CONDITIONS_LABELS_API_TAG],
    }),
    createConditionLabels: build.mutation({
      query: (data) => ({
        url: CONDITIONS_LABELS_API_PATHS.BASE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CONDITIONS_LABELS_API_TAG],
    }),

    updateConditionLabel: build.mutation({
      query: ({ conditionLabelId, data }) => ({
        url: CONDITIONS_LABELS_API_PATHS.BY_ID(conditionLabelId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [CONDITIONS_LABELS_API_TAG],
    }),
    deleteConditionLabel: build.mutation({
      query: ({ conditionLabelId }) => ({
        url: CONDITIONS_LABELS_API_PATHS.BY_ID(conditionLabelId),
        method: "DELETE",
      }),
      invalidatesTags: [CONDITIONS_LABELS_API_TAG],
    }),
  }),
});

export const {
  useGetOneConditionLabelQuery,

  useGetConditionLabelsQuery,
  useLazyGetConditionLabelsQuery,

  useLazyGetConditionLabelsByConditionQuery,

  useCreateConditionLabelsMutation,
  useUpdateConditionLabelMutation,
  useDeleteConditionLabelMutation,
} = conditionLabelsApi;
