import React, { useState } from "react";
import { useUpdateLaptopConfigurationsPriceDropMutation } from "../../../../features/api";
import UpdateButton from "./UpdateButton";
import { toast } from "react-toastify";

const UpdateSystemConditions = (props) => {
  const {
    productData,
    selectedProcessorDeductions,
    setSelectedProcessorDeductions,
    setProductData,
    type,
  } = props;

  console.log("UpdateSystemConditions", type);

  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdateLaptopConfigurationsPriceDropMutation();

  const [isOpen, setIsOpen] = useState(false);

  const title = getTitle();

  function getTitle() {
    let text;
    switch (type) {
      case "AllLaptopConditions":
        text = `All ${productData?.category?.name} Processors Problems`;
        break;
      case "SingleLaptopConditions":
        text = `Single ${productData?.category?.name} Processor Problems`;
        break;
      default:
        text = `Title Not Set`;
        break;
    }
    return text;
  }

  function handleLaptopPriceDropChange(conditionLabelId, value, check) {
    // Find the condition label by conditionLabelId and update the priceDrop
    // console.log("Simple Deductions", check);

    let updatedData;
    if (check === "priceDrop") {
      updatedData = {
        ...selectedProcessorDeductions,
        deductions: selectedProcessorDeductions.deductions.map((condition) => ({
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
      console.log("OPERATION", value);

      updatedData = {
        ...selectedProcessorDeductions,
        deductions: selectedProcessorDeductions.deductions.map((condition) => ({
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
    // setProductData(updatedProductData);
    setSelectedProcessorDeductions(updatedData);
  }

  // Function to handle form submission
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  const handleSubmit = async () => {
    let updatingSingleLaptop = false;

    // let updatedProduct = {...productData};
    let updatedProduct;
    if (type === "SingleLaptopConditions") {
      updatingSingleLaptop = true;
      updatedProduct = {
        ...productData,
        processorBasedDeduction: productData.processorBasedDeduction.map(
          (pbd) => ({
            ...pbd,
            deductions:
              pbd.processorId === selectedProcessorDeductions.processorId
                ? selectedProcessorDeductions.deductions
                : pbd.deductions,
          })
        ),
      };
    }

    // console.log("updated product", updatedProduct);

    try {
      await updatePriceDrop({
        productId: productData.id,
        data: selectedProcessorDeductions,
        // data: updatingSingleLaptop
        //   ? updatedProduct
        //   : selectedProcessorDeductions,
        type,
        brand: productData.brand.name,
      }).unwrap();
      toast.success(
        `Updated PriceDrops for the ${
          productData.name
        }, ${selectedProcessorDeductions.processorName.toUpperCase()} Processor`
      );
      setIsOpen(false);
      // Handle success
    } catch (error) {
      console.error("Error updating conditions:", error);
    }
  };

  // console.log("type", type);
  // console.log("selectedProcessorDeductions", selectedProcessorDeductions);
  console.log("productData", productData && productData);

  return (
    <>
      <div>
        {/* Selected Processor Based Deductions */}
        {selectedProcessorDeductions && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            <div>
              <span className="flex justify-center text-3xl font-serif font-bold">
                {selectedProcessorDeductions?.processorName}
              </span>
              <span className="flex justify-center text-lg font-serif">
                Update <span className="font-bold px-1"> {title} </span> Based
                On The Selected Processor
              </span>
              {selectedProcessorDeductions?.deductions.map(
                (condition, index) => (
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
                        condition.conditionLabels.map(
                          (conditionLabel, index) => (
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
                                  {/* {productData.category.name !== "Mobile" ? (
                                    <span className="text-lg">₹</span>
                                  ) : null} */}
                                  <input
                                    type="number"
                                    name="priceDrop"
                                    value={conditionLabel.priceDrop}
                                    className="border px-3 py-1 rounded text-[0.9rem]"
                                    placeholder="Price Drop"
                                    onChange={(e) =>
                                      handleLaptopPriceDropChange(
                                        conditionLabel.conditionLabelId,
                                        parseInt(e.target.value),
                                        e.target.name
                                      )
                                    }
                                    required
                                  />
                                  {productData.category.name !== "Mobile" ||
                                  productData.category.name !== "Desktop" ? (
                                    <span className="text-lg">%</span>
                                  ) : null}
                                </div>
                              </div>

                              {conditionLabel.conditionLabelImg && (
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
                                      handleLaptopPriceDropChange(
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
                )
              )}
            </div>
            {/* <div className="py-3 px-2">
            <button
              type="submit"
              className="w-[20%] bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700"
            >
              Submitt
            </button>
            </div> */}
            <UpdateButton
              text={`Update ${title}`}
              // text={`Update ${selectedProcessorDeductions.processorName} Problems`}
              updateLoading={updateLoading}
            />
          </form>
        )}
      </div>

      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`bg-white p-5 rounded-lg shadow-lg w-1/4`}>
              <div className="flex justify-center">
                <h2 className="text-lg text-center">
                  Sure want you to <br />
                  <span className="text-xl font-semibold">Update {title}?</span>
                </h2>
              </div>

              <div className="flex justify-around mt-8">
                <button
                  onClick={() => handleSubmit()}
                  className={`bg-red-600 text-white px-4 py-1 rounded disabled:bg-gray-300 disabled:cursor-none`}
                  disabled={updateLoading}
                >
                  Yes
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className={`bg-green-700 text-white px-4 py-1 rounded`}
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

export default UpdateSystemConditions;
