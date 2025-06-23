import { baseApi } from "@features/api";
import {
  ORDER_API_PATHS,
  ORDER_DETAIL_API_TAG,
  ORDERS_API_TAG,
} from "./constants";
import { IOrder, IOrdersCount } from "./types";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrdersList: build.query<IOrder[], void>({
      query: () => `${ORDER_API_PATHS.BASE}`,
      providesTags: [ORDERS_API_TAG],
    }),
    getOrdersCount: build.query<IOrdersCount, void>({
      query: () => `${ORDER_API_PATHS.BASE}/count`,
    }),
    getTodaysOrders: build.query<IOrder[], void>({
      query: () => `${ORDER_API_PATHS.BASE}/today`,
    }),
    getPendingOrders: build.query<IOrder[], void>({
      query: () => `${ORDER_API_PATHS.BASE}/pending`,
    }),
    getCompletedOrders: build.query<IOrder[], void>({
      query: () => `${ORDER_API_PATHS.BASE}/completed`,
    }),
    getCancelledOrders: build.query<IOrder[], void>({
      query: () => `${ORDER_API_PATHS.BASE}/cancelled`,
    }),
    getOrder: build.query<IOrder, void>({
      query: (orderId) => `/api/orders/${orderId}`,
      providesTags: [ORDERS_API_TAG],
    }),
    createOrder: build.mutation({
      query: (data) => ({
        // url: "/api/orders/create-order",
        url: ORDER_API_PATHS.BASE,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [ORDERS_API_TAG],
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
      invalidatesTags: [ORDERS_API_TAG, ORDER_DETAIL_API_TAG],
    }),
    orderCancel: build.mutation({
      query: ({ orderId, data }) => ({
        url: `/api/orders/cancel/${orderId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [ORDERS_API_TAG, ORDER_DETAIL_API_TAG],
    }),
    deleteOrder: build.mutation({
      query: (orderId) => ({
        url: `/api/orders/delete-order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: [ORDERS_API_TAG],
    }),
    assignAgent: build.mutation({
      query: ({ orderId, data }) => ({
        url: `/api/orders/assign-agent/${orderId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [ORDER_DETAIL_API_TAG],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetOrdersListQuery,

  useGetOrdersCountQuery,
  useLazyGetTodaysOrdersQuery,
  useLazyGetPendingOrdersQuery,
  useLazyGetCompletedOrdersQuery,
  useLazyGetCancelledOrdersQuery,

  useCreateOrderMutation,
  useUploadCustomerProofImageMutation,
  useOrderReceivedMutation,
  useOrderCancelMutation,
  useDeleteOrderMutation,
  useAssignAgentMutation,
} = ordersApi;
