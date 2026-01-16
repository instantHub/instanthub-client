import { ChangeEvent, FormEvent, useReducer, useRef, useState } from "react";
import { useCreateCategoryMutation } from "@api";
import { toast } from "react-toastify";
import { ROUTES } from "@routes";
import { slugify } from "@utils/general";
import { ICategoryType } from "@features/api/categories/types";
import { Button, FlexBox, FormInput, Typography } from "@components/general";
import { Link } from "react-router-dom";
import { TAction, TState } from "./types";
import { PlusIcon } from "lucide-react";

const CATEGORY_TYPES: (keyof ICategoryType)[] = [
  "simple",
  "multiVariants",
  "processorBased",
];

const initialState: TState = {
  category: "",
  uniqueURL: "",
  categoryType: {
    simple: false,
    multiVariants: false,
    processorBased: false,
  },
};

function reducer(state: TState, action: TAction) {
  const { type } = action;

  switch (type) {
    case "UPDATE_FIELD":
      return { ...state, [action.name]: action.value };

    case "UPDATE_CATEGORY_TYPE":
      const updatedTypes = CATEGORY_TYPES.reduce((acc, item) => {
        acc[item] = item === action.name ? action.value : false;
        return acc;
      }, {} as Record<keyof ICategoryType, boolean>);

      return {
        ...state,
        categoryType: updatedTypes,
      };

    case "RESET":
      return initialState;

    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}

export const CreateCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAnyCategoryTypeSelected = Object.values(state.categoryType).some(
    Boolean
  );

  const inputValidation = (): boolean => {
    const { category, uniqueURL } = state;

    if (!category.trim() || !uniqueURL.trim() || !isAnyCategoryTypeSelected) {
      toast.error("All fields including one Category Type are required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!inputValidation()) return;

    if (!categoryImage) {
      toast.error("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("name", state.category);
    formData.append("uniqueURL", state.uniqueURL);
    formData.append("image", categoryImage);
    formData.append("categoryType", JSON.stringify(state.categoryType));

    // View as an array of pairs
    console.log("payload formData", [...formData.entries()]);

    try {
      await createCategory(formData).unwrap();
      toast.success("Category created successfully!");
      dispatch({ type: "RESET" });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  return (
    <FlexBox direction="col" gap={2} className="p-4">
      <FlexBox justify="between" className="w-full">
        <Typography variant="h3" className="max-sm:text-lg">
          Create Category
        </Typography>

        <Button>
          <Link to={ROUTES.admin.categoriesList}>Categories List</Link>
        </Button>
      </FlexBox>

      <form
        className="w-full flex flex-col gap-4 p-5 border rounded-md shadow-lg"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Create Category</Typography>
        <hr />

        <FlexBox gap={2} className="max-sm:flex-col">
          {/* Category Name */}
          <FormInput
            variant="outlined"
            size="sm"
            label="Category Name"
            type="text"
            name="category"
            value={state.category}
            placeholder="Enter Category Name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "category",
                value: e.target.value,
              })
            }
          />

          {/* Unique URL */}
          <FormInput
            variant="outlined"
            size="sm"
            label="Unique URL"
            type="text"
            name="uniqueURL"
            value={state.uniqueURL}
            placeholder="Enter Unique URL"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "uniqueURL",
                value: slugify(e.target.value),
              })
            }
          />
        </FlexBox>

        {/* Category Type Checkboxes */}
        <FlexBox direction="col" justify="start" gap={2}>
          <Typography variant="h6">Select Type Of Category</Typography>
          <FlexBox wrap="wrap" gap={4}>
            {Object.entries(state.categoryType).map(([type, isActive]) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  dispatch({
                    type: "UPDATE_CATEGORY_TYPE",
                    name: type as keyof ICategoryType,
                    value: !isActive,
                  })
                }
                className={`px-4 py-2 rounded-lg border transition-all duration-300 max-sm:text-xs ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </FlexBox>
        </FlexBox>

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
                setCategoryImage(file);
              }
            }}
            className="border p-2 rounded-sm"
          />
        </FlexBox>

        <Button loading={isLoading} rightIcon={<PlusIcon />}>
          Create Category
        </Button>
      </form>
    </FlexBox>
  );
};
