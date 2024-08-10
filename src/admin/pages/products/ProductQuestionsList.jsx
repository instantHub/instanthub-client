import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useGetVariantsQuestionsQuery,
  useUpdatePriceDropMutation,
} from "../../../features/api";
import { toast } from "react-toastify";

const ProductQuestionsList = () => {
  const { productId } = useParams();
  // Query Params
  const [searchParams] = useSearchParams();
  const selectedVariant = searchParams.get("variant");
  // console.log("selectedVariant", selectedVariant);

  const [selectedDeductions, setSelectedDeductions] = useState(null);
  const [selectedVariantToFill, setSelectedVariantToFill] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: productDetail, isLoading: productsLoading } =
    useGetProductDetailsQuery(productId);

  const [productData, setProductData] = useState();
  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdatePriceDropMutation();

  const {
    data: variantsQuestionsData,
    isLoading: variantsQuestionsDataLoading,
  } = useGetVariantsQuestionsQuery();

  //  UseEffect to set the Deductions what is selected
  useEffect(() => {
    if (productDetail) {
      // console.log("productDetail", productDetail);

      // Set the matched product to the component state
      setProductData(productDetail);
      if (productDetail.category.name === "Mobile") {
        setSelectedDeductions(
          productDetail.variantDeductions.find(
            (d) => d.variantName == selectedVariant
          )
        );
      } else if (productDetail.category.name !== "Mobile") {
        setSelectedDeductions(productDetail.simpleDeductions);
      }
    }
  }, [productDetail]);

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

    // const updatedDeductions = productData.variantDeductions.map(
    //   (variant, index) => {
    //     if (index === variantIndex) {
    //       // Update the condition label with the provided conditionLabelId
    //       return {
    //         ...variant,
    //       };
    //     } else {
    //       // Return the variant without updating
    //       return variant;
    //     }
    //   }
    // );

    console.log("updatedDeductions", updatedDeductions);
    console.log("selectedVariantToFill", selectedVariantToFill);

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

  // Handle input changes and update productData state
  // New Approach
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
      console.log("priceDrop");

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
      console.log("operation");
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

  // New Approach
  const handlePriceDropChange2 = (conditionLabelId, value, check) => {
    // Find the condition label by conditionLabelId and update the priceDrop
    // console.log("Simple Deductions", check);
    let updatedProductData;
    if (check === "priceDrop") {
      // const updatedProductData = {
      updatedProductData = {
        ...productData,
        simpleDeductions: productData.simpleDeductions.map((condition) => ({
          ...condition,
          conditionLabels: condition.conditionLabels.map((label) => ({
            ...label,
            priceDrop:
              // label.conditionLabelId === conditionLabelId
              //   ? priceDrop
              //   : label.priceDrop,
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
              // label.conditionLabelId === conditionLabelId
              //   ? priceDrop
              //   : label.priceDrop,
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
        productId: productId,
        data: productData,
      }).unwrap();
      toast.success("Updated PriceDrops for the Product");
      // Handle success
    } catch (error) {
      console.error("Error updating condition:", error);
    }
  };

  // useEffect(() => {}, [productDetail]);
  // console.log("operation", operation);

  return (
    <div className="">
      <div className="flex items-center justify-between mx-4">
        <div className="inline-block m-4 px-4 py-1 bg-blue-600 text-white rounded">
          <Link to={"/admin/products-list"}>
            <button>Back</button>
          </Link>
        </div>
        {productData && productData.category.name === "Laptop" ? (
          <div className="px-2 py-1 my-1 w-fit  right-0 text-end flex justify-end items-end bg-green-600 text-white rounded ">
            <Link to={`/admin/products/laptop-configurations/${productId}`}>
              <button>Update All Laptops Configurations</button>
            </Link>
          </div>
        ) : null}
      </div>

      <div className="relative w-[95%] flex flex-col mx-auto my-1 bg-white px-4 py-2 rounded shadow-xl">
        <div className="flex justify-center m-2">
          <h3 className="text-2xl font-serif font-bold mb-1 sticky">
            {productData ? productData.name : "Loading.."} {selectedVariant}
          </h3>
          {/* Variants Questions Data */}
          {/* {productData && productData.category.name === "Mobile" ? (
            <div className="flex items-center justify-around gap-4">
              {variantsQuestionsData.map((vq) => {
                return (
                  <div>
                    <button
                      onClick={() => {
                        setSelectedVariantToFill(vq);
                        setIsOpen(true);
                      }}
                      className={`bg-green-600 px-2 py-1 text-sm rounded text-white ${
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
          ) : null} */}
        </div>

        <hr />

        <div className="bg-scroll">
          {productData && productData.category.name === "Mobile" ? (
            <form onSubmit={handleSubmit}>
              {productData &&
                selectedDeductions.deductions.map((condition, index) => (
                  <div
                    key={index}
                    className={`mb-10 border my-2 py- px- rounded ${
                      index % 2 === 0 ? `` : `bg-gray-100`
                    }`}
                  >
                    <div>
                      <h3 className="text-2xl text-center font-serif font-extrabold py-2 bg-white">
                        {condition.conditionName}
                      </h3>
                    </div>
                    <hr />
                    <div className="flex flex-col px-4 py-2">
                      {condition.conditionLabels &&
                        condition.conditionLabels.map(
                          (conditionLabel, index) => (
                            <div
                              key={index}
                              className="flex gap-6 items-center mt-2"
                            >
                              <div>
                                <div>
                                  <h3 className="text-sm">
                                    {conditionLabel.conditionLabel}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-1">
                                  {productData.category.name !== "Mobile" ? (
                                    <span className="text-lg">₹</span>
                                  ) : null}
                                  <input
                                    type="number"
                                    name="priceDrop"
                                    value={conditionLabel.priceDrop}
                                    className="border px-3 py-1 rounded text-[0.9rem]"
                                    placeholder="Price Drop"
                                    // onChange={handleInputChange}
                                    onChange={(e) =>
                                      handlePriceDropChange(
                                        conditionLabel.conditionLabelId,
                                        parseInt(e.target.value),
                                        e.target.name
                                      )
                                    }
                                    required
                                  />
                                  {productData.category.name === "Mobile" ? (
                                    <span className="text-lg">%</span>
                                  ) : null}
                                </div>
                              </div>
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
              <div className="py-3 px-2">
                <button
                  type="submit"
                  className="w-[20%] bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <>
              <h3>Simple Deductions</h3>
              <form onSubmit={handleSubmit}>
                {productData &&
                  selectedDeductions.map((condition, index) => (
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
                        {productData.category.name === "Laptop" &&
                        productData.brand.name === "Apple" &&
                        condition.conditionName === "Processor"
                          ? condition.conditionLabels &&
                            condition.conditionLabels
                              .filter((label) =>
                                label.conditionLabel
                                  .toLowerCase()
                                  .includes("apple")
                              )
                              .map((conditionLabel, index) => (
                                <div
                                  key={index}
                                  className={`flex gap-6 items-center mt-2`}
                                >
                                  <div>
                                    <div>
                                      <h3 className="text-sm">
                                        {conditionLabel.conditionLabel}
                                      </h3>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      {productData.category.name !==
                                      "Mobile" ? (
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
                                  <div className="flex gap-4">
                                    <div className="w-[82px] text-center">
                                      <h3
                                        className={`${
                                          conditionLabel.operation ===
                                          "Subtrack"
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
                              ))
                          : condition.conditionLabels &&
                            condition.conditionLabels
                              .filter(
                                (label) =>
                                  !label.conditionLabel
                                    .toLowerCase()
                                    .includes("apple")
                              )
                              .map((conditionLabel, index) => (
                                <div
                                  key={index}
                                  className="flex gap-6 items-center mt-2"
                                >
                                  <div>
                                    <div>
                                      <h3 className="text-sm">
                                        {conditionLabel.conditionLabel}
                                      </h3>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      {productData.category.name !==
                                      "Mobile" ? (
                                        <span className="text-lg">₹</span>
                                      ) : null}
                                      <input
                                        type="number"
                                        name="priceDrop"
                                        value={conditionLabel.priceDrop}
                                        className="border-b px-3 py-1 rounded text-[0.9rem]"
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
                                  <div className="flex gap-4">
                                    <div className="w-[82px] text-center">
                                      <h3
                                        className={`${
                                          conditionLabel.operation ===
                                          "Subtrack"
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
                              ))}
                      </div>
                    </div>
                  ))}
                <div className="py-3 px-2">
                  <button
                    type="submit"
                    className="w-[20%] bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-fit">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Sure want to Update this Variants Data?
                </h2>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-4 items-center">
                  <span>Selected Variant</span>
                  <h3 className="text-2xl font-semibold">
                    {selectedVariantToFill?.name}
                  </h3>
                </div>
              </div>
              <div className="flex justify-around mt-8">
                <button
                  onClick={() => fillVariantPriceDrops()}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Yes
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedVariantToFill(null);
                  }}
                  className="bg-red-700 text-white px-4 py-1 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductQuestionsList;
