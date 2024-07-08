import React, { useEffect, useState } from "react";
import {
  useGetBrandQuery,
  useGetProductsQuery,
  useGetCategoryQuery,
  useGetAllProductsQuery,
  useGetBrandSeriesQuery,
  useGetAllBrandQuery,
} from "../../features/api";
import { useParams, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import ProductSeries from "../series/ProductSeries";
import { FaAngleRight } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const { brandId } = useParams();

  const { data: brandSeries, isLoading: seriesLoading } =
    useGetBrandSeriesQuery(brandId);

  const { data: brandData, isLoading: brandLoading } = useGetAllBrandQuery();

  const [search, setSearch] = useState("");
  const {
    data: productsData,
    isLoading: productsLoading,
    isSuccess: productsLoaded,
    isError,
  } = useGetProductsQuery({ brandId, search });

  const [showSeries, setShowSeries] = useState(false);
  const [seriesSelected, setSeriesSelected] = useState("");

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  // console.log("category", category);
  // console.log("brand", brand);
  // console.log("productsData", productsData);

  const handleSeries = (seriesId) => {
    setShowSeries(!showSeries);
    setSeriesSelected(seriesId);
    // console.log(seriesId);
  };

  useEffect(() => {
    if (brandData) {
      const brandFound = brandData.find((b) => b.id === brandId);
      setBrand(brandFound);
      setCategory(brandFound.category);
    }
  }, [brandData]);

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${brand.name} ${category.name}s | InstantCashPick`}</title>

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

      {/* Series */}
      <div className="mt-8">
        <div className="mx-10 grid grid-cols-8 max-md:grid-cols-4 max-sm:grid-cols-3 sm:gap-x-2 sm:gap-y-2 rounded sm:rounded-none ring-0 ring-transparent shadow sm:shadow-none mt-4 sm:mt-0">
          {!seriesLoading && brandSeries.length !== 0
            ? !showSeries
              ? brandSeries.map((series, i) => (
                  <div
                    key={series.id} // Changed from 'i' to 'series.id'
                    className="relative col-span-1 max-h-44 sm:max-h-56 sm:rounded border-b border-r border-solid sm:border-0 max-sm:border-gray-300" //mobile view
                  >
                    <button
                      onClick={() => handleSeries(series.id)}
                      className="w-full h-full"
                    >
                      <div
                        className={`${
                          showSeries && series.id === seriesSelected
                            ? "bg-cyan-500 text-white"
                            : "bg-gray-200 max-sm:bg-white"
                        } flex flex-col items-center justify-center cursor-pointer w-full h-full  p-2 sm:p-2 sm:min-w-full rounded-0 sm:rounded-md sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500`}
                      >
                        <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                          <div className="text-[14px] font-[500] leading-7">
                            {series.name}
                          </div>
                        </span>
                      </div>
                    </button>
                    {showSeries && series.id === seriesSelected && (
                      <button
                        onClick={() => handleSeries(series.id)}
                        className="absolute top-1 right-1 text-white hover:"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))
              : brandSeries
                  .filter((series, i) => series.id === seriesSelected)
                  .map((series, i) => (
                    <div
                      key={series.id} // Changed from 'i' to 'series.id'
                      className="relative col-span-1 max-h-44 sm:max-h-56 sm:rounded border-b border-r border-solid sm:border-0 max-sm:border-gray-300"
                    >
                      <button
                        onClick={() => handleSeries(series.id)}
                        className="w-full h-full"
                      >
                        <div
                          className={`${
                            showSeries && series.id === seriesSelected
                              ? "bg-cyan-500 text-white"
                              : "bg-gray-200 max-sm:bg-white"
                          } flex flex-col items-center justify-center cursor-pointer w-full h-full  p-2 sm:p-2 sm:min-w-full rounded sm:rounded sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500`}
                        >
                          <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                            <div className="text-[14px] font-[500] leading-7">
                              {series.name}
                            </div>
                          </span>
                        </div>
                      </button>
                      {showSeries && series.id === seriesSelected && (
                        <button
                          onClick={() => handleSeries(series.id)}
                          className="absolute top-1 right-1 text-white hover:"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))
            : null}
        </div>
      </div>

      {/* <div className="mt-5 w-4/5 max-sm:w-[90%] mx-auto"> */}
      {/* <div className="mt-5 w-[90%] max-sm:w-[90%] mx-auto"> */}
      <div className="pt-10 w-4/5 max-2sm:w-[90%] mx-auto ">
        {/* Search Bar */}
        <div className=" my-2 flex justify-end gap-2 items-center max-sm:my-4 max-sm:justify-center">
          <div className="flex pl-4 items-center border rounded">
            <BsSearch className="text-black" />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search a product"
              className="px-2 text-sm py-1 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <button className="bg-green-600 pl-1 pr-2 rounded text-sm py-1 text-white">
              Search
            </button>
          </div>
        </div>

        <div>
          <p className="pb-5 text-2xl font-bold max-sm:text-xl">
            Sell your {`${brand?.name} ${category?.name}`} to recycle and get
            Instant Cash
          </p>
        </div>

        <div className="mx-0 mb-6">
          <div className="flex items-center gap-1">
            <h2 className="flex items-center opacity-60 gap-1 max-2sm:text-xs max-2sm:gap-0">
              <Link to={"/"} className="max-2sm:hidden">
                Home
              </Link>
              <Link to={"/"} className="2sm:hidden">
                H..
              </Link>
              <FaAngleRight className="" />
              <Link to={"/recycle-categories"} className="max-sm:hidden">
                Recycle
              </Link>
              <Link to={"/recycle-categories"} className="sm:hidden">
                Re..
              </Link>
              <FaAngleRight />
              <Link to={`/recycle-categories/recycle-brands/${category.id}`}>
                Recycle {category.name}
              </Link>
              <FaAngleRight />
              <span className="font-semibold">
                Recycle {brand.name} {category.name}
              </span>
            </h2>
          </div>
          <hr className="text-black mt-1" />
        </div>

        {productsLoading ? (
          <div className="flex flex-col justify-center items-center h-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-6 max-14inch:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 sm:gap-x-12 sm:gap-y-8 rounded-xl sm:rounded-none ring-0 ring-transparent shadow sm:shadow-none mt-4 sm:mt-0">
            {!productsData.length == 0 ? (
              !showSeries ? (
                productsData.map(
                  (product, i) =>
                    product.status.toLowerCase() !== "blocked" && (
                      <>
                        <div
                          key={i}
                          className="col-span-1 max-h-44 sm:max-h-56 sm:rounded-lg border-b border-r border-solid sm:border-0 max-14inch:"
                        >
                          <Link
                            to={`/recycle-categories/recycle-brands/recycle-productDetails/${product.id}`}
                            key={i}
                            className="w-full h-full"
                          >
                            <div
                              key={i}
                              className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white p-2 sm:p-4 sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500"
                            >
                              <div className="flex horizontal w-28 h-28 items-start justify-center max-sm:w-24 max-sm:h-24">
                                <img
                                  src={
                                    import.meta.env.VITE_APP_BASE_URL +
                                    product.image
                                  }
                                  alt="CAT"
                                  className="w-[105px] h-[105px] max-sm:w-24 max-sm:h-24"
                                />
                              </div>
                              <span className="text-center mt-1 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                                <div className="text-[12px] font-[500] leading-2 max-sm:text-xs">
                                  {product.name}
                                </div>
                              </span>
                            </div>
                          </Link>
                        </div>
                      </>
                    )
                )
              ) : (
                // productsData.map((product, i) => (
                productsData
                  .filter((product) => product.series === seriesSelected)
                  .map(
                    (product, i) =>
                      product.status.toLowerCase() !== "blocked" && (
                        <>
                          <div
                            key={i}
                            className="col-span-1 max-h-44 sm:max-h-56 sm:rounded-lg border-b border-r border-solid sm:border-0"
                          >
                            <Link
                              to={`/categories/recycle-brands/recycle-productDetails/${product.id}`}
                              key={i}
                              className="w-full h-full"
                            >
                              <div
                                key={i}
                                // className="w-28 p-4 cursor-pointer rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
                                className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white p-2 sm:p-4 sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500"
                              >
                                <div className="flex horizontal w-28 h-28 items-start justify-between max-sm:w-24 max-sm:h-24">
                                  <img
                                    src={
                                      import.meta.env.VITE_APP_BASE_URL +
                                      product.image
                                    }
                                    alt="CAT"
                                    className="w-[105px] h-[105px] max-sm:w-24 max-sm:h-24"
                                  />
                                </div>
                                <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                                  <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                                    {product.name}
                                  </div>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </>
                      )
                  )
              )
            ) : (
              <h1>Not Available</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
