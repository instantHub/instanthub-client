import React, { useEffect, useRef, useState } from "react";
import {
  useDeleteCLImageMutation,
  useDeleteImageMutation,
  useUpdateServiceMutation,
  useUploadServicesImageMutation,
} from "../../../features/api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateService(props) {
  const [updateService, { isLoading: updateServiceLoading }] =
    useUpdateServiceMutation();
  const [deleteImage, { isLoading: deleteLoading }] = useDeleteImageMutation();
  const [formData, setFormData] = useState({});
  const [newImage, setNewImage] = useState(false);

  const { updateData, setUpdateModel } = props;
  // console.log("updateData from UpdateService", updateData);

  // handle Image Delete
  const handleImageDelete = async (e) => {
    e.preventDefault();
    console.log(formData.image);

    try {
      // const imageDeleted = await deleteCLImage(formData.image).unwrap();
      const imageDeleted = await deleteImage({
        imageURL: formData.image,
      }).unwrap();
      console.log("handleImageDelete ", imageDeleted);
      toast.success("Image Deleted successfully..!");
      // window.location.reload();
      // Handle success
    } catch (error) {
      console.error("Error deleting image from Service Category:", error);
      toast.error("deleting Service image failed..!");
    }
  };

  const [uploadServicesImage, { isLoading: uploadLoading }] =
    useUploadServicesImageMutation();

  const fileInputRef = useRef(null);

  // File handler
  const uploadFileHandler = async (imagepath) => {
    console.log("from upload handler:", imagepath);
    const imageData = new FormData();
    // formData.append("image", imageSelected);
    imageData.append("image", imagepath);

    try {
      const res = await uploadServicesImage(imageData).unwrap();

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("handleSubmit");
    // console.log(updateData.serviceToUpdate._id, formData);

    if (newImage) {
      formData.image = await uploadFileHandler(formData.image);
    }

    try {
      const serviceUpdated = await updateService({
        serviceId: updateData.serviceToUpdate._id,
        data: formData,
      });
      setNewImage(false);
      console.log("serviceUpdated:- ", serviceUpdated);
      console.log("serviceUpdated:- ", serviceUpdated?.error?.status);

      if (serviceUpdated.error && serviceUpdated?.error?.status === 500) {
        toast.error(serviceUpdated.error.data.message);
        return;
      }
      toast.success(serviceUpdated.data.message);
      // toast.success(`Service Updated Successfully`);
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error(`Something went wrong..!`);
    }

    // Send formData to backend or perform any other action
    // console.log("handleSubmit", formData);
  };

  useEffect(() => {
    if (updateData) {
      if (updateData.serviceFrom === "serviceSubProduct") {
        setFormData({
          name: updateData.serviceToUpdate.name,
          image: updateData.serviceToUpdate.image,
          description: updateData.serviceToUpdate.description,
          discount: updateData.serviceToUpdate.discount,
          price: updateData.serviceToUpdate.price,
          serviceFrom: updateData.serviceFrom,
        });
      } else {
        setFormData({
          name: updateData.serviceToUpdate.name,
          image: updateData.serviceToUpdate.image,
          serviceFrom: updateData.serviceFrom,
        });
      }
    }
  }, [updateData]);

  // console.log("test", updateData, formData);
  // console.log("formData fron update service", formData);

  return (
    <>
      <div className="">
        <div className="grow">
          <div className="flex justify-between items-center">
            <h1 className="bold text-[1.4rem] mb-2">Update Service</h1>
            <div className="flex items-center gap-1">
              <h2>Service Category</h2>
              <h2 className="pl-1"> / Update Service</h2>
            </div>
          </div>
          <div className="bg-white border rounded-md shadow-lg">
            <div className="flex flex-col gap-4 p-5 ">
              <div className="flex gap-2 items-center">
                {updateData.serviceFrom === "serviceCategory" && (
                  <>
                    <span className="text-lg opacity-75">Update </span>
                    {updateData.serviceToUpdate && (
                      <span className="text-xl ">
                        {updateData.serviceToUpdate.name}
                      </span>
                    )}
                    <span className="text-lg opacity-75">Service</span>
                  </>
                )}
              </div>
              <hr />

              <div className="flex flex-col">
                {formData && (
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <div className="flex">
                        <label>Service Name:</label>
                        <input
                          type="text"
                          name="serviceName"
                          className="border mx-2 py-1 px-2 rounded text-[15px]"
                          placeholder="Enter Service Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <img
                            src={
                              import.meta.env.VITE_APP_BASE_URL + formData.image
                            }
                            alt="serviceCatImg"
                            className="w-[100px] h-[100px] mx-auto "
                          />

                          <input
                            type="file"
                            name=""
                            // ref={fileInputRef}
                            id=""
                            onChange={(e) => {
                              setNewImage(true);
                              setFormData({
                                ...formData,
                                image: e.target.files[0],
                              });
                              // setNewImgSelected(true);
                            }}
                          />
                        </div>
                        <div className="mt-2">
                          {formData.image ? (
                            <button
                              onClick={(e) => handleImageDelete(e)}
                              className="px-2 py-1 text-white bg-red-500 rounded w-fit"
                            >
                              Delete Image
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {updateData.serviceFrom === "serviceSubProduct" && (
                      <>
                        <div className="flex mt-4">
                          <label>Product Description:</label>
                          <input
                            type="text"
                            name="Description"
                            className="border mx-2 py-1 px-2 rounded text-[15px]"
                            placeholder="Enter Service Name"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex mt-2">
                          <label>Product Discount:</label>
                          <input
                            type="number"
                            name="Discount"
                            className="border mx-2 py-1 px-2 rounded text-[15px]"
                            placeholder="Enter Service Name"
                            value={formData.discount}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                discount: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex mt-2">
                          <label>Product Price:</label>
                          <input
                            type="number"
                            name="Price"
                            className="border mx-2 py-1 px-2 rounded text-[15px]"
                            placeholder="Enter Service Name"
                            value={formData.price}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                price: e.target.value,
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-around py-3 px-2">
                <button
                  onClick={(e) => handleSubmit(e)}
                  className=" bg-green-600 text-white rounded px-2 py-1 cursor-pointer hover:bg-green-700"
                >
                  Update Service
                </button>
                <button
                  onClick={() => setUpdateModel(false)}
                  className=" bg-red-600 text-white rounded px-2 py-1 cursor-pointer hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateService;
