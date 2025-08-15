import React, { useState, useEffect } from "react";
import { useGetProductDetailsQuery } from "@api";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Loading,
  Breadcrumbs,
  PageNotFound,
  ServerError,
} from "@components/user";
import SellContent from "@components/user/static/SellContent";
import { MOBILE } from "@utils/user/constants";
import { ArrowRightIcon } from "@icons";
import { useIPLocation } from "@hooks";

export const ProductDetail = () => {
  const { productUniqueURL } = useParams();
  console.log(productUniqueURL);

  const {
    data: productDetails,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productUniqueURL);
  // console.log("productDetails", productDetails);

  const { location } = useIPLocation();

  const [variantState, setVariantState] = useState({
    variantSelected: null,
    selectedDiv: null,
  });
  const [toggle, setToggle] = useState(true);

  const handleToggle = (variant) => {
    setToggle(!toggle);
    setVariantState({
      variantSelected: variant,
      selectedDiv: variant?.id,
    });
  };

  useEffect(() => {
    if (!isLoading && !productDetails?.category?.categoryType.multiVariants) {
      handleToggle(productDetails?.variants[0]);
    }
  }, [productDetails, isLoading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (error && "status" in error && error.status === 404)
    return <PageNotFound />;

  if (error && "status" in error && error.status === 500)
    return <ServerError />;

  if (isLoading) return <Loading />;

  const { category, brand, name } = productDetails;

  return (
    <>
      <Helmet>
        {/* <title>{`Sell Old ${name} ${category?.name} | InstantHub`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <link
          rel="canonical"
          href={`https://www.instanthub.in/${location?.city}/${category?.uniqueURL}/${brand?.uniqueURL}/${productUniqueURL}`}
        /> */}

        <title>{productDetails?.metaTitle || productDetails?.name}</title>
        <meta name="description" content={productDetails?.metaDescription} />
        <meta
          name="keywords"
          content={productDetails?.metaKeywords.join(", ")}
        />
        <link rel="canonical" href={productDetails?.canonicalUrl} />
      </Helmet>

      <div className="w-[80%] mx-auto my-5 max-md:w-[90%] max-sm:my-5">
        <p className="pb-5 text-xl font-bold text-wrap max-sm:text-sm max-sm:font-semibold">
          <span>
            Sell your {`${brand?.name} ${name} ${category?.name} `} for Instant
            Cash
          </span>
        </p>

        <Breadcrumbs />

        <div className="bg-white flex flex-col sm:flex-row px-3 sm:px-6 sm:py-1">
          {/* Product Image */}
          <div className="sm:flex items-center justify-center mr-5 w-full sm:max-w-xs max-sm:size-32 sm:w-1/3 h-20 sm:h-96 max-sm:mx-auto">
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={import.meta.env.VITE_APP_BASE_URL + productDetails?.image}
                alt="CAT"
                className="size-48 max-sm:size-28"
                loading="lazy" // Native lazy loading
              />
            </div>
          </div>

          {/* Product Name */}
          <div className="flex flex-col w-full sm:w-2/3 gap-10">
            <div className="mt-6 flex gap-2 items-center">
              <h1 className="text-3xl max-sm:text-2xl">
                {productDetails?.name}
              </h1>
              {/* {productDetails?.category?.name === "Mobile" && */}
              {productDetails?.category?.categoryType?.multiVariants &&
                variantState.variantSelected && (
                  <h3 className="text-2xl max-sm:text-lg">
                    ({variantState.variantSelected?.name})
                  </h3>
                )}
            </div>

            <div>
              {/* {productDetails?.category?.name === "Mobile" ? ( */}
              {productDetails?.category?.categoryType?.multiVariants ? (
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
                      <div className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-instant-mid to-instant-start">
                        <span className="text-4xl max-sm:text-2xl">₹</span>
                        {/* <h2 className="text-5xl max-sm:text-3xl text-yellow-500"> */}
                        <h2 className="text-5xl max-sm:text-3xl text-transparent">
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
                              ? // ? "bg-amber-500 text-white"
                                " border border-instant-mid text-instant-mid"
                              : "bg-white"
                          } flex items-center rounded-md cursor-pointer p-2.5 max-sm:p-2 shadow`}
                        >
                          <span
                            className={`
                              border border-solid border-surface-dark rounded-full w-5 h-5 max-sm:w-4 max-sm:h-4 mr-1.5
                              ${
                                variantState.selectedDiv === variant.id &&
                                "bg-gradient-to-br from-instant-mid/60 to-instant-start/70"
                              }
                            `}
                          ></span>
                          <span className="text-sm max-sm:text-sm flex-1 text-center">
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
                  <div className="flex items-center text-5xl max-sm:text-3xl text-yellow-500">
                    <span className="text-4xl max-sm:text-2xl text-black">
                      ₹
                    </span>
                    {variantState.variantSelected?.price}
                  </div>
                  <span className="text-gray-500 text-sm max-sm:text-xs">
                    Click on Get Exact Value to calculate your product's price
                  </span>
                </div>
              )}

              {variantState.variantSelected ? (
                <Link
                  // to={`/sell/deductions?productId=${prodId}&variant=${variantState.variantSelected.name}`}
                  to={`/sell/deductions?product=${productUniqueURL}&variant=${variantState.variantSelected.name}`}
                  className="flex items-center w-fit text-lg max-sm:text-sm bg-emerald-600 text-white px-4 py-2 rounded-md"
                >
                  Get Exact Value <ArrowRightIcon />
                </Link>
              ) : (
                <button
                  className="bg-emerald-500 mt-2 text-white text-lg max-sm:text-sm px-4 py-2 rounded-md disabled:bg-gray-400 disabled:opacity-30 disabled:text-black"
                  disabled
                >
                  Get Exact Value
                </button>
              )}

              <div className="py-1 mt-2 px-2 w-3/4 bg-yellow-200 max-sm:w-full">
                <p className="text-xs max-sm:text-[10px] opacity-70">
                  The above pricing is subject to change based on the product's
                  condition. The final pricing offer will be provided after the
                  entire product has been inspected.
                </p>
              </div>
            </div>
          </div>
        </div>

        <SellContent />
      </div>
    </>
  );
};
