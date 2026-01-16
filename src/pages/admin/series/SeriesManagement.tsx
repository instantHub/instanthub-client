import { useState, FormEvent, ChangeEvent } from "react";
import {
  useGetCategoriesQuery,
  useCreateSeriesMutation,
  useGetAllBrandQuery,
  useGetAllSeriesQuery,
  useDeleteSeriesMutation,
} from "@api";
import { toast } from "react-toastify";
import { SeriesCard } from "./SeriesCard";
import { IBrandResponse } from "@features/api/brands/types";
import { ICategoryResponse } from "@features/api/categories/types";
import { ISeriesResponse } from "@features/api/seriesApi/types";
import { Loader, PlusIcon, SquaresIntersectIcon } from "lucide-react";

// Types
interface CreateSeriesResponse {
  success: boolean;
  message: string;
  data?: string;
}

interface SeriesFormData {
  category: string;
  brand: string;
  name: string;
}

export const SeriesManagement = () => {
  // API Hooks
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const { data: brandData, isLoading: brandLoading } = useGetAllBrandQuery();
  const { data: seriesData, isLoading: seriesLoading } = useGetAllSeriesQuery();
  const [createSeries, { isLoading: isCreating }] = useCreateSeriesMutation();
  const [deleteSeries] = useDeleteSeriesMutation();

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [seriesName, setSeriesName] = useState<string>("");

  // Modal State
  const [seriesToDelete, setSeriesToDelete] = useState<string>("");

  // UI State
  const [isFormExpanded, setIsFormExpanded] = useState<boolean>(true);

  // Filter brands based on selected category
  const filteredBrands =
    brandData?.filter(
      (brand: IBrandResponse) => brand?.category?._id === selectedCategory
    ) || [];

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(e.target.value);
    setSelectedBrand(""); // Reset brand when category changes
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const seriesFormData: SeriesFormData = {
      category: selectedCategory,
      brand: selectedBrand,
      name: seriesName,
    };

    try {
      const seriesCreated: CreateSeriesResponse = await createSeries(
        seriesFormData
      ).unwrap();

      if (
        !seriesCreated.success &&
        seriesCreated.data === "Duplicate SeriesName"
      ) {
        toast.error(seriesCreated.message);
        return;
      }

      toast.success("Series created successfully!");
      // Reset form
      setSeriesName("");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create series";
      toast.error(errorMessage);
      console.error("Error:", error);
    }
  };

  const handleDelete = async (seriesId: string): Promise<void> => {
    try {
      if (
        confirm(
          "Are you sure you want to delete this series? This action cannot be undone."
        )
      ) {
        const deletedSeries: any = await deleteSeries(seriesId);
        toast.success(deletedSeries.message);
      }
    } catch (error) {
      console.error("Error while deleting Series:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete series";
      toast.error(errorMessage);
    }
  };

  const resetForm = (): void => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSeriesName("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <SquaresIntersectIcon />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Series Management
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Create and manage product series
                </p>
              </div>
            </div>

            {/* Mobile toggle for form */}
            <button
              type="button"
              onClick={() => setIsFormExpanded(!isFormExpanded)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <PlusIcon
                className={`w-4 h-4 transition-transform ${
                  isFormExpanded ? "rotate-180" : ""
                }`}
              />
              {isFormExpanded ? "Hide Form" : "Add Series"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Create Series Form - Sidebar on large screens */}
          <div
            className={`lg:col-span-4 xl:col-span-3 ${
              isFormExpanded ? "block" : "hidden"
            } lg:block mb-6 lg:mb-0`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:sticky lg:top-24">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 sm:px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <PlusIcon size={18} />
                  Create New Series
                </h2>
                <p className="text-indigo-100 text-sm mt-1">
                  Add a new series to your catalog
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
                {/* Category Select */}
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      disabled={categoryLoading}
                      required
                      className="block w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {categoryLoading ? "Loading..." : "Select a category"}
                      </option>
                      {categoryData?.map((category: ICategoryResponse) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Brand Select */}
                <div className="space-y-2">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Brand
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="brand"
                      name="brand"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      disabled={brandLoading || !selectedCategory}
                      required
                      className="block w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!selectedCategory
                          ? "Select a category first"
                          : brandLoading
                          ? "Loading..."
                          : filteredBrands.length === 0
                          ? "No brands available"
                          : "Select a brand"}
                      </option>
                      {filteredBrands.map((brand: IBrandResponse) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Series Name Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="seriesName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Series Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="seriesName"
                    value={seriesName}
                    onChange={(e) => setSeriesName(e.target.value)}
                    placeholder="Enter series name"
                    required
                    className="block w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder:text-gray-400"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? (
                      <>
                        <Loader />
                        Creating...
                      </>
                    ) : (
                      <>
                        <PlusIcon size={14} className="mr-2" />
                        Create Series
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Series List - Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* List Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  All Series
                </h2>
                {seriesData && seriesData.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Showing {seriesData.length} series
                  </p>
                )}
              </div>

              {/* Stats Cards */}
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                  <span className="text-sm font-medium text-indigo-700">
                    {seriesData?.length || 0} Total
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-green-700">
                    {categoryData?.length || 0} Categories
                  </span>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {seriesLoading ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
                  <p className="mt-4 text-sm text-gray-500">
                    Loading series...
                  </p>
                </div>
              </div>
            ) : seriesData && seriesData.length > 0 ? (
              /* Series Grid */
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {seriesData.map((series: ISeriesResponse) => (
                  <SeriesCard
                    key={series._id}
                    data={series}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No series yet
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm mb-6">
                    Get started by creating your first series using the form{" "}
                    <span className="hidden lg:inline">on the left</span>
                    <span className="lg:hidden">above</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsFormExpanded(true)}
                    className="lg:hidden inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Create Your First Series
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesManagement;
