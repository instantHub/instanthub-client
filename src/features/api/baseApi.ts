import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { logout } from "@features/slices/auth/auth.slice";
import { CATEGORY_API_TAG } from "./categories/constants";
import { TESTIMONIAL_API_TAG } from "./testimonialsApi/constant";
import {
  PURCHASE_ORDER_DETAIL_API_TAG,
  PURCHASE_ORDER_STATS_API_TAG,
  PURCHASE_ORDERS_API_TAG,
} from "./orders/constants";
import { ADMIN_API_TAG } from "./auth/constant";
import {
  SERVICE_BRAND_API_TAG,
  SERVICE_CATEGORY_API_TAG,
  SERVICE_PROBLEM_API_TAG,
} from "./servicesApi/constants";
import { toast } from "react-toastify";
import {
  EXECUTIVE_API_TAG,
  EXECUTIVE_ORDER_API_TAG,
  EXECUTIVE_STATS_API_TAG,
} from "./executive/constants";
import { PARTNERS_API_TAG } from "./partners/constants";
import { PARTNERS_REQ_API_TAG } from "./partners_requests/constants";
import { BLOG_API_TAGS } from "./blogs/constants";
import { PRICING_API_TAG } from "./pricing/constants";
import { PRODUCT_API_TAG } from "./productsApi/constant";
import { CONDITIONS_API_TAG } from "./conditionsApi/constants";
import { CONDITIONS_LABELS_API_TAG } from "./conditionLabelsApi/constants";

// Define error type mapping
export type CustomError = {
  status?: number;
  message: string;
  type:
    | "AUTH_ERROR"
    | "SERVER_ERROR"
    | "NETWORK_ERROR"
    | "UNKNOWN_ERROR"
    | "DUPLICATE_ERROR";
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

    // Auth error handling
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

      // window.location.href = "/dashboard-login";
    }

    // TODO: Duplicate handling
    // if (status === 409) {
    //   customError = {
    //     type: "DUPLICATE_ERROR",
    //     status: typeof status === "number" ? status : undefined,
    //     message: (result.error.data as any) || "Duplicate error",
    //   };

    //   return { error: customError };
    // }

    // No found error handling
    if (status === 404) {
      toast.error("Page / Endpoint not found");
    } else if (status === 400) {
      const errorData = result.error.data as {
        success?: boolean;
        message?: string;
      };

      const errMessage =
        errorData?.message || "Error 400: Bad Request. Please try again.";

      toast.error(errMessage);
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
    PRODUCT_API_TAG,
    CONDITIONS_API_TAG,
    CONDITIONS_LABELS_API_TAG,

    PURCHASE_ORDER_DETAIL_API_TAG,
    PURCHASE_ORDER_STATS_API_TAG,
    PURCHASE_ORDERS_API_TAG,

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
    EXECUTIVE_API_TAG,
    EXECUTIVE_ORDER_API_TAG,
    EXECUTIVE_STATS_API_TAG,
    PARTNERS_API_TAG,
    PARTNERS_REQ_API_TAG,
    PRICING_API_TAG,
    "OrderAnalytics",
    BLOG_API_TAGS.BLOG,
    BLOG_API_TAGS.BLOG_LIST,
    BLOG_API_TAGS.BLOG_STATS,
    BLOG_API_TAGS.TAGS,
  ],
  endpoints: () => ({}),
});
