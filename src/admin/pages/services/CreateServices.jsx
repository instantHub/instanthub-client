import React, { useReducer, useRef, useState } from "react";
import {
  useCreateServicesMutation,
  useGetServicesQuery,
  useUploadServicesImageMutation,
} from "../../../features/api";
import { toast } from "react-toastify";

const initialState = {
  currentForm: {
    createServiceForm: false,
    createServiceBrandForm: false,
    createBrandProblemsForm: false,
    createSubServiceForm: false,
    createSubServiceProdForm: false,
  },
  serviceType: "",
  serviceCategory: {
    serviceFor: "",
    type: "",
    serviceName: "",
    serviceImage: "",
  },
  serviceBrand: {
    serviceFor: "",
    type: "",
    serviceCategoryId: "",
    brandName: "",
    brandImage: "",
  },
  serviceBrandProblem: {
    serviceFor: "",
    serviceCategoryId: "",
    brandProblemName: "",
    brandProblemImage: "",
  },
  serviceSubCategory: {
    serviceFor: "",
    type: "",
    serviceCategoryId: "",
    subServiceName: "",
    subServiceImage: "",
  },
  serviceSubProduct: {
    serviceFor: "",
    serviceCategoryId: "",
    subServiceId: "",
    productName: "",
    subProdDesc: "",
    prodDisPer: "",
    productPrice: "",
    productImage: "",
  },
};

function reducer(state, action) {
  const { type, key, value } = action;
  switch (type) {
    case "toggle":
      const updatedToggle = Object.entries(state.currentForm).reduce(
        (acc, [k]) => {
          if (k === key) acc[k] = true;
          else acc[k] = false;

          return acc;
        },
        {}
      );
      return {
        ...state,
        currentForm: updatedToggle,
      };

    case "serviceType":
      return { ...state, [key]: value };

    case "serviceCategory":
      state[type] = {
        ...state[type],
        [key]: value,
      };
      return { ...state };

    case "serviceBrand":
      state[type] = {
        ...state[type],
        [key]: value,
      };
      return { ...state };

    case "serviceBrandProblem":
      state[type] = {
        ...state[type],
        [key]: value,
      };
      return { ...state };

    case "serviceSubCategory":
      state[type] = {
        ...state[type],
        [key]: value,
      };
      return { ...state };

    case "serviceSubProduct":
      state[type] = {
        ...state[type],
        [key]: value,
      };
      return { ...state };

    default:
      return state;
  }
}

