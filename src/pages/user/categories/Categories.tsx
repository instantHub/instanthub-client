import { Link, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "@api";
import { ICategoryResponse } from "@features/api/categories/types";
import { memo, useCallback } from "react";

export const Categories = memo(() => {
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (category: ICategoryResponse): void => {
      navigate(`${category.uniqueURL}`, {
        state: { categoryId: category.id },
      });
    },
    [navigate]
  );

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 max-sm:text-xl">
          Ready to sell?{" "}
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-gradient">
            Let's turn your gadgets into cash!
          </span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-3 max-w-2xl mx-auto">
          Choose your device category below and get an instant quote
        </p>
      </div>

      {/* Categories Grid */}
      <div
        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-6"
        style={{ minHeight: "200px" }} // Prevent layout shift
      >
        {categoriesLoading ? (
          // Skeleton Loaders
          <>
            {[...Array(12)].map((_, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-2xl shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </div>
                <div className="mt-3 h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
              </div>
            ))}
          </>
        ) : (
          <>
            {/* Category Cards */}
            {categories?.map((category, index) => (
              <div
                key={category.id}
                className="group justify-items-center"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => handleNavigate(category)}
                  className="relative grid w-24 lg:w-32 aspect-square bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-purple-200 group-hover:scale-105"
                  aria-label={`Sell ${category.name}`}
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Image Container */}
                  <div className="relative w-24 lg:w-32 h-24 lg:h-32 p-4 flex items-center justify-center">
                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URL}${
                        category?.image
                      }`}
                      alt={category?.name || "Category"}
                      className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      width="70"
                      height="60"
                    />
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Category Badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
                    <p className="text-white font-semibold text-sm truncate">
                      {category.name}
                    </p>
                  </div>
                </button>

                {/* Category Name (Below Card) */}
                <p className="mt-3 text-center text-sm md:text-base font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                  {category.name}
                </p>
              </div>
            ))}

            {/* Recycle Category Card */}
            <div
              className="group justify-items-center"
              style={{ animationDelay: `${categories.length * 0.05}s` }}
            >
              <Link
                to="/recycle/categories"
                className="relative block w-24 lg:w-32 aspect-square bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-green-200 hover:border-green-400 group-hover:scale-105"
                aria-label="Recycle your devices"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Recycle Icon/Image */}
                <div className="relative w-24 lg:w-32 h-24 lg:h-32 p-4 flex items-center justify-center">
                  <img
                    src="/images/recycle1.png"
                    alt="Recycle your devices"
                    className="w-24 lg:w-32 h-24 lg:h-32 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                    width="128"
                    height="128"
                    loading="lazy"
                  />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  ECO
                </div>

                {/* Label Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
                  <p className="text-white font-semibold text-sm">
                    Recycle Now
                  </p>
                </div>
              </Link>

              {/* Category Name */}
              <p className="mt-3 text-center text-sm md:text-base font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                Recycle
              </p>
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA Section */}
      {!categoriesLoading && categories.length > 0 && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full border border-purple-200">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <p className="text-sm md:text-base text-gray-700">
              <span className="font-semibold text-purple-600">
                {categories.length + 1}
              </span>{" "}
              categories available
            </p>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
});

Categories.displayName = "Categories";
