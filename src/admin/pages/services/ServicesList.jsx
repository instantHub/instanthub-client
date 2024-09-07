import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useGetServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../../../features/api";
import UpdateService from "./UpdateService";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ServicesList = () => {
  const { data: servicesData, isLoading: serviceDataLoading } =
    useGetServicesQuery();

  console.log("servicesData", servicesData);

  const [deleteService, { isLoading: deleteServiceLoading }] =
    useDeleteServiceMutation();
  const [updateService, { isLoading: updateServiceLoading }] =
    useUpdateServiceMutation();

  const [listServiceCategories, setListServiceCategories] = useState(false);
  const [listServiceBrands, setListServiceBrands] = useState(false);
  const [listBrandProblems, setListBrandProblems] = useState(false);
  const [listSubServices, setListSubServices] = useState(false);
  const [listSubServicesProducts, setListSubServicesProducts] = useState(false);

  const [selectedService, setSelectedService] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [updateData, setUpdateData] = useState({});
  const [updateModel, setUpdateModel] = useState(false);

  const editBtnStyle =
    "flex items-center gap-1 bg-blue-600 px-3 py-1 rounded-md";
  const deleteBtnStyle =
    "flex items-center gap-1 bg-red-600 px-3 py-1 rounded-md text-xl";

  const closeModal = () => {
    setIsOpen(false);
  };

  const [selectedServiceCategory, setSelectedServiceCategory] =
    useState(undefined);

  const handleDelete = async (serviceId, serviceType, serviceFrom) => {
    console.log(serviceId, serviceType, serviceFrom);
    await deleteService({ serviceId, serviceType, serviceFrom });
    closeModal();
  };

  // UPDATE Handler
  const handleUpdate = async (serviceToUpdate, serviceFrom) => {
    console.log("handleUpdate for service");
    console.log(serviceToUpdate, serviceFrom);

    const formData = serviceToUpdate;
    setUpdateData({
      serviceToUpdate,
      serviceFrom,
    });
  };

  const createButtonStyle = (buttonType) => {
    return `${
      buttonType
        ? `bg-green-700 text-white px-4 py-3 text-lg `
        : `bg-white px-4 py-2`
    } border font-serif text-black rounded-md shadow-xl cursor-pointer`;
  };

  return (
    <>
      <div className="p-4">
        {/* Buttons */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => {
              setListServiceBrands(false);
              setListSubServices(false);
              setListBrandProblems(false);
              setListSubServicesProducts(false);
              setListServiceCategories(!listServiceCategories);
              // setServiceType("DirectService");
            }}
            // className={`${
            //   listServiceCategories ? `bg-red-700` : `bg-blue-700`
            // } mx-auto  text-white px-4 rounded-md py-2 cursor-pointer`}
            className={createButtonStyle(listServiceCategories)}
          >
            List Service Categories
          </button>
          <button
            onClick={() => {
              setListServiceCategories(false);
              setListSubServices(false);
              setListBrandProblems(false);
              setListSubServicesProducts(false);
              setListServiceBrands(!listServiceBrands);
            }}
            className={createButtonStyle(listServiceBrands)}
          >
            List Service Brands
          </button>
          <button
            type="button"
            onClick={() => {
              setListServiceCategories(false);
              setListServiceBrands(false);
              setListSubServices(false);
              setListSubServicesProducts(false);
              setListBrandProblems(!listBrandProblems);
            }}
            className={createButtonStyle(listBrandProblems)}
          >
            List Brand Problems
          </button>
          <button
            type="button"
            onClick={() => {
              setListServiceCategories(false);
              setListServiceBrands(false);
              setListBrandProblems(false);
              setListSubServicesProducts(false);
              setListSubServices(!listSubServices);
            }}
            className={createButtonStyle(listSubServices)}
          >
            List Service Sub Category
          </button>
          <button
            type="button"
            onClick={() => {
              setListServiceCategories(false);
              setListServiceBrands(false);
              setListBrandProblems(false);
              setListSubServices(false);
              setListSubServicesProducts(!listSubServicesProducts);
            }}
            className={createButtonStyle(listSubServicesProducts)}
          >
            List Service Sub Products
          </button>
        </div>

        {/* Service Categories List */}
        {listServiceCategories && (
          <table className="w-full">
            <thead>
              <tr className="py-10 font-serif text-lg border shadow-xl text-green-800 font-bold">
                <th className="px-4 py-4 ">Service Name</th>
                <th className="px-4 py-2 ">Service Image</th>
                <th className="px-4 py-2 ">Service Type</th>
                <th className="px-4 py-2 ">Edit & Delete</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {!serviceDataLoading &&
                servicesData.serviceCategories.map((serviceCategory, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                    }
                  >
                    <td className=" py-2">{serviceCategory.name}</td>
                    <td className=" py-2">
                      {serviceCategory.image ? (
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL +
                            serviceCategory.image
                          }
                          alt="CAT"
                          className="w-[60px] h-[60px] mx-auto "
                        />
                      ) : (
                        <p className="text-red-500">No Image</p>
                      )}
                    </td>{" "}
                    <td className=" py-2">{serviceCategory.type}</td>
                    <td className="text-white py-2">
                      <div className="flex gap-2 justify-center">
                        {/* Edit Button */}
                        <button
                          className={editBtnStyle}
                          onClick={() => {
                            setUpdateModel(true);
                            handleUpdate(serviceCategory, "serviceCategory");
                          }}
                        >
                          Edit <FaEdit />
                        </button>

                        {/* Delete Button */}
                        <button
                          className={deleteBtnStyle}
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedService({
                              id: serviceCategory._id,
                              name: serviceCategory.name,
                              type: serviceCategory.type,
                              from: "serviceCategory",
                            });
                          }}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* Service Brands List */}
        {listServiceBrands && (
          <>
            <div className="flex justify-between">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <label htmlFor="condition" className=" mr-2">
                    Select Category:
                  </label>
                  <select
                    id="condition"
                    onChange={(e) => {
                      setSelectedServiceCategory(e.target.value);
                    }}
                    value={selectedServiceCategory}
                    className="px-2 py-1 rounded border text-black"
                  >
                    <option value="">Search</option>
                    {!serviceDataLoading &&
                      servicesData.serviceCategories
                        .filter((sc) => sc.type === "Brand")
                        .map((serviceCategory, index) => (
                          <option key={index} value={serviceCategory._id}>
                            {serviceCategory.name}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="py-10 font-serif text-lg border shadow-xl text-green-800 font-bold">
                  <th className="px-4 py-4 ">Service Name</th>
                  <th className="px-4 py-2 ">Brand Name</th>
                  <th className="px-4 py-2 ">Service Image</th>
                  <th className="px-4 py-2 ">Edit & Delete</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {!serviceDataLoading && !selectedServiceCategory
                  ? servicesData.serviceBrands.map((serviceBrand, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                        }
                      >
                        <td className=" py-2">
                          {serviceBrand.serviceCategoryId.name}
                        </td>
                        <td className=" py-2">{serviceBrand.name}</td>
                        <td className=" py-2">
                          {serviceBrand.image ? (
                            <img
                              src={
                                import.meta.env.VITE_APP_BASE_URL +
                                serviceBrand.image
                              }
                              alt="CAT"
                              className="w-[60px] h-[60px] mx-auto "
                            />
                          ) : (
                            <p className="text-red-500">No Image</p>
                          )}
                        </td>
                        <td className="text-white py-2">
                          <div className="flex gap-2 justify-center">
                            <button
                              className={editBtnStyle}
                              onClick={() => {
                                setUpdateModel(true);
                                handleUpdate(serviceBrand, "serviceBrand");
                              }}
                            >
                              Edit <FaEdit />
                            </button>
                            <button
                              className={deleteBtnStyle}
                              onClick={() => {
                                setIsOpen(true);
                                setSelectedService({
                                  id: serviceBrand._id,
                                  name: serviceBrand.name,
                                  type: serviceBrand.type,
                                  from: "serviceBrand",
                                });
                              }}
                            >
                              <MdDeleteForever />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : servicesData.serviceBrands
                      .filter(
                        (sb) =>
                          sb.serviceCategoryId._id === selectedServiceCategory
                      )
                      .map((serviceBrand, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-200" : "bg-white"
                          }
                        >
                          <td className=" py-2">
                            {serviceBrand.serviceCategoryId.name}
                          </td>
                          <td className=" py-2">{serviceBrand.name}</td>
                          <td className=" py-2">
                            {serviceBrand.image ? (
                              <img
                                src={
                                  import.meta.env.VITE_APP_BASE_URL +
                                  serviceBrand.image
                                }
                                alt="CAT"
                                className="w-[60px] h-[60px] mx-auto "
                              />
                            ) : (
                              <p className="text-red-500">No Image</p>
                            )}
                          </td>
                          <td className="text-white py-2">
                            <div className="flex gap-2 justify-center">
                              <button
                                className={editBtnStyle}
                                onClick={() => {
                                  setUpdateModel(true);
                                  handleUpdate(serviceBrand, "serviceBrand");
                                }}
                              >
                                Edit <FaEdit />
                              </button>
                              <button
                                className={deleteBtnStyle}
                                onClick={() => {
                                  setIsOpen(true);
                                  setSelectedService({
                                    id: serviceBrand._id,
                                    name: serviceBrand.name,
                                    type: serviceBrand.type,
                                    from: "serviceBrand",
                                  });
                                }}
                              >
                                <MdDeleteForever />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
              </tbody>
            </table>
          </>
        )}

        {/* Service Brands Problems List */}
        {listBrandProblems && (
          <table className="w-full">
            <thead>
              <tr className="py-10 font-serif text-lg border shadow-xl text-green-800 font-bold">
                <th className="px-4 py-4 ">Service Name</th>
                <th className="px-4 py-2 ">Problem Name</th>
                <th className="px-4 py-2 ">Sub Service Image</th>
                <th className="px-4 py-2 ">Edit & Delete</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {!serviceDataLoading &&
                servicesData.serviceProblems.map((problem, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                    }
                  >
                    <td className=" py-2">{problem.serviceCategoryId.name}</td>
                    <td className=" py-2">{problem.name}</td>
                    <td className=" py-2">
                      {problem.image ? (
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL + problem.image
                          }
                          alt="CAT"
                          className="w-[60px] h-[60px] mx-auto "
                        />
                      ) : (
                        <p className="text-red-500">No Image</p>
                      )}
                    </td>
                    <td className="text-white py-2">
                      <div className="flex gap-2 justify-center">
                        <button
                          className={editBtnStyle}
                          onClick={() => {
                            setUpdateModel(true);
                            handleUpdate(problem, "serviceBrandProblem");
                          }}
                        >
                          Edit <FaEdit />
                        </button>
                        <button
                          className={deleteBtnStyle}
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedService({
                              id: problem._id,
                              name: problem.name,
                              type: problem.serviceCategoryId.type,
                              from: "serviceProblem",
                            });
                          }}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* Service Sub Categories List */}
        {listSubServices && (
          <table className="w-full">
            <thead>
              <tr className="py-10 font-serif text-lg border shadow-xl text-green-800 font-bold">
                <th className="px-4 py-4 ">Service Name</th>
                <th className="px-4 py-2 ">Sub Service Name</th>
                <th className="px-4 py-2 ">Sub Service Image</th>
                <th className="px-4 py-2 ">Edit & Delete</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {!serviceDataLoading &&
                servicesData.serviceSubCategories.map((subService, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                    }
                  >
                    <td className=" py-2">
                      {subService.serviceCategoryId.name}
                    </td>
                    <td className=" py-2">{subService.name}</td>
                    <td className=" py-2">
                      {subService.image ? (
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL + subService.image
                          }
                          alt="CAT"
                          className="w-[60px] h-[60px] mx-auto "
                        />
                      ) : (
                        <p className="text-red-500">No Image</p>
                      )}
                    </td>
                    <td className="text-white py-2">
                      <div className="flex gap-2 justify-center">
                        <button
                          className={editBtnStyle}
                          onClick={() => {
                            setUpdateModel(true);
                            handleUpdate(subService, "serviceSubCategory");
                          }}
                        >
                          Edit <FaEdit />
                        </button>
                        <button
                          className={deleteBtnStyle}
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedService({
                              id: subService._id,
                              name: subService.name,
                              type: subService.serviceCategoryId.type,
                              from: "serviceSubCategory",
                            });
                          }}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* Service Sub Categories List */}
        {listSubServicesProducts && (
          <table className="w-full">
            <thead>
              <tr className="py-10 font-serif text-lg border shadow-xl text-green-800 font-bold">
                <th className="px-4 py-4 ">Service Name</th>
                <th className="px-4 py-2 ">Sub Service Name</th>
                <th className="px-4 py-2 ">Product Name</th>
                <th className="px-4 py-2 ">Product Description</th>
                <th className="px-4 py-2 ">Product Discount</th>
                <th className="px-4 py-2 ">Product Price</th>
                <th className="px-4 py-2 ">Product Image</th>
                <th className="px-4 py-2 ">Edit & Delete</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {!serviceDataLoading &&
                servicesData.serviceSubProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                    }
                  >
                    <td className=" py-2">{product.serviceCategoryId.name}</td>
                    <td className=" py-2">{product.subServiceId.name}</td>
                    <td className=" py-2">{product.name}</td>
                    <td className=" py-2 w-[250px]">{product.description}</td>
                    <td className=" py-2">{product.discount}</td>
                    <td className=" py-2">{product.price}</td>
                    <td className=" py-2">
                      {product.image ? (
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL + product.image
                          }
                          alt="CAT"
                          className="w-[60px] h-[60px] mx-auto "
                        />
                      ) : (
                        <p className="text-red-500">No Image</p>
                      )}
                    </td>
                    <td className="text-white py-2">
                      <div className="flex gap-2 justify-center">
                        <button
                          className={editBtnStyle}
                          onClick={() => {
                            setUpdateModel(true);
                            handleUpdate(product, "serviceSubProduct");
                          }}
                        >
                          Edit <FaEdit />
                        </button>
                        <button
                          className={deleteBtnStyle}
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedService({
                              id: product._id,
                              name: product.name,
                              type: product.serviceCategoryId.type,
                              from: "serviceSubProduct",
                            });
                          }}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {updateModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
            <UpdateService
              updateData={updateData}
              setUpdateModel={setUpdateModel}
            />
          </div>
        </div>
      )}

      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Sure want to delete this Service?
                </h2>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-4 items-center">
                  <span>Service Name</span>
                  <span className="text-lg font-semibold">
                    {selectedService.name}
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <span>Service Type</span>
                  <span className="text-lg font-semibold">
                    {selectedService.type}
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <span>Deleting From</span>
                  <span className="text-lg font-semibold">
                    {selectedService.from}
                  </span>
                </div>
              </div>
              <div className="flex justify-around mt-8">
                <button
                  onClick={() =>
                    handleDelete(
                      selectedService.id,
                      selectedService.type,
                      selectedService.from
                    )
                  }
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Yes
                </button>

                <button
                  onClick={closeModal}
                  className="bg-green-700 text-white px-4 py-1 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesList;
