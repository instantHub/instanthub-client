import { baseApi } from "@features/api";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMostSoldProductsAndBrands: build.query<any, void>({
      query: () => `/api/stats/most-sold`,
    }),
  }),
});

export const { useGetMostSoldProductsAndBrandsQuery } = statsApi;
