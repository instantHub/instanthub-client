import React from "react";
import ListButton from "../../../components/admin/ListButton";

const CreatePost = () => {
  return (
    <div className="w-full flex flex-col justify-center max-sm:w-fit px-[2%] pt-[2%] max-sm:text-sm">
      <div className="flex justify-between items-center">
        <h1 className="bold text-[1.4rem] mb-2 max-sm:text-sm">Create Post</h1>

        {/* <ListButton
          location={"/admin/categories-list"}
          text={"Categories List"}
        /> */}
      </div>
      <div className="bg-white border rounded-md shadow-lg max-sm:w-fit">
        <form
          className="flex flex-col gap-4 p-5"
          encType="multipart/form-data"
          //   onSubmit={handleSubmit}
        >
          <div>
            <h2 className="">Add Post</h2>
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div className="flex flex-col">
              <label htmlFor="productName">Post Name:</label>
              <input
                type="text"
                id="postName"
                className=" border p-2 rounded-sm max-md:p-1"
                placeholder="Enter Post Name"
                // value={category}
                // onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="productName">Post Short Description:</label>
              <input
                type="text"
                id="shortDescription"
                className=" border p-2 rounded-sm max-md:p-1"
                placeholder="Short Description"
                // value={category}
                // onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="productName">Description:</label>
              <textarea
                type="text"
                id="description"
                className=" border p-2 rounded-sm max-md:p-1"
                placeholder="Enter Description"
                // value={category}
                // onChange={(e) => setCategory(e.target.value)}
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
                    id="image"
                    name="image"
                    accept="image/*"
                    // ref={fileInputRef}
                    // onChange={(e) => setImageSelected(e.target.files[0])}
                    className="w-full border border-gray-300 p-2 rounded-md max-md:p-1"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-3 px-2 max-md:p-1">
            <button
              type="submit"
              className={`w-[20%] max-sm:w-1/2 bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300`}
              //   disabled={createCategoryloading}
            >
              {/* {!createCategoryloading ? "Create Category" : "Loading..."} */}
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
