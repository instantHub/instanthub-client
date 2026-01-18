import { baseApi } from "@features/api";
import { IPhoneNumber } from "./types";

export const OTPApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOTP: build.query({
      query: (mobileNo) => `/api/otp/${mobileNo}`,
    }),
    generateOTP: build.mutation({
      query: (data) => ({
        url: "/api/otp/generate-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    saveOfferedPrice: build.mutation<
      any,
      { mobile_id: string; offeredPrice: number }
    >({
      query: ({ mobile_id, offeredPrice }) => ({
        url: `/api/otp/save/offeredPrice/${mobile_id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: { offeredPrice },
      }),
    }),
    getPhoneNumbers: build.query<
      { data: IPhoneNumber[]; meta: any },
      { page: number }
    >({
      query: ({ page }) => `/api/otp?page=${page}&limit=20`,
      // Tagging for cache invalidation
      providesTags: ["Phone Numbers"],
      // This tells RTK Query to share the same cache key for all pages
      serializeQueryArgs: ({ endpointName }) => endpointName,
      // Merge incoming data with existing cache
      merge: (currentCache, newItems) => {
        if (newItems.meta.page === 1) {
          return newItems; // Reset cache if we go back to page 1 (refresh)
        }
        currentCache.data.push(...newItems.data);
        currentCache.meta = newItems.meta;
      },
      // Refetch when the page argument changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    deletePhoneNumber: build.mutation({
      query: (numberId) => ({
        url: `/api/otp/number/${numberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Phone Numbers"],
    }),
  }),
});

export const {
  useGetOTPQuery,
  useGenerateOTPMutation,
  useSaveOfferedPriceMutation,
  useGetPhoneNumbersQuery,
  useDeletePhoneNumberMutation,
} = OTPApi;
