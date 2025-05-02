import { baseApi } from "@api";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // SERVICES
    getAllServices: build.query({
      query: ({ page, limit, search }) => ({
        url: `/api/search`,
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["Services"],
    }),
    getServices: build.query({
      query: () => `/api/services`,
      providesTags: ["Services"],
    }),
    createServices: build.mutation({
      query: (data) => ({
        // url: `/api/services/add-service`,
        url: `/api/services`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    uploadServicesImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/services",
        method: "POST",
        body: data,
      }),
    }),
    updateService: build.mutation({
      query: ({ serviceId, data }) => ({
        // url: `/api/services/update-service/${serviceId}`,
        url: `/api/services/${serviceId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: build.mutation({
      query: ({ serviceId, serviceType, serviceFrom }) => ({
        url: `/api/services?serviceId=${serviceId}&serviceType=${serviceType}&serviceFrom=${serviceFrom}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
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
  useGetAllServicesQuery,
  useGetServicesQuery,
  useCreateServicesMutation,
  useUploadServicesImageMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesOrdersQuery,
  useGetServiceOrderQuery,
  useCreateServiceOrderMutation,
  useServiceOrderCompleteMutation,
  useCancelServiceOrderMutation,
  useDeleteServiceOrderMutation,
} = serviceApi;
