import { baseApi } from "@features/api";
import {
  ICreatePartnerPayload,
  IGetPartnersResponse,
  IPartner,
  IUpdatePartnerPayload,
} from "./types";
import { PARTNERS_API, PARTNERS_API_TAG } from "./constants";

export const partner = baseApi.injectEndpoints({
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
        url: `${PARTNERS_API}/profile`,
        method: "GET",
      }),
    }),
    getPartners: builder.query<IGetPartnersResponse, void>({
      query: () => PARTNERS_API,
      providesTags: [PARTNERS_API_TAG],
    }),
    getPartner: builder.query<IPartner, string>({
      query: (id) => `/partners/${id}`,
    }),
    createPartner: builder.mutation<IPartner, ICreatePartnerPayload>({
      query: (body) => ({
        url: PARTNERS_API,
        method: "POST",
        body,
      }),
      invalidatesTags: [PARTNERS_API_TAG],
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
      invalidatesTags: [PARTNERS_API_TAG],
    }),
    deletePartner: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `${PARTNERS_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [PARTNERS_API_TAG],
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
} = partner;
