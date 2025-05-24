import React, { useEffect, useState, useRef } from "react";
import {
  useGetCategoriesQuery,
  useUploadCategoryImageMutation,
  useUpdateCategoryMutation,
} from "@api/categoriesApi";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardHeader from "@components/admin/CardHeader";
import { SubmitButton } from "@components/admin/SubmitButton";
import { ROUTES } from "@routes";
import { useGetCategoryQuery } from "../../../features/api/categoriesApi";
import Loading from "../../../components/user/loader/Loading";
import { slugify } from "../../../utils/general/slugify";

function UpdateCategory() {
  const { categoryId } = useParams();

  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery(categoryId);

  const [newImgSelected, setNewImgSelected] = useState(false);
  const [uploadCategoryImage] = useUploadCategoryImageMutation();
  const [updateCategory, { isLoading: updateCategoryLoading }] =
    useUpdateCategoryMutation();

  // Create a ref to store the reference to the file input element
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    uniqueURL: "",
  });

  useEffect(() => {
    if (categoryData) {
      setFormData({
        name: categoryData.name,
        uniqueURL: categoryData.uniqueURL,
        image: categoryData.image,
      });
    }
  }, [categoryData]);

  console.log(formData);

  // File handler
  const uploadFileHandler = async () => {
    const imageData = new FormData();
    // formData.append("image", imageSelected);
    imageData.append("image", formData.image);

    try {
      const res = await uploadCategoryImage(imageData).unwrap();

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newImgSelected) {
      console.log("image changed");
      formData.image = await uploadFileHandler();
    }
    console.log("after image", formData);

    try {
      const updatedCategory = await updateCategory({
        catId: categoryId,
        data: formData,
      }).unwrap();
      console.log("Category updated", updatedCategory);
      toast.success("Category updated successfully..!");
      // Clear the value of the file input
      fileInputRef.current.value = "";
      // Mark the file input as required again
      fileInputRef.current.required = true;
      // Handle success
    } catch (error) {
      console.error("Error updating condition:", error);
      toast.error("Category update failed..!");
    }
  };

  if (categoryLoading) return <Loading />;

  return (
    <div className="flex flex-col mt-10 w-[96%] mx-auto max-sm:text-sm ">
      <CardHeader
        location={ROUTES.admin.categoriesList}
        text="Update Category"
        source="update"
      />

      <div className="bg-white border rounded-md shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <div className="flex gap-2 items-center">
            <span className="text-xl opacity-75 max-sm:text-xs">Update</span>

            <h2 className="text-2xl max-sm:text-sm">{categoryData.name} </h2>

            <span className="text-xl opacity-75 max-sm:text-xs">Category</span>
          </div>
          <hr />

          <div className="flex items-center gap-4">
            <label htmlFor="conditioName" className="max-sm:text-xs">
              Category Name
            </label>
            <h2
              name="conditioName"
              className="text-[1.7rem] text-red-700 max-sm:text-sm"
            >
              {categoryData.name}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
            <div className="flex w-full max-sm:flex-col">
              <label className="">Update Category Name:</label>
              <input
                type="text"
                name="conditionName"
                className="border mx-2 py-1 px-2 rounded text-[15px]"
                placeholder="Enter Category Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex w-full max-sm:flex-col">
              <label className="">Update Unique URL:</label>
              <input
                type="text"
                name="conditionName"
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
            <div className="flex items-center grow-0">
              <img
                src={import.meta.env.VITE_APP_BASE_URL + formData.image}
                alt="ConditionLabel"
                className="w-[100px] h-[100px] mx-auto "
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
