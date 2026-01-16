import { baseApi } from "@features/api";
import { CONDITIONS_API_PATHS, CONDITIONS_API_TAG } from "./constants";
import { ICondition } from "./types";

export const conditionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOneCondition: build.query<ICondition, string>({
      query: (conditionId) => CONDITIONS_API_PATHS.BY_ID(conditionId),
      providesTags: [CONDITIONS_API_TAG],
    }),
    getConditions: build.query<ICondition[], string | void>({
      query: (categoryId) => ({
        url: CONDITIONS_API_PATHS.BASE,
        params: categoryId ? { categoryId } : undefined,
      }),
      providesTags: [CONDITIONS_API_TAG],
    }),
    createConditions: build.mutation({
      query: (data) => ({
        url: CONDITIONS_API_PATHS.BASE,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [CONDITIONS_API_TAG],
    }),
    updateCondition: build.mutation({
      query: ({ conditionId, data }) => ({
        url: CONDITIONS_API_PATHS.BY_ID(conditionId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [CONDITIONS_API_TAG],
    }),
    deleteCondition: build.mutation({
      query: ({ conditionId }) => ({
        // url: `/api/questions/delete-condition?category=${category}&conditionId=${conditionId}`,
        url: CONDITIONS_API_PATHS.BY_ID(conditionId),
        method: "DELETE",
      }),
      invalidatesTags: [CONDITIONS_API_TAG],
    }),
  }),
});

export const {
  useGetOneConditionQuery,
  useGetConditionsQuery,
  useLazyGetConditionsQuery,
  useCreateConditionsMutation,
  useUpdateConditionMutation,
  useDeleteConditionMutation,
} = conditionsApi;
