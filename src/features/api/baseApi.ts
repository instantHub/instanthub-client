import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout } from "@features/slices/auth/auth.slice";
import { CATEGORY_API_TAG } from "./categoriesApi/constants";
import { TESTIMONIAL_API_TAG } from "./testimonialsApi/constant";
import { ORDER_DETAIL_API_TAG, ORDERS_API_TAG } from "./ordersApi/constants";
import { ADMIN_API_TAG } from "./authApi/constant";
import {
  SERVICE_BRAND_API_TAG,
  SERVICE_CATEGORY_API_TAG,
  SERVICE_PROBLEM_API_TAG,
} from "./servicesApi/constants";
import { toast } from "react-toastify";

// Define error type mapping
export type CustomError = {
  status?: number;
  message: string;
  type: "AUTH_ERROR" | "SERVER_ERROR" | "NETWORK_ERROR" | "UNKNOWN_ERROR";
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Add Authorization only for admin
    const state: any = getState();
    const token = state?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  CustomError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status as number | "FETCH_ERROR" | undefined;

    let customError: CustomError = {
      type: "UNKNOWN_ERROR",
      status: typeof status === "number" ? status : undefined,
      message: "Something went wrong.",
    };

    if (status === 401 || status === 403) {
      console.log("baseQueryWithErrorHandling authentication error");

      customError = {
        type: "AUTH_ERROR",
        status: typeof status === "number" ? status : undefined,
        message: "Authentication failed. Please login again.",
      };

      // Check for token expiration
      const errorData = result.error.data as {
        tokenExpired?: boolean;
        message?: string;
      };
      console.log("errorData", errorData);

      if (errorData?.tokenExpired) {
        api.dispatch(logout());
      }

      window.location.href = "/dashboard-login";
    }
    if (status === 404) {
      toast.error("Page / Endpoint not found");
    } else if (typeof status === "number" && status >= 500) {
      customError = {
        type: "SERVER_ERROR",
        status,
        message: "Server error. Please try again later.",
      };
    } else if (status === "FETCH_ERROR") {
      customError = {
        type: "NETWORK_ERROR",
        message: "Network error. Please check your connection.",
      };
    }

    return { error: customError };
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: [
    "User",
    ADMIN_API_TAG,
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
    SERVICE_CATEGORY_API_TAG,
    SERVICE_BRAND_API_TAG,
    SERVICE_PROBLEM_API_TAG,
  ],
  endpoints: () => ({}),
});
