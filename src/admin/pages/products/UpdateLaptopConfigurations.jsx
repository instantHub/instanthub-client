import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import {
  useGetProductDetailsQuery,
  useUpdateLaptopConfigurationsPriceDropMutation,
} from "../../../features/api";
import { toast } from "react-toastify";

const UpdateLaptopConfigurations = () => {
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
      if (productDetail.category.name.toLowerCase().includes("laptop")) {
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
      }).unwrap();
      toast.success("Updated PriceDrops for the Product");
      // Handle success
    } catch (error) {
      console.error("Error updating condition:", error);
    }
  };

  return (
    <div className="">
      <div className="inline-block m-4 px-4 py-1 bg-blue-600 text-white rounded">
        <Link to={"/admin/products-list"}>
          <button>Back</button>
        </Link>
      </div>

      <div className="w-[95%] flex flex-col mx-auto my-1 bg-white px-4 py-2 rounded shadow-xl">
        <div className="bg-scroll">
          {productData && productData.category.name === "Laptop" && (
            <>
              <h1 className="text-xl text-center font-bold">
                Laptop Configurations to update
              </h1>
              <form onSubmit={handleSubmit}>
                {productData &&
                  selectedDeductions
                    .filter(
                      (condition) =>
                        // condition.conditionName
                        //   .toLowerCase()
                        //   .includes("processor") ||
                        // condition.conditionName.toLowerCase().includes("ram") ||
                        // condition.conditionName
                        //   .toLowerCase()
                        //   .includes("disk") ||
                        // condition.conditionName
                        //   .toLowerCase()
                        //   .includes("graphic")
                        condition.conditionName !==
                        "Functions & Problems Of Your Device"
                    )
                    .map((condition, index) => (
                      <div
                        key={index}
                        className={`mb-10 border my-2 py- px- rounded ${
                          index % 2 === 0 ? `` : `bg-gray-100`
                        }`}
                      >
                        <div>
                          <h1 className="text-2xl text-center py-2 bg-white">
                            {condition.conditionName}
                          </h1>
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
                                    className="flex gap-6 items-center mt-2"
                                  >
                                    <div>
                                      <div>
                                        <h1 className="text-xl">
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
                                        <option value="">
                                          Select Operation
                                        </option>
                                        <option value="Subtrack">
                                          Subtrack
                                        </option>
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
                                        <option value="">
                                          Select Operation
                                        </option>
                                        <option value="Subtrack">
                                          Subtrack
                                        </option>
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

export default UpdateLaptopConfigurations;
