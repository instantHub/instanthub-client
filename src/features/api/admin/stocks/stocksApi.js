import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stocksApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  }),
  reducerPath: "stocksApi",
  tagTypes: ["Stocks"],
  endpoints: (build) => ({
    // Stocks
    getStocks: build.query({
      query: () => `/api/stocks`,
      providesTags: ["Stocks"],
    }),
    stockSold: build.mutation({
      query: (data) => ({
        url: `/api/stocks/stock-sold`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Stocks"],
    }),
  }),
});

export const { useGetStocksQuery, useStockSoldMutation } = stocksApi;
