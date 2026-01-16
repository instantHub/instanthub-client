import {
  useEffect,
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { useUpdateBrandMutation, useGetSingleBrandQuery } from "@api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardHeader } from "@components/admin";
import { ROUTES } from "@routes";
import { Loading } from "@components/user";
import { slugify } from "@utils/general";
import { Button, FlexBox, FormInput, Typography } from "@components/general";

interface IBrandForm {
  category: string;
  name: string;
  uniqueURL: string;
  image: File | string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

export function UpdateBrand() {
  const { brandId } = useParams<{ brandId: string }>();
  const { data: brandsData, isLoading } = useGetSingleBrandQuery(brandId!);
  const [updateBrand, { isLoading: updateBrandLoading }] =
    useUpdateBrandMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newImgSelected, setNewImgSelected] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [keywordInput, setKeywordInput] = useState("");

  const [formData, setFormData] = useState<IBrandForm>({
    category: "",
    name: "",
    uniqueURL: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
  });

  useEffect(() => {
    if (brandsData) {
      setFormData({
        category: brandsData.category?._id,
        name: brandsData.name,
        uniqueURL: brandsData.uniqueURL,
        image: brandsData.image,
        metaTitle: brandsData.metaTitle || "",
        metaDescription: brandsData.metaDescription || "",
        metaKeywords: Array.isArray(brandsData.metaKeywords)
          ? brandsData.metaKeywords
          : [],
      });
      setPreviewUrl(`${import.meta.env.VITE_APP_BASE_URL}${brandsData.image}`);
    }
  }, [brandsData]);

  // --- Keyword Logic ---
  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !formData.metaKeywords.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        metaKeywords: [...prev.metaKeywords, trimmed],
      }));
      setKeywordInput("");
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      metaKeywords: prev.metaKeywords.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  // --- Image Logic ---
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setNewImgSelected(true);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      let payload: any;

      if (newImgSelected) {
        payload = new FormData();
        payload.append("name", formData.name);
        payload.append("uniqueURL", formData.uniqueURL);
        payload.append("category", formData.category);
        payload.append("metaTitle", formData.metaTitle);
        payload.append("metaDescription", formData.metaDescription);
        // Stringify the array for FormData
        payload.append("metaKeywords", JSON.stringify(formData.metaKeywords));
        payload.append("image", formData.image);
      } else {
        payload = { ...formData };
      }

      await updateBrand({
        brandId: brandId,
        data: payload,
      }).unwrap();

      toast.success("Brand updated successfully!");
      setNewImgSelected(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Brand update failed!");
    }
  };

  if (isLoading && !brandsData) return <Loading />;

  return (
    <div className="flex flex-col mt-10 w-[96%] mx-auto max-w-6xl">
      <CardHeader
        location={ROUTES.admin.brandsList}
        text="Update Brand"
        source="update"
      />

      <div className="bg-white border rounded-xl shadow-lg mt-4 overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
          <div className="border-b pb-4">
            <Typography variant="h4">
              Editing Brand:{" "}
              <span className="text-blue-600">{brandsData?.name}</span>
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Brand Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <FormInput
              label="Unique URL"
              value={formData.uniqueURL}
              onChange={(e) =>
                setFormData({ ...formData, uniqueURL: slugify(e.target.value) })
              }
              required
            />

            <FormInput
              label="Meta Title"
              value={formData.metaTitle}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle: e.target.value })
              }
            />

            <FormInput
              label="Meta Description"
              value={formData.metaDescription}
              onChange={(e) =>
                setFormData({ ...formData, metaDescription: e.target.value })
              }
            />
          </div>

          {/* Keywords Tag UI */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-600">
              SEO Keywords
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="border p-2 rounded flex-1 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type and press Enter..."
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button type="button" onClick={addKeyword}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.metaKeywords.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeKeyword(idx)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="p-4 bg-gray-50 border rounded-xl flex items-center gap-6 max-sm:flex-col">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Logo"
                className="w-24 h-24 object-contain bg-white border rounded shadow-sm"
              />
              {newImgSelected && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />
              {newImgSelected && (
                <button
                  type="button"
                  className="text-xs text-red-500 font-bold hover:underline"
                  onClick={() => {
                    setNewImgSelected(false);
                    if (!brandsData) return;
                    setFormData((prev) => ({
                      ...prev,
                      image: brandsData.image,
                    }));
                    setPreviewUrl(
                      `${import.meta.env.VITE_APP_BASE_URL}${brandsData.image}`
                    );
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Reset Image
                </button>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="greenary"
            loading={updateBrandLoading}
            fullWidth
          >
            Update Brand
          </Button>
        </form>
      </div>
    </div>
  );
}
