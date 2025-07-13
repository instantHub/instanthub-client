import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout } from "@features/adminSlices/adminAuthSlice";
import { CATEGORY_API_TAG } from "./categoriesApi/constants";
import { TESTIMONIAL_API_TAG } from "./testimonialsApi/constant";
import { ORDER_DETAIL_API_TAG, ORDERS_API_TAG } from "./ordersApi/constants";

// Typed baseQuery using fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  credentials: "include",
});

// Extend baseQuery to handle token expiration
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const errorData = result.error.data as {
      tokenExpired?: boolean;
      message?: string;
    };

    console.log("errorData", errorData);

    if (errorData?.tokenExpired) {
      console.log("tokenExpired has expired, loggin out");
      api.dispatch(logout());
      window.location.href = "/admin/login";

      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
    }
  }

  return result;
};

// Typed baseApi with proper tagTypes and reducerPath
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
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
