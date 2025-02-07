import React, { useEffect, useRef, useState } from "react";
import {
  useUpdateServiceMutation,
  useUploadServicesImageMutation,
} from "../../../features/api/services/servicesApi";
// import { useDeleteCLImageMutation } from "../../../features/api";
import { useDeleteImageMutation } from "../../../features/api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateService(props) {
  const [updateService, { isLoading: updateServiceLoading }] =
    useUpdateServiceMutation();
  const [deleteImage, { isLoading: deleteLoading }] = useDeleteImageMutation();
  const [formData, setFormData] = useState({});
  const [newImage, setNewImage] = useState(false);

  const { updateData, setUpdateModel, closeModal } = props;
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
      closeModal(false);
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
          inspectionCharges: updateData.serviceToUpdate.inspectionCharges || 0,
          status: updateData.serviceToUpdate.status || "Active",
          serviceFrom: updateData.serviceFrom,
        });
      }
    }
  }, [updateData]);

  console.log("updateData", updateData);
  console.log("formData", formData);
  // console.log("formData fron update service", formData);

  return (
    <div className="flex flex-col gap-2 w-fit">
      <h2 className="bold text-xl max-sm:text-sm mb-2">Update Service</h2>
      {/* Service name for Service Category */}
      {updateData.serviceFrom === "serviceCategory" && (
        <p className="text-lg opacity-75 max-sm:text-sm">
          Update {updateData.serviceToUpdate.name}
        </p>
      )}
      <hr />
      <form className="flex flex-col gap-4 max-sm:text-xs">
        <div className="flex flex-col">
          {formData && (
            <div className="flex flex-col items-start">
              {/* Service Name AND Image Handler */}
              <div className="w-full grid grid-cols-3 max-sm:grid-cols-2 items-center">
                {/* Service Name */}
                <div className="w-full max-sm:col-span-2 grid grid-cols-2 max-sm:grid-cols-3 place-items-center items-center gap-2">
                  <label className="text-sm col-span-1">Service Name:</label>
                  <input
                    type="text"
                    name="serviceName"
                    className="max-sm:col-span-2 border py-1 px-2 rounded text-sm"
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

                {updateData.serviceFrom === "serviceCategory" && (
                  <>
                    <div className="w-full max-sm:col-span-2 grid grid-cols-2 max-sm:grid-cols-3 place-items-center items-center gap-2">
                      <label className="text-sm col-span-1">
                        Inspection Charges:
                      </label>
                      <input
                        type="number"
                        name="inspectionCharges"
                        className="max-sm:col-span-1 border py-1 px-2 rounded text-sm"
                        placeholder="Inspection Charges"
                        value={formData.inspectionCharges}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inspectionCharges: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* Status */}
                    <div className="w-full max-sm:col-span-2 grid grid-cols-2 max-sm:grid-cols-3 place-items-center items-center gap-2">
                      <label className="text-sm col-span-1">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        className="px-2 py-1 border rounded"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Image and Delete */}
                <div className="w-full flex flex-col gap-1 items-center">
                  <img
                    src={import.meta.env.VITE_APP_BASE_URL + formData.image}
                    alt="serviceCatImg"
                    className="w-[100px] h-fit mx-auto max-sm:w-[70px]"
                  />
                  {/* Delete Button */}
                  {formData.image ? (
                    <button
                      onClick={(e) => handleImageDelete(e)}
                      className="px-2 py-1 text-white bg-red-500 rounded w-fit text-sm max-sm:text-xs"
                    >
                      Delete Image
                    </button>
                  ) : null}
                </div>

                {/* File Selector */}
                <div className="w-full">
                  <input
                    type="file"
                    className="max-sm:text-xs"
                    onChange={(e) => {
                      setNewImage(true);
                      setFormData({
                        ...formData,
                        image: e.target.files[0],
                      });
                    }}
                  />
                </div>
              </div>

              {/* Sub Services */}
              {updateData.serviceFrom === "serviceSubProduct" && (
                <>
                  <div className="flex items-center mt-4  ">
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
                  <div className="flex items-center mt-2">
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
                  <div className="flex items-center mt-2">
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
            className=" bg-green-600 text-white rounded px-2 py-1 cursor-pointer hover:bg-green-700 max-sm:text-sm"
          >
            Update Service
          </button>
          <button
            onClick={() => setUpdateModel(false)}
            className=" bg-red-600 text-white rounded px-2 py-1 cursor-pointer hover:bg-red-700 max-sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateService;
