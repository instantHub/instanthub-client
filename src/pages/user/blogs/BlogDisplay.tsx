import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useGetBlogBySlugQuery } from "@features/api";
import {
  Calendar,
  Calendar1,
  CalendarClock,
  CalendarCog,
  Clock,
  Eye,
} from "lucide-react";

export const BlogDisplay: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading, error } = useGetBlogBySlugQuery(slug!);

  useEffect(() => {
    // Scroll to top when blog loads
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The blog post you're looking for doesn't exist.
        </p>
        <Link
          to="/blogs"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View All Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{blog.seo.metaTitle}</title>
        <meta name="description" content={blog.seo.metaDescription} />
        <meta name="keywords" content={blog.seo.keywords.join(", ")} />
        <link rel="canonical" href={blog.seo.canonicalUrl} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={blog.seo.openGraph.title} />
        <meta
          property="og:description"
          content={blog.seo.openGraph.description}
        />
        <meta property="og:url" content={blog.seo.openGraph.url} />
        <meta property="og:type" content={blog.seo.openGraph.type} />
        {blog.seo.openGraph.image && (
          <meta property="og:image" content={blog.seo.openGraph.image} />
        )}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.seo.openGraph.title} />
        <meta
          name="twitter:description"
          content={blog.seo.openGraph.description}
        />
        {blog.seo.openGraph.image && (
          <meta name="twitter:image" content={blog.seo.openGraph.image} />
        )}
      </Helmet>

      {/* Blog Content */}
      <article className="blog-page-wrapper">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/blogs" className="hover:text-blue-600">
                Blogs
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {blog.content.title}
            </li>
          </ol>
        </nav>

        {/* Blog Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.content.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center max-md:justify-around gap-4 max-md:gap-0 text-gray-600 text-sm mb-6">
            <div className="flex items-center gap-1 lg:gap-2">
              <Calendar size={18} />
              <time dateTime={blog.content.date}>
                {new Date(blog.content.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 lg:gap-2">
              <Clock size={18} />
              <span>{blog.content.readingTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 lg:gap-2">
              <Eye size={18} />
              <span>{blog.views} views</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog.content.tags.map((tag: string, index: number) => (
              <Link
                key={index}
                to={`/blogs?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs lg:text-sm hover:bg-blue-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        {blog.content.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden max-sm:block hidden">
            <img
              src={
                import.meta.env.VITE_APP_BASE_URL + blog.content.featuredImage
              }
              alt={blog.content.title}
              className="w-full h-auto object-cover "
            />
          </div>
        )}

        {blog.content.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden max-sm:hidden">
            {/* NEW: Aspect Ratio Wrapper */}
            <div className="relative aspect-video">
              <img
                src={
                  import.meta.env.VITE_APP_BASE_URL + blog.content.featuredImage
                }
                alt={blog.content.title}
                // NEW: Fill the relative container
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Lead Paragraph */}
        <p className="text-[16px] lg:text-lg text-gray-600 mb-4 leading-relaxed font-light">
          {/* <p className="blog-section-intro"> */}
          {blog.content.leadParagraph}
        </p>

        {/* Main Content */}
        <article
          //   className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content.body }}
        />

        {/* Author Info */}
        {blog.author && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {blog.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-600">Written by</p>
                <p className="text-lg font-semibold text-gray-900">
                  {blog.author.name}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Share Buttons */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-4">
            Share this article:
          </p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}&text=${encodeURIComponent(blog.content.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Back to Blogs */}
        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Blogs
          </Link>
        </div>
      </article>
    </>
  );
};
