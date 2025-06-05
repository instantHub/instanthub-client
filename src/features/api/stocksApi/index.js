import { baseApi } from "@features/api";

export const stocksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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
