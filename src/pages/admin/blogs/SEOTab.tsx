import React, { useState } from "react";
import { CreateBlogInput } from "@features/api/blogs/types";

interface SEOTabProps {
  formData: CreateBlogInput;
  setFormData: React.Dispatch<React.SetStateAction<CreateBlogInput>>;
}

const SEOTab: React.FC<SEOTabProps> = ({ formData, setFormData }) => {
  const [keywordInput, setKeywordInput] = useState("");

  const updateSEO = (field: string, value: any, nested?: string) => {
    if (nested) {
      setFormData((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          [nested]: {
            // @ts-ignore
            ...prev.seo[nested as keyof typeof prev.seo],
            [field]: value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          [field]: value,
        },
      }));
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      updateSEO("keywords", [...formData.seo.keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (index: number) => {
    const newKeywords = formData.seo.keywords.filter((_, i) => i !== index);
    updateSEO("keywords", newKeywords);
  };

  return (
    <div className="space-y-6">
      {/* Meta Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta Title *
        </label>
        <input
          type="text"
          value={formData.seo.metaTitle}
          onChange={(e) => updateSEO("metaTitle", e.target.value)}
          placeholder="What Are External Links? SEO Guide for Patna Businesses | NetrX Digital"
          maxLength={60}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p
          className={`text-sm mt-1 ${
            formData.seo.metaTitle.length > 60
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {formData.seo.metaTitle.length}/60 characters
        </p>
      </div>

      {/* Meta Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta Description *
        </label>
        <textarea
          value={formData.seo.metaDescription}
          onChange={(e) => updateSEO("metaDescription", e.target.value)}
          rows={3}
          maxLength={160}
          placeholder="Learn what external links are, why they matter for SEO..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p
          className={`text-sm mt-1 ${
            formData.seo.metaDescription.length > 160
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {formData.seo.metaDescription.length}/160 characters
        </p>
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SEO Keywords
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addKeyword())
            }
            placeholder="Add a keyword and press Enter"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.seo.keywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="hover:text-green-600 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Canonical URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Canonical URL
        </label>
        <input
          type="text"
          value={formData.seo.canonicalUrl}
          onChange={(e) => updateSEO("canonicalUrl", e.target.value)}
          placeholder="/blog/what-are-external-links"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Open Graph Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Open Graph (Social Sharing)
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG Title
            </label>
            <input
              type="text"
              value={formData.seo.openGraph.title}
              onChange={(e) => updateSEO("title", e.target.value, "openGraph")}
              placeholder="What Are External Links? SEO Guide for Patna Businesses"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG Description
            </label>
            <textarea
              value={formData.seo.openGraph.description}
              // \<Streaming stoppped because the conversation grew too long for this model\>
              // src/features/blog/SEOTab.tsx (Continued)
              onChange={(e) =>
                updateSEO("description", e.target.value, "openGraph")
              }
              rows={2}
              placeholder="External links act as digital endorsements..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG URL
            </label>
            <input
              type="text"
              value={formData.seo.openGraph.url}
              onChange={(e) => updateSEO("url", e.target.value, "openGraph")}
              placeholder="https://www.netrxdigital.in/blog/what-are-external-links"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG Type
            </label>
            <select
              value={formData.seo.openGraph.type}
              onChange={(e) => updateSEO("type", e.target.value, "openGraph")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="article">Article</option>
              <option value="website">Website</option>
              <option value="blog">Blog</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG Image URL
            </label>
            <input
              type="text"
              value={formData.seo.openGraph.image || ""}
              onChange={(e) => updateSEO("image", e.target.value, "openGraph")}
              placeholder="https://example.com/images/og-image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOTab;
