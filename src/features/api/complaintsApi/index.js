import { baseApi } from "@api";

export const complaintsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComplaints: build.query({
      query: () => `/api/complaint`,
      providesTags: ["Complaints"],
    }),
    createComplaint: build.mutation({
      query: (data) => ({
        url: "/api/complaint",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Complaints"],
    }),
    acknowledgeComplaint: build.mutation({
      query: ({ complaintId, data }) => ({
        url: `/api/complaint/${complaintId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Complaints"],
    }),
    deleteComplaint: build.mutation({
      query: (complaintId) => ({
        url: `/api/complaint/${complaintId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Complaints"],
    }),
  }),
});

export const {
  useGetComplaintsQuery,
  useCreateComplaintMutation,
  useAcknowledgeComplaintMutation,
  useDeleteComplaintMutation,
} = complaintsApi;
