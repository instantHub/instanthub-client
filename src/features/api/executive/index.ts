import { baseApi } from "@features/api";
import {
  ICreateExecutivePayload,
  IExecutive,
  IExecutiveOrderCountsResponse,
  IExecutiveOrders,
  IExecutiveOrdersResponse,
  IExecutiveStats,
  IGetExecutiveOrdersParams,
} from "./types";
import { EXECUTIVE_API_TAG, EXECUTIVE_STATS_API_TAG } from "./constants";
import { IAssignmentStatus, IOrder } from "../orders/types";

const EXECUTIVES_API = "/api/executives";

export const executiveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExecutives: builder.query<IExecutive[], void>({
      query: () => EXECUTIVES_API,
      providesTags: [EXECUTIVE_API_TAG],
    }),
    assignOrderToExecutive: builder.mutation<
      { message: string; executive: IExecutive },
      {
        orderId: string;
        executiveId: string;
        assignmentStatus: IAssignmentStatus;
      }
    >({
      query: ({ orderId, executiveId, assignmentStatus }) => ({
        url: `${EXECUTIVES_API}/assign-order`,
        method: "POST",
        body: {
          orderId,
          executiveId,
          assignmentStatus,
        },
      }),
      invalidatesTags: [EXECUTIVE_API_TAG],
    }),

    createExecutive: builder.mutation<IExecutive, ICreateExecutivePayload>({
      query: (body) => ({
        url: EXECUTIVES_API,
        method: "POST",
        body,
      }),
      invalidatesTags: [EXECUTIVE_API_TAG],
    }),
    updateExecutive: builder.mutation<IExecutive, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `${EXECUTIVES_API}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [EXECUTIVE_API_TAG],
    }),
    deleteExecutive: builder.mutation<{ success: boolean; id: string }, string>(
      {
        query: (id) => ({
          url: `${EXECUTIVES_API}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [EXECUTIVE_API_TAG],
      }
    ),

    getExecutiveOrderDetails: builder.query<IOrder, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `${EXECUTIVES_API}/${orderId}/order-details`,
        method: "GET",
      }),
      providesTags: [EXECUTIVE_API_TAG],
    }),

    getExecutiveStats: builder.query<IExecutiveStats, void>({
      query: () => `${EXECUTIVES_API}/orders/stats`,
      providesTags: [EXECUTIVE_STATS_API_TAG],
      keepUnusedDataFor: 60,
    }),

    getExecutiveOrders: builder.query<
      IExecutiveOrdersResponse,
      IGetExecutiveOrdersParams
    >({
      query: ({
        status = "all",
        dateFilter,
        page = 1,
        limit = 20,
        sortBy = "schedulePickUp.date",
        order = "asc",
      }) => {
        const params = new URLSearchParams({
          status,
          page: page.toString(),
          limit: limit.toString(),
          sortBy,
          order,
        });

        if (dateFilter) {
          params.append("dateFilter", dateFilter);
        }

        return `${EXECUTIVES_API}/orders?${params.toString()}`;
      },
      providesTags: [EXECUTIVE_API_TAG],
    }),
  }),
});

export const {
  useGetExecutivesQuery,
  useAssignOrderToExecutiveMutation,

  useGetExecutiveOrderDetailsQuery,
  useGetExecutiveStatsQuery,
  useGetExecutiveOrdersQuery,

  useCreateExecutiveMutation,
  useUpdateExecutiveMutation,
  useDeleteExecutiveMutation,
} = executiveApi;
