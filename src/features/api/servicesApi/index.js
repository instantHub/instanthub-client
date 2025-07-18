import { baseApi } from "@features/api";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadServicesImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/services",
        method: "POST",
        body: data,
      }),
    }),

    // Service Orders
    getServicesOrders: build.query({
      query: () => `/api/services/orders`,
      providesTags: ["Services Orders"],
    }),
    getServiceOrder: build.query({
      query: (serviceOrderId) => `/api/services/orders/${serviceOrderId}`,
      providesTags: ["Services Orders"],
    }),

    createServiceOrder: build.mutation({
      query: (data) => ({
        url: `/api/services/orders`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Services Orders"],
    }),
    serviceOrderComplete: build.mutation({
      query: ({ serviceOrderId, data }) => ({
        url: `/api/services/orders/${serviceOrderId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Services Orders"],
    }),

    cancelServiceOrder: build.mutation({
      query: ({ orderId: serviceOrderId, data }) => ({
        url: `/api/services/orders/cancel/${serviceOrderId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Services Orders"],
    }),
    deleteServiceOrder: build.mutation({
      query: (serviceOrderId) => ({
        url: `/api/services/orders/${serviceOrderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services Orders"],
    }),
  }),
});

export const {
  useUploadServicesImageMutation,

  useGetServicesOrdersQuery,
  useGetServiceOrderQuery,
  useCreateServiceOrderMutation,
  useServiceOrderCompleteMutation,
  useCancelServiceOrderMutation,
  useDeleteServiceOrderMutation,
} = serviceApi;
