import { useEffect, useState, useRef, FormEvent } from "react";
import {
  useUploadCategoryImageMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} from "@api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "@routes";
import { Loading } from "@components/user";
import { slugify } from "@utils/general";
import { ICategoryType } from "@features/api/categoriesApi/types";
import { Button, FlexBox, FormInput, Typography } from "@components/general";
import { ArrowLeftIcon } from "@icons";
import { formatMetaKeywords } from "@utils/admin";

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
  metaKeywords: string;
};

export function UpdateCategory() {
  const { categoryUniqueURL } = useParams<TUpdateCategoryParams>();

  if (!categoryUniqueURL) {
    throw new Error("Category ID is required to update a category.");
  }

  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery(categoryUniqueURL);

  const [newImgSelected, setNewImgSelected] = useState(false);
  const [uploadCategoryImage] = useUploadCategoryImageMutation();
  const [updateCategory, { isLoading: updateCategoryLoading }] =
    useUpdateCategoryMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add SEO fields
  // metaTitle: { type: String },
  // metaDescription: { type: String },
  // metaKeywords: { type: String },
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
    metaKeywords: "",
  });

  useEffect(() => {
    if (!categoryData) return;

    setFormData({
      name: categoryData.name,
      uniqueURL: categoryData.uniqueURL,
      image: categoryData.image,
      categoryType: categoryData.categoryType,
      metaTitle: categoryData.metaTitle,
      metaDescription: categoryData.metaDescription,
      metaKeywords: categoryData.metaKeywords,
    });
  }, [categoryData]);

  const uploadFileHandler = async (): Promise<string | undefined> => {
    if (!(formData.image instanceof File)) return;

    const imageData = new FormData();
    imageData.append("image", formData.image);

    try {
      const res = await uploadCategoryImage(imageData).unwrap();
      return res.image;
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    const selectedTypes = Object.values(formData.categoryType).filter(Boolean);
    if (selectedTypes.length === 0) {
      toast.error("Please select at least one category type.");
      return;
    }

    if (selectedTypes.length > 1) {
      toast.error("Only one category type can be selected.");
      return;
    }

    let updatedImage = formData.image;

    if (newImgSelected && formData.image instanceof File) {
      const uploaded = await uploadFileHandler();
      if (uploaded) updatedImage = uploaded;
    }

    try {
      await updateCategory({
        // catId: categoryId,
        catId: categoryData?.id,
        data: {
          ...formData,
          image: updatedImage as string,
        },
      }).unwrap();

      toast.success("Category updated successfully..!");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        fileInputRef.current.required = true;
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Category update failed..!");
    }
  };

  const handleCategoryTypeSelect = (selectedType: keyof ICategoryType) => {
    const selectedAlready = formData.categoryType[selectedType];
    if (selectedAlready) return;

    const confirmChange = window.confirm(
      `Are you sure you want to change the category type to "${selectedType}"? This will replace the previously selected type.`
    );

    if (!confirmChange) return;

    setFormData((prev) => ({
      ...prev,
      categoryType: {
        multiVariants: false,
        processorBased: false,
        simple: false,
        [selectedType]: true,
      },
    }));
  };

  // Format only on blur or submit
  const handleBlur = () => {
    setFormData((prev) => ({
      ...prev,
      metaKeywords: formatMetaKeywords(prev.metaKeywords),
    }));
  };

  if (categoryLoading) return <Loading />;

  return (
    <FlexBox direction="col" className="mt-10 p-4 mx-auto">
      <FlexBox justify="between" fullWidth>
        <Typography as="h2" variant="h3" className="max-sm:text-sm">
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
        className="w-full flex flex-col gap-4 p-5 border rounded-md shadow-lg"
      >
        <Typography as="h2" variant="h4" align="center">
          Update {categoryData?.name} Category
        </Typography>

        <hr />

        <FlexBox gap={2} className="max-sm:flex-col">
          <FormInput
            variant="outlined"
            label="Category Name"
            type="text"
            placeholder="Enter Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <FormInput
            variant="outlined"
            label="Unique URL"
            type="text"
            placeholder="Enter Unique URL"
            value={formData.uniqueURL}
            onChange={(e) =>
              setFormData({
                ...formData,
                uniqueURL: slugify(e.target.value),
              })
            }
          />
        </FlexBox>

        <FlexBox gap={2} className="max-sm:flex-col">
          <FormInput
            variant="outlined"
            label="Meta Title"
            type="text"
            placeholder="Enter Meta Title"
            value={formData.metaTitle}
            onChange={(e) =>
              setFormData({ ...formData, metaTitle: e.target.value })
            }
          />

          <FormInput
            variant="outlined"
            label="Meta Description"
            type="text"
            placeholder="Enter Meta Description"
            value={formData.metaDescription}
            onChange={(e) =>
              setFormData({
                ...formData,
                metaDescription: e.target.value,
              })
            }
          />
        </FlexBox>

        <FormInput
          variant="outlined"
          label="Meta Keywords"
          type="text"
          placeholder="Enter Meta Keywords"
          value={formData.metaKeywords}
          onChange={(e) =>
            setFormData({
              ...formData,
              metaKeywords: e.target.value,
            })
          }
          onBlur={handleBlur}
        />

        <FlexBox gap={4} className="mx-auto">
          <img
            src={
              typeof formData.image === "string"
                ? import.meta.env.VITE_APP_BASE_URL + formData.image
                : ""
            }
            alt="Category"
            className="w-[75px] sm:w-[100px] mx-auto"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFormData({ ...formData, image: file });
                setNewImgSelected(true);
              }
            }}
          />
        </FlexBox>

        <FlexBox gap={4} wrap="wrap">
          {Object.entries(formData.categoryType).map(([key, isActive]) => (
            <button
              key={key}
              type="button"
              onClick={() =>
                handleCategoryTypeSelect(key as keyof ICategoryType)
              }
              className={`px-4 py-2 rounded-lg border transition-all duration-300 max-sm:text-xs ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </FlexBox>

        <Button loading={updateCategoryLoading}>Update Category</Button>
      </form>
    </FlexBox>
  );
}
