import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SEOTab from "./SEOTab";
import {
  useCreateBlogMutation,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "@features/api";
import { CreateBlogInput } from "@features/api/blogs/types";
import { toast } from "react-toastify";
import { ContentTab } from "./ContentTab";
import { ROUTES } from "@routes";

export const BlogEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // RTK Query hooks
  const { data: blogData, isLoading: isFetching } = useGetBlogByIdQuery(id!, {
    skip: !isEditMode,
  });

  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [formData, setFormData] = useState<
    CreateBlogInput & { featuredImage?: File | string }
  >({
    slug: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      canonicalUrl: "",
      openGraph: {
        title: "",
        description: "",
        url: "",
        type: "article",
      },
    },
    content: {
      title: "",
      date: new Date().toISOString().split("T")[0],
      readingTime: "",
      tags: [],
      leadParagraph: "",
      body: "",
    },
    status: "draft",
  });

  // Populate form when editing
  useEffect(() => {
    if (blogData) {
      const blog = blogData;
      setFormData({
        slug: blog.slug,
        seo: blog.seo,
        content: {
          ...blog.content,
          date: new Date(blog.content.date).toISOString().split("T")[0],
        },
        status: blog.status,
        featuredImage: blog.content.featuredImage || undefined,
      });
    }
  }, [blogData]);

  const handleSave = async (status: "draft" | "published") => {
    try {
      // Prepare payload
      const payload: any = {
        slug: formData.slug,
        seo: formData.seo,
        content: {
          title: formData.content.title,
          date: formData.content.date,
          readingTime: formData.content.readingTime,
          tags: formData.content.tags,
          leadParagraph: formData.content.leadParagraph,
          body: formData.content.body,
        },
        status,
      };

      // Add featured image if it's a File object (new upload)
      if (formData.featuredImage instanceof File) {
        payload.featuredImage = formData.featuredImage;
      }

      if (isEditMode) {
        const result = await updateBlog({ id: id!, ...payload }).unwrap();
        toast.success("Blog updated successfully!");
        console.log("Updated blog:", result);
      } else {
        const result = await createBlog(payload).unwrap();
        toast.success("Blog created successfully!");
        navigate(`/admin/blogs/edit/${result._id}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save blog");
      console.error("Save error:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
              {formData.content.title && (
                <p className="text-gray-600 mt-1">{formData.content.title}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(ROUTES.admin.marketing.blogsList)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave("draft")}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Draft"}
              </button>
              <button
                onClick={() => handleSave("published")}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Publishing..." : "Publish"}
              </button>
              <button
                onClick={() => navigate(ROUTES.admin.marketing.blogsList)}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Blogs List
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("content")}
                className={`px-6 py-4 border-b-2 font-medium ${
                  activeTab === "content"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className={`px-6 py-4 border-b-2 font-medium ${
                  activeTab === "seo"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                SEO & Metadata
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "content" ? (
              <ContentTab formData={formData} setFormData={setFormData} />
            ) : (
              <SEOTab formData={formData} setFormData={setFormData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
