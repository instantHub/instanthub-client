import React, { useState, useEffect } from "react";
import { useGetProductDetailsQuery } from "../../features/api";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGetUpto } from "../../features/deductionSlice";
import { FaAngleRight, FaIndianRupeeSign } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { prodId } = useParams();
  const { data: productDetails, isLoading } = useGetProductDetailsQuery(prodId);
  const [toggle, setToggle] = useState(true);
  const [variantSelected, setVariantSelected] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState();

  const dispatch = useDispatch();

  const handleToggle = (variantSelected) => {
    setToggle((prevState) => !prevState);
    setVariantSelected(variantSelected);
    // console.log("calling dispatch");
    // dispatch(setGetUpto(variantSelected));
    setIsSelected(!isSelected);
    setSelectedDiv(variantSelected.id);
  };

  // console.log("variantSelected", variantSelected);

  // console.log("productDetails", productDetails);

  const [reloaded, setReloaded] = useState(false);

  const [loadedInitially, setLoadedInitially] = useState(false);

  // useEffect to handle categories other than mobile for variant selection
  useEffect(() => {
    if (!isLoading) {
      if (productDetails.category.name !== "Mobile") {
        handleToggle(productDetails.variants[0]);
      }
    }
    setLoadedInitially(true);
  }, [productDetails]);

  // useEffect(() => {
  //   if (productDetails && productDetails.category.name === "Mobile") {
  //     window.location.reload();
  //   }
  // }, [prodId]);

  const location = useLocation();

  // useEffect(() => {
  //   window.location.reload();
  // }, [location.pathname]); // Reload when the pathname of the location changes

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${
          productDetails
            ? `${productDetails.name} ${productDetails.category.name}`
            : null
        }| InstantCashPick`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content="sell old mobiles online, sell old mobile online, sell old laptops online, sell old laptop online,sell old products on Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <link rel="canonical" href="https://instantcashpick.com/" />
      </Helmet>
      <div className="w-[80%] mx-auto my-5 max-md:w-[90%] max-sm:my-5">
        {/* <div className="bg-white px-10 pt-10 pb-24 rounded-md shadow-lg"> */}
        {/* Header Links: Home > Category > Brand > Products > ProductName */}
        <p className="pb-5 text-2xl font-bold max-sm:text-xl">
          Sell your{" "}
          {productDetails
            ? `${productDetails.brand.name} ${productDetails.name} ${productDetails.category.name} `
            : null}{" "}
          for Instant Cash
        </p>
        <div className="mx-0 mb-6">
          {productDetails && (
            <div className="flex items-center gap-1">
              <h1 className="flex items-center opacity-60 gap-1 max-sm:text-[14px]">
                <Link to={"/"}>Home</Link>
                <FaAngleRight />
                <Link to={`/categories/brands/${productDetails.category.id}`}>
                  {productDetails.category.name}
                </Link>
                <FaAngleRight />
                <Link
                  to={`/categories/brands/products/${productDetails.brand.id}`}
                >
                  {productDetails.brand.name}
                </Link>
                <span className="max-sm:hidden">
                  <FaAngleRight />
                </span>
                <span className="max-sm:hidden">Products</span>

                <FaAngleRight />
              </h1>
              <span className="max-sm:text-[14px]">{productDetails.name}</span>
            </div>
          )}
          <hr className="text-black mt-1" />
        </div>
        <div className="">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <div className="bg-white flex flex-col sm:flex-row px-3 sm:p-6 max-sm:pb-3  max-sm:flex-col">
                {/* IMAGE */}
                <div className="sm:flex items-center justify-center mr-5 w-full sm:max-w-xs max-sm:size-32 sm:w-1/3 h-20 sm:h-96 max-sm:mx-auto">
                  <div className="flex items-center justify-center h-full w-full">
                    <img
                      src={
                        import.meta.env.VITE_APP_BASE_URL + productDetails.image
                      }
                      alt="CAT"
                      className="size-48 max-sm:size-32"
                    />{" "}
                  </div>
                </div>

                {/* Products Details */}
                <div className="flex flex-col gap-24 w-full sm:w-2/3 max-sm:gap-6 max-14inch:gap-12">
                  <div className="mt-6 flex gap-2 items-center">
                    <h1 className="text-3xl">{productDetails.name}</h1>
                    {productDetails.category.name === "Mobile" &&
                      variantSelected.length != 0 && (
                        <h3 className="text-2xl">({variantSelected.name})</h3>
                      )}
                  </div>
                  {/* Check if it is Mobile Product */}
                  <div className="">
                    {productDetails.category.name === "Mobile" ? (
                      <div className="flex flex-col gap-4">
                        {variantSelected.length == 0 ? (
                          <div>
                            <p>Choose a Variant</p>
                            <p className="opacity-40 text-sm">
                              Select a variant to know the price
                            </p>
                          </div>
                        ) : null}

                        {/* VARIANT PRICE WILL BE SHOWN WHEN CLICKED ON A VARIANT */}
                        <div className="">
                          <div className="flex items-center">
                            {variantSelected.price ? (
                              <FaIndianRupeeSign className="text-4xl" />
                            ) : null}
                            <h2 className="text-5xl text-yellow-500">
                              {variantSelected.price}
                            </h2>
                          </div>
                        </div>
                        {/* END OF VARIANT PRICE */}

                        <div className="flex flex-row flex-wrap list-none p-0 my-0 -mx-2">
                          {productDetails.variants.map((variantSelected, i) => (
                            <div
                              key={variantSelected.id + i}
                              className="p-2 w-1/2 sm:w-40 sm:max-w-full"
                              onClick={() => handleToggle(variantSelected)}
                            >
                              <div
                                className={`${
                                  selectedDiv == variantSelected.id
                                    ? "bg-amber-500 text-white"
                                    : "bg-white"
                                } flex items-center rounded-md cursor-pointer p-2.5 ring-0 ring-transparent shadow`}
                              >
                                <span className="border border-solid border-surface-dark rounded-full w-5 h-5 mr-1.5"></span>
                                <span className="text-sm flex-1 flex justify-center">
                                  {variantSelected.name}
                                </span>
                              </div>
                              {/* var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow) */}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-col mb-4">
                          <h2>Product Price</h2>
                          <h2 className="flex items-center text-5xl text-yellow-500">
                            <FaIndianRupeeSign className="text-4xl text-black" />{" "}
                            {variantSelected.price}
                          </h2>
                        </div>
                      </div>
                    )}

                    {variantSelected.length != 0 ? (
                      <div className="flex items-center w-fit bg-emerald-600 text-white px-4 py-2 rounded-md ">
                        <Link
                          to={`/sell/deductions?productId=${prodId}&variant=${variantSelected.name}`}
                        >
                          <button>Get Exact Value</button>
                        </Link>
                        <FaAngleRight />
                      </div>
                    ) : (
                      <div>
                        <button
                          className="bg-emerald-500 mt-2 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:opacity-30 disabled:text-black"
                          disabled
                        >
                          Get Exact Value
                        </button>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <div className="py-1 mt-2 px-2 w-3/4 bg-yellow-200 max-sm:w-full">
                      <p className="text-xs opacity-70">
                        The above pricing is subject to change based on the
                        product's condition. The final pricing offer will be
                        provided after the entire product has been inspected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
