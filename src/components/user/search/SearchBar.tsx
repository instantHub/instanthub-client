import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useSearchProductsQuery } from "@api";
import { IProductResponse } from "@features/api/productsApi/types";

export const SearchBar = memo(() => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch products only when debounced search has value
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useSearchProductsQuery(
    { search: debouncedSearch, page: 1, limit: 6 },
    { skip: !debouncedSearch || debouncedSearch.length < 2 }
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show dropdown when focused or has search text
  useEffect(() => {
    setIsOpen(isFocused || search.length > 0);
  }, [isFocused, search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearch = useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
    inputRef.current?.focus();
  }, []);

  const saveRecentSearch = useCallback(
    (term: string) => {
      const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(
        0,
        5
      );
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    },
    [recentSearches]
  );

  const handleProductClick = useCallback(
    (product: IProductResponse) => {
      const url = `${product.category.uniqueURL}/${product.brand.uniqueURL}/${product.uniqueURL}`;
      saveRecentSearch(product.name);
      navigate(url);
      setSearch("");
      setIsOpen(false);
      setIsFocused(false);
    },
    [navigate, saveRecentSearch]
  );

  const handleRecentSearchClick = useCallback((term: string) => {
    setSearch(term);
    inputRef.current?.focus();
  }, []);

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes("laptop"))
      return <Laptop size={18} className="text-purple-600" />;
    if (name.includes("mobile") || name.includes("phone"))
      return <Smartphone size={18} className="text-blue-600" />;
    if (name.includes("tablet"))
      return <Tablet size={18} className="text-cyan-600" />;
    if (name.includes("monitor"))
      return <Monitor size={18} className="text-indigo-600" />;
    return <Smartphone size={18} className="text-gray-600" />;
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={index}
              className="bg-yellow-200 text-gray-900 font-semibold px-0.5"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const popularSearches = [
    "iPhone 15",
    "MacBook Pro",
    "Samsung Galaxy",
    "iPad Air",
    "Dell XPS",
  ];

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div
        className={`
          relative flex items-center bg-white rounded-xl
          transition-all duration-300
          ${
            isFocused
              ? "ring-2 ring-purple-500 shadow-lg shadow-instant-mid/50"
              : "border border-gray-200 hover:border-purple-300 shadow-sm"
          }
        `}
      >
        <div className="absolute left-3 md:left-4">
          <Search
            size={20}
            className={isFocused ? "text-purple-600" : "text-gray-400"}
          />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          placeholder="Search iPhone, MacBook, Samsung..."
          className="
            w-full py-2.5 md:py-3 pl-10 md:pl-12 pr-10 md:pr-12
            bg-transparent text-gray-900 
            placeholder:text-gray-400
            focus:outline-none
            text-sm md:text-base
          "
          aria-label="Search products"
        />

        {/* Loading Spinner or Clear Button */}
        <div className="absolute right-3 md:right-4">
          {isFetching ? (
            <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
          ) : search ? (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div
          className="
            absolute top-full left-0 right-0 mt-2 
            bg-white rounded-xl shadow-2xl 
            border border-purple-100
            max-h-[70vh] md:max-h-[500px] overflow-hidden
            z-50 animate-slideDown
          "
        >
          {/* Loading State */}
          {isLoading && debouncedSearch && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-500 font-medium">
                  Searching...
                </p>
              </div>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && debouncedSearch && productsData && (
            <>
              {productsData?.products?.length > 0 ? (
                <div className="overflow-y-auto max-h-[calc(70vh-60px)] md:max-h-[440px] custom-scrollbar">
                  {/* Results Header */}
                  <div className="sticky top-0 bg-gradient-to-r from-purple-50 via-purple-50 to-blue-50 px-4 py-3 border-b border-purple-100 z-10">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <TrendingUp size={16} className="text-purple-600" />
                        {productsData.totalProducts} results found
                      </p>
                      {productsData.totalProducts > 6 && (
                        <span className="text-xs text-gray-500">
                          Showing top 6
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product List */}
                  <div className="p-2">
                    {productsData.products.map((product, index) => (
                      <button
                        key={`${product.uniqueURL}-${index}`}
                        onClick={() => handleProductClick(product)}
                        className="
                          w-full flex items-center gap-3 py-3 px-1 lg:px-3
                          hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50
                          rounded-lg transition-all duration-200
                          text-left group
                        "
                      >
                        {/* Icon */}
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl group-hover:scale-110 transition-transform">
                          {getCategoryIcon(product.category.name)}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                            {highlightText(product.name, search)}
                          </p>
                          <p className="text-[11px] lg:text-xs text-gray-500 mt-0.5">
                            in {product.category.name}
                          </p>
                        </div>

                        {/* Arrow Icon */}
                        <div className="flex-shrink-0 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all">
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // No Results
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search size={28} className="text-gray-400" />
                  </div>
                  <p className="text-gray-900 font-semibold mb-1">
                    No results found
                  </p>
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Try different keywords or check spelling
                  </p>
                </div>
              )}
            </>
          )}

          {/* Popular & Recent Searches (when no active search) */}
          {!debouncedSearch && (
            <div className="p-4 space-y-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-gray-500" />
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Recent Searches
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(term)}
                        className="
                          px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm
                          hover:bg-purple-100 hover:text-purple-700
                          transition-colors duration-200
                          flex items-center gap-1.5
                        "
                      >
                        <Clock size={14} />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-purple-600" />
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Popular Searches
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearch(term)}
                      className="
                        px-3 py-1.5 bg-gradient-to-r from-purple-50 to-blue-50 
                        text-purple-700 rounded-full text-sm font-medium
                        hover:from-purple-100 hover:to-blue-100
                        hover:shadow-md
                        transition-all duration-200
                        flex items-center gap-1.5
                      "
                    >
                      <TrendingUp size={14} />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
});

SearchBar.displayName = "SearchBar";
