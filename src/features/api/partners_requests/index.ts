import { baseApi } from "@features/api";
import { PARTNERS_REQ_API, PARTNERS_REQ_API_TAG } from "./constants";
import {
  IPartnerRequest,
  IPartnerRequestFormData,
  RequestStatus,
} from "./types";

export const partnerRequests = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitPartnerRequest: builder.mutation<void, IPartnerRequestFormData>({
      query: (formData) => ({
        url: `${PARTNERS_REQ_API}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [PARTNERS_REQ_API_TAG], // Ensures list refresh if viewing elsewhere
    }),

    // --- Admin Endpoints ---
    getPartnerRequests: builder.query<
      IPartnerRequest[],
      { status?: RequestStatus }
    >({
      query: (params) => ({
        url: `${PARTNERS_REQ_API}`,
        method: "GET",
        params, // Allows filtering, e.g., ?status=pending
      }),
      providesTags: [PARTNERS_REQ_API_TAG],
    }),

    // Helper mutations for admin actions
    approvePartnerRequest: builder.mutation<IPartnerRequest, string>({
      query: (id) => ({
        url: `${PARTNERS_REQ_API}/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: [PARTNERS_REQ_API_TAG],
    }),

    rejectPartnerRequest: builder.mutation<
      { request: IPartnerRequest; message: string },
      { id: string; reason: string }
    >({
      query: ({ id, reason }) => ({
        url: `${PARTNERS_REQ_API}/${id}/reject`,
        method: "PUT",
        body: { rejectionReason: reason },
      }),
      invalidatesTags: [PARTNERS_REQ_API_TAG],
    }),

    deletePartnerRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `${PARTNERS_REQ_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [PARTNERS_REQ_API_TAG],
    }),
  }),
});

export const {
  useSubmitPartnerRequestMutation,
  useGetPartnerRequestsQuery,
  useApprovePartnerRequestMutation,
  useRejectPartnerRequestMutation,
  useDeletePartnerRequestMutation,
} = partnerRequests;
