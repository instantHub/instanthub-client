import React, { useReducer, useRef } from "react";
import {
  useCreateCategoryMutation,
  useUploadCategoryImageMutation,
} from "@api/categoriesApi";
import { toast } from "react-toastify";
import ListButton from "@components/admin/ListButton";
import { SubmitButton } from "@components/admin/SubmitButton";
import { ROUTES } from "@routes";
import { slugify } from "@utils/general/slugify";

const CATEGORY_TYPES = ["simple", "multiVariants", "processorBased"];

const initialState = {
  category: "",
  uniqueURL: "",
  categoryType: {
    simple: false,
    multiVariants: false,
    processorBased: false,
  },
  imageSelected: null,
};

function reducer(state, action) {
  const { type, name, value } = action;

  switch (type) {
    case "UPDATE_FIELD":
      return { ...state, [name]: value };

    case "UPDATE_CATEGORY_TYPE":
      // If setting one to true, disable others
      const updatedTypes = CATEGORY_TYPES.reduce((acc, item) => {
        acc[item] = item === name ? value : false;
        return acc;
      }, {});
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

const CreateCategory = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state", state);
  const fileInputRef = useRef(null);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [uploadCategoryImage] = useUploadCategoryImageMutation();

  const isAnyCategoryTypeSelected = Object.values(state.categoryType).some(
    Boolean
  );

  const inputValidation = () => {
    const { category, uniqueURL, imageSelected } = state;

    if (
      !category.trim() ||
      !uniqueURL.trim() ||
      !imageSelected ||
      !isAnyCategoryTypeSelected
    ) {
      toast.error("All fields including one Category Type are required!");
      return false;
    }
    return true;
  };

  const uploadFileHandler = async () => {
    const formData = new FormData();
    formData.append("image", state.imageSelected);

    try {
      const res = await uploadCategoryImage(formData).unwrap();
      return res.image;
    } catch (error) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValidation()) return;

    const imageURL = await uploadFileHandler();
    if (!imageURL) return;

    const payload = {
      name: state.category,
      uniqueURL: state.uniqueURL,
      image: imageURL,
      categoryType: state.categoryType,
    };

    console.log("payload", payload);

    try {
      await createCategory(JSON.stringify(payload)).unwrap();
      toast.success("Category created successfully!");
      dispatch({ type: "RESET" });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  const handleCategoryTypeSelect = (selectedType) => {
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

  return (
    <div className="w-full px-[2%] pt-[2%] max-sm:text-sm">
      <div className="flex justify-between items-center">
        <h1 className="bold text-[1.4rem] mb-2">Create Category</h1>
        <ListButton
          location={ROUTES.admin.categoriesList}
          text="Categories List"
        />
      </div>

      <div className="bg-white border rounded-md shadow-lg">
        <form
          className="flex flex-col gap-4 p-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2>Add Category</h2>
          <hr />

          <div className="grid grid-cols-2 gap-4">
            {/* Category Name */}
            <div className="flex flex-col">
              <label htmlFor="category">Category Name</label>
              <input
                type="text"
                name="category"
                value={state.category}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    name: "category",
                    value: e.target.value,
                  })
                }
                className="border p-2 rounded-sm"
                placeholder="Enter Category Name"
              />
            </div>

            {/* Unique URL */}
            <div className="flex flex-col">
              <label htmlFor="uniqueURL">Unique URL</label>
              <input
                type="text"
                name="uniqueURL"
                value={state.uniqueURL}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    name: "uniqueURL",
                    value: slugify(e.target.value),
                  })
                }
                className="border p-2 rounded-sm"
                placeholder="Enter Unique URL"
              />
            </div>

            {/* Category Type Checkboxes */}
            <div className="flex flex-col col-span-2">
              <span className="font-semibold mb-2">
                Select Type Of Category
              </span>
              <div className="flex gap-4 flex-wrap">
                {Object.entries(state.categoryType).map(([type, isActive]) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_CATEGORY_TYPE",
                        name: type,
                        value: !isActive,
                      })
                    }
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col">
              <label htmlFor="imageSelected">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                name="imageSelected"
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    name: "imageSelected",
                    value: e.target.files?.[0] || null,
                  })
                }
                className="border p-2 rounded-sm"
              />
            </div>
          </div>

          <div className="mt-4 w-1/2">
            <SubmitButton loading={isLoading}>Create Category</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
