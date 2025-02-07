import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const processorApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  }),
  reducerPath: "processorApi",
  tagTypes: ["Processors"],
  endpoints: (build) => ({
    getAllProcessors: build.query({
      query: () => "/api/processors",
      providesTags: ["Processors"],
    }),
  }),
});

export const { useGetAllProcessorsQuery } = processorApi;
