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
    getPhoneNumbers: build.query<IPhoneNumber[], void>({
      query: () => `/api/otp`,
      providesTags: ["Phone Numbers"],
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
