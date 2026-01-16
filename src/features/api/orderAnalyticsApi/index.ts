import { baseApi } from "../baseApi";
import { PURCHASE_ORDER_BASE_API } from "../orders/constants";

export interface IMonthlyStats {
  month: string;
  monthNumber: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  inProgressOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface ILocationStats {
  city: string;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  completionRate: string;
}

export interface IYearlyData {
  year: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

const baseURL = `${PURCHASE_ORDER_BASE_API}/analytics`;

export const orderAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMonthlyStats: builder.query<
      {
        success: boolean;
        data: {
          year: number;
          location: string;
          status: string;
          monthlyData: IMonthlyStats[];
          totals: any;
        };
      },
      { year?: number; location?: string; status?: string }
    >({
      query: ({ year, location, status }) => {
        const params = new URLSearchParams();
        if (year) params.append("year", year.toString());
        if (location) params.append("location", location);
        if (status) params.append("status", status);
        return `${baseURL}/monthly-stats?${params.toString()}`;
      },
      providesTags: ["OrderAnalytics"],
    }),

    getLocationStats: builder.query<
      {
        success: boolean;
        data: {
          year: number;
          month: number | null;
          status: string;
          locations: ILocationStats[];
          totalLocations: number;
        };
      },
      { year?: number; month?: number; status?: string; limit?: number }
    >({
      query: ({ year, month, status, limit }) => {
        const params = new URLSearchParams();
        if (year) params.append("year", year.toString());
        if (month) params.append("month", month.toString());
        if (status) params.append("status", status);
        if (limit) params.append("limit", limit.toString());
        return `${baseURL}/location-stats?${params.toString()}`;
      },
      providesTags: ["OrderAnalytics"],
    }),

    getYearlyComparison: builder.query<
      {
        success: boolean;
        data: {
          years: number[];
          yearlyData: IYearlyData[];
        };
      },
      { years?: string }
    >({
      query: ({ years }) => {
        const params = new URLSearchParams();
        if (years) params.append("years", years);
        return `${baseURL}/yearly-comparison?${params.toString()}`;
      },
      providesTags: ["OrderAnalytics"],
    }),

    getCities: builder.query<
      {
        success: boolean;
        data: {
          cities: string[];
          totalCities: number;
        };
      },
      void
    >({
      query: () => `${baseURL}/cities`,
      providesTags: ["OrderAnalytics"],
    }),
  }),
});

export const {
  useGetMonthlyStatsQuery,
  useGetLocationStatsQuery,
  useGetYearlyComparisonQuery,
  useGetCitiesQuery,
} = orderAnalyticsApi;