const CreateServiceForm = () => {
  const { data: servicesData, serviceLoading: servicesLoading } =
    useGetServicesQuery();

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("Reducer State :-", state);

  const [createService, { isLoading: createServiceLoading }] =
    useCreateServicesMutation();

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

  const handleSubmit = async (e, from) => {
    e.preventDefault();

    console.log("state.state.serviceType", state.serviceType);
    console.log("serviceFor", from);

    let payload = {};

    if (state.currentForm.createServiceForm) {
      payload = {
        ...state.serviceCategory,
        type: state.serviceType,
        serviceFor: from,
        serviceImage: await uploadFileHandler(
          state.serviceCategory.serviceImage
        ),
      };
    } else if (state.currentForm.createServiceBrandForm) {
      payload = {
        ...state.serviceBrand,
        type: state.serviceType,
        serviceFor: from,
        brandImage: await uploadFileHandler(state.serviceBrand.brandImage),
      };
    } else if (state.currentForm.createBrandProblemsForm) {
      payload = {
        ...state.serviceBrandProblem,
        serviceFor: from,
        brandProblemImage: await uploadFileHandler(
          state.serviceBrandProblem.brandProblemImage
        ),
      };
    } else if (state.currentForm.createSubServiceForm) {
      payload = {
        ...state.serviceSubCategory,
        type: state.serviceType,
        serviceFor: from,
        subServiceImage: await uploadFileHandler(
          state.serviceSubCategory.subServiceImage
        ),
      };
    } else if (state.currentForm.createSubServiceProdForm) {
      payload = {
        ...state.serviceSubProduct,
        serviceFor: from,
        productImage: await uploadFileHandler(
          state.serviceSubProduct.productImage
        ),
      };
    }

    console.log("payload in handleSubmit:- ", from, payload);

    try {
      // const response = await axios.post("/api/services", payload);
      const response = await createService(payload);
      console.log("Service created successfully:", response.data);

      if (response.error && response?.error?.status === 500) {
        console.log("Service creation failed:", response.error);
        toast.error(response.error.data.message);
      } else {
        toast.success(response.data.message);
        // toast.success("Service created successfully");
      }

      // Clear the value of the file input
      fileInputRef.current.value = "";
      // Mark the file input as required again
      fileInputRef.current.required = true;
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Service creation failed");
    }
  };

  const createHeadingStyle =
    "text-2xl max-sm:text-sm text-green-800 font-serif font-bold py-1";

  const formStyle = "flex flex-col gap-4 p-5 max-sm:p-4 w-full";
  const inputDiv = "w-fit grid grid-cols-2 text-sm max-sm:text-xs";
  const inputLabel = "text-sm max-sm:text-xs";
  const inputBox = "text-sm max-sm:text-xs";
  const inputSubmitBtn =
    "w-fit px-4 py-2 max-sm:px-2 max-sm:py-1 max-sm:text-sm bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300";

  const createButtonStyle = (buttonType) => {
    return `${
      buttonType
        ? `bg-green-700 text-white px-4 max-sm:px-2 py-3 max-sm:py-1 text-lg max-sm:text-xs`
        : `bg-white px-4 max-sm:px-2 py-2 max-sm:py-1 max-sm:text-[10px]`
    } border font-serif text-[16px] text-black rounded-md shadow-xl max-sm:shadow cursor-pointer`;
  };

  return (
    <div className="flex w-[90%] max-sm:w-[95%] mt-[2%] mx-auto">
      <div className="flex gap-4 w-full">
        <div className="w-full">
          {/* Buttons */}
          <div className="grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-2 justify-between items-center mb-5 max-sm:mb-5">
            <button
              onClick={() => {
                dispatch({
                  type: "toggle",
                  key: "createServiceForm",
                  value: !state.currentForm.createServiceForm,
                });
                dispatch({
                  type: "serviceType",
                  key: "serviceType",
                  value: "DirectService",
                });
              }}
              // className={`${
              //   createServiceForm ? `bg-red-700` : `bg-blue-700`
              // } mx-auto  text-white px-4 rounded-md py-2 cursor-pointer`}
              className={createButtonStyle(state.currentForm.createServiceForm)}
            >
              Create Service Category
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "toggle",
                  key: "createServiceBrandForm",
                  value: !state.currentForm.createServiceBrandForm,
                });
                dispatch({
                  type: "serviceType",
                  key: "serviceType",
                  value: "Brand",
                });
              }}
              className={createButtonStyle(
                state.currentForm.createServiceBrandForm
              )}
            >
              Create Service Brand
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "toggle",
                  key: "createBrandProblemsForm",
                  value: !state.currentForm.createBrandProblemsForm,
                });
                dispatch({
                  type: "serviceType",
                  key: "serviceType",
                  value: "Brand",
                });
              }}
              className={createButtonStyle(
                state.currentForm.createBrandProblemsForm
              )}
            >
              Create Brand Problems
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "toggle",
                  key: "createSubServiceForm",
                  value: !state.currentForm.createSubServiceForm,
                });
                dispatch({
                  type: "serviceType",
                  key: "serviceType",
                  value: "ServiceSubCategory",
                });
              }}
              className={createButtonStyle(
                state.currentForm.createSubServiceForm
              )}
            >
              Create Service Sub Category
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "toggle",
                  key: "createSubServiceProdForm",
                  value: !state.currentForm.createSubServiceProdForm,
                });
                dispatch({
                  type: "serviceType",
                  key: "serviceType",
                  value: "ServiceSubCategory",
                });
              }}
              className={createButtonStyle(
                state.currentForm.createSubServiceProdForm
              )}
            >
              Create Sub Service Products
            </button>
          </div>

          {/* Service Category Creation */}
          {/* {createServiceForm && ( */}
          {state.currentForm.createServiceForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>Create Service Category</h2>
              </div>
              <form
                onSubmit={(e) => handleSubmit(e, "serviceCategory")}
                className={`${formStyle}`}
              >
                {/* Select Type */}
                <div className={`${inputDiv}`}>
                  <label className={`${inputLabel}`}>Service Type</label>
                  <select
                    value={state.serviceType}
                    onChange={(e) => {
                      dispatch({
                        type: "serviceType",
                        key: "serviceType",
                        value: e.target.value,
                      });
                      // setServiceType(e.target.value);
                    }}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="DirectService">Direct Service</option>
                    <option value="Brand">Brand</option>
                    <option value="ServiceSubCategory">
                      Service Sub Category
                    </option>
                  </select>
                </div>

                {/* Service Name */}
                <div className={`${inputDiv}`}>
                  <label className={`${inputLabel}`}>Service Name</label>
                  <input
                    type="text"
                    value={state.serviceCategory.serviceName}
                    onChange={(e) => {
                      // setServiceName(e.target.value);
                      dispatch({
                        type: "serviceCategory",
                        key: "serviceName",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    placeholder="Enter Service Name"
                    required
                  />
                </div>

                {/* Image */}
                <div className={`${inputDiv}`}>
                  <input
                    type="file"
                    name="image"
                    className="col-span-2"
                    ref={fileInputRef}
                    onChange={(e) => {
                      // setServiceImage(e.target.files[0]);
                      dispatch({
                        type: "serviceCategory",
                        key: "serviceImage",
                        value: e.target.files[0],
                      });
                    }}
                    // onChange={(e) => setImageSelected(e.target.files[0])}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className={`${inputSubmitBtn}`}
                    disabled={createServiceLoading}
                  >
                    {!createServiceLoading
                      ? "Create Service Category"
                      : "Loading..."}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Service Brand Creation */}
          {/* {createServiceBrandForm && ( */}
          {state.currentForm.createServiceBrandForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>Create Service Brand</h2>
              </div>
              <form
                // onSubmit={handleSubmit}
                onSubmit={(e) => handleSubmit(e, "serviceBrand")}
                className={`${formStyle}`}
              >
                {/* Select Type */}
                <div className={`${inputDiv}`}>
                  <label className={`${inputLabel}`}>Service Type</label>
                  <select
                    value={state.serviceType}
                    onChange={(e) => {
                      dispatch({
                        type: "serviceType",
                        key: "serviceType",
                        value: e.target.value,
                      });
                      // setServiceType(e.target.value);
                    }}
                    className="px-2 py-1 bg-gray-700 text-white border rounded"
                  >
                    <option value="DirectService" disabled>
                      Direct Service
                    </option>
                    <option value="Brand">Brand</option>
                    <option value="ServiceSubCategory" disabled>
                      Service Sub Category
                    </option>
                  </select>
                </div>

                {/* Select Service Category */}
                <div className={`${inputDiv}`}>
                  <label className={`${inputLabel}`}>Service Category</label>
                  <select
                    value={state.serviceBrand.serviceCategory}
                    onChange={(e) => {
                      // setServiceCategory(e.target.value);
                      dispatch({
                        type: "serviceBrand",
                        key: "serviceCategoryId",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    required
                  >
                    <option value="">Select Service Category</option>
                    {!servicesLoading &&
                      servicesData?.serviceCategories
                        .filter((sc) => sc.type === state.serviceType)
                        .map((sc, i) => (
                          <option value={sc._id} key={i}>
                            {sc.name}
                          </option>
                        ))}
                  </select>
                </div>

                {/* Brand Name */}
                <div className={`${inputDiv}`}>
                  <label className={`${inputLabel}`}>Brand Name</label>
                  <input
                    type="text"
                    value={state.serviceBrand.brandName}
                    onChange={(e) => {
                      // setBrandName(e.target.value);
                      dispatch({
                        type: "serviceBrand",
                        key: "brandName",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    placeholder="Enter Brand Name"
                    required
                  />
                </div>

                {/* Image */}
                <div className={`${inputDiv}`}>
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    className="col-span-2"
                    onChange={(e) => {
                      // setBrandImage(e.target.files[0]);
                      dispatch({
                        type: "serviceBrand",
                        key: "brandImage",
                        value: e.target.files[0],
                      });
                    }}
                    // onChange={(e) => setImageSelected(e.target.files[0])}
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className={`${inputSubmitBtn}`}
                    disabled={createServiceLoading}
                  >
                    {!createServiceLoading
                      ? "Create Service Brand"
                      : "Loading..."}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Service Brand Problems Creation */}
          {state.currentForm.createBrandProblemsForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>Create Brand Problems</h2>
              </div>
              <form
                // onSubmit={handleSubmit}
                onSubmit={(e) => handleSubmit(e, "serviceBrandProblem")}
                className={`${formStyle}`}
              >
                {/* Select Type */}
                <div className={`${inputDiv}`}>
                  <label className={`${inputLabel}`}>Service Category</label>
                  <select
                    value={state.serviceBrandProblem.serviceCategory}
                    onChange={(e) => {
                      // setServiceCategory(e.target.value);
                      dispatch({
                        type: "serviceBrandProblem",
                        key: "serviceCategoryId",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    required
                  >
                    <option value="">Select Service Category</option>
                    {servicesData.serviceCategories
                      .filter((sc) => sc.type === "Brand")
                      .map((sc, i) => (
                        <option value={sc._id} key={i}>
                          {sc.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className={`${inputDiv}`}>
                  <label className={`${inputLabel}`}>Brand Problem Name</label>
                  <input
                    type="text"
                    value={state.serviceBrandProblem.brandProblemName}
                    onChange={(e) => {
                      // setBrandProblemName(e.target.value);
                      dispatch({
                        type: "serviceBrandProblem",
                        key: "brandProblemName",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    placeholder="Enter Name"
                    required
                  />
                </div>

                <div className={`${inputDiv}`}>
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    className="col-span-2"
                    onChange={(e) => {
                      // setBrandProblemImage(e.target.files[0]);
                      dispatch({
                        type: "serviceBrandProblem",
                        key: "brandProblemImage",
                        value: e.target.files[0],
                      });
                    }}
                    // onChange={(e) => setImageSelected(e.target.files[0])}
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className={`${inputSubmitBtn}`}
                    disabled={createServiceLoading}
                  >
                    {!createServiceLoading
                      ? "Create Brand Problem"
                      : "Loading..."}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Service Sub Category Creation */}
          {state.currentForm.createSubServiceForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>
                  Create Service Sub Category
                </h2>
              </div>
              <form
                // onSubmit={handleSubmit}
                onSubmit={(e) => handleSubmit(e, "serviceSubCategory")}
                className={`${formStyle}`}
              >
                {/* Select Type */}
                <div className={`${inputDiv}`}>
                  <label className={`${inputLabel}`}>Service Type</label>
                  <select
                    value={state.serviceType}
                    onChange={(e) => {
                      dispatch({
                        type: "serviceType",
                        key: "serviceType",
                        value: e.target.value,
                      });
                      // setServiceType(e.target.value);
                    }}
                    className="px-2 py-1 bg-gray-700 text-gray-100 border rounded"
                  >
                    <option value="DirectService" disabled>
                      Direct Service
                    </option>
                    <option value="Brand" disabled>
                      Brand
                    </option>
                    <option value="ServiceSubCategory">
                      Service Sub Category
                    </option>
                  </select>
                </div>

                {/* Select Service Category */}
                <div className={`${inputDiv}`}>
                  <label className={`${inputLabel}`}>Service Category</label>
                  <select
                    value={state.serviceSubCategory.serviceCategory}
                    onChange={(e) => {
                      // setServiceCategory(e.target.value);
                      dispatch({
                        type: "serviceSubCategory",
                        key: "serviceCategoryId",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    required
                  >
                    <option value="">Select Service Category</option>
                    {!servicesLoading &&
                      servicesData?.serviceCategories
                        .filter((sc) => sc.type === state.serviceType)
                        .map((sc, i) => (
                          <option value={sc._id} key={i}>
                            {sc.name}
                          </option>
                        ))}
                  </select>
                </div>

                {/* Service Sub Category Name */}
                <div className={`${inputDiv}`}>
                  <p className={`${inputLabel}`}>Service Sub Category Name</p>
                  <input
                    type="text"
                    value={state.serviceSubCategory.subServiceName}
                    onChange={(e) => {
                      // setSubServiceName(e.target.value);
                      dispatch({
                        type: "serviceSubCategory",
                        key: "subServiceName",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    placeholder="Enter Name"
                    required
                  />
                </div>

                {/* Image */}
                <div className={`${inputDiv}`}>
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    className="col-span-2"
                    onChange={(e) => {
                      // setSubServiceImage(e.target.files[0]);
                      dispatch({
                        type: "serviceSubCategory",
                        key: "subServiceImage",
                        value: e.target.files[0],
                      });
                    }}
                    // onChange={(e) => setImageSelected(e.target.files[0])}
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className={`${inputSubmitBtn}`}
                    disabled={createServiceLoading}
                  >
                    {!createServiceLoading
                      ? "Create Sub Service"
                      : "Loading..."}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Sub Service Product Creation */}
          {state.currentForm.createSubServiceProdForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>
                  Create Sub Service Products
                </h2>
              </div>
              <form
                // onSubmit={handleSubmit}
                onSubmit={(e) => handleSubmit(e, "serviceSubProduct")}
                className={`${formStyle}`}
              >
                {/* Select Type */}
                <div className={`${inputDiv}`}>
                  <label>Service Category</label>
                  <select
                    value={state.serviceSubProduct.serviceCategory}
                    onChange={(e) => {
                      // setServiceCategory(e.target.value);
                      dispatch({
                        type: "serviceSubProduct",
                        key: "serviceCategoryId",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    required
                  >
                    <option value="">Select Service Category</option>
                    {servicesData.serviceCategories
                      .filter((sc) => sc.type === "ServiceSubCategory")
                      .map((sc, i) => (
                        <option value={sc._id} key={i}>
                          {sc.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Select Service Brand */}
                <div className={`${inputDiv}`}>
                  <label>Service Sub Service</label>
                  <select
                    value={state.serviceSubProduct.subService}
                    onChange={(e) => {
                      // setSubService(e.target.value);
                      dispatch({
                        type: "serviceSubProduct",
                        key: "subServiceId",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    required
                  >
                    <option value="">Select Service Sub Service</option>
                    {!servicesLoading &&
                      servicesData.serviceSubCategories
                        .filter(
                          (ssc) =>
                            ssc.serviceCategoryId._id ===
                            state.serviceSubProduct.serviceCategoryId
                        )
                        .map((ssc, i) => (
                          <option value={ssc._id} key={i}>
                            {ssc.name}
                          </option>
                        ))}
                  </select>
                </div>

                <div className={`${inputDiv}`}>
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={state.serviceSubProduct.subProdName}
                    onChange={(e) => {
                      // setSubProdName(e.target.value);
                      dispatch({
                        type: "serviceSubProduct",
                        key: "productName",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className={`${inputDiv}`}>
                  <label>Product Description</label>
                  <input
                    type="text"
                    value={state.serviceSubProduct.subProdDesc}
                    onChange={(e) => {
                      // setSubProdDesc(e.target.value);
                      dispatch({
                        type: "serviceSubProduct",
                        key: "subProdDesc",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    placeholder="Enter Prod Description"
                    required
                  />
                </div>
                <div className={`${inputDiv}`}>
                  <label>Product Discount %</label>
                  <input
                    type="number"
                    value={state.serviceSubProduct.prodDisPer}
                    onChange={(e) => {
                      // setProdDisPer(e.target.value);
                      dispatch({
                        type: "serviceSubProduct",
                        key: "prodDisPer",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    placeholder={`Enter % number`}
                    required
                  />
                </div>
                <div className={`${inputDiv}`}>
                  <label>Product Price</label>
                  <input
                    type="number"
                    value={state.serviceSubProduct.subProdPrice}
                    onChange={(e) => {
                      // setSubProdPrice(e.target.value);
                      dispatch({
                        type: "serviceSubProduct",
                        key: "productPrice",
                        value: e.target.value,
                      });
                    }}
                    className="px-2 py-1 border rounded"
                    placeholder={`Enter Price for ${state.serviceSubProduct.productName}`}
                    required
                  />
                </div>

                <div className={`${inputDiv}`}>
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    onChange={(e) => {
                      // setSubProdImage(e.target.files[0]);
                      dispatch({
                        type: "serviceSubProduct",
                        key: "productImage",
                        value: e.target.files[0],
                      });
                    }}
                    // onChange={(e) => setImageSelected(e.target.files[0])}
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className={`${inputSubmitBtn}`}
                    disabled={createServiceLoading}
                  >
                    {!createServiceLoading
                      ? "Create Service Product"
                      : "Loading..."}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateServiceForm;

// const [createServiceForm, setCreateServiceForm] = useState(false);
// const [createServiceBrandForm, setCreateServiceBrandForm] = useState(false);
// const [createBrandProblemsForm, setCreateBrandProblemsForm] = useState(false);
// const [createSubServiceForm, setCreateSubServiceForm] = useState(false);
// const [createSubServiceProdForm, setCreateSubServiceProdForm] =
//   useState(false);

// const handleSubmit = async (e, from) => {
//   e.preventDefault();

//   // let payload = {
//   //   serviceFor: from,
//   //   type: state.serviceType,
//   //   serviceName,
//   //   serviceImage,
//   // };

//   console.log("state.state.serviceType", state.serviceType);
//   console.log("serviceFor", from);

//   let payload = {};

//   if (from === "serviceCategory") {
//     payload.serviceFor = from;
//     payload.type = state.serviceType;
//     payload.serviceName = serviceName;
//     payload.serviceImage = serviceImage;
//     payload.serviceImage = await uploadFileHandler(serviceImage);
//     console.log("payload from serviceCategory:", payload);
//   } else if (state.serviceType === "Brand" && from === "serviceBrand") {
//     payload.serviceFor = from;
//     payload.type = state.serviceType;
//     payload.serviceCategoryId = serviceCategory;
//     payload.brandName = brandName;
//     // payload.brandImage = brandImage;
//     payload.brandImage = await uploadFileHandler(brandImage);
//   } else if (
//     state.serviceType === "ServiceSubCategory" &&
//     from === "serviceSubCategory"
//   ) {
//     payload.serviceFor = from;
//     payload.type = state.serviceType;
//     payload.serviceCategoryId = serviceCategory;
//     payload.subServiceName = subServiceName;
//     payload.subServiceImage = await uploadFileHandler(subServiceImage);
//   } else if (from === "serviceBrandProblem") {
//     payload.serviceFor = from;
//     payload.serviceCategoryId = serviceCategory;
//     // payload.serviceBrandId = serviceBrandId;
//     payload.brandProblemName = brandProblemName;
//     // payload.brandProblemDescription = brandProblemDescription;
//     // payload.brandProblemPrice = brandProblemPrice;
//     payload.brandProblemImage = await uploadFileHandler(brandProblemImage);
//   } else if (from === "serviceSubProduct") {
//     payload.serviceFor = from;
//     payload.serviceCategoryId = serviceCategory;
//     payload.subServiceId = subService;
//     payload.productName = subProdName;
//     payload.subProdDesc = subProdDesc;
//     payload.prodDisPer = prodDisPer;
//     payload.productPrice = subProdPrice;
//     payload.productImage = await uploadFileHandler(subProdImage);
//   }

//   console.log("payload in handleSubmit:- ", payload);

//   try {
//     // const response = await axios.post("/api/services", payload);
//     const response = await createService(payload);
//     console.log("Service created successfully:", response.data);

//     if (response.error && response?.error?.status === 500) {
//       console.log("Service creation failed:", response.error);
//       toast.error(response.error.data.message);
//     } else {
//       toast.success(response.data.message);
//       // toast.success("Service created successfully");
//     }

//     // Clear the value of the file input
//     fileInputRef.current.value = "";
//     // Mark the file input as required again
//     fileInputRef.current.required = true;
//   } catch (error) {
//     console.error("Error creating service:", error);
//     // Handle error (e.g., show an error message)
//     toast.error("Service creation failed");
//   }
// };
