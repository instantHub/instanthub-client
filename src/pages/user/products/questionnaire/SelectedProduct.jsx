import React from "react";
import { MOBILE } from "@utils/user/constants";

const SelectedProduct = ({ selectedProduct, getUpTo }) => {
  return (
    <>
      <div className="flex justify-center items-center text-sm max-sm:text-xs p-1">
        <img
          src={`${import.meta.env.VITE_APP_BASE_URL}${selectedProduct?.image}`}
          alt="productImage"
          className="size-20 max-sm:size-16"
        />
        <div className="flex flex-col gap-2 text-yellow-500 font-semibold">
          <span>{selectedProduct.name}</span>
          {selectedProduct?.category?.name === MOBILE && (
            <span>{getUpTo.variantName}</span>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default SelectedProduct;
