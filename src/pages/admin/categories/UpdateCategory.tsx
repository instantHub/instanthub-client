import {
  useEffect,
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { useUpdateCategoryMutation, useGetCategoryQuery } from "@api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "@routes";
import { Loading } from "@components/user";
import { slugify } from "@utils/general";
import { ICategoryType } from "@features/api/categories/types";
import { Button, FlexBox, FormInput, Typography } from "@components/general";
import { ArrowLeftIcon } from "@icons";

type TUpdateCategoryParams = {
  categoryUniqueURL: string;
};

type TFormData = {
  name: string;
  image: File | string;
  uniqueURL: string;
  categoryType: ICategoryType;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[]; // Changed to string array
};

export function UpdateCategory() {
  const { categoryUniqueURL } = useParams<TUpdateCategoryParams>();

  if (!categoryUniqueURL) {
    throw new Error("Category ID is required to update a category.");
  }

  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery(categoryUniqueURL);
  const [updateCategory, { isLoading: updateCategoryLoading }] =
    useUpdateCategoryMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local State
  const [newImgSelected, setNewImgSelected] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [keywordInput, setKeywordInput] = useState(""); // Temporary state for typing a keyword

  const [formData, setFormData] = useState<TFormData>({
    name: "",
    image: "",
    uniqueURL: "",
    categoryType: {
      multiVariants: false,
      processorBased: false,
      simple: false,
    },
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
  });

  useEffect(() => {
    if (!categoryData) return;

    setFormData({
      name: categoryData.name,
      uniqueURL: categoryData.uniqueURL,
      image: categoryData.image,
      categoryType: categoryData.categoryType,
      metaTitle: categoryData.metaTitle || "",
      metaDescription: categoryData.metaDescription || "",
      // Ensure keywords is always an array
      metaKeywords: Array.isArray(categoryData.metaKeywords)
        ? categoryData.metaKeywords
        : [],
    });

    setImagePreview(
      `${import.meta.env.VITE_APP_BASE_URL}${categoryData.image}`
    );
  }, [categoryData]);

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
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const cancelNewImage = () => {
    setNewImgSelected(false);
    if (categoryData) {
      setFormData((prev) => ({ ...prev, image: categoryData.image }));
      setImagePreview(
        `${import.meta.env.VITE_APP_BASE_URL}${categoryData.image}`
      );
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- Submit Logic ---
  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      let payload: any;

      if (newImgSelected) {
        payload = new FormData();
        payload.append("name", formData.name);
        payload.append("uniqueURL", formData.uniqueURL);
        payload.append("metaTitle", formData.metaTitle);
        payload.append("metaDescription", formData.metaDescription);

        // NESTJS FIX: FormData does not support arrays.
        // We stringify the array so the @Transform in your DTO can parse it back.
        payload.append("metaKeywords", JSON.stringify(formData.metaKeywords));
        payload.append("categoryType", JSON.stringify(formData.categoryType));
        payload.append("image", formData.image);
      } else {
        payload = { ...formData };
      }

      await updateCategory({
        catId: categoryData?._id,
        data: payload,
      }).unwrap();

      toast.success("Category updated successfully!");
      setNewImgSelected(false);
      window.location.href = ROUTES.admin.categoriesList;
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed. Check keywords format.");
    }
  };

  const handleCategoryTypeSelect = (selectedType: keyof ICategoryType) => {
    if (formData.categoryType[selectedType]) return;
    if (window.confirm(`Switch architecture to ${selectedType}?`)) {
      setFormData((prev) => ({
        ...prev,
        categoryType: {
          multiVariants: false,
          processorBased: false,
          simple: false,
          [selectedType]: true,
        },
      }));
    }
  };

  if (categoryLoading) return <Loading />;

  return (
    <FlexBox direction="col" className="mt-10 p-4 mx-auto max-w-5xl">
      <FlexBox justify="between" fullWidth className="mb-6">
        <Typography as="h2" variant="h3" className="font-bold">
          Update Category
        </Typography>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<ArrowLeftIcon size={18} />}
        >
          <Link to={ROUTES.admin.categoriesList}>Back</Link>
        </Button>
      </FlexBox>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-6 p-6 bg-white border rounded-xl shadow-lg"
      >
        <Typography as="h2" variant="h4" align="center">
          Editing: <span className="text-blue-600">{categoryData?.name}</span>
        </Typography>

        <FlexBox gap={4} className="max-sm:flex-col">
          <FormInput
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <FormInput
            label="URL Slug"
            fullWidth
            value={formData.uniqueURL}
            onChange={(e) =>
              setFormData({ ...formData, uniqueURL: slugify(e.target.value) })
            }
            required
          />
        </FlexBox>

        <FlexBox gap={4} className="max-sm:flex-col">
          <FormInput
            label="Meta Title"
            fullWidth
            value={formData.metaTitle}
            onChange={(e) =>
              setFormData({ ...formData, metaTitle: e.target.value })
            }
          />
          <FormInput
            label="Meta Description"
            fullWidth
            value={formData.metaDescription}
            onChange={(e) =>
              setFormData({ ...formData, metaDescription: e.target.value })
            }
          />
        </FlexBox>

        {/* --- Keyword Tag UI --- */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-600">
            Meta Keywords (Array)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="border p-2 rounded flex-1 outline-none focus:border-blue-500"
              placeholder="Type keyword and press Enter"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button type="button" onClick={addKeyword} size="sm">
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
                  className="hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* --- Image Section --- */}
        <div className="p-4 border rounded-lg bg-gray-50 flex gap-6 items-center max-sm:flex-col">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded shadow"
          />
          <div className="flex flex-col gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
            {newImgSelected && (
              <Button
                type="button"
                variant="danger"
                size="xs"
                onClick={cancelNewImage}
              >
                Cancel New Image
              </Button>
            )}
          </div>
        </div>

        {/* --- Architecture Types --- */}
        <div className="flex flex-col gap-2">
          <Typography variant="h5" className="font-bold text-gray-600">
            Architecture Type
          </Typography>
          <FlexBox gap={2} wrap="wrap">
            {Object.entries(formData.categoryType).map(([key, isActive]) => (
              <button
                key={key}
                type="button"
                onClick={() =>
                  handleCategoryTypeSelect(key as keyof ICategoryType)
                }
                className={`px-4 py-2 rounded-full border text-sm ${
                  isActive ? "bg-blue-600 text-white" : "bg-white text-gray-600"
                }`}
              >
                {key}
              </button>
            ))}
          </FlexBox>
        </div>

        <Button
          type="submit"
          loading={updateCategoryLoading}
          fullWidth
          variant="primary"
        >
          Update Category
        </Button>
      </form>
    </FlexBox>
  );
}
