import { baseApi } from "@features/api";

export const processorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProcessors: build.query({
      query: () => "/api/processors",
      providesTags: ["Processors"],
    }),
  }),
});

export const { useGetAllProcessorsQuery } = processorApi;
