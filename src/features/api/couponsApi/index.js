import { baseApi } from "@features/api";

export const couponsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCoupon: build.query({
      query: () => `/api/coupons`,
      providesTags: ["Coupons"],
    }),
    createCoupon: build.mutation({
      query: (data) => ({
        url: `/api/coupons/add-coupon`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),
    deleteCoupon: build.mutation({
      query: (couponId) => ({
        url: `/api/coupons/delete-coupon/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export const {
  useGetCouponQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
