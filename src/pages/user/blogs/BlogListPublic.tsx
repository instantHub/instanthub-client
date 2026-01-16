import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useGetBlogsQuery } from "@features/api";

export const BlogListPublic: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag") || "";

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBlogsQuery({
    page,
    limit: 9,
    status: "published",
    tags: tagFilter,
  });

  const blogs = data?.blogs || [];
  const pagination = data?.pagination;

  return (
    <>
      <Helmet>
        <title>Blog - Learn SEO, Digital Marketing & More</title>
        <meta
          name="description"
          content="Read our latest blog posts on SEO, digital marketing, and web development. Expert insights and practical tips."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        {/* <div className="bg-gradient-to-r from-instant-start via-instant-mid to-instant-end text-white py-16"> */}
        <div className="pt-8">
          <div className="max-w- mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blogs</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Insights, tips, and strategies to help you grow your business
              online
            </p>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 py-12">
          {/* Tag Filter */}
          {tagFilter && (
            <div className="mb-8 flex items-center gap-4">
              <span className="text-gray-600">Filtered by tag:</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                {tagFilter}
              </span>
              <Link
                to="/blogs"
                className="text-blue-600 hover:text-blue-700 text-sm underline"
              >
                Clear filter
              </Link>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No blogs found</p>
            </div>
          ) : (
            <>
              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog.slug}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    {/* Featured Image */}
                    {blog.content.featuredImage ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL +
                            blog.content.featuredImage
                          }
                          alt={blog.content.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white opacity-50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.content.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {blog.content.title}
                      </h2>

                      {/* Lead Paragraph */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {blog.content.leadParagraph}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <time>
                          {new Date(blog.content.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </time>
                        <span>{blog.content.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex gap-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {[...Array(pagination.pages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPage(idx + 1)}
                        className={`px-4 py-2 rounded-lg ${
                          page === idx + 1
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === pagination.pages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
