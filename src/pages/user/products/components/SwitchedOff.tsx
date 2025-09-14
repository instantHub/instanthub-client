import { IProductResponse } from "@features/api/productsApi/types";
import { selectSelectedProduct } from "@features/slices";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const SwitchedOff: FC = () => {
  const { category, uniqueURL } = useSelector(selectSelectedProduct);

  return (
    <div className="min-h-[500px] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800">Recycle</h1>
        <p className="mt-4 text-lg sm:text-2xl font-semibold text-gray-700">
          Your Switched Off {category?.name}!
        </p>
        <p className="mt-2 text-gray-600">
          Sorry for the inconvenience, your product can be recycled with us!
          <br />
          Please Contact Customer Support{" "}
          <a
            href="tel:8722288017"
            className="text-instant-mid hover:underline font-semibold"
          >
            8722288017
          </a>
          <br />
          or <br />
          Click on below button!
        </p>

        <div className="mt-6">
          <Link
            to={`/recycle/categories/brands/products/productDetails/${uniqueURL}`}
            className="inline-block px-6 py-3 bg-instant-mid text-white font-semibold rounded-lg shadow-md hover:bg-instant-mid/60 transition-colors duration-200"
          >
            Recycle this product
          </Link>
        </div>
      </div>
    </div>
  );
};
