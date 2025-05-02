import React, { useState, useRef, useReducer } from "react";
import {
  useCreateCategoryMutation,
  useUploadCategoryImageMutation,
} from "@api/categoriesApi";
import { toast } from "react-toastify";
import ListButton from "@components/admin/ListButton";
import { SubmitButton } from "@components/admin/SubmitButton";

const initialState = {
  category: "",
  uniqueURL: "",
  imageSelected: "",
};

function reducer(state, action) {
  console.log("reducer func:", action);
  const { type, value } = action;
  console.log(type, value);
  switch (type) {
    case "category":
      // return (state[type] = value);
      return { ...state, [type]: value };
    case "uniqueURL":
      return { ...state, [type]: value };
    case "imageSelected":
      return { ...state, [type]: value };
    default:
      throw new Error();
  }
}

const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const [uniqueURL, setUniqueURL] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [createCategory, { isLoading: createCategoryloading }] =
    useCreateCategoryMutation();

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("Reducer state:", state);

  const [uploadCategoryImage, { isLoading: uploadLoading }] =
    useUploadCategoryImageMutation();

  // Create a ref to store the reference to the file input element
  const fileInputRef = useRef(null);

  const inputValidation = () => {
    if (
      category.trim() === "" ||
      uniqueURL.trim() === "" ||
      imageSelected === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  // File handler
  const uploadFileHandler = async () => {
    const formData = new FormData();
    formData.append("image", imageSelected);
    // formData.append("uploadURL", "category");

    try {
      const res = await uploadCategoryImage(formData).unwrap();
      console.log("res.image", res.image);

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = inputValidation();

    if (validate) {
      // Image upload handler call
      const imageURL = await uploadFileHandler();

      console.log("handlesubmit ", category, uniqueURL, imageURL);

      const categoryData = {
        name: category,
        uniqueURL: uniqueURL,
        image: imageURL,
      };

      try {
        await createCategory(JSON.stringify(categoryData)).unwrap();
        toast.success("Category created successfull..!");
        setCategory("");
        setUniqueURL("");
        setImageSelected("");
        // Clear the value of the file input
        fileInputRef.current.value = "";
        // Mark the file input as required again
        fileInputRef.current.required = true;
      } catch (error) {
        console.log("Error: ", error);
        toast.error("Error Creating Category..!");
      }
    } else {
      console.log("All fields are required");
      return;
    }
  };

  return (
    <div className="w-full px-[2%] pt-[2%] max-sm:text-sm">
      <div className="flex justify-between items-center">
        <h1 className="bold text-[1.4rem] mb-2 max-sm:text-sm">
          Create Category
        </h1>
        <div className="flex max-sm:hidden">
          <h2>Home </h2>
          <h2 className="pl-1 "> / Add Category</h2>
        </div>

        <ListButton
          location={"/admin/categories-list"}
          text={"Categories List"}
        />
      </div>
      <div className="bg-white border rounded-md shadow-lg">
        <form
          action=""
          method="post"
          className="flex flex-col gap-4  p-5"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="">Add Category</h2>
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="productName">Category Name :</label>
              <input
                type="text"
                id="category"
                name="category"
                className=" border p-2 rounded-sm max-md:p-1"
                placeholder="Enter Category Name"
                value={category}
                // value={name}
                onChange={(e) => {
                  setCategory(e.target.value);
                  dispatch({ type: e.target.name, value: e.target.value });
                }}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="uniqueURL">Make Unique URL :</label>
              <input
                type="text"
                id="uniqueURL"
                name="uniqueURL"
                value={uniqueURL}
                onChange={(e) => {
                  setUniqueURL(e.target.value);
                  dispatch({ type: e.target.name, value: e.target.value });
                }}
                className=" border p-2 rounded-sm max-md:p-1"
                placeholder="Enter Unique URL"
                required
              />
            </div>

            <div className="p-2">
              <label htmlFor="image">File Input</label>
              <div className="flex">
                <div className="mb-4">
                  <label htmlFor="image" className="block font-medium ">
                    Image:
                  </label>
                  <input
                    type="file"
                    id="imageSelected"
                    name="imageSelected"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => {
                      setImageSelected(e.target.files[0]);
                      dispatch({
                        type: e.target.name,
                        value: e.target.files[0],
                      });
                    }}
                    className="w-full border border-gray-300 p-2 rounded-md max-md:p-1"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 py-3 max-md:p-1">
            <SubmitButton loading={createCategoryloading}>
              Create Category
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;

// const result = await axios.post(
//   "http://localhost:8000/api/upload",
//   formData,
//   {
//     headers: { "Content-Type": "multipart/formdata" },
//   }
// );
