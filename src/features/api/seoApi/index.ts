import { baseApi } from "@features/api";
import { IMetaTagsPayload } from "./types";

export const seoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateCategoryMetaTags: build.mutation<
      any,
      { uniqueURL: string; data: IMetaTagsPayload }
    >({
      query: ({ uniqueURL, data }) => ({
        url: `/api/seo/category/${uniqueURL}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateBrandMetaTags: build.mutation<
      any,
      { uniqueURL: string; data: IMetaTagsPayload }
    >({
      query: ({ uniqueURL, data }) => ({
        url: `/api/seo/brand/${uniqueURL}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateProductMetaTags: build.mutation<
      any,
      { uniqueURL: string; data: IMetaTagsPayload }
    >({
      query: ({ uniqueURL, data }) => ({
        url: `/api/seo/product/${uniqueURL}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useUpdateCategoryMetaTagsMutation,
  useUpdateBrandMetaTagsMutation,
  useUpdateProductMetaTagsMutation,
} = seoApi;
