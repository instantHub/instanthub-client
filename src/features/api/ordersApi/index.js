import { baseApi } from "@api";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrdersList: build.query({
      query: () => `/api/orders`,
      providesTags: ["Orders"],
    }),
    getOrder: build.query({
      query: (orderId) => `/api/orders/${orderId}`,
      providesTags: ["Order Detail"],
    }),
    createOrder: build.mutation({
      query: (data) => ({
        // url: "/api/orders/create-order",
        url: "/api/orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    uploadCustomerProofImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/customer-proof",
        method: "POST",
        body: data,
      }),
    }),
    orderReceived: build.mutation({
      query: (data) => ({
        // url: `/api/orders/order-received`,
        url: `/api/orders/complete`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders", "Order Detail"],
    }),
    orderCancel: build.mutation({
      query: ({ orderId, data }) => ({
        url: `/api/orders/cancel/${orderId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders", "Order Detail"],
    }),
    deleteOrder: build.mutation({
      query: (orderId) => ({
        url: `/api/orders/delete-order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    assignAgent: build.mutation({
      query: ({ orderId, data }) => ({
        url: `/api/orders/assign-agent/${orderId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Order Detail"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetOrdersListQuery,
  useCreateOrderMutation,
  useUploadCustomerProofImageMutation,
  useOrderReceivedMutation,
  useOrderCancelMutation,
  useDeleteOrderMutation,
  useAssignAgentMutation,
} = ordersApi;
