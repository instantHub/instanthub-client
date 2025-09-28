import { baseApi } from "@features/api";
import {
  ICreatePartnerPayload,
  IGetPartnersResponse,
  IPartner,
  IUpdatePartnerPayload,
} from "./types";

const PARTNERS_API = "/api/partners";

export const partnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginPartner: builder.mutation<IPartner, any>({
      query: (data) => ({
        url: `${PARTNERS_API}/auth`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    partnerProfile: builder.query<IPartner, void>({
      query: () => ({
        url: `${PARTNERS_API}/partner-profile`,
        method: "GET",
      }),
    }),
    getPartners: builder.query<IGetPartnersResponse, void>({
      query: () => PARTNERS_API,
    }),
    getPartner: builder.query<IPartner, string>({
      query: (id) => `/partners/${id}`,
      //   providesTags: (_result, _error, id) => [{ type: "Partner", id }],
    }),
    createPartner: builder.mutation<IPartner, ICreatePartnerPayload>({
      query: (body) => ({
        url: PARTNERS_API,
        method: "POST",
        body,
      }),
      //   invalidatesTags: [{ type: "Partner", id: "LIST" }],
    }),
    updatePartner: builder.mutation<
      IPartner,
      { id: string; data: IUpdatePartnerPayload }
    >({
      query: ({ id, data }) => ({
        url: `${PARTNERS_API}/${id}`,
        method: "PUT",
        body: data,
      }),
      //   invalidatesTags: (_result, _error, { id }) => [{ type: "Partner", id }],
    }),
    deletePartner: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `${PARTNERS_API}/${id}`,
        method: "DELETE",
      }),
      //   invalidatesTags: (_result, _error, id) => [{ type: "Partner", id }],
    }),
  }),
});

export const {
  useLoginPartnerMutation,
  usePartnerProfileQuery,
  useGetPartnersQuery,
  useGetPartnerQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApi;
