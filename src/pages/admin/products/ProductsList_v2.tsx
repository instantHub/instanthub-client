import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  RefreshCw,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Package,
} from "lucide-react";
import { useGetAllProductsQuery, useGetPendingPricingQuery } from "@api";
import { useGetCategoriesQuery } from "@api";
import { Button, FlexBox } from "@components/general";
import { Loading } from "@components/user";
import { ProductCard } from "./components/ProductCard";
import { ROUTES } from "@routes";
import { useDebounce } from "@hooks";
import { ProductCard2 } from "./components/ProductCard_v2";

export const ProductsList2: React.FC = () => {
  // Filter states
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const limit = 20;

  // Debounce search for better performance
  const debouncedSearch = useDebounce(search, 500);

  // Fetch data
  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching,
    refetch,
  } = useGetAllProductsQuery({
    page,
    limit,
    search: debouncedSearch,
    categoryId,
    status,
  });

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: pendingPricingData } = useGetPendingPricingQuery();

  // Memoized pending pricing lookup
  const pendingPricingMap = useMemo(() => {
    if (!pendingPricingData) return new Map();
    return new Map(pendingPricingData.map((item) => [item.productName, item]));
  }, [pendingPricingData]);

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategoryId("");
    setStatus("");
    setPage(1);
  };

  const hasActiveFilters = search || categoryId || status;

  if (productsLoading) return <Loading />;

  const products = productsData?.data.products || [];
  const pagination = productsData?.data.pagination;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pending Pricing Alert */}
      {pendingPricingData && pendingPricingData.length > 0 && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <FlexBox gap={2} align="center">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">
                {pendingPricingData.length} product
                {pendingPricingData.length !== 1 ? "s" : ""} pending pricing
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Some products need variant pricing configuration
              </p>
            </div>
          </FlexBox>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <FlexBox justify="between" align="center" className="mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-sm text-gray-600 mt-1">
                {pagination?.totalProducts || 0} total products
              </p>
            </div>

            <FlexBox gap={2}>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                leftIcon={
                  <RefreshCw
                    size={16}
                    className={isFetching ? "animate-spin" : ""}
                  />
                }
                className="hidden sm:flex"
              >
                Refresh
              </Button>
              <Link to={ROUTES.admin.createProduct}>
                <Button size="sm" leftIcon={<Plus size={16} />}>
                  <span className="hidden sm:inline">Create Product</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </Link>
            </FlexBox>
          </FlexBox>

          <FlexBox justify="evenly" gap={2} className="max-md:flex-col">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products by name or URL..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {search && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mt-3 w-full sm:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter size={16} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {[search, categoryId, status].filter(Boolean).length}
                </span>
              )}
            </button>

            {/* Filters */}
            <div
              className={`mt-3 ${showFilters ? "block" : "hidden"} sm:block`}
            >
              <FlexBox gap={2} className="flex-wrap">
                {/* Category Filter */}
                <select
                  value={categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categoriesData?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    leftIcon={<X size={16} />}
                  >
                    Clear Filters
                  </Button>
                )}
              </FlexBox>
            </div>
          </FlexBox>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {products.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters
                ? "Try adjusting your filters or search query."
                : "Get started by creating your first product."}
            </p>
            {hasActiveFilters ? (
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            ) : (
              <Link to={ROUTES.admin.createProduct}>
                <Button leftIcon={<Plus size={16} />}>Create Product</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard2
                key={product.id}
                product={product}
                isPricingPending={pendingPricingMap.get(product.name)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 bg-white rounded-lg p-4 shadow-sm">
            <FlexBox
              justify="between"
              align="center"
              className="flex-wrap gap-4"
            >
              <p className="text-sm text-gray-600">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(
                  pagination.page * pagination.limit,
                  pagination.totalProducts
                )}{" "}
                of {pagination.totalProducts} products
              </p>

              <FlexBox gap={2}>
                <Button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrevPage}
                  variant="outline"
                  size="sm"
                  leftIcon={<ChevronLeft size={16} />}
                >
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                {/* Page Numbers */}
                <FlexBox gap={1} className="hidden md:flex">
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum: number;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            pageNum === pagination.page
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </FlexBox>

                {/* Mobile Page Indicator */}
                <div className="md:hidden px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                  {pagination.page} / {pagination.totalPages}
                </div>

                <Button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!pagination.hasNextPage}
                  variant="outline"
                  size="sm"
                  rightIcon={<ChevronRight size={16} />}
                >
                  <span className="hidden sm:inline">Next</span>
                </Button>
              </FlexBox>
            </FlexBox>
          </div>
        )}
      </div>
    </div>
  );
};
