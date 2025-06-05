import React, { useState, useReducer } from "react";
import {
  useGetServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "@api";
import UpdateService from "./UpdateService";
import ListItemCard from "./ListItemCard";

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
  const { data: servicesData } = useGetServicesQuery();
  console.log("servicesData", servicesData);

  // console.log("servicesData", servicesData);

  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log("Reducer State :-", state);

  const [selectedService, setSelectedService] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [updateData, setUpdateData] = useState({});
  const [updateModel, setUpdateModel] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async (serviceId, serviceType, serviceFrom) => {
    console.log(serviceId, serviceType, serviceFrom);
    await deleteService({ serviceId, serviceType, serviceFrom });
    closeModal();
  };

  // UPDATE Handler
  const handleUpdate = async (serviceToUpdate, serviceFrom) => {
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
