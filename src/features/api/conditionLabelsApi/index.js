import { baseApi } from "@features/api";

export const conditionLabelsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getConditionLabels: build.query({
      query: () => `/api/questions/conditionlabels`,
      providesTags: ["ConditionLabels"],
    }),
    createConditionLabels: build.mutation({
      query: (data) => ({
        url: "/api/questions/add-conditionlabel",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["ConditionLabels"],
    }),
    uploadConditionLabelsImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/condition-labels",
        method: "POST",
        body: data,
      }),
    }),
    updateConditionLabel: build.mutation({
      query: ({ conditionLabelId, data }) => ({
        url: `/api/questions/update-conditionlabel/${conditionLabelId}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ["ConditionLabels"],
    }),
    deleteConditionLabel: build.mutation({
      query: ({ category, conditionLabelId }) => ({
        url: `/api/questions/delete-conditionlabel?category=${category}&conditionLabelId=${conditionLabelId}`,
        method: "DELETE",
        // body: data,
      }),
      invalidatesTags: ["ConditionLabels"],
    }),
    deleteCLImage: build.mutation({
      query: (data) => ({
        url: `/api/delete/delete-cl-image`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["ConditionLabels"],
    }),
  }),
});

export const {
  useGetConditionLabelsQuery,
  useCreateConditionLabelsMutation,
  useUploadConditionLabelsImageMutation,
  useUpdateConditionLabelMutation,
  useDeleteConditionLabelMutation,
  useDeleteCLImageMutation,
} = conditionLabelsApi;
