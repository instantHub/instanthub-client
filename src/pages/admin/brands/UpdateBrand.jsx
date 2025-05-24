import React, { useEffect, useState, useRef } from "react";
import {
  useGetAllBrandQuery,
  useUpdateBrandMutation,
  useUploadBrandImageMutation,
} from "@api/brandsApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardHeader from "@components/admin/CardHeader";
import { SubmitButton } from "@components/admin/SubmitButton";
import { ROUTES } from "@routes";
import {
  useGetBrandQuery,
  useGetSingleBrandQuery,
} from "../../../features/api/brandsApi";
import Loading from "../../../components/user/loader/Loading";
import { slugify } from "../../../utils/general/slugify";

function UpdateBrand() {
  const { brandId } = useParams();

  const { data: brandsData, isLoading } = useGetSingleBrandQuery(brandId);

  const [newImgSelected, setNewImgSelected] = useState(false);
  const [uploadBrandImage] = useUploadBrandImageMutation();
  const [updateBrand, { isLoading: updateBrandLoading }] =
    useUpdateBrandMutation();

  // Create a ref to store the reference to the file input element
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    uniqueURL: "",
    image: "",
  });

  useEffect(() => {
    if (brandsData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: brandsData.category.id,
        name: brandsData.name,
        uniqueURL: brandsData.uniqueURL,
        image: brandsData.image,
      }));
    }
  }, [brandsData]);

  console.log("formData", formData);

  // File handler
  const uploadFileHandler = async () => {
    const imageData = new FormData();
    // formData.append("image", imageSelected);
    imageData.append("image", formData.image);

    try {
      const res = await uploadBrandImage(imageData).unwrap();

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("handle submit");
    // console.log(formData);

    if (newImgSelected) {
      console.log("image changed");
      formData.image = await uploadFileHandler();
    }
    console.log("after image", formData);

    try {
      const updatedBrand = await updateBrand({
        brandId: brandId,
        data: formData,
      }).unwrap();
      console.log("Brand updated", updatedBrand);
      toast.success("Brand updated successfully..!");
      // Clear the value of the file input
      fileInputRef.current.value = "";
      // Mark the file input as required again
      fileInputRef.current.required = true;
      // Handle success
    } catch (error) {
      console.error("Error updating condition:", error);
      toast.error("Brand update failed..!");
    }

    // Send formData to backend or perform any other action
    // console.log("handleSubmit", formData);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col mt-10 w-[96%] mx-auto">
      <CardHeader
        location={ROUTES.admin.brandsList}
        text="Update Brand"
        source="update"
      />

      <div className="bg-white border rounded-md shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 ">
          <div className="flex gap-2 items-center">
            <span className="text-xl opacity-75 max-sm:text-lg">
              Update {brandsData?.category?.name} Brand
            </span>
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
            <div className="flex items-center gap-4">
              <label htmlFor="conditioName">Brand Name</label>
              <h2 name="conditioName" className="text-[1.7rem] text-red-700">
                {brandsData.name}
              </h2>
            </div>
            <div className="flex max-sm:flex-col">
              <label className="">Update Brand Name:</label>
              <input
                type="text"
                name="conditionName"
                className="border mx-2 py-1 px-2 rounded text-[15px]"
                placeholder="Enter Condition Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex  max-sm:flex-col">
              <label className="">Unique URL:</label>
              <input
                type="text"
                name="conditionName"
                className="border mx-2 py-1 px-2 rounded text-[15px]"
                placeholder="Enter Condition Name"
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
                loading="lazy" // Native lazy loading
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
            <SubmitButton loading={updateBrandLoading}>
              Update Brand
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBrand;
