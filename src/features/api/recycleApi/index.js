import { baseApi } from "@features/api";

export const recycleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRecycleOrder: build.query({
      query: (recycleOrderId) => `/api/recycle/orders/${recycleOrderId}`,
      providesTags: ["Recycle"],
    }),
    getRecycleOrders: build.query({
      query: () => `/api/recycle/orders`,
      providesTags: ["Recycle"],
    }),
    createRecycleOrder: build.mutation({
      query: (data) => ({
        url: `/api/recycle/orders`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Recycle"],
    }),
    recycleOrderComplete: build.mutation({
      query: ({ recycleOrderId, data }) => ({
        url: `/api/recycle/orders/${recycleOrderId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Recycle"],
    }),
    recycleOrderCancel: build.mutation({
      query: ({ recycleOrderId, data }) => ({
        url: `/api/recycle/orders/cancel/${recycleOrderId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Recycle"],
    }),
    deleteRecycleOrder: build.mutation({
      query: (recycleOrderId) => ({
        url: `/api/recycle/orders/${recycleOrderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recycle"],
    }),
  }),
});

export const {
  useGetRecycleOrderQuery,
  useGetRecycleOrdersQuery,
  useCreateRecycleOrderMutation,
  useRecycleOrderCompleteMutation,
  useRecycleOrderCancelMutation,
  useDeleteRecycleOrderMutation,
} = recycleApi;
