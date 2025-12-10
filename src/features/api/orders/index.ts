import { baseApi } from "@features/api";
import {
  ORDER_API_PATHS,
  ORDER_DETAIL_API_TAG,
  ORDER_STATS_API_TAG,
  ORDERS_API_TAG,
} from "./constants";
import {
  IApiResponse,
  IAssignmentStatus,
  IGetOrdersByStatusParams,
  IOrder,
  IOrdersCount,
  IOrdersResponse,
  IOrderStats,
  IRescheduleOrderArgs,
} from "./types";
import { EXECUTIVE_ORDER_API_TAG } from "../executive/constants";
import { IPartner } from "../partners/types";

export const orders = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderDetail: build.query<IOrder, { orderId: string }>({
      query: ({ orderId }) => `/api/orders/${orderId}/order-details`,
      providesTags: [ORDER_DETAIL_API_TAG],
      // providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    createOrder: build.mutation({
      query: (data) => ({
        url: ORDER_API_PATHS.BASE,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [ORDERS_API_TAG],
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

    orderReopen: build.mutation<IOrder, { id: string }>({
      query: ({ id }) => ({
        url: `/api/orders/${id}/reopen`,
        method: "PUT",
      }),

      invalidatesTags: [ORDER_DETAIL_API_TAG],
    }),

    rescheduleOrder: build.mutation<IOrder, IRescheduleOrderArgs>({
      query: ({ id, body }) => ({
        url: `/api/orders/${id}/reschedule`,
        method: "PUT",
        body,
      }),

      invalidatesTags: [ORDER_DETAIL_API_TAG],
    }),

    // Get order statistics
    getOrderStats: build.query<IOrderStats, void>({
      query: () => "/api/orders/stats",
      transformResponse: (response: IApiResponse<IOrderStats>) => response.data,
      providesTags: [ORDER_STATS_API_TAG],
      // Refetch on mount and focus
      keepUnusedDataFor: 60, // Cache for 60 seconds
    }),

    // Get orders by status with filtering
    getOrdersByStatus: build.query<IOrdersResponse, IGetOrdersByStatusParams>({
      query: ({
        status,
        dateFilter,
        page = 1,
        limit = 20,
        location,
        sortBy = "createdAt",
        order = "desc",
        search,
      }) => {
        const params = new URLSearchParams({
          status,
          location: location || "all",
          page: page.toString(),
          limit: limit.toString(),
          sortBy,
          order,
          search,
        });

        if (dateFilter) {
          params.append("dateFilter", dateFilter);
        }

        return `/api/orders/by-status?${params.toString()}`;
      },
      transformResponse: (response: IApiResponse<IOrdersResponse>) =>
        response.data,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.orders.map(({ id }) => ({
                type: "Orders" as const,
                id,
              })),
              {
                type: "Orders",
                id: `${arg.status}-${arg.dateFilter || "all"}`,
              },
            ]
          : [
              {
                type: "Orders",
                id: `${arg.status}-${arg.dateFilter || "all"}`,
              },
            ],
      // Keep cached data for pagination
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),

    assignOrderToPartner: build.mutation<
      { message: string; partner: IPartner },
      {
        _orderId: string;
        _userId: string;
        userRole: string;
        assignmentStatus: IAssignmentStatus;
      }
    >({
      query: (data) => ({
        url: ORDER_API_PATHS.ASSIGN_PARTNER,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [ORDER_DETAIL_API_TAG],
    }),

    unassignOrder: build.mutation<
      { message: string; order: IOrder },
      {
        _orderId: string;
      }
    >({
      query: ({ _orderId }) => ({
        url: ORDER_API_PATHS.UNASSIGN_ORDER(_orderId),
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [ORDERS_API_TAG, ORDER_DETAIL_API_TAG],
    }),
  }),
});

export const {
  useGetOrderDetailQuery,

  useGetOrderStatsQuery,
  useGetOrdersByStatusQuery,

  useOrderReopenMutation,
  useRescheduleOrderMutation,

  useCompleteOrderMutation,

  useCreateOrderMutation,
  useOrderCancelMutation,
  useDeleteOrderMutation,

  useAssignOrderToPartnerMutation,
  useUnassignOrderMutation,
} = orders;
