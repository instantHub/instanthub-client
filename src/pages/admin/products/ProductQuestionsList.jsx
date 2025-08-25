import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  useGetProductDetailsQuery,
  useUpdatePriceDropMutation,
  useGetVariantsQuestionsQuery,
} from "@api";

import { toast } from "react-toastify";

import UpdateSystemConfigurations from "./processbased/systemPriceDrops/UpdateSystemConfigurations";
import UpdateSystemConditions from "./processbased/systemPriceDrops/UpdateSystemConditions";
import { useDispatch, useSelector } from "react-redux";
import { fetchProcessorDeductions } from "@features/adminSlices/processorSlice";
import { ROUTES } from "@routes";
import { Button, FlexBox, Modal, Typography } from "@components/general";
import { ArrowLeftIcon } from "@icons";

const ProductQuestionsList = () => {
  const { productSlug } = useParams();
  // Query Params
  const [searchParams] = useSearchParams();
  const selectedVariant = searchParams.get("variant");
  // console.log("selectedVariant", selectedVariant);

  const [selectedDeductions, setSelectedDeductions] = useState(null);

  const [productCategory, setProductCategory] = useState(null);
  const [processorsList, setProcessorsList] = useState(null);
  // const [selectedProcessorId, setSelectedProcessorId] = useState(null);
  const [selectedProcessorDeductions, setSelectedProcessorDeductions] =
    useState(null);

  // const [processorBasedDeductions, setProcessorBasedDeductions] =
  //   useState(null);

  const [selectedVariantToFill, setSelectedVariantToFill] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [multiVariants, setMultiVariants] = useState(false);
  const [processorBased, setProcessorBased] = useState(false);
  const [simpleCategory, setSimpleCategory] = useState(false);

  const [toggle, setToggle] = useState({
    updateAllSystemConfig: false,
    updateSingleSystemConfig: false,
    updateAllProcessorsProblems: false,
    updateSingleProcessorProblems: false,
    showSystemConfiguration: true,
  });

  const { data: productDetail } = useGetProductDetailsQuery(productSlug);

  const [productData, setProductData] = useState(null);

  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdatePriceDropMutation();

  const {
    data: variantsQuestionsData,
    isLoading: variantsQuestionsDataLoading,
  } = useGetVariantsQuestionsQuery();

  // console.log("selectedDeductions", selectedDeductions);

  const fillVariantPriceDrops = async () => {
    console.log("fillVariantPriceDrops");
    const variantIndex = productData.variantDeductions.findIndex(
      (variant) => variant.variantName == selectedVariant
    );

    console.log("variantIndex", variantIndex);

    if (variantIndex === -1) {
      // Variant not found, return without updating
      return;
    }

    const updatedDeductions = productData.variantDeductions.map(
      (variant, index) => {
        if (index === variantIndex) {
          // Update the condition label with the provided conditionLabelId
          return {
            ...variant,
            deductions: selectedVariantToFill.deductions,
          };
        } else {
          // Return the variant without updating
          return variant;
        }
      }
    );

    // console.log("updatedDeductions", updatedDeductions);
    // console.log("selectedVariantToFill", selectedVariantToFill);

    // Update the product data with the updated deductions
    const updatedProductData = {
      ...productData,
      variantDeductions: updatedDeductions,
    };

    // Set the updated product data
    setProductData(updatedProductData);
    setSelectedDeductions(updatedProductData.variantDeductions[variantIndex]);
    setIsOpen(false);
  };

  // Variant Deductions PriceDrops Update
  const handlePriceDropChange = (conditionLabelId, value, check) => {
    // Find the index of the variant in the deductions array
    // console.log("Variant Deductions");
    // console.log(productData);

    const variantIndex = productData.variantDeductions.findIndex(
      (variant) => variant.variantName == selectedVariant
    );

    if (variantIndex === -1) {
      // Variant not found, return without updating
      return;
    }

    let updatedDeductions;

    if (check === "priceDrop") {
      // Update the deductions for the selected variant
      // const updatedDeductions = productData.variantDeductions.map(
      updatedDeductions = productData.variantDeductions.map(
        (variant, index) => {
          if (index === variantIndex) {
            // Update the condition label with the provided conditionLabelId
            return {
              ...variant,
              deductions: variant.deductions.map((condition) => ({
                ...condition,
                conditionLabels: condition.conditionLabels.map((label) => ({
                  ...label,
                  priceDrop:
                    label.conditionLabelId === conditionLabelId
                      ? value
                      : label.priceDrop,
                })),
              })),
            };
          } else {
            // Return the variant without updating
            return variant;
          }
        }
      );
    } else if (check === "operation") {
      updatedDeductions = productData.variantDeductions.map(
        (variant, index) => {
          if (index === variantIndex) {
            // Update the condition label with the provided conditionLabelId
            return {
              ...variant,
              deductions: variant.deductions.map((condition) => ({
                ...condition,
                conditionLabels: condition.conditionLabels.map((label) => ({
                  ...label,
                  operation:
                    label.conditionLabelId === conditionLabelId
                      ? value
                      : label.operation,
                })),
              })),
            };
          } else {
            // Return the variant without updating
            return variant;
          }
        }
      );
    }

    // Update the product data with the updated deductions
    const updatedProductData = {
      ...productData,
      variantDeductions: updatedDeductions,
    };

    // Set the updated product data
    setProductData(updatedProductData);
    setSelectedDeductions(updatedProductData.variantDeductions[variantIndex]);
  };

  // Simple Deductions PriceDrops Update
  const handlePriceDropChange2 = (conditionLabelId, value, check) => {
    // Find the condition label by conditionLabelId and update the priceDrop
    // console.log("Simple Deductions", check);
    let updatedProductData;
    if (check === "priceDrop") {
      updatedProductData = {
        ...productData,
        simpleDeductions: productData.simpleDeductions.map((condition) => ({
          ...condition,
          conditionLabels: condition.conditionLabels.map((label) => ({
            ...label,
            priceDrop:
              label.conditionLabelId === conditionLabelId
                ? value
                : label.priceDrop,
          })),
        })),
      };

      // console.log("updatedProductData", updatedProductData);
    } else if (check === "operation") {
      // console.log("OPERATION", value);
      updatedProductData = {
        ...productData,
        simpleDeductions: productData.simpleDeductions.map((condition) => ({
          ...condition,
          conditionLabels: condition.conditionLabels.map((label) => ({
            ...label,
            operation:
              label.conditionLabelId === conditionLabelId
                ? value
                : label.operation,
          })),
        })),
      };
    }
    setProductData(updatedProductData);
    setSelectedDeductions(updatedProductData.simpleDeductions);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updatePriceDrop({
        productId: productData.id,
        data: productData,
      }).unwrap();
      toast.success("Updated PriceDrops for the Product");
      // Handle success
    } catch (error) {
      console.error("Error updating condition:", error);
    }
  };

  // THUNK SETUP
  const {
    results: processorThunk,
    loading,
    error,
  } = useSelector((state) => state.processor);
  console.log("processorThunk", processorThunk);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(ROUTES.admin.productsList);
  };

  const handleProcessor = async (event) => {
    console.log("handle processor");

    const processorId = event.target.value;
    console.log("processorId", processorId);

    dispatch(fetchProcessorDeductions(processorId));
  };

  const toggleBtnStyle =
    "px-1 py-2 max-sm:py-1 flex gap-1 h-full flex-wrap font-thin text-black bg-gray-200 border border-gray-600 transition-all duration-300";

  const toggleStyle =
    "bg-gray-800 border rounded text-white font-bold translate-y-5 max-sm:translate-y-0 mx-1";

  //  UseEffect to set the Deductions what is selected
  useEffect(() => {
    if (productDetail) {
      // console.log("productDetail", productDetail);

      const MULTI_VARIANTS = productDetail.category.categoryType.multiVariants;
      const PROCESSOR_BASED =
        productDetail.category.categoryType.processorBased;

      let productCat = productDetail.category.name;
      setProductCategory(productCat);

      // Set the matched product to the component state
      setProductData(productDetail);
      // if (productCat === "Mobile") {
      if (MULTI_VARIANTS) {
        setMultiVariants(true);
        setSelectedDeductions(
          productDetail.variantDeductions.find(
            (d) => d.variantName == selectedVariant
          )
        );
        // } else if (LAPTOP_DESKTOP.includes(productCat.toLowerCase())) {
      } else if (PROCESSOR_BASED) {
        setProcessorBased(true);
        setSelectedDeductions(productDetail.simpleDeductions);
        // setProcessorBasedDeductions(productDetail.processorBasedDeduction);
        const processors = productDetail.simpleDeductions.find((d) =>
          d.conditionName.toLowerCase().includes("processor")
        );
        setProcessorsList(processors?.conditionLabels);
      } else {
        setSimpleCategory(true);
        setSelectedDeductions(productDetail.simpleDeductions);
      }
    }
  }, [productDetail]);

  useEffect(() => {
    console.log("thunk response in useEffect", Object.keys(processorThunk));
    if (Object.keys(processorThunk).length > 0) {
      setSelectedProcessorDeductions(processorThunk);
    }
  }, [processorThunk]);

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="sm"
        shape="square"
        leftIcon={<ArrowLeftIcon />}
        onClick={handleNavigate}
      >
        Back
      </Button>

      <div className="w-full flex flex-col mx-auto my-1 bg-white px-4 max-sm:px-2 py-2">
        {/* Heading */}
        <div className=" flex justify-center m-2">
          <h3 className="absolute top-4 text-xl max-sm:text-lg font-serif font-bold">
            {productData ? productData.name : "Loading.."}{" "}
            {!processorBased && selectedVariant}
          </h3>
          {processorBased ? (
            <span className="text-2xl max-sm:text-lg font-bold font-serif ">
              {productCategory} Problems & Configuration
            </span>
          ) : null}
          {/* VariantsQuestions List */}
          {productData && multiVariants ? (
            // <div className="flex items-center justify-around flex-wrap gap-4 max-sm:gap-2 text-sm max-sm:text-[10px]">
            <div className="grid grid-cols-4 max-sm:grid-cols-2 items-center justify-around flex-wrap gap-4 max-sm:gap-2 text-sm max-sm:text-[10px]">
              {!variantsQuestionsDataLoading &&
                variantsQuestionsData.map((vq) => {
                  return (
                    <div key={vq.id}>
                      <button
                        onClick={() => {
                          setSelectedVariantToFill(vq);
                          setIsOpen(true);
                        }}
                        className={`w-full bg-green-600 px-2 py-1 rounded text-white ${
                          vq.name === selectedVariantToFill?.name
                            ? `bg-red-600 text-xl`
                            : ``
                        }`}
                      >
                        {vq.name}
                      </button>
                    </div>
                  );
                })}
            </div>
          ) : null}
        </div>

        <div className="bg-scroll relative text-sm max-sm:text-xs">
          {/* Mobile category pricedrops */}
          {productData && multiVariants && (
            <form onSubmit={handleSubmit}>
              {productData &&
                selectedDeductions?.deductions?.map((condition, index) => (
                  <div
                    key={condition.id}
                    className={`border my-4 max-sm:my-2 rounded `}
                  >
                    <div>
                      <h3 className="text-xl max-sm:text-lg text-center font-serif font-extrabold bg-white">
                        {condition.conditionName}
                      </h3>
                    </div>
                    <hr />
                    <div className="flex flex-col py-2">
                      {condition.conditionLabels &&
                        condition?.conditionLabels?.map(
                          (conditionLabel, index) => (
                            <div
                              key={conditionLabel.id}
                              className={`flex gap-6 max-sm:gap-1 max-sm:justify-center items-center mt-2 px-4 max-sm:px-2 py-2
                                ${index % 2 === 0 ? `` : `bg-gray-100`}`}
                            >
                              <div>
                                <h3>{conditionLabel.conditionLabel}</h3>
                                <div className="flex items-center gap-1">
                                  {productCategory !== "Mobile" && (
                                    <span className="">₹</span>
                                  )}
                                  <input
                                    type="number"
                                    name="priceDrop"
                                    value={conditionLabel.priceDrop}
                                    className="border px-3 py-1 rounded"
                                    placeholder="Price Drop"
                                    onChange={(e) =>
                                      handlePriceDropChange(
                                        conditionLabel.conditionLabelId,
                                        parseInt(e.target.value),
                                        e.target.name
                                      )
                                    }
                                    required
                                  />
                                  {productCategory === "Mobile" && (
                                    <span className="">%</span>
                                  )}
                                </div>
                              </div>

                              <div>
                                {conditionLabel.conditionLabelImg && (
                                  <img
                                    src={
                                      import.meta.env.VITE_APP_BASE_URL +
                                      conditionLabel.conditionLabelImg
                                    }
                                    alt="conditionLabelImg"
                                    className="w-[60px] h-[60px] mx-auto max-sm:w-[45px] max-sm:h-[45px]"
                                  />
                                )}
                              </div>

                              <div className="flex gap-4 max-sm:flex-col max-sm:gap-1">
                                <h3
                                  className={`${
                                    conditionLabel.operation === "Subtrack"
                                      ? "bg-red-200 px-2"
                                      : "bg-blue-200 px-4"
                                  } text-black font-bold py-1 rounded text-center`}
                                >
                                  {conditionLabel.operation}
                                </h3>
                                <select
                                  name="operation"
                                  className="border rounded px-1"
                                  onChange={(e) => {
                                    if (e.target.value !== "") {
                                      handlePriceDropChange(
                                        conditionLabel.conditionLabelId,
                                        e.target.value,
                                        e.target.name
                                      );
                                    }
                                  }}
                                >
                                  <option value="">Select Operation</option>
                                  <option value="Subtrack">Subtrack</option>
                                  <option value="Add">Add</option>
                                </select>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                ))}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`w-fit bg-green-600 text-white rounded-md p-2 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300`}
                  disabled={updateLoading}
                >
                  {!updateLoading ? "Update Price Drops" : "Loading..."}
                </button>
              </div>
            </form>
          )}

          {/* Laptop category pricedrops */}
          {productData && processorBased && (
            <div className="flex flex-col">
              {/* Buttons Wrapper */}
              {/* <div className="flex justify-center sticky top-0 bg-white z-10 border-b mb-12"> */}
              <div className="grid grid-cols-5 max-sm:grid-cols-2 justify-center items-center text-sm max-sm:text-[9px] sticky top-16 max-sm:top-14 bg-white z-10 border-b mb-12 max-sm:mb-5">
                {/* Update Single Configuration */}
                <button
                  onClick={() => {
                    setToggle({
                      updateAllSystemConfig: false,
                      updateSingleSystemConfig:
                        !toggle.updateSingleSystemConfig,
                      updateAllProcessorsProblems: false,
                      updateSingleProcessorProblems: false,
                      showSystemConfiguration: false,
                    });
                  }}
                  className={`${toggleBtnStyle} ${
                    toggle.updateSingleSystemConfig
                      ? toggleStyle
                      : `border rounded-tl rounded-bl`
                  }`}
                >
                  Update Single{" "}
                  {/* <span className="font-bold">{productData.name}</span>{" "} */}
                  {/* <span className="font-bold">{productData.name}</span>{" "} */}
                  <span className="font-semibold">Configurations</span>
                </button>

                {/* Update All Configuration */}
                <button
                  onClick={() => {
                    setToggle({
                      updateAllSystemConfig: !toggle.updateAllSystemConfig,
                      updateSingleSystemConfig: false,
                      updateAllProcessorsProblems: false,
                      updateSingleProcessorProblems: false,
                      showSystemConfiguration: false,
                    });
                  }}
                  className={`${toggleBtnStyle} ${
                    toggle.updateAllSystemConfig ? toggleStyle : ``
                  }`}
                >
                  Update All Configurations
                </button>

                {/* Show Config Details */}
                <button
                  onClick={() => {
                    setToggle({
                      updateAllSystemConfig: false,
                      updateSingleSystemConfig: false,
                      updateAllProcessorsProblems: false,
                      updateSingleProcessorProblems: false,
                      showSystemConfiguration: !toggle.showSystemConfiguration,
                    });
                  }}
                  className={`max-sm:col-span-2 ${toggleBtnStyle} ${
                    toggle.showSystemConfiguration && toggleStyle
                  }`}
                >
                  Configurations
                  {/* Show {productCategory} Configuration */}
                </button>

                {/* Update Single Processor Problems */}
                <button
                  onClick={() => {
                    setToggle({
                      updateAllSystemConfig: false,
                      updateSingleSystemConfig: false,
                      updateAllProcessorsProblems: false,
                      updateSingleProcessorProblems:
                        !toggle.updateSingleProcessorProblems,
                      showSystemConfiguration: false,
                    });
                  }}
                  className={`${toggleBtnStyle} ${
                    toggle.updateSingleProcessorProblems ? toggleStyle : ``
                  }`}
                >
                  Update Single Processor Problems
                </button>

                {/* Update All Processors Problems */}
                <button
                  onClick={() => {
                    setToggle({
                      updateAllSystemConfig: false,
                      updateSingleSystemConfig: false,
                      updateAllProcessorsProblems:
                        !toggle.updateAllProcessorsProblems,
                      showSystemConfiguration: false,
                    });
                  }}
                  className={`${toggleBtnStyle} ${
                    toggle.updateAllProcessorsProblems
                      ? toggleStyle
                      : `border rounded-tr rounded-br`
                  }
                      `}
                >
                  Update All Processors Problems
                </button>
              </div>

              {/* Select Processor */}
              {processorsList &&
              (toggle.updateAllProcessorsProblems ||
                toggle.updateSingleProcessorProblems) ? (
                <div className="flex items-center gap-2 my-2 w-full">
                  <span>Processors List</span>
                  <select
                    className="border border-black rounded"
                    onChange={() => handleProcessor(event)}
                  >
                    <option value="">Select Processor</option>

                    {processorsList?.map((processor, i) => (
                      <option value={processor.conditionLabelId} key={i}>
                        {processor.conditionLabel}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {/* Show Current Laptop Configuration */}
              {toggle.showSystemConfiguration &&
                selectedDeductions?.map((condition, index) => (
                  <div
                    key={condition.id}
                    className={`w-1/2 max-sm:w-full mx-auto mb-10 border my-2 py- px- rounded ${
                      index % 2 === 0 ? `` : `bg-gray-100`
                    }`}
                  >
                    <div>
                      <h3 className="text-2xl py-2 font-serif text-center font-extrabold bg-white">
                        {condition.conditionName}
                      </h3>
                    </div>
                    <hr />

                    <div className="flex px-4 py-2 flex-col ">
                      {condition.conditionLabels &&
                        condition.conditionLabels?.map(
                          (conditionLabel, index) => (
                            <div
                              key={index + condition.page}
                              className="flex justify-around items-center mt-2 border-b-2 pb-1"
                            >
                              <div>
                                <h3 className="text-sm">
                                  {conditionLabel.conditionLabel}
                                </h3>
                              </div>

                              <div className="flex items-center gap-1">
                                {productCategory !== "Mobile" ? (
                                  <span className="text-lg">₹</span>
                                ) : null}
                                <span className="  px-3 py-1 mx-5 rounded text-[0.9rem]">
                                  {conditionLabel.priceDrop}
                                </span>
                              </div>

                              <div className="text-center">
                                <h3
                                  className={`${
                                    conditionLabel.operation === "Subtrack"
                                      ? "bg-red-200 px-2"
                                      : "bg-blue-200 px-4"
                                  } text-black font-bold py-1 rounded`}
                                >
                                  {conditionLabel?.operation}
                                </h3>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                ))}

              {toggle.updateAllSystemConfig && (
                <UpdateSystemConfigurations
                  type={"AllLaptopConfig"}
                  productDetail={productDetail}
                  productUniqueURL={productSlug}
                />
              )}

              {toggle.updateSingleSystemConfig && (
                <UpdateSystemConfigurations
                  type={"SingleLaptopConfig"}
                  productDetail={productDetail}
                  productUniqueURL={productSlug}
                />
              )}

              {toggle.updateAllProcessorsProblems && (
                <UpdateSystemConditions
                  productData={productData}
                  selectedProcessorDeductions={selectedProcessorDeductions}
                  setSelectedProcessorDeductions={
                    setSelectedProcessorDeductions
                  }
                  // handleLaptopPriceDropChange={handleLaptopPriceDropChange}
                  setProductData={setProductData}
                  type={"AllLaptopConditions"}
                />
              )}

              {toggle.updateSingleProcessorProblems && (
                <UpdateSystemConditions
                  productData={productData}
                  selectedProcessorDeductions={selectedProcessorDeductions}
                  setSelectedProcessorDeductions={
                    setSelectedProcessorDeductions
                  }
                  // handleLaptopPriceDropChange={handleLaptopPriceDropChange}
                  setProductData={setProductData}
                  type={"SingleLaptopConditions"}
                />
              )}
            </div>
          )}

          {/* Deductions List Apart from Mobiles and Laptops */}
          {productData && simpleCategory ? (
            <>
              <h3 className="text-center text-xl">Simple Deductions List</h3>
              <form onSubmit={handleSubmit}>
                {productData &&
                  selectedDeductions?.map((condition, index) => (
                    <div
                      key={index}
                      className={`mb-10 border my-2 py- px- rounded ${
                        index % 2 === 0 ? `` : `bg-gray-100`
                      }`}
                    >
                      <div>
                        <h3 className="text-2xl py-2 font-serif text-center font-extrabold bg-white">
                          {condition.conditionName}
                        </h3>
                      </div>
                      <hr />
                      <div className="flex px-4 py-2 flex-col">
                        {condition.conditionLabels &&
                          condition.conditionLabels?.map(
                            (conditionLabel, index) => (
                              <div
                                key={index}
                                className={`flex gap-6 items-center mt-2`}
                              >
                                <div>
                                  <div>
                                    <h3 className="text-sm">
                                      {conditionLabel?.conditionLabel}
                                    </h3>
                                  </div>

                                  <div className="flex items-center gap-1">
                                    {productCategory !== "Mobile" ? (
                                      <span className="text-lg">₹</span>
                                    ) : null}
                                    <input
                                      type="number"
                                      name="priceDrop"
                                      value={conditionLabel.priceDrop}
                                      className="border px-3 py-1 rounded text-[0.9rem]"
                                      placeholder="Price Drop"
                                      onChange={(e) =>
                                        handlePriceDropChange2(
                                          conditionLabel.conditionLabelId,
                                          parseInt(e.target.value),
                                          e.target.name
                                        )
                                      }
                                      required
                                    />
                                  </div>
                                </div>

                                {conditionLabel?.conditionLabelImg && (
                                  <div>
                                    <img
                                      src={
                                        import.meta.env.VITE_APP_BASE_URL +
                                        conditionLabel.conditionLabelImg
                                      }
                                      alt="conditionLabelImg"
                                      className="w-[60px] h-[60px] mx-auto "
                                    />
                                  </div>
                                )}
                                <div className="flex gap-4">
                                  <div className="w-[82px] text-center">
                                    <h3
                                      className={`${
                                        conditionLabel.operation === "Subtrack"
                                          ? "bg-red-200"
                                          : "bg-blue-200"
                                      } text-black font-bold px-2 py-1 rounded`}
                                    >
                                      {conditionLabel.operation}
                                    </h3>
                                  </div>
                                  <select
                                    name="operation"
                                    id=""
                                    className="border rounded px-1"
                                    onChange={(e) => {
                                      if (e.target.value !== "") {
                                        handlePriceDropChange2(
                                          conditionLabel.conditionLabelId,
                                          e.target.value,
                                          e.target.name
                                        );
                                      }
                                    }}
                                  >
                                    <option value="">Select Operation</option>
                                    <option value="Subtrack">Subtrack</option>
                                    <option value="Add">Add</option>
                                  </select>
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  ))}
                <div className="py-3 px-2">
                  <button
                    type="submit"
                    className="w-fit bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700"
                  >
                    Update {productCategory} Deductions
                  </button>
                </div>
              </form>
            </>
          ) : null}
        </div>
      </div>

      {isOpen && (
        <Modal isOpen={isOpen} className="p-5">
          <Typography variant="h3">
            Sure want to Update this Variants Data?
          </Typography>
          <Typography variant="h5">
            Selected Variant: <strong>{selectedVariantToFill?.name}</strong>
          </Typography>
          <FlexBox justify="around" className="mt-8">
            <Button
              onClick={() => fillVariantPriceDrops()}
              variant="danger"
              shape="square"
            >
              Yes
            </Button>

            <Button
              onClick={() => {
                setIsOpen(false);
                setSelectedVariantToFill(null);
              }}
              variant="greenary"
              shape="square"
            >
              No
            </Button>
          </FlexBox>
        </Modal>
      )}
    </div>
  );
};

export default ProductQuestionsList;
