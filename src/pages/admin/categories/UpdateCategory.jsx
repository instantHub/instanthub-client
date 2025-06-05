import React, { useEffect, useState, useRef } from "react";
import {
  useUploadCategoryImageMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} from "@api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardHeader from "@components/admin/CardHeader";
import { SubmitButton } from "@components/admin/SubmitButton";
import { ROUTES } from "@routes";
import { Loading } from "@components/user";
import { slugify } from "@utils/general/slugify";

function UpdateCategory() {
  const { categoryId } = useParams();

  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery(categoryId);

  const [newImgSelected, setNewImgSelected] = useState(false);
  const [uploadCategoryImage] = useUploadCategoryImageMutation();
  const [updateCategory, { isLoading: updateCategoryLoading }] =
    useUpdateCategoryMutation();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    uniqueURL: "",
    categoryType: {
      multiVariants: false,
      processorBased: false,
      simple: false,
    },
  });

  useEffect(() => {
    if (categoryData) {
      setFormData({
        name: categoryData.name,
        uniqueURL: categoryData.uniqueURL,
        image: categoryData.image,
        categoryType: categoryData.categoryType,
      });
    }
  }, [categoryData]);

  const uploadFileHandler = async () => {
    const imageData = new FormData();
    imageData.append("image", formData.image);
    try {
      const res = await uploadCategoryImage(imageData).unwrap();
      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSubmit = async (event) => {
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

    if (newImgSelected) {
      formData.image = await uploadFileHandler();
    }

    try {
      const updatedCategory = await updateCategory({
        catId: categoryId,
        data: formData,
      }).unwrap();
      toast.success("Category updated successfully..!");
      fileInputRef.current.value = "";
      fileInputRef.current.required = true;
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Category update failed..!");
    }
  };

  const handleCategoryTypeSelect = (selectedType) => {
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

  console.log("form data", formData);

  if (categoryLoading) return <Loading />;

  return (
    <div className="flex flex-col mt-10 w-[96%] mx-auto max-sm:text-sm">
      <CardHeader
        location={ROUTES.admin.categoriesList}
        text="Update Category"
        source="update"
      />

      <div className="bg-white border rounded-md shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <div className="flex gap-2 items-center">
            <span className="text-xl opacity-75 max-sm:text-xs">Update</span>
            <h2 className="text-2xl max-sm:text-sm">{categoryData.name}</h2>
            <span className="text-xl opacity-75 max-sm:text-xs">Category</span>
          </div>
          <hr />

          <div className="flex items-center gap-4">
            <label className="max-sm:text-xs">Category Name</label>
            <h2 className="text-[1.7rem] text-red-700 max-sm:text-sm">
              {categoryData.name}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
            <div className="flex w-full max-sm:flex-col">
              <label>Update Category Name:</label>
              <input
                type="text"
                className="border mx-2 py-1 px-2 rounded text-[15px]"
                placeholder="Enter Category Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="flex w-full max-sm:flex-col">
              <label>Update Unique URL:</label>
              <input
                type="text"
                className="border mx-2 py-1 px-2 rounded text-[15px]"
                placeholder="Enter Unique URL"
                value={formData.uniqueURL}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    uniqueURL: slugify(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex items-center gap-4">
              <img
                src={import.meta.env.VITE_APP_BASE_URL + formData.image}
                alt="Category"
                className="w-[100px] h-[100px] mx-auto"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                  });
                  setNewImgSelected(true);
                }}
              />
            </div>
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            {Object.entries(formData.categoryType).map(([key, isActive]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleCategoryTypeSelect(key)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <div className="w-1/2 mx-auto">
            <SubmitButton loading={updateCategoryLoading}>
              Update Category
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCategory;
