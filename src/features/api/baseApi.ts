import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CATEGORY_API_TAG } from "./categoriesApi/constants";
import { TESTIMONIAL_API_TAG } from "./testimonialsApi/constant";
import { ORDER_DETAIL_API_TAG, ORDERS_API_TAG } from "./ordersApi/constants";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "baseApi",
  tagTypes: [
    "User",
    "CreateBrands",
    "Brands",
    CATEGORY_API_TAG,
    "Products",
    "Conditions",
    "ConditionLabels",
    ORDERS_API_TAG,
    ORDER_DETAIL_API_TAG,
    "Sliders",
    "Series",
    "Stocks",
    "Coupons",
    "Services",
    "Services Orders",
    "Recycle",
    "Variants Questions",
    "Phone Numbers",
    "Complaints",
    "Processors",
    TESTIMONIAL_API_TAG,
  ],
  endpoints: () => ({}),
});
