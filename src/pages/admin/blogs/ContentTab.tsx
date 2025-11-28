import React, { useState } from "react";
import { CreateBlogInput } from "@features/api/blogs/types";

interface ContentTabProps {
  formData: CreateBlogInput & { featuredImage?: File | string };
  setFormData: React.Dispatch<
    React.SetStateAction<CreateBlogInput & { featuredImage?: File | string }>
  >;
}

export const ContentTab: React.FC<ContentTabProps> = ({
  formData,
  setFormData,
}) => {
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    typeof formData.featuredImage === "string" ? formData.featuredImage : null
  );

  const updateContent = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const updateSlug = (value: string) => {
    setFormData((prev) => ({ ...prev, slug: value }));
  };

  const addTag = () => {
    if (tagInput.trim()) {
      updateContent("tags", [...formData.content.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = formData.content.tags.filter((_, i) => i !== index);
    updateContent("tags", newTags);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, PNG, or WEBP images are allowed!");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should not exceed 5MB");
      return;
    }

    // Store the File object
    setFormData((prev) => ({
      ...prev,
      featuredImage: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: undefined,
    }));
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      {/* URL Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Slug *
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => updateSlug(e.target.value)}
          placeholder="what-are-external-links"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">
          Will be used in URL: /blog/{formData.slug || "your-slug"}
        </p>
      </div>

      {/* Main Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blog Title *
        </label>
        <input
          type="text"
          value={formData.content.title}
          onChange={(e) => updateContent("title", e.target.value)}
          placeholder="What Are External Links? A Complete SEO Guide..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Date and Reading Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publication Date *
          </label>
          <input
            type="date"
            value={formData.content.date}
            onChange={(e) => updateContent("date", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reading Time *
          </label>
          <input
            type="text"
            value={formData.content.readingTime}
            onChange={(e) => updateContent("readingTime", e.target.value)}
            placeholder="10 min read"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
            placeholder="Add a tag and press Enter"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.content.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-blue-600 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Featured Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Image
        </label>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              cursor-pointer"
          />
          <p className="text-sm text-gray-500">
            Accepted formats: JPG, PNG, WEBP (Max 5MB)
          </p>

          {imagePreview && (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-48 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lead Paragraph */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lead Paragraph (Introduction) *
        </label>
        <textarea
          value={formData.content.leadParagraph}
          onChange={(e) => updateContent("leadParagraph", e.target.value)}
          rows={4}
          placeholder="The compelling introduction that appears first..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">
          This will be styled as the lead paragraph with larger text
        </p>
      </div>

      {/* Main Content Body */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blog Content (HTML) *
        </label>
        <textarea
          value={formData.content.body}
          onChange={(e) => updateContent("body", e.target.value)}
          rows={20}
          placeholder="Write your blog content here with HTML formatting..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
        <p className="text-sm text-gray-500 mt-1">
          You can use HTML tags: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;,
          &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a&gt;
        </p>
      </div>
    </div>
  );
};
