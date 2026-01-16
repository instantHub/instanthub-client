// src/components/BlogCarouselCards.tsx
import { useGetBlogsQuery } from "@features/api";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BlogCarouselCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading } = useGetBlogsQuery({
    page: 1,
    limit: 6,
    status: "published",
    sortBy: "createdAt",
    order: "desc",
  });

  const blogs = data?.blogs || [];
  const itemsPerView = 3; // Show 3 cards at a time

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(blogs.length - itemsPerView, prev + 1));
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg h-96 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!blogs.length) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="flex items-center justify-center lg:justify-between px-8 mb-8 max-md:text-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Latest Blog Posts
          </h2>
          <p className="text-gray-600">
            Insights, tips, and strategies to help you succeed
          </p>
        </div>
        <Link
          to="/blogs"
          className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          View All Blogs
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className="p-2 lg:p-10 flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
            >
              <Link
                to={`/blog/${blog.slug}`}
                className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {blog.content.featuredImage ? (
                    <img
                      src={
                        import.meta.env.VITE_APP_BASE_URL +
                        blog.content.featuredImage
                      }
                      alt={blog.content.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-sm font-medium rounded-full">
                      {blog.content.tags[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.content.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.content.leadParagraph}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time>
                      {new Date(blog.content.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span>{blog.content.readingTime}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {blogs.length > itemsPerView && (
          <>
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:shadow-xl text-gray-800 p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              disabled={currentIndex >= blogs.length - itemsPerView}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:shadow-xl text-gray-800 p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Mobile View All Link */}
      <div className="mt-8 text-center md:hidden">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          View All Blogs
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCarouselCards;
