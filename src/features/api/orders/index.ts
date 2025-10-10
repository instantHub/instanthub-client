import { baseApi } from "@features/api";
import {
  ORDER_API_PATHS,
  ORDER_DETAIL_API_TAG,
  ORDERS_API_TAG,
} from "./constants";
import { IOrder, IOrdersCount, IRescheduleOrderArgs } from "./types";
import { EXECUTIVE_ORDER_API_TAG } from "../executive/constants";

export const orders = baseApi.injectEndpoints({
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

    getOrderDetail: build.query<IOrder, { orderId: string }>({
      query: ({ orderId }) => `/api/orders/${orderId}`,
      providesTags: [ORDER_DETAIL_API_TAG],
      // providesTags: (result, error, id) => [{ type: "Order", id }],
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

    // TODO: we have replaced this in BE, remove this after everything goes well
    uploadCustomerProofImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/customer-proof",
        method: "POST",
        body: data,
      }),
    }),

    completeOrder: build.mutation({
      query: (data) => ({
        url: `/api/orders/complete-order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        ORDERS_API_TAG,
        ORDER_DETAIL_API_TAG,
        EXECUTIVE_ORDER_API_TAG,
      ],
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

    rescheduleOrder: build.mutation<IOrder, IRescheduleOrderArgs>({
      query: ({ id, body }) => ({
        url: `/api/orders/${id}/reschedule`,
        method: "PUT",
        body,
      }),

      invalidatesTags: [ORDER_DETAIL_API_TAG],
    }),
  }),
});

export const {
  useGetOrderDetailQuery,
  useGetOrdersListQuery,

  useGetOrdersCountQuery,
  useLazyGetTodaysOrdersQuery,
  useLazyGetPendingOrdersQuery,
  useLazyGetCompletedOrdersQuery,
  useLazyGetCancelledOrdersQuery,
  useRescheduleOrderMutation,

  useCompleteOrderMutation,

  useCreateOrderMutation,
  useOrderCancelMutation,
  useDeleteOrderMutation,
  useUploadCustomerProofImageMutation,
} = orders;
