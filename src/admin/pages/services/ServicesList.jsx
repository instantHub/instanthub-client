import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import {
  useGetServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../../../features/api";
import UpdateService from "./UpdateService";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ListItemCard from "./ListItemCard";
import ConfirmationModal from "../../components/ConfirmationModal";

const initialState = {
  showList: {
    listServiceCategories: false,
    listServiceBrands: false,
    listBrandProblems: false,
    listSubServices: false,
    listSubServicesProducts: false,
  },
};

function reducer(state, action) {
  const { type, key, value } = action;
  switch (type) {
    case "toggle":
      const updatedToggle = Object.entries(state.showList).reduce(
        (acc, [k]) => {
          if (k === key) acc[k] = true;
          else acc[k] = false;

          return acc;
        },
        {}
      );
      return {
        ...state,
        showList: updatedToggle,
      };

    default:
      return state;
  }
}

const ServicesList = () => {
  const { data: servicesData, isLoading: serviceDataLoading } =
    useGetServicesQuery();
  console.log("servicesData", servicesData);

  // console.log("servicesData", servicesData);

  const [deleteService, { isLoading: deleteServiceLoading }] =
    useDeleteServiceMutation();
  const [updateService, { isLoading: updateServiceLoading }] =
    useUpdateServiceMutation();

  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log("Reducer State :-", state);

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
    // console.log("handleUpdate for service");
    // console.log(serviceToUpdate, serviceFrom);

    const formData = serviceToUpdate;
    setUpdateData({
      serviceToUpdate,
      serviceFrom,
    });
  };

  const createButtonStyle = (buttonType) => {
    return `${
      buttonType
        ? `bg-green-700 text-white px-4 max-sm:px-2 py-3 max-sm:py-1 text-lg max-sm:text-xs`
        : `bg-white px-4 max-sm:px-2 py-2 max-sm:py-1 max-sm:text-[10px]`
    } border font-serif text-black rounded-md shadow-xl max-sm:shadow cursor-pointer`;
  };

  return (
    <>
      <div className="p-4 max-sm:p-2">
        {/* Buttons */}
        <div className="grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-2 justify-between items-center mb-5 max-sm:mb-5">
          <button
            onClick={() => {
              dispatch({
                type: "toggle",
                key: "listServiceCategories",
                value: !state.showList.listServiceCategories,
              });
            }}
            className={createButtonStyle(state.showList.listServiceCategories)}
          >
            List Service Categories
          </button>
          <button
            onClick={() => {
              dispatch({
                type: "toggle",
                key: "listServiceBrands",
                value: !state.showList.listServiceBrands,
              });
            }}
            className={createButtonStyle(state.showList.listServiceBrands)}
          >
            List Service Brands
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch({
                type: "toggle",
                key: "listBrandProblems",
                value: !state.showList.listBrandProblems,
              });
            }}
            className={createButtonStyle(state.showList.listBrandProblems)}
          >
            List Brand Problems
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch({
                type: "toggle",
                key: "listSubServices",
                value: !state.showList.listSubServices,
              });
            }}
            className={createButtonStyle(state.showList.listSubServices)}
          >
            List Service Sub Category
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch({
                type: "toggle",
                key: "listSubServicesProducts",
                value: !state.showList.listSubServicesProducts,
              });
            }}
            className={createButtonStyle(
              state.showList.listSubServicesProducts
            )}
          >
            List Service Sub Products
          </button>
        </div>

        {/* Service Categories List */}
        {state.showList.listServiceCategories && (
          <div className="grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-2 justify-between items-center mb-5 max-sm:mb-5">
            {servicesData?.serviceCategories.map((serviceCategory) => (
              <ListItemCard
                key={serviceCategory._id}
                data={serviceCategory}
                service={{
                  categoriesList: true,
                  brandsList: false,
                  problemsList: false,
                }}
                handleEdit={() => {
                  setUpdateModel(true);
                  handleUpdate(serviceCategory, "serviceCategory");
                }}
                handleDelete={() => {
                  setIsOpen(true);
                  setSelectedService({
                    id: serviceCategory._id,
                    name: serviceCategory.name,
                    type: serviceCategory.type,
                    from: "serviceCategory",
                  });
                }}
              />
            ))}
          </div>
        )}

        {/* Service Brands List */}
        {state.showList.listServiceBrands && (
          <div className="grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-2 justify-between items-center mb-5 max-sm:mb-5">
            {servicesData?.serviceBrands?.map((serviceBrand) => (
              <ListItemCard
                key={serviceBrand._id}
                data={serviceBrand}
                service={{
                  categoriesList: false,
                  brandsList: true,
                  problemsList: false,
                }}
                handleEdit={() => {
                  setUpdateModel(true);
                  handleUpdate(serviceBrand, "serviceBrand");
                }}
                handleDelete={() => {
                  setIsOpen(true);
                  setSelectedService({
                    id: serviceBrand._id,
                    name: serviceBrand.name,
                    type: serviceBrand.type,
                    from: "serviceBrand",
                  });
                }}
              />
            ))}
          </div>
        )}

        {/* Service Brands Problems List */}
        {state.showList.listBrandProblems && (
          <div className="grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-2 justify-between items-center mb-5 max-sm:mb-5">
            {servicesData?.serviceProblems?.map((problem) => (
              <ListItemCard
                key={problem._id}
                data={problem}
                service={{
                  categoriesList: false,
                  brandsList: false,
                  problemsList: true,
                }}
                handleEdit={() => {
                  setUpdateModel(true);
                  handleUpdate(problem, "serviceBrandProblem");
                }}
                handleDelete={() => {
                  setIsOpen(true);
                  setSelectedService({
                    id: problem._id,
                    name: problem.name,
                    type: problem.serviceCategoryId.type,
                    from: "serviceProblem",
                  });
                }}
              />
            ))}
          </div>
        )}

        {/* Service Sub Categories List */}
        {state.showList.listSubServices && (
          <div className="grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-2 justify-between items-center mb-5 max-sm:mb-5">
            {servicesData?.serviceSubCategories?.map((subService) => (
              <ListItemCard
                key={subService._id}
                data={subService}
                service={{
                  categoriesList: false,
                  brandsList: false,
                  problemsList: false,
                  subServiceList: true,
                }}
                handleEdit={() => {
                  setUpdateModel(true);
                  handleUpdate(subService, "serviceSubCategory");
                }}
                handleDelete={() => {
                  setIsOpen(true);
                  setSelectedService({
                    id: subService._id,
                    name: subService.name,
                    type: subService.serviceCategoryId.type,
                    from: "serviceSubCategory",
                  });
                }}
              />
            ))}
          </div>
        )}

        {/* Service Sub Categories Products List */}
        {state.showList.listSubServicesProducts && (
          <div className="w-full grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-1 gap-2 justify-between items-center mb-5 max-sm:mb-5">
            {servicesData?.serviceSubProducts?.map((product) => (
              <ListItemCard
                key={product._id}
                data={product}
                service={{
                  categoriesList: false,
                  brandsList: false,
                  problemsList: false,
                  subServiceList: false,
                  subServiceProductsList: true,
                }}
                handleEdit={() => {
                  setUpdateModel(true);
                  handleUpdate(product, "serviceSubProduct");
                }}
                handleDelete={() => {
                  setIsOpen(true);
                  setSelectedService({
                    id: product._id,
                    name: product.name,
                    type: product.serviceCategoryId.type,
                    from: "serviceSubProduct",
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>

      {updateModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 max-sm:p-2 rounded-lg shadow-lg w-fit max-sm:w-[95%]">
            <UpdateService
              updateData={updateData}
              setUpdateModel={setUpdateModel}
              closeModal={setUpdateModel}
            />
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-sm:w-[95%] max-w-md rounded shadow-lg p-6 max-sm:px-3 max-sm:py-6">
            <h2 className="text-lg font-semibold mb-4">
              Sure want to delete this Service?
            </h2>
            <p className="text-gray-800 mb-2">
              Service Name: {selectedService.name}
            </p>
            <p className="text-gray-800 mb-2">
              Service Type: {selectedService.type}
            </p>
            <p className="text-gray-600 mb-6">
              Deleting From: {selectedService.from}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                onClick={() => {
                  handleDelete(
                    selectedService.id,
                    selectedService.type,
                    selectedService.from
                  );
                  closeModal();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesList;

// const DisplayDetail = ({ label, text }) => {
//   return (
//     <div className="flex gap-4 max-sm:gap-2 items-center">
//       <span>{label}:</span>
//       <span className="text-lg max-sm:text-sm font-semibold">{text}</span>
//     </div>
//   );
// };

// Service Category
{
  /* <table className="w-full">
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
                  servicesData.serviceCategories.map(
                    (serviceCategory, index) => (
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
                            <button
                              className={editBtnStyle}
                              onClick={() => {
                                setUpdateModel(true);
                                handleUpdate(
                                  serviceCategory,
                                  "serviceCategory"
                                );
                              }}
                            >
                              Edit <FaEdit />
                            </button>

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
                    )
                  )}
              </tbody>
            </table> */
}

// Brands List
{
  /* <div className="flex justify-between">
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
            </table> */
}

// Problems List
{
  /* <table className="w-full">
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
                      <td className=" py-2">
                        {problem.serviceCategoryId.name}
                      </td>
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
            </table> */
}

// Service Sub Category
{
  /* <table className="w-full">
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
                              import.meta.env.VITE_APP_BASE_URL +
                              subService.image
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
            </table> */
}

// Sub Service Products
{
  /* <table className="w-full">
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
                      <td className=" py-2">
                        {product.serviceCategoryId.name}
                      </td>
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
            </table> */
}

// Delete
{
  //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  //   <div className="bg-white p-8 rounded-lg shadow-lg w-2/4 max-sm:w-[95%]">
  //     <div className="flex justify-center">
  //       <h2 className="text-xl max-sm:text-sm font-semibold mb-4 text-center">
  //         Sure want to delete this Service?
  //       </h2>
  //     </div>
  //     <div className="flex flex-col items-center">
  //       <DisplayDetail
  //         label={"Service Name"}
  //         text={selectedService.name}
  //       />
  //       <DisplayDetail
  //         label={"Service Type"}
  //         text={selectedService.type}
  //       />
  //       <DisplayDetail
  //         label={"Deleting From"}
  //         text={selectedService.from}
  //       />
  //     </div>
  //     <div className="flex justify-around mt-8">
  //       <button
  //         onClick={() =>
  //           handleDelete(
  //             selectedService.id,
  //             selectedService.type,
  //             selectedService.from
  //           )
  //         }
  //         className="bg-red-600 text-white px-4 py-1 rounded"
  //       >
  //         Yes
  //       </button>
  //       <button
  //         onClick={closeModal}
  //         className="bg-green-700 text-white px-4 py-1 rounded"
  //       >
  //         No
  //       </button>
  //     </div>
  //   </div>
  // </div>
}
