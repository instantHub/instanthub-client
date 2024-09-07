import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import {
  useGetProductDetailsQuery,
  useUpdateLaptopConfigurationsPriceDropMutation,
} from "../../../../features/api";
import { toast } from "react-toastify";
import UpdateButton from "./UpdateButton";

const UpdateSingleLaptopConfigurations = () => {
  const { productId } = useParams();
  // Query Params
  const [searchParams] = useSearchParams();
  const selectedVariant = searchParams.get("variant");
  //   console.log("selectedVariant", selectedVariant);

  const [selectedDeductions, setSelectedDeductions] = useState();
  const [operation, setOperation] = useState();

  const { data: productDetail, isLoading: productsLoading } =
    useGetProductDetailsQuery(productId);

  const [productData, setProductData] = useState();
  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdateLaptopConfigurationsPriceDropMutation();

  //  UseEffect to set the Deductions what is selected
  useEffect(() => {
    if (productDetail) {
      //   console.log("productDetail", productDetail);

      // Set the matched product to the component state
      setProductData(productDetail);
      // if (productDetail.category.name.toLowerCase().includes("laptop")) {
      if (laptopDesktop.includes(productDetail.category.name.toLowerCase())) {
        setSelectedDeductions(productDetail.simpleDeductions);
      }
    }
  }, [productDetail]);

  console.log("selectedDeductions", selectedDeductions);

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

    try {
      await updatePriceDrop({
        productId: productId,
        data: productData,
        type: "SingleLaptopConfig",
      }).unwrap();
      toast.success("Updated PriceDrops for the Product");
      // Handle success
    } catch (error) {
      console.error("Error updating condition:", error);
    }
  };

  const laptopDesktop = ["laptop", "desktop"];

  return (
    <div className="mt-5">
      <div className="w-[95%] flex flex-col mx-auto my-1 bg-white px-4 py-2 ">
        <div className="bg-scroll">
          {/* {productData && productData.category.name === "Laptop" && ( */}
          {productData &&
            laptopDesktop.includes(productData.category.name.toLowerCase()) && (
              <>
                <h3 className="text-2xl font-serif text-center font-bold">
                  Single {productData.category.name} Configurations to update
                </h3>
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
                          <h3 className="text-2xl font-serif font-bold text-center py-2 bg-white">
                            {condition.conditionName}
                          </h3>
                        </div>
                        <hr />
                        <div className="flex flex-col px-4 py-2">
                          {productData.brand.name === "Apple" &&
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
                                    className="flex justify-center items-center  gap-6  mt-2 pb-1"
                                  >
                                    <div>
                                      <h3 className="text-xl">
                                        {conditionLabel.conditionLabel}
                                      </h3>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      <span className="text-lg">₹</span>
                                      <input
                                        type="number"
                                        name="priceDrop"
                                        value={conditionLabel.priceDrop}
                                        className="border-b px-3 py-1 rounded text-lg"
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
                                    className="flex justify-center items-center  gap-6  mt-2 pb-1"
                                  >
                                    <div>
                                      <h3 className="text-xl">
                                        {conditionLabel.conditionLabel}
                                      </h3>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      <span className="text-lg">₹</span>
                                      <input
                                        type="number"
                                        name="priceDrop"
                                        value={conditionLabel.priceDrop}
                                        className="border-b px-3 py-1 rounded text-lg"
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
                                ))}
                        </div>
                      </div>
                    ))}
                  <UpdateButton
                    text={`Update Single ${productData.category.name} Configurations`}
                    updateLoading={updateLoading}
                  />
                </form>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default UpdateSingleLaptopConfigurations;
