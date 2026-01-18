import { baseApi } from "@features/api";
import {
  PURCHASE_ORDER_API_PATHS,
  PURCHASE_ORDER_DETAIL_API_TAG,
  PURCHASE_ORDER_STATS_API_TAG,
  PURCHASE_ORDERS_API_TAG,
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
      query: ({ orderId }) => PURCHASE_ORDER_API_PATHS.DETAILS(orderId),
      providesTags: [PURCHASE_ORDER_DETAIL_API_TAG],
    }),

    createOrder: build.mutation({
      query: (data) => ({
        url: PURCHASE_ORDER_API_PATHS.BASE,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [PURCHASE_ORDERS_API_TAG],
    }),

    completeOrder: build.mutation({
      query: (data) => ({
        url: PURCHASE_ORDER_API_PATHS.COMPLETE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        PURCHASE_ORDERS_API_TAG,
        PURCHASE_ORDER_DETAIL_API_TAG,
        EXECUTIVE_ORDER_API_TAG,
      ],
    }),

    orderCancel: build.mutation<
      any,
      { orderId: string; cancellationDetails: any }
    >({
      query: ({ orderId, cancellationDetails }) => ({
        url: PURCHASE_ORDER_API_PATHS.CANCEL(orderId),
        method: "PUT",
        body: cancellationDetails,
      }),
      invalidatesTags: [PURCHASE_ORDERS_API_TAG, PURCHASE_ORDER_DETAIL_API_TAG],
    }),

    deleteOrder: build.mutation({
      query: (orderId) => ({
        url: PURCHASE_ORDER_API_PATHS.DELETE(orderId),
        method: "DELETE",
      }),
      invalidatesTags: [PURCHASE_ORDERS_API_TAG],
    }),

    orderReopen: build.mutation<IOrder, { id: string }>({
      query: ({ id }) => ({
        url: PURCHASE_ORDER_API_PATHS.REOPEN(id),
        method: "PUT",
      }),

      invalidatesTags: [PURCHASE_ORDER_DETAIL_API_TAG],
    }),

    rescheduleOrder: build.mutation<IOrder, IRescheduleOrderArgs>({
      query: ({ id, body }) => ({
        url: PURCHASE_ORDER_API_PATHS.RESCHEDULE(id),
        method: "PUT",
        body,
      }),

      invalidatesTags: [PURCHASE_ORDER_DETAIL_API_TAG],
    }),

    updateCustomerDetails: build.mutation<
      any,
      {
        orderId: string;
        customerDetails: { name: string; email: string; phone: number };
      }
    >({
      query: ({ orderId, customerDetails }) => ({
        url: PURCHASE_ORDER_API_PATHS.CUSTOMER(orderId),
        method: "PATCH",
        body: customerDetails,
      }),
      invalidatesTags: [PURCHASE_ORDERS_API_TAG, PURCHASE_ORDER_DETAIL_API_TAG],
    }),

    // Get order statistics
    getOrderStats: build.query<IOrderStats, void>({
      query: () => PURCHASE_ORDER_API_PATHS.STATS,
      transformResponse: (response: IApiResponse<IOrderStats>) => response.data,
      providesTags: [PURCHASE_ORDER_STATS_API_TAG],
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

        return PURCHASE_ORDER_API_PATHS.BY_STATUS_QUERY(params.toString());
      },
      transformResponse: (response: IApiResponse<IOrdersResponse>) =>
        response.data,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.orders.map(({ _id }) => ({
                type: "Orders" as const,
                _id,
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
        url: PURCHASE_ORDER_API_PATHS.ASSIGN_PARTNER,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [PURCHASE_ORDER_DETAIL_API_TAG],
    }),

    unassignOrder: build.mutation<
      { message: string; order: IOrder },
      {
        _orderId: string;
      }
    >({
      query: ({ _orderId }) => ({
        url: PURCHASE_ORDER_API_PATHS.UNASSIGN_ORDER(_orderId),
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [PURCHASE_ORDERS_API_TAG, PURCHASE_ORDER_DETAIL_API_TAG],
    }),
  }),
});

export const {
  useGetOrderDetailQuery,

  useGetOrderStatsQuery,
  useGetOrdersByStatusQuery,

  useOrderReopenMutation,
  useRescheduleOrderMutation,
  useUpdateCustomerDetailsMutation,

  useCompleteOrderMutation,

  useCreateOrderMutation,
  useOrderCancelMutation,
  useDeleteOrderMutation,

  useAssignOrderToPartnerMutation,
  useUnassignOrderMutation,
} = orders;
