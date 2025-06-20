import { useState, useEffect, FC } from "react";
import { TestimonialForm } from "./TestimonialForm";
import {
  ITestimonial,
  ITestimonialResponse,
} from "@features/api/testimonialsApi/types";
import {
  useDeleteTestimonialMutation,
  useLazyGetTestimonialsQuery,
  useToggleTestimonialFeaturedMutation,
  useToggleTestimonialStatusMutation,
} from "@features/api";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  AstroIcon,
  DeleteForeverIcon,
  EditIcon,
  Eye,
  EyeOff,
  PlusIcon,
  SearchIcon,
} from "@icons";
import { Button, FlexBox, Typography } from "@components/general";

export const TestimonialList: FC = () => {
  const [getTestimonialsAdmin, { data: testimonials, isLoading }] =
    useLazyGetTestimonialsQuery();

  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [toggleStatus] = useToggleTestimonialStatusMutation();
  const [toggleFeatured] = useToggleTestimonialFeaturedMutation();

  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<
    ITestimonial | undefined
  >();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, [currentPage, searchTerm]);

  const fetchTestimonials = async () => {
    try {
      const result = await getTestimonialsAdmin({
        page: currentPage,
        limit: 10,
        search: searchTerm,
      });

      if (result.data) {
        const response: ITestimonialResponse = result.data;
        setTotalPages(response.totalPages);
        setTotal(response.total);
      } else {
        throw new Error("Failed to fetch testimonials");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch testimonials"
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    try {
      await deleteTestimonial(id);
      fetchTestimonials();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete testimonial"
      );
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus({ id });
      fetchTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle status");
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await toggleFeatured({ id });
      fetchTestimonials();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to toggle featured"
      );
    }
  };

  const handleEdit = (testimonial: ITestimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(undefined);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTestimonial(undefined);
  };

  const handleFormSave = () => {
    fetchTestimonials();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <AstroIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <FlexBox className="justify-between mb-4">
          <Typography variant="h2" color="text-gray-700">
            Testimonials Management
          </Typography>
          <Button leftIcon={<PlusIcon />} onClick={handleAdd}>
            Add Testimonial
          </Button>
        </FlexBox>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <div className="text-sm text-gray-600">
            Total: {total} testimonials
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="max-w-[450px] sm:max-w-screen-14inch mx-auto bg-white rounded-lg shadow overflow-hidden ">
            <div
              className="overflow-x-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Person
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Testimonial
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testimonials?.testimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {testimonial.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 text-sm font-medium text-gray-900">
                            {testimonial.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {testimonial.testimonial}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {renderStars(testimonial.rating)}
                          <span className="ml-2 text-sm text-gray-600">
                            ({testimonial.rating})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              testimonial.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {testimonial.isActive ? "Active" : "Inactive"}
                          </span>
                          {testimonial.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                            title="Edit"
                          >
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(testimonial.id)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title={
                              testimonial.isActive ? "Deactivate" : "Activate"
                            }
                          >
                            {testimonial.isActive ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleToggleStatus(testimonial.id)}
                            className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                            title={
                              testimonial.featured
                                ? "Remove from featured"
                                : "Mark as featured"
                            }
                          >
                            <AstroIcon
                              className={`w-4 h-4 ${
                                testimonial.featured ? "fill-current" : ""
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete"
                          >
                            <DeleteForeverIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {testimonials?.testimonials.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  No testimonials found
                </div>
                <button
                  onClick={handleAdd}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add First Testimonial
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md">
                  {currentPage}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {showForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}
    </div>
  );
};
