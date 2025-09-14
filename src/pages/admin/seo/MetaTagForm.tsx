import { FC, FormEvent, useState } from "react";
import {
  useUpdateCategoryMetaTagsMutation,
  useUpdateBrandMetaTagsMutation,
  useUpdateProductMetaTagsMutation,
} from "@api";
import { IMetaTagsPayload } from "@features/api/seoApi/types";
import { Typography } from "@components/general";
import { generateCanonicalUrl } from "@utils/general";
import { ISelectedURLs } from "./MetaTags";

interface IMetaTagsFormProps {
  type: "category" | "brand" | "product";
  title: string;
  uniqueURL: string;
  selectedURLS: ISelectedURLs;
}

export const MetaTagsForm: FC<IMetaTagsFormProps> = ({
  type,
  title,
  uniqueURL,
  selectedURLS,
}) => {
  const [formData, setFormData] = useState<IMetaTagsPayload>({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    canonicalUrl: "",
  });

  const [keywordInput, setKeywordInput] = useState("");

  const [updateCategory] = useUpdateCategoryMetaTagsMutation();
  const [updateBrand] = useUpdateBrandMetaTagsMutation();
  const [updateProduct] = useUpdateProductMetaTagsMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { uniqueURL, data: formData };
    console.log("Submitting payload:", payload);

    try {
      if (type === "category") await updateCategory(payload).unwrap();
      if (type === "brand") await updateBrand(payload).unwrap();
      if (type === "product") await updateProduct(payload).unwrap();
      alert("Meta tags updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update meta tags");
    }
  };

  const [canonicalUrl, setCanonicalUrl] = useState("");

  const handleGenerateCanonical = () => {
    try {
      const url = generateCanonicalUrl({
        categorySlug: selectedURLS.categoryUniqueURL,
        brandSlug: selectedURLS.brandUniqueURL,
        productSlug: selectedURLS.productUniqueURL,
        type,
      });
      setCanonicalUrl(url);
      setFormData((prev) => ({ ...prev, canonicalUrl: url }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <Typography variant="h4">{title}</Typography>
        <div>
          <label className="block font-medium">Meta Title</label>
          <input
            type="text"
            maxLength={60}
            value={formData.metaTitle}
            onChange={(e) =>
              setFormData({ ...formData, metaTitle: e.target.value })
            }
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Meta Description</label>
          <textarea
            maxLength={160}
            value={formData.metaDescription}
            onChange={(e) =>
              setFormData({ ...formData, metaDescription: e.target.value })
            }
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Meta Keywords</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className="border border-gray-300 rounded p-2 flex-1"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();

                if (keywordInput.trim()) {
                  setFormData({
                    ...formData,
                    metaKeywords: [
                      ...formData.metaKeywords,
                      keywordInput.trim(),
                    ],
                  });
                  setKeywordInput("");
                }
              }}
              className="bg-blue-500 text-white px-4 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap mt-2 gap-2">
            {formData.metaKeywords.map((keyword, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      metaKeywords: formData.metaKeywords.filter(
                        (_, i) => i !== idx
                      ),
                    })
                  }
                >
                  ❌
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Canonical URL</label>
          <input
            type="url"
            value={canonicalUrl}
            className="border border-gray-300 rounded p-2 w-full"
            disabled
          />
          <button
            type="button"
            onClick={handleGenerateCanonical}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Generate Canonical URL
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Save Meta Tags
        </button>
      </form>
    </div>
  );
};
