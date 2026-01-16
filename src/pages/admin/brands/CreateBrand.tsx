import React, { useState, useRef, FormEvent } from "react";
import { useCreateBrandMutation, useGetCategoriesQuery } from "@api";
import { toast } from "react-toastify";
import { ROUTES } from "@routes";
import { slugify } from "@utils/general";
import {
  Button,
  CustomSelect,
  FlexBox,
  FormInput,
  Typography,
} from "@components/general";
import { useCustomNavigation } from "@hooks";
import { ICategoryResponse } from "@features/api/categories/types";
import { PlusIcon } from "lucide-react";

export const CreateBrand: React.FC = () => {
  const [brand, setBrand] = useState<string>("");
  const [uniqueURL, setUniqueURL] = useState<string>("");
  const [brandImage, setBrandImage] = useState<File | null>(null);
  const [categorySelected, setCategorySelected] =
    useState<ICategoryResponse | null>(null);

  const [createBrand, { isLoading: createBrandLoading }] =
    useCreateBrandMutation();

  const { data: categories, isLoading } = useGetCategoriesQuery();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { navigateTo } = useCustomNavigation();

  // Submit handler typed for FormEvent
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!categorySelected || !brandImage) {
      toast.error("Please all fields to proceed..");
      return;
    }

    const formData = new FormData();
    formData.append("category", categorySelected?._id);
    formData.append("name", brand);
    formData.append("uniqueURL", uniqueURL);
    formData.append("image", brandImage);

    // View as an array of pairs
    console.log("brand payload formData", [...formData.entries()]);

    try {
      await createBrand(formData).unwrap();
      toast.success("Brand created successfully!");
      setBrand("");
      setUniqueURL("");
      setBrandImage(null);
      setCategorySelected(null);

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error in try block of creating brand: ", error);
    }
  };

  return (
    <FlexBox direction="col" gap={2} className="p-4">
      <FlexBox justify="between" className="w-full">
        <Typography variant="h3" className="max-sm:text-lg">
          Create Brand
        </Typography>

        <Button size="md" onClick={() => navigateTo(ROUTES.admin.brandsList)}>
          Brands Lists
        </Button>
      </FlexBox>

      <form
        className="w-full flex flex-col gap-4 p-5 border rounded-md shadow-lg"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Create Brand</Typography>
        <hr />

        {categories && (
          <CustomSelect
            label="Category"
            options={categories}
            value={categorySelected}
            onChange={setCategorySelected}
            displayKey="name"
            valueKey="_id"
            placeholder="Choose a category..."
            clearable
            required
          />
        )}

        <FormInput
          variant="outlined"
          size="sm"
          label="Brand Name"
          type="text"
          name="Brand"
          value={brand}
          placeholder="Enter Category Name"
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <FormInput
          variant="outlined"
          size="sm"
          label="Make Unique URL"
          type="text"
          name="UniqueURL"
          value={uniqueURL}
          placeholder="Enter Unique URL"
          onChange={(e) => setUniqueURL(slugify(e.target.value))}
          required
        />

        {/* Image Upload */}
        <FlexBox gap={2} className="max-sm:flex-col col-span-2">
          <label htmlFor="imageSelected">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name="imageSelected"
            onChange={() => {
              const file = fileInputRef.current?.files?.[0];
              if (file) {
                setBrandImage(file);
              }
            }}
            className="border p-2 rounded-sm"
          />
        </FlexBox>

        <Button loading={createBrandLoading} rightIcon={<PlusIcon />}>
          Create Brand
        </Button>
      </form>
    </FlexBox>
  );
};
