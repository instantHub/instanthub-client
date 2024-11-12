import React, { useState, useEffect } from "react";
import { useGetProductDetailsQuery } from "../../features/api";
import { useParams, Link } from "react-router-dom";
import { FaAngleRight, FaIndianRupeeSign } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading";

const ProductDetail = () => {
  const { prodId } = useParams();
  const { data: productDetails, isLoading } = useGetProductDetailsQuery(prodId);
  const [variantState, setVariantState] = useState({
    variantSelected: null,
    selectedDiv: null,
  });
  const [toggle, setToggle] = useState(true);

  const handleToggle = (variant) => {
    setToggle(!toggle);
    setVariantState({
      variantSelected: variant,
      selectedDiv: variant.id,
    });
  };

  useEffect(() => {
    if (!isLoading && productDetails?.category?.name !== "Mobile") {
      handleToggle(productDetails.variants[0]);
    }
  }, [productDetails, isLoading]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${productDetails?.name} ${productDetails?.category?.name} | InstantCashPick`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <link rel="canonical" href="https://instantcashpick.com/" />
      </Helmet>

      <div className="w-[80%] mx-auto my-5 max-md:w-[90%] max-sm:my-5">
        <p className="pb-5 text-2xl font-bold max-sm:text-xl">
          Sell your{" "}
          {`${productDetails?.brand?.name} ${productDetails?.name} ${productDetails?.category?.name}`}{" "}
          for Instant Cash
        </p>

        <div className="mx-0 mb-2">
          <div className="flex items-center gap-1">
            <h1 className="flex items-center opacity-60 gap-1 max-sm:text-[14px]">
              <Link to={"/"}>Home</Link>
              <FaAngleRight />
              <Link to={`/categories/brands/${productDetails?.category?.id}`}>
                {productDetails?.category?.name}
              </Link>
              <FaAngleRight />
              <Link
                to={`/categories/brands/products/${productDetails?.brand?.id}`}
              >
                {productDetails?.brand?.name}
              </Link>
              <span className="max-sm:hidden">
                <FaAngleRight />
              </span>
              <span className="max-sm:hidden">Products</span>

              <FaAngleRight />
            </h1>

            {productDetails?.name?.length > 20 ? (
              <span className="max-sm:text-[12px]">
                {productDetails?.name?.substring(0, 20)}...
              </span>
            ) : (
              <span className="max-sm:text-[14px]">{productDetails?.name}</span>
            )}
          </div>
          <hr className="text-black mt-1" />
        </div>

        <div className="bg-white flex flex-col sm:flex-row px-3 sm:px-6 sm:py-1">
          <div className="sm:flex items-center justify-center mr-5 w-full sm:max-w-xs max-sm:size-32 sm:w-1/3 h-20 sm:h-96 max-sm:mx-auto">
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={import.meta.env.VITE_APP_BASE_URL + productDetails?.image}
                alt="CAT"
                className="size-48 max-sm:size-32"
              />
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-2/3 gap-10">
            <div className="mt-6 flex gap-2 items-center">
              <h1 className="text-3xl">{productDetails?.name}</h1>
              {productDetails?.category?.name === "Mobile" &&
                variantState.variantSelected && (
                  <h3 className="text-2xl">
                    ({variantState.variantSelected?.name})
                  </h3>
                )}
            </div>

            <div>
              {productDetails?.category?.name === "Mobile" ? (
                <div className="flex flex-col gap-4">
                  {!variantState.variantSelected && (
                    <div>
                      <p>Choose a Variant</p>
                      <p className="opacity-40 text-sm">
                        Select a variant to know the price
                      </p>
                    </div>
                  )}

                  {/* VARIANT PRICE WILL BE SHOWN WHEN CLICKED ON A VARIANT */}
                  {variantState.variantSelected?.price && (
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <FaIndianRupeeSign className="text-4xl" />
                        <h2 className="text-5xl text-yellow-500">
                          {variantState.variantSelected.price}
                        </h2>
                      </div>
                      <span className="text-gray-500 text-sm max-sm:text-xs">
                        Click on Get Exact Value to calculate your product's
                        price
                      </span>
                    </div>
                  )}
                  <div className="flex flex-row flex-wrap list-none p-0 my-0 -mx-2">
                    {productDetails.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="p-2 w-1/2 sm:w-40 sm:max-w-full"
                        onClick={() => handleToggle(variant)}
                        role="button"
                        aria-selected={variantState.selectedDiv === variant.id}
                      >
                        <div
                          className={`${
                            variantState.selectedDiv === variant.id
                              ? "bg-amber-500 text-white"
                              : "bg-white"
                          } flex items-center rounded-md cursor-pointer p-2.5 shadow`}
                        >
                          <span className="border border-solid border-surface-dark rounded-full w-5 h-5 mr-1.5"></span>
                          <span className="text-sm flex-1 text-center">
                            {variant.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col mb-4">
                  <h2>Product Price</h2>
                  <div className="flex items-center text-5xl text-yellow-500">
                    <FaIndianRupeeSign className="text-4xl text-black" />{" "}
                    {variantState.variantSelected?.price}
                  </div>
                  <span className="text-gray-500 text-sm max-sm:text-xs">
                    Click on Get Exact Value to calculate your product's price
                  </span>
                </div>
              )}

              {variantState.variantSelected ? (
                <Link
                  to={`/sell/deductions?productId=${prodId}&variant=${variantState.variantSelected.name}`}
                  className="flex items-center w-fit bg-emerald-600 text-white px-4 py-2 rounded-md"
                >
                  Get Exact Value <FaAngleRight />
                </Link>
              ) : (
                <button
                  className="bg-emerald-500 mt-2 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:opacity-30 disabled:text-black"
                  disabled
                >
                  Get Exact Value
                </button>
              )}

              <div className="py-1 mt-2 px-2 w-3/4 bg-yellow-200 max-sm:w-full">
                <p className="text-xs opacity-70">
                  The above pricing is subject to change based on the product's
                  condition. The final pricing offer will be provided after the
                  entire product has been inspected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
