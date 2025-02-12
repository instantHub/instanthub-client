import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  }),
  reducerPath: "API",
  tagTypes: [
    "User",
    "CreateBrands",
    "Brands",
    "Conditions",
    "ConditionLabels",
    "Orders",
    "Sliders",
    "Series",
    "Coupons",
    "Variants Questions",
    "Phone Numbers",
    "Complaints",
  ],
  endpoints: (build) => ({
    //Categories

    // uploadFileHandler: build.mutation({
    //   query: (data) => ({
    //     url: "/api/upload",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // Brands
    uploadBrandImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/brands",
        method: "POST",
        body: data,
      }),
    }),
    getAllBrand: build.query({
      query: () => `/api/brand`,
      providesTags: ["Brands"],
    }),
    getBrand: build.query({
      query: (catId) => `/api/brand/${catId}`,
      providesTags: ["CreateBrands", "Brands"],
    }),
    createBrand: build.mutation({
      query: (data) => ({
        url: "/api/brand/add-brand",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    updateBrand: build.mutation({
      query: ({ brandId, data }) => ({
        url: `/api/brand/update-brand/${brandId}`,
        method: "PUT",
        // credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: build.mutation({
      query: (brandId) => ({
        url: `/api/brand/delete-brand/${brandId}`,
        method: "DELETE",
        // body: data,
      }),
      invalidatesTags: ["Brands"],
    }),

    // Products
    updateLaptopConfigurationsPriceDrop: build.mutation({
      query: ({ productId, data, type, brand }) => ({
        url: `/api/products/updateLaptopConfigurationsPriceDrop/${productId}?type=${type}&brand=${brand}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // Conditions
    getConditions: build.query({
      query: () => `/api/questions/conditions`,
      providesTags: ["Conditions"],
    }),
    createConditions: build.mutation({
      query: (data) => ({
        url: "/api/questions/add-conditions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Conditions"],
    }),
    updateCondition: build.mutation({
      query: ({ conditionId, data }) => ({
        url: `/api/questions/update-condition/${conditionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Conditions"],
    }),
    deleteCondition: build.mutation({
      query: ({ category, conditionId }) => ({
        url: `/api/questions/delete-condition?category=${category}&conditionId=${conditionId}`,
        method: "DELETE",
        // body: data,
      }),
      invalidatesTags: ["Conditions"],
    }),

    // Condition Labels
    getConditionLabels: build.query({
      query: () => `/api/questions/conditionlabels`,
      providesTags: ["ConditionLabels"],
    }),
    createConditionLabels: build.mutation({
      query: (data) => ({
        url: "/api/questions/add-conditionlabel",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["ConditionLabels"],
    }),
    uploadConditionLabelsImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/condition-labels",
        method: "POST",
        body: data,
      }),
    }),
    updateConditionLabel: build.mutation({
      query: ({ conditionLabelId, data }) => ({
        url: `/api/questions/update-conditionlabel/${conditionLabelId}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ["ConditionLabels"],
    }),
    deleteConditionLabel: build.mutation({
      query: ({ category, conditionLabelId }) => ({
        url: `/api/questions/delete-conditionlabel?category=${category}&conditionLabelId=${conditionLabelId}`,
        method: "DELETE",
        // body: data,
      }),
      invalidatesTags: ["ConditionLabels"],
    }),

    // Orders
    getOrdersList: build.query({
      query: () => `/api/orders`,
      providesTags: ["Orders"],
    }),
    getOrder: build.query({
      query: (orderId) => `/api/orders/${orderId}`,
      providesTags: ["Order Detail"],
    }),
    createOrder: build.mutation({
      query: (data) => ({
        // url: "/api/orders/create-order",
        url: "/api/orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    uploadCustomerProofImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/customer-proof",
        method: "POST",
        body: data,
      }),
    }),
    orderReceived: build.mutation({
      query: (data) => ({
        // url: `/api/orders/order-received`,
        url: `/api/orders/complete`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders", "Order Detail"],
    }),
    orderCancel: build.mutation({
      query: ({ orderId, data }) => ({
        url: `/api/orders/cancel/${orderId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders", "Order Detail"],
    }),
    deleteOrder: build.mutation({
      query: (orderId) => ({
        url: `/api/orders/delete-order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),

    assignAgent: build.mutation({
      query: ({ orderId, data }) => ({
        url: `/api/orders/assign-agent/${orderId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Order Detail"],
    }),

    // Sliders
    getActiveSlidersList: build.query({
      query: () => `/api/sliders/active-sliders`,
      providesTags: ["Sliders"],
    }),
    getAllSliders: build.query({
      query: () => `/api/sliders/all-sliders`,
      providesTags: ["Sliders"],
    }),
    createSlider: build.mutation({
      query: (data) => ({
        url: "/api/sliders/create-slider",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Sliders"],
    }),
    uploadSliderImage: build.mutation({
      query: (data) => ({
        url: "/api/upload/sliders",
        method: "POST",
        body: data,
      }),
    }),
    updateSlider: build.mutation({
      query: ({ sliderId, data }) => ({
        url: `/api/sliders/update-slider/${sliderId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Sliders"],
    }),
    deleteSlider: build.mutation({
      query: (sliderId) => ({
        url: `/api/sliders/delete-slider/${sliderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sliders"],
    }),

    // Series
    getAllSeries: build.query({
      query: () => `/api/series`,
      providesTags: ["Series"],
    }),
    getBrandSeries: build.query({
      query: (brandId) => `/api/series/${brandId}`,
      // providesTags: ["Brands"],
      providesTags: ["Series"],
    }),
    createSeries: build.mutation({
      query: (data) => ({
        url: "/api/series/create-series",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Series"],
    }),
    updateSeries: build.mutation({
      query: ({ seriesId, data }) => ({
        url: `/api/series/update-series/${seriesId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Series"],
    }),
    deleteSeries: build.mutation({
      query: (seriesId) => ({
        url: `/api/series/delete-series/${seriesId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Series"],
    }),

    // OTPs and Number
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
      invalidatesTags: ["Series"],
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

    // Stocks

    // Delete Condition Label Images
    deleteCLImage: build.mutation({
      query: (data) => ({
        url: `/api/delete/delete-cl-image`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["ConditionLabels"],
    }),

    // Coupons
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

    // SERVICES

    // DELETE IMAGE
    deleteImage: build.mutation({
      query: (data) => ({
        url: `/api/delete/delete-image`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    // Recycle

    // VARIANT WISE QUESTIONS
    getSingleProduct: build.query({
      query: () => `/api/questions/single-product`,
      providesTags: ["Variants Questions"],
    }),

    getVariantsQuestions: build.query({
      query: () => `/api/questions/variants-questions`,
      providesTags: ["Variants Questions"],
    }),
    createVariantQuestions: build.mutation({
      query: (data) => ({
        url: "/api/questions/add-variant-questions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Variants Questions"],
    }),
    updateVariantQuestions: build.mutation({
      query: ({ variantQuestionsId, data }) => ({
        url: `/api/questions/update-variant-questions/${variantQuestionsId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Variants Questions"],
    }),
    deleteVariantQuestions: build.mutation({
      query: (variantQuestionsId) => ({
        url: `/api/questions/delete-variant-questions/${variantQuestionsId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Variants Questions"],
    }),
    dashboardDetails: build.query({
      query: () => "/api/admin/dashboard",
    }),

    // Complaints
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
  // useUploadFileHandlerMutation,
  useUploadBrandImageMutation,
  useGetAllBrandQuery,
  useGetBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,

  useUpdateLaptopConfigurationsPriceDropMutation,

  useGetConditionsQuery,
  useCreateConditionsMutation,
  useUpdateConditionMutation,
  useDeleteConditionMutation,

  useGetConditionLabelsQuery,
  useCreateConditionLabelsMutation,
  useUploadConditionLabelsImageMutation,
  useUpdateConditionLabelMutation,
  useDeleteConditionLabelMutation,

  useGetOrderQuery,
  useGetOrdersListQuery,
  useCreateOrderMutation,
  useUploadCustomerProofImageMutation,
  useOrderReceivedMutation,
  useOrderCancelMutation,
  useDeleteOrderMutation,
  useAssignAgentMutation,

  useGetActiveSlidersListQuery,
  useGetAllSlidersQuery,
  useCreateSliderMutation,
  useUploadSliderImageMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,

  useGetAllSeriesQuery,
  useGetBrandSeriesQuery,
  useCreateSeriesMutation,
  useUpdateSeriesMutation,
  useDeleteSeriesMutation,

  useGetOTPQuery,
  useGenerateOTPMutation,
  useGetPhoneNumbersQuery,
  useDeletePhoneNumberMutation,

  useDeleteCLImageMutation,

  useGetCouponQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,

  useDeleteImageMutation,

  useGetSingleProductQuery,

  useGetVariantsQuestionsQuery,
  useCreateVariantQuestionsMutation,
  useUpdateVariantQuestionsMutation,
  useDeleteVariantQuestionsMutation,
  useDashboardDetailsQuery,

  useGetComplaintsQuery,
  useCreateComplaintMutation,
  useAcknowledgeComplaintMutation,
  useDeleteComplaintMutation,
} = api;

// useGetAllQuestionsQuery,
// useGetQuestionsQuery,
// useCreateQuestionMutation,
// useUpdateQuestionMutation,

// getAllQuestions: build.query({
//   query: () => `/api/questions`,
// }),
// getQuestions: build.query({
//   query: (questionsId) => `/api/questions/${questionsId}`,
// }),
// createQuestion: build.mutation({
//   query: (data) => ({
//     url: "/api/questions/add-questions",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: data,
//   }),
// }),
// updateQuestion: build.mutation({
//   query: ({ questionId, data }) => ({
//     url: `/api/questions/update-condition/${conditionId}`,
//     method: "PUT",
//     body: data,
//   }),
// }),
