import { Eye } from "@icons";
import React from "react";

const StockCard = ({ data, categoryImage, handleView }) => {
  // console.log("data", data);

  const style = {
    boldness: "font-semibold max-sm:font-norma",
  };

  const orderCurrentStatus = (status) => {
    if (status.in)
      return (
        <span className="text-blue-600 bg-blue-200 text-xs px-2 py-[2px] rounded-full ">
          Stock In
        </span>
      );
    if (status.out)
      return (
        <span className="text-green-600 bg-green-200 text-xs px-2 py-[2px] rounded-full">
          Stock Out
        </span>
      );
    if (status.lost)
      return (
        <span className="text-red-600 bg-red-200 text-xs px-2 py-[2px] rounded-full">
          Stock Lost
        </span>
      );
    return "Unknown";
  };

  return (
    <div className="flex flex-col cursor-pointer border rounded-md">
      <div className={`shadow flex items-center  py-2 text-sm max-sm:text-xs`}>
        {/* Category Image */}
        <div className="px-5 max-sm:px-2 mx-auto">
          <img
            src={import.meta.env.VITE_APP_BASE_URL + categoryImage}
            alt={"Product Image"}
            className={`w-[60px] h-[60px] max-sm:h-[50px] max-sm:w-[50px] mx-auto`}
            loading="lazy" // Native lazy loading
          />
        </div>

        {/* Stock Detail */}
        <div className="grow flex flex-col gap-[2px]">
          {/* Order ID and Product name and variant */}
          <div className="flex flex-col text-start gap-[2px]">
            <div>
              <span>Order ID: </span>
              <span className={`${style.boldness}`}>{data.orderId}</span>
            </div>

            <div className="flex gap-2 justify-start">
              <span className={`${style.boldness}`}>
                {data.productDetails.productName}
                {/* {data.productDetails.productCategory} */}
              </span>
              <span
                className={`${style.boldness} ${
                  data.productDetails.productCategory !== "Mobile" && "hidden"
                }`}
              >
                {/* {data.productDetails.productCategory} */}
                {data.productDetails.productVariant}
              </span>
            </div>
          </div>

          {/* Prices */}
          <div className="flex gap-2">
            <div>
              <span>Purchase Price: </span>
              <span className={`${style.boldness}`}>{data.purchasePrice}</span>
            </div>
            <div>
              <span>Sold Price: </span>
              <span className={`${style.boldness}`}>
                {data.soldPrice || "Yet to be sold!"}
              </span>
            </div>
          </div>

          {/* Picked Up Details */}
          <div className="flex gap-2 items-center">
            <div>
              <span>Sold By: </span>
              <span className={`${style.boldness}`}>
                {data.pickedUpDetails.agentName}
              </span>
            </div>
            <div>
              <span>Sold On: </span>
              <span className={`${style.boldness}`}>
                {data.pickedUpDetails.pickedUpDate}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex gap-2 items-center">
            <div>
              <span>Status: </span>
              <span className={`${style.boldness}`}>
                {orderCurrentStatus(data.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* View Stock */}
      <button
        onClick={handleView}
        className="flex items-center justify-center py-2 text-blue-800 max-sm:text-xs"
      >
        <span className="tracking-[5px]">View Stock</span>
        <span>
          <Eye />
        </span>
      </button>
    </div>
  );
};

export default StockCard;
