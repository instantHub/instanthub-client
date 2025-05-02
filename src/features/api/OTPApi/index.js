import { baseApi } from "@api";

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
    getPhoneNumbers: build.query({
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
  useGetPhoneNumbersQuery,
  useDeletePhoneNumberMutation,
} = OTPApi;
