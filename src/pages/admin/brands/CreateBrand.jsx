import React, { useState, useRef } from "react";
import {
  useCreateBrandMutation,
  useUploadBrandImageMutation,
} from "@api/brandsApi";
import { useGetCategoryQuery } from "@api/categoriesApi";
import { toast } from "react-toastify";
import ListButton from "@components/admin/ListButton";
import { SubmitButton } from "@components/admin/SubmitButton";
import { ROUTES } from "../../../routes";

const CreateBrand = () => {
  const [brand, setBrand] = useState("");
  const [uniqueURL, setUniqueURL] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [categorySelected, setCategorySelected] = useState();
  const [createBrand, { isLoading: createBrandLoading }] =
    useCreateBrandMutation();
  const [uploadBrandImage, { isLoading: uploadLoadingNew }] =
    useUploadBrandImageMutation();
  // const [brandsData, setCategories] = useState([]);
  const { data: categories, isLoading } = useGetCategoryQuery();

  // Create a ref to store the reference to the file input element
  const fileInputRef = useRef(null);

  // File handler
  const uploadFileHandler = async () => {
    const formData = new FormData();
    formData.append("image", imageSelected);
    formData.append("uploadDir", "brands/");

    try {
      const res = await uploadBrandImage(formData).unwrap();
      // console.log("Brand res.image", res.image);

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image upload handler call
    const imageURL = await uploadFileHandler();

    // console.log("handlesubmit ", categorySelected, brand, uniqueURL, imageURL);
    const brandData = {
      category: categorySelected,
      name: brand,
      uniqueURL: uniqueURL,
      image: imageURL,
    };

    try {
      // const brandCreated = await createBrand(
      //   JSON.stringify(brandData)
      // ).unwrap();

      const brandCreated = createBrand(JSON.stringify(brandData));
      brandCreated
        .then((data) => {
          console.log("brand promise", data);
          toast.success("Brand created successfull..!");
          // Clear the value of the file input
          fileInputRef.current.value = "";
          // Mark the file input as required again
          fileInputRef.current.required = true;
        })
        .catch((err) => console.log("Error in promise creating brand", err));

      console.log("brand created", brandCreated);

      // setBrand("");
      // setUniqueURL("");
      // setImageSelected("");
    } catch (error) {
      console.log("Error in try block of creating brand: ", error);
    }
  };

  return (
    <div className=" px-[2%] pt-[2%] max-sm:text-sm">
      <div className="flex justify-between items-center">
        <h1 className="bold text-[1.4rem] mb-2 max-sm:text-sm">Create Brand</h1>
        <div className="flex gap-2">
          <div className="flex items-center max-sm:hidden">
            <h2>Home </h2>
            <h2 className="pl-1"> / Add Brands</h2>
          </div>

          <ListButton location={ROUTES.admin.brandsList} text={"Brands List"} />
        </div>
      </div>
      <div className="bg-white border rounded-md shadow-lg">
        <form
          method="post"
          className="flex flex-col gap-4  p-5"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="">Add Brand</h2>
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="productName">Select Category :</label>

              <select
                className="border w-[40%] max-sm:w-full "
                value={categorySelected}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setCategorySelected(e.target.value);
                }}
                required
              >
                <option value="">Select Category</option>
                {!isLoading &&
                  categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      name="category"
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="productName">Brand Name :</label>
              <input
                type="text"
                id="productName"
                className=" border p-2 rounded-sm max-sm:p-1"
                placeholder="Enter Category Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="uniqueURL">Make Unique URL :</label>
              <input
                type="text"
                id="uniqueURL"
                value={uniqueURL}
                onChange={(e) => setUniqueURL(e.target.value)}
                className=" border p-2 rounded-sm max-sm:p-1"
                placeholder="Enter Unique URL"
                required
              />
            </div>

            <div className="p-2">
              <label htmlFor="image">File Input</label>
              <div className="flex">
                <div className="mb-4">
                  <label htmlFor="image" className="block font-medium">
                    Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    ref={fileInputRef}
                    accept="image/*"
                    className="w-full border border-gray-300 p-2 rounded-md max-sm:p-1"
                    onChange={(e) => setImageSelected(e.target.files[0])}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-3 px-2">
            <SubmitButton loading={createBrandLoading}>
              Create Brand
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBrand;
