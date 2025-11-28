import { baseApi } from "@features/api";
import { IBlogsResponse, IGetBlogsParams } from "./types";

export const blogs = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<IBlogsResponse, IGetBlogsParams | undefined>({
      query: (params = {}) => {
        // IMPROVEMENT: Use URLSearchParams directly for safety and clean code
        const searchParams = new URLSearchParams({
          page: String(params.page ?? 1),
          limit: String(params.limit ?? 10),
        });

        // Loop through optional params and append if present
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && key !== "page" && key !== "limit") {
            searchParams.append(key, String(value));
          }
        });

        return `/api/blogs?${searchParams.toString()}`;
      },
      // IMPROVEMENT: Refined providesTags logic
      providesTags: (result) =>
        result?.data?.blogs
          ? [
              ...result.data.blogs.map(({ _id }) => ({
                type: "Blog" as const, // Use 'as const' for literal type
                id: _id,
              })),
              { type: "Blog", id: "LIST" }, // Using "Blog" for list tag consistency
            ]
          : [{ type: "Blog" as const, id: "LIST" }],
    }),
    // Get single blog by ID
    getBlogById: builder.query({
      query: (id) => `/api/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),

    // Get blog by slug (public)
    getBlogBySlug: builder.query({
      query: (slug) => `/api/blogs/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Blog", id: slug }],
    }),

    // Create new blog with image
    createBlog: builder.mutation({
      query: (blogData) => {
        const formData = new FormData();

        // Append text fields as JSON strings
        formData.append("slug", blogData.slug || "");
        formData.append("seo", JSON.stringify(blogData.seo));
        formData.append("content", JSON.stringify(blogData.content));
        formData.append("status", blogData.status || "draft");

        // Append image if exists
        if (blogData.featuredImage instanceof File) {
          formData.append("featuredImage", blogData.featuredImage);
        }

        return {
          url: "/api/blogs",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "BlogList", id: "LIST" }, "BlogStats"],
    }),

    // Update blog with image
    updateBlog: builder.mutation({
      query: ({ id, ...blogData }) => {
        const formData = new FormData();

        // Append text fields as JSON strings
        if (blogData.slug) formData.append("slug", blogData.slug);
        if (blogData.seo) formData.append("seo", JSON.stringify(blogData.seo));
        if (blogData.content)
          formData.append("content", JSON.stringify(blogData.content));
        if (blogData.status) formData.append("status", blogData.status);

        // Append image if exists and is a File object
        if (blogData.featuredImage instanceof File) {
          formData.append("featuredImage", blogData.featuredImage);
        }

        return {
          url: `/api/blogs/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Blog", id },
        { type: "BlogList", id: "LIST" },
        "BlogStats",
      ],
    }),

    // Delete blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "BlogList", id: "LIST" }, "BlogStats"],
    }),

    // Publish blog
    publishBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blogs/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Blog", id },
        { type: "BlogList", id: "LIST" },
        "BlogStats",
      ],
    }),

    // Archive blog
    archiveBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blogs/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Blog", id },
        { type: "BlogList", id: "LIST" },
        "BlogStats",
      ],
    }),

    // Get blog statistics
    getBlogStats: builder.query({
      query: () => "/api/blogs/stats",
      providesTags: ["BlogStats"],
    }),

    // Get all tags
    getAllTags: builder.query({
      query: () => "/api/blogs/tags",
      providesTags: ["Tags"],
    }),

    // Search blogs
    searchBlogs: builder.query({
      query: ({ q, limit = 10 }) => `/api/blogs/search?q=${q}&limit=${limit}`,
    }),

    // Upload image
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/api/blogs/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  usePublishBlogMutation,
  useArchiveBlogMutation,
  useGetBlogStatsQuery,
  useGetAllTagsQuery,
  useSearchBlogsQuery,
  useUploadImageMutation,
} = blogs;
