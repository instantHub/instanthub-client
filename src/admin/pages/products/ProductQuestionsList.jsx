import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useUpdatePriceDropMutation,
} from "../../../features/api";
import { toast } from "react-toastify";

const ProductQuestionsList = () => {
  const { productId } = useParams();
  // Query Params
  const [searchParams] = useSearchParams();
  const selectedVariant = searchParams.get("variant");
  console.log("selectedVariant", selectedVariant);
  // const { data: productDetail, isLoading: productsLoading } =
  //   useGetAllProductsQuery({ page: 1, limit: 10, search: "" });
  const [selectedDeductions, setSelectedDeductions] = useState();
  const [operation, setOperation] = useState();

  const { data: productDetail, isLoading: productsLoading } =
    useGetProductDetailsQuery(productId);

  const [productData, setProductData] = useState();
  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdatePriceDropMutation();

  //  UseEffect to set the Deductions what is selected
  useEffect(() => {
    if (productDetail) {
      console.log("productDetail", productDetail);

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

      console.log("useEffect");
    }
  }, [productDetail]);

  console.log("selectedDeductions", selectedDeductions);
  if (productData) {
    // console.log("productData", productData);
  }

  // Handle input changes and update productData state
  // New Approach
  const handlePriceDropChange = (conditionLabelId, value, check) => {
    // Find the index of the variant in the deductions array
    console.log("Variant Deductions");
    console.log(productData);

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
    console.log("Simple Deductions", check);
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
      console.log("OPERATION", value);

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

    console.log("handleSubmit", productData);

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
      <div className="inline-block m-4 px-4 py-1 bg-blue-600 text-white rounded">
        <Link to={"/admin/productsList"}>
          <button>Back</button>
        </Link>
      </div>

      <div className="w-[95%] flex flex-col mx-auto my-1 bg-white px-4 py-2 rounded shadow-xl">
        <div className="m-2 ">
          <h1 className="text-sm mb-1 sticky">
            {productData ? productData.name : "Loading.."} {selectedVariant}
          </h1>
          <hr />
        </div>

        <div className="bg-scroll">
          {productData && productData.category.name === "Mobile" ? (
            <form onSubmit={handleSubmit}>
              {productData &&
                selectedDeductions.deductions.map((condition, index) => (
                  <div key={index} className=" border my-2 py-2 px-2 rounded">
                    <div>
                      <h1>{condition.conditionName}</h1>
                    </div>
                    <hr />
                    <div className="flex flex-col">
                      {condition.conditionLabels &&
                        condition.conditionLabels.map(
                          (conditionLabel, index) => (
                            <div
                              key={index}
                              className="flex gap-6 items-center mt-2"
                            >
                              <div>
                                <div>
                                  <h1 className="text-sm">
                                    {conditionLabel.conditionLabel}
                                  </h1>
                                </div>
                                <div className="flex items-center gap-1">
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
                                  <h1>%</h1>
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
                                  <h1
                                    className={`${
                                      conditionLabel.operation === "Subtrack"
                                        ? "bg-red-200"
                                        : "bg-blue-200"
                                    } text-black font-bold px-2 py-1 rounded`}
                                  >
                                    {conditionLabel.operation}
                                  </h1>
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
              <h1>Simple Deductions</h1>
              <form onSubmit={handleSubmit}>
                {productData &&
                  selectedDeductions.map((condition, index) => (
                    <div key={index} className=" border my-2 py-2 px-2 rounded">
                      <div>
                        <h1>{condition.conditionName}</h1>
                      </div>
                      <hr />
                      <div className="flex flex-col">
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
                                  className="flex gap-6 items-center mt-2"
                                >
                                  <div>
                                    <div>
                                      <h1 className="text-sm">
                                        {conditionLabel.conditionLabel}
                                      </h1>
                                    </div>

                                    <div className="flex items-center gap-1">
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
                                      <h1>%</h1>
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
                                      <h1
                                        className={`${
                                          conditionLabel.operation ===
                                          "Subtrack"
                                            ? "bg-red-200"
                                            : "bg-blue-200"
                                        } text-black font-bold px-2 py-1 rounded`}
                                      >
                                        {conditionLabel.operation}
                                      </h1>
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
                                      <h1 className="text-sm">
                                        {conditionLabel.conditionLabel}
                                      </h1>
                                    </div>

                                    <div className="flex items-center gap-1">
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
                                      <h1>%</h1>
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
                                      <h1
                                        className={`${
                                          conditionLabel.operation ===
                                          "Subtrack"
                                            ? "bg-red-200"
                                            : "bg-blue-200"
                                        } text-black font-bold px-2 py-1 rounded`}
                                      >
                                        {conditionLabel.operation}
                                      </h1>
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
    </div>
  );
};

export default ProductQuestionsList;
