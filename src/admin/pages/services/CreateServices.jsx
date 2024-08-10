import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  useCreateServicesMutation,
  useGetServicesQuery,
  useUploadServicesImageMutation,
} from "../../../features/api";

const CreateServiceForm = () => {
  const { data: servicesData, serviceLoading: servicesLoading } =
    useGetServicesQuery();

  const [createServiceForm, setCreateServiceForm] = useState(false);
  const [createServiceBrandForm, setCreateServiceBrandForm] = useState(false);
  const [createBrandProblemsForm, setCreateBrandProblemsForm] = useState(false);
  const [createSubServiceForm, setCreateSubServiceForm] = useState(false);
  const [createSubServiceProdForm, setCreateSubServiceProdForm] =
    useState(false);

  const [serviceType, setServiceType] = useState("Brand");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceImage, setServiceImage] = useState("");
  const [subServiceName, setSubServiceName] = useState("");
  const [subServiceImage, setSubServiceImage] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState("");
  const [brandProblemName, setBrandProblemName] = useState("");
  const [brandProblemImage, setBrandProblemImage] = useState("");
  const [brandProblemDescription, setBrandProblemDescription] = useState("");
  const [brandProblemPrice, setBrandProblemPrice] = useState("");

  // Sub Service Products
  const [subService, setSubService] = useState("");
  const [subProdName, setSubProdName] = useState("");
  const [subProdDesc, setSubProdDesc] = useState("");
  const [subProdImage, setSubProdImage] = useState("");
  const [prodDisPer, setProdDisPer] = useState("");
  const [subProdPrice, setSubProdPrice] = useState("");

  const [serviceCategoryId, setServiceCategoryId] = useState("");
  const [serviceBrandId, setServiceBrandId] = useState("");

  const [createService, { isLoading: createServiceLoading }] =
    useCreateServicesMutation();

  const [uploadServicesImage, { isLoading: uploadLoading }] =
    useUploadServicesImageMutation();

  const fileInputRef = useRef(null);

  console.log("serviceCategory", serviceCategory);

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

    // let payload = {
    //   serviceFor: from,
    //   type: serviceType,
    //   serviceName,
    //   serviceImage,
    // };

    console.log("serviceType", serviceType);
    console.log("serviceFor", from);

    let payload = {};

    if (from === "serviceCategory") {
      payload.serviceFor = from;
      payload.type = serviceType;
      payload.serviceName = serviceName;
      // payload.serviceImage = serviceImage;
      payload.serviceImage = await uploadFileHandler(serviceImage);
      console.log("payload from serviceCategory:", payload);
    } else if (serviceType === "Brand" && from === "serviceBrand") {
      payload.serviceFor = from;
      payload.type = serviceType;
      payload.serviceCategoryId = serviceCategory;
      payload.brandName = brandName;
      // payload.brandImage = brandImage;
      payload.brandImage = await uploadFileHandler(brandImage);
    } else if (
      serviceType === "ServiceSubCategory" &&
      from === "serviceSubCategory"
    ) {
      payload.serviceFor = from;
      payload.type = serviceType;
      payload.serviceCategoryId = serviceCategory;
      payload.subServiceName = subServiceName;
      // payload.subServiceImage = subServiceImage;
      payload.subServiceImage = await uploadFileHandler(subServiceImage);
    } else if (from === "serviceBrandProblem") {
      payload.serviceFor = from;
      payload.serviceCategoryId = serviceCategory;
      // payload.serviceBrandId = serviceBrandId;
      payload.brandProblemName = brandProblemName;
      // payload.brandProblemDescription = brandProblemDescription;
      // payload.brandProblemPrice = brandProblemPrice;
      payload.brandProblemImage = await uploadFileHandler(brandProblemImage);
    } else if (from === "serviceSubProduct") {
      payload.serviceFor = from;
      payload.serviceCategoryId = serviceCategory;
      payload.subServiceId = subService;
      payload.productName = subProdName;
      payload.subProdDesc = subProdDesc;
      payload.prodDisPer = prodDisPer;
      payload.productPrice = subProdPrice;
      payload.productImage = await uploadFileHandler(subProdImage);
    }

    try {
      // const response = await axios.post("/api/services", payload);
      const response = await createService(payload);
      console.log("Service created successfully:", response.data);

      // Clear the value of the file input
      fileInputRef.current.value = "";
      // Mark the file input as required again
      fileInputRef.current.required = true;
    } catch (error) {
      console.error("Error creating service:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const createHeadingStyle =
    "text-2xl text-green-800 font-serif font-bold py-1";

  const createButtonStyle = (buttonType) => {
    return `${
      buttonType
        ? `bg-green-700 text-white px-4 py-3 text-lg `
        : `bg-white px-4 py-2`
    } border font-serif text-black rounded-md shadow-xl cursor-pointer`;
  };

  return (
    <div className="flex w-[90%] mt-[2%] mx-auto">
      <div className="flex gap-4 w-full">
        <div className="w-full">
          {/* Buttons */}
          <div className="flex justify-between items-center mb-5">
            <button
              onClick={() => {
                setCreateServiceBrandForm(false);
                setCreateSubServiceForm(false);
                setCreateBrandProblemsForm(false);
                setCreateSubServiceProdForm(false);
                setCreateServiceForm(!createServiceForm);
                setServiceType("DirectService");
              }}
              // className={`${
              //   createServiceForm ? `bg-red-700` : `bg-blue-700`
              // } mx-auto  text-white px-4 rounded-md py-2 cursor-pointer`}
              className={createButtonStyle(createServiceForm)}
            >
              Create Service Category
            </button>
            <button
              onClick={() => {
                setCreateServiceForm(false);
                setCreateSubServiceForm(false);
                setCreateBrandProblemsForm(false);
                setCreateSubServiceProdForm(false);
                setCreateServiceBrandForm(!createServiceBrandForm);
                setServiceType("Brand");
              }}
              className={createButtonStyle(createServiceBrandForm)}
            >
              Create Service Brand
            </button>
            <button
              type="button"
              onClick={() => {
                setCreateServiceForm(false);
                setCreateServiceBrandForm(false);
                setCreateSubServiceForm(false);
                setCreateSubServiceProdForm(false);
                setCreateBrandProblemsForm(!createBrandProblemsForm);
                setServiceType("ServiceSubCategory");
              }}
              className={createButtonStyle(createBrandProblemsForm)}
            >
              Create Brand Problems
            </button>
            <button
              type="button"
              onClick={() => {
                setCreateServiceForm(false);
                setCreateServiceBrandForm(false);
                setCreateBrandProblemsForm(false);
                setCreateSubServiceProdForm(false);
                setCreateSubServiceForm(!createSubServiceForm);
                setServiceType("ServiceSubCategory");
              }}
              className={createButtonStyle(createSubServiceForm)}
            >
              Create Service Sub Category
            </button>
            <button
              type="button"
              onClick={() => {
                setCreateServiceForm(false);
                setCreateServiceBrandForm(false);
                setCreateSubServiceForm(false);
                setCreateBrandProblemsForm(false);
                setCreateSubServiceProdForm(!createSubServiceProdForm);
                setServiceType("ServiceSubCategory");
              }}
              className={createButtonStyle(createSubServiceProdForm)}
            >
              Create Sub Service Products
            </button>
          </div>
          {/* <div className="flex justify-between items-center">
            <h1 className="bold text-[1.4rem] mb-2">Create ConditionLabels</h1>
            <div className="flex items-center gap-1">
              <h2>Home </h2>
              <h2 className="pl-1"> / Add ConditionLabels</h2>
              <Link to="/admin/conditionLabelsList">
                <button
                  type="button"
                  className=" mx-auto bg-blue-700 text-white px-2 rounded-md py-1 cursor-pointer"
                >
                  ConditionLabels List
                </button>
              </Link>
            </div>
          </div> */}

          {/* Service Category Creation */}
          {createServiceForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>Create Service Category</h2>
              </div>
              <form
                onSubmit={(e) => handleSubmit(e, "serviceCategory")}
                className="flex flex-col gap-4 p-5 w-full"
              >
                <div className="flex">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-4">
                      {/* Select Type */}
                      <div className="flex items-center gap-2">
                        <label>Service Type</label>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="px-2 py-1 border rounded"
                        >
                          <option value="DirectService">Direct Service</option>
                          <option value="Brand">Brand</option>
                          <option value="ServiceSubCategory">
                            Service Sub Category
                          </option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <label>Service Name</label>
                        <input
                          type="text"
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder="Enter Service Name"
                          required
                        />
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <label>Service Image</label>
                        <input
                          type="text"
                          value={serviceImage}
                          onChange={(e) => setServiceImage(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder="Select Image"
                          required
                        />
                      </div> */}

                      <div className="py-2">
                        <input
                          type="file"
                          name="image"
                          ref={fileInputRef}
                          onChange={(e) => {
                            setServiceImage(e.target.files[0]);
                          }}
                          // onChange={(e) => setImageSelected(e.target.files[0])}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-green-700 text-white rounded"
                  >
                    Create Service Category
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Service Brand Creation */}
          {createServiceBrandForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>Create Service Brand</h2>
              </div>
              <form
                // onSubmit={handleSubmit}
                onSubmit={(e) => handleSubmit(e, "serviceBrand")}
                className="flex flex-col gap-4 p-5 w-full"
              >
                <div className="flex">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-4">
                      {/* Select Type */}
                      <div className="flex items-center gap-2">
                        <label>Service Type</label>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
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
                      <div className="flex items-center gap-2">
                        <label>Service Category</label>
                        <select
                          value={serviceCategory}
                          onChange={(e) => setServiceCategory(e.target.value)}
                          className="px-2 py-1 border rounded"
                          required
                        >
                          <option value="">Select Service Category</option>
                          {!servicesLoading &&
                            servicesData?.serviceCategories
                              .filter((sc) => sc.type === serviceType)
                              .map((sc, i) => (
                                <option value={sc._id} key={i}>
                                  {sc.name}
                                </option>
                              ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <label>Brand Name</label>
                        <input
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder="Enter Brand Name"
                          required
                        />
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <label>Brand Image</label>
                        <input
                          type="text"
                          value={brandImage}
                          onChange={(e) => setBrandImage(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder="Select Brand Image"
                          required
                        />
                      </div> */}
                      <div className="py-2">
                        <input
                          type="file"
                          name="image"
                          ref={fileInputRef}
                          onChange={(e) => {
                            setBrandImage(e.target.files[0]);
                          }}
                          // onChange={(e) => setImageSelected(e.target.files[0])}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-green-700 text-white rounded"
                  >
                    Create Service Brand
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Service Brand Problems Creation */}
          {createBrandProblemsForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>Create Brand Problems</h2>
              </div>
              <form
                // onSubmit={handleSubmit}
                onSubmit={(e) => handleSubmit(e, "serviceBrandProblem")}
                className="flex flex-col gap-4 p-5 w-full"
              >
                <div className="flex">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-4">
                      {/* Select Type */}
                      <div className="flex items-center gap-2">
                        <label>Service Category</label>
                        <select
                          value={serviceCategory}
                          onChange={(e) => setServiceCategory(e.target.value)}
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

                      {/* Select Service Brand */}
                      {/* <div className="flex items-center gap-2">
                        <label>Service Brand</label>
                        <select
                          value={serviceBrandId}
                          onChange={(e) => setServiceBrandId(e.target.value)}
                          className="px-2 py-1 border rounded"
                          required
                        >
                          <option value="">Select Service Brand</option>
                          {!servicesLoading &&
                            servicesData.serviceBrands
                              .filter(
                                (sb) =>
                                  sb.serviceCategoryId._id === serviceCategory
                              )
                              .map((sb, i) => (
                                <option value={sb._id} key={i}>
                                  {sb.name}
                                </option>
                              ))}
                        </select>
                      </div> */}

                      <div className="flex items-center gap-2">
                        <label>Brand Problem Name</label>
                        <input
                          type="text"
                          value={brandProblemName}
                          onChange={(e) => setBrandProblemName(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder="Enter Name"
                          required
                        />
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <label>Brand Problem Price</label>
                        <input
                          type="text"
                          value={brandProblemPrice}
                          onChange={(e) => setBrandProblemPrice(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder={`Enter Price for ${brandProblemName}`}
                          required
                        />
                      </div> */}

                      <div className="py-2">
                        <input
                          type="file"
                          name="image"
                          ref={fileInputRef}
                          onChange={(e) => {
                            setBrandProblemImage(e.target.files[0]);
                          }}
                          // onChange={(e) => setImageSelected(e.target.files[0])}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-green-700 text-white rounded"
                  >
                    Create Brand Problem
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Service Sub Category Creation */}
          {createSubServiceForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>
                  Create Service Sub Category
                </h2>
              </div>
              <form
                // onSubmit={handleSubmit}
                onSubmit={(e) => handleSubmit(e, "serviceSubCategory")}
                className="flex flex-col gap-4 p-5 w-full"
              >
                <div className="flex">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-4">
                      {/* Select Type */}
                      <div className="flex items-center gap-2">
                        <label>Service Type</label>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
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
                      <div className="flex items-center gap-2">
                        <label>Service Category</label>
                        <select
                          value={serviceCategory}
                          onChange={(e) => setServiceCategory(e.target.value)}
                          className="px-2 py-1 border rounded"
                          required
                        >
                          <option value="">Select Service Category</option>
                          {!servicesLoading &&
                            servicesData?.serviceCategories
                              .filter((sc) => sc.type === serviceType)
                              .map((sc, i) => (
                                <option value={sc._id} key={i}>
                                  {sc.name}
                                </option>
                              ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <label>Service Sub Category Name</label>
                        <input
                          type="text"
                          value={subServiceName}
                          onChange={(e) => setSubServiceName(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder="Enter Name"
                          required
                        />
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <label>Service Sub Category Image</label>
                        <input
                          type="text"
                          value={subServiceImage}
                          onChange={(e) => setSubServiceImage(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder="Select Image"
                          required
                        />
                      </div> */}

                      <div className="py-2">
                        <input
                          type="file"
                          name="image"
                          ref={fileInputRef}
                          onChange={(e) => {
                            setSubServiceImage(e.target.files[0]);
                          }}
                          // onChange={(e) => setImageSelected(e.target.files[0])}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-green-700 text-white rounded"
                  >
                    Create Sub Service
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Sub Service Product Creation */}
          {createSubServiceProdForm && (
            <div className="bg-white w-full flex flex-col border rounded-md shadow-lg">
              <div className="text-center py-2 border-b w-full">
                <h2 className={createHeadingStyle}>
                  Create Sub Service Products
                </h2>
              </div>
              <form
                // onSubmit={handleSubmit}
                onSubmit={(e) => handleSubmit(e, "serviceSubProduct")}
                className="flex flex-col gap-4 p-5 w-full"
              >
                <div className="flex">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-4">
                      {/* Select Type */}
                      <div className="flex items-center gap-2">
                        <label>Service Category</label>
                        <select
                          value={serviceCategory}
                          onChange={(e) => setServiceCategory(e.target.value)}
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
                      <div className="flex items-center gap-2">
                        <label>Service Sub Service</label>
                        <select
                          value={subService}
                          onChange={(e) => setSubService(e.target.value)}
                          className="px-2 py-1 border rounded"
                          required
                        >
                          <option value="">Select Service Sub Service</option>
                          {!servicesLoading &&
                            servicesData.serviceSubCategories
                              .filter(
                                (ssc) =>
                                  ssc.serviceCategoryId._id === serviceCategory
                              )
                              .map((ssc, i) => (
                                <option value={ssc._id} key={i}>
                                  {ssc.name}
                                </option>
                              ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <label>Product Name</label>
                        <input
                          type="text"
                          value={subProdName}
                          onChange={(e) => setSubProdName(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder="Enter Name"
                          required
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>Product Description</label>
                        <input
                          type="text"
                          value={subProdDesc}
                          onChange={(e) => setSubProdDesc(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder="Enter Prod Description"
                          required
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>Product Discount %</label>
                        <input
                          type="number"
                          value={prodDisPer}
                          onChange={(e) => setProdDisPer(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder={`Enter % number`}
                          required
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>Product Price</label>
                        <input
                          type="number"
                          value={subProdPrice}
                          onChange={(e) => setSubProdPrice(e.target.value)}
                          className="px-2 py-1 border rounded"
                          placeholder={`Enter Price for ${brandProblemName}`}
                          required
                        />
                      </div>

                      <div className="py-2">
                        <input
                          type="file"
                          name="image"
                          ref={fileInputRef}
                          onChange={(e) => {
                            setSubProdImage(e.target.files[0]);
                          }}
                          // onChange={(e) => setImageSelected(e.target.files[0])}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-green-700 text-white rounded"
                  >
                    Create Service products
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
