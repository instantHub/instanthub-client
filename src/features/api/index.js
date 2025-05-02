import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  }),
  reducerPath: "baseApi",
  tagTypes: [
    "User",
    "CreateBrands",
    "Brands",
    "Categories",
    "Products",
    "Conditions",
    "ConditionLabels",
    "Orders",
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
  ],
  endpoints: () => ({}),
});
