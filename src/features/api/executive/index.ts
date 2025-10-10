import { baseApi } from "@features/api";
import {
  ICreateExecutivePayload,
  IExecutive,
  IExecutiveOrderCountsResponse,
  IExecutiveOrders,
} from "./types";
import { EXECUTIVE_API_TAG } from "./constants";
import { IAssignmentStatus, IOrder } from "../orders/types";

const EXECUTIVES_API = "/api/executives";

export const executiveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    executiveProfile: builder.query<IExecutive, void>({
      query: () => ({
        url: `${EXECUTIVES_API}/profile`,
        method: "GET",
      }),
    }),
    getExecutives: builder.query<IExecutive[], void>({
      query: () => EXECUTIVES_API,
      providesTags: [EXECUTIVE_API_TAG],
    }),
    getExecutive: builder.query<IExecutive, string>({
      query: (id) => `/${id}`,
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

    getExecutiveOrders: builder.query<IExecutiveOrders, void>({
      query: () => ({
        url: `${EXECUTIVES_API}/orders`,
        method: "GET",
      }),
      providesTags: [EXECUTIVE_API_TAG],
    }),

    getExecutiveScheduledOrders: builder.query<
      { data: IOrder[] },
      { day: "today" | "tomorrow" }
    >({
      query: ({ day }) => ({
        url: `${EXECUTIVES_API}/schedule-orders?day=${day}`,
        method: "GET",
      }),
      providesTags: [EXECUTIVE_API_TAG],
    }),

    getExecutiveOrderDetails: builder.query<IOrder, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `${EXECUTIVES_API}/${orderId}/order-details`,
        method: "GET",
      }),
      providesTags: [EXECUTIVE_API_TAG],
    }),

    getExecutiveOrderCounts: builder.query<
      IExecutiveOrderCountsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${EXECUTIVES_API}/${id}/orders-count`,
        method: "GET",
      }),
      providesTags: [EXECUTIVE_API_TAG],
    }),

    getExecutiveOrdersByStatus: builder.query<
      IExecutiveOrders,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `${EXECUTIVES_API}/${id}/${status}/orders`,
        method: "GET",
      }),
      providesTags: [EXECUTIVE_API_TAG],
    }),
  }),
});

export const {
  useGetExecutiveQuery,
  useGetExecutivesQuery,
  useExecutiveProfileQuery,
  useAssignOrderToExecutiveMutation,
  useCreateExecutiveMutation,
  useUpdateExecutiveMutation,
  useDeleteExecutiveMutation,

  useGetExecutiveOrdersQuery,
  useGetExecutiveScheduledOrdersQuery,
  useGetExecutiveOrderDetailsQuery,
  useGetExecutiveOrderCountsQuery,
  useGetExecutiveOrdersByStatusQuery,
} = executiveApi;
