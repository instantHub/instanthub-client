import React, { useEffect, useMemo, useState } from "react";
import { useGetProductsQuery, useGetBrandSeriesQuery } from "@api";
import { Link, useParams } from "react-router-dom";
import {
  Loading,
  ProductCard,
  SeriesButton,
  RecycleBreadcrumbs,
} from "@components/user";
import RecycleContent from "@components/user/static/recycleProduct/RecycleContent";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";
import { SearchIcon } from "@icons";

export const RecycleProducts = () => {
  const { brandURL } = useParams();
  // console.log("brandURL", brandURL);

  const { data: brandSeries } = useGetBrandSeriesQuery(brandURL);

  const [seriesAction, setSeriesAction] = useState({
    showSeries: false,
    selectedSeries: "",
  });
  // console.log("seriesAction", seriesAction);

  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);

  const [search, setSearch] = useState("");

  // Get Products by Brand
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery({ brandUniqueURL: brandURL, search });

  // console.log("productsData", productsData);

  const handleSeries = (seriesId) => {
    setSeriesAction((prevSeries) => ({
      showSeries: !prevSeries.showSeries,
      selectedSeries: seriesId,
    }));
  };

  const handleSearch = async (e) => {
    // console.log("handleSearch");
    let searchValue = e.target.value;
    setSearch(searchValue);
  };

  const debounce = useMemo(() => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => handleSearch(...args), 800);
    };
  }, []);

  useEffect(() => {
    if (productsData) {
      setBrand(productsData[0]?.brand);
      setCategory(productsData[0]?.category);
    }
  }, [productsData]);

  const displayedSeries = seriesAction.showSeries
    ? brandSeries.filter((series) => series._id === seriesAction.selectedSeries)
    : brandSeries;

  const filteredProducts = seriesAction.showSeries
    ? productsData?.filter(
        (product) => product.series === seriesAction.selectedSeries
      )
    : productsData;

  if (productsData?.length === 0) return <h2>Not Available</h2>;

  if (productsLoading) return <Loading />;

  return (
    <>
      {/* Series */}
      <div
        className={`${
          displayedSeries?.length > 0 ? "mt-10 max-sm:mt-3" : "mt-0"
        }`}
      >
        <div className="mx-10 max-sm:mx-2 grid grid-cols-8 max-md:grid-cols-4 max-sm:grid-cols-3 sm:gap-x-2 sm:gap-y-2 rounded sm:rounded-none ring-0 ring-transparent shadow sm:shadow-none mt-4 sm:mt-0">
          {displayedSeries?.map((series) => (
            <SeriesButton
              key={series._id}
              series={series}
              isSelected={
                seriesAction.showSeries &&
                series._id === seriesAction.selectedSeries
              }
              onClick={() => handleSeries(series._id)}
            />
          ))}
        </div>
      </div>

      <div
        className={`${
          displayedSeries?.length > 0 ? "pt-7 max-sm:py-2" : "pt-5 max-sm:pt-0"
        } w-4/5 max-2sm:w-[90%] mx-auto `}
      >
        {/* Search Bar */}
        <div className=" my-2 flex justify-end gap-2 items-center max-sm:my-4 max-sm:justify-center">
          <div className="flex pl-4 items-center border rounded">
            <SearchIcon className="text-black" />
            <input
              type="search"
              name="search"
              placeholder="Search a product"
              className="px-2 text-sm py-1 outline-none"
              onChange={(e) => debounce(e, "test1", "test2")}
            />
          </div>
          <div>
            <button className="bg-green-600 pl-1 pr-2 rounded text-sm py-1 text-white">
              Search
            </button>
          </div>
        </div>

        {/* Recycle Text */}
        <p className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
          Recycle your {`${brand?.name} ${category?.name}`} and get Instant Cash
        </p>

        <RecycleBreadcrumbs />

        <div className="grid grid-cols-6 max-14inch:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 sm:gap-x-12 sm:gap-y-8 rounded-xl sm:rounded-none ring-0 ring-transparent shadow sm:shadow-none mt-4 sm:mt-0">
          {filteredProducts
            ?.filter((product) => product.status.toLowerCase() !== "blocked")
            .map((product, idx) => (
              // <ProductCard
              //   key={product._id}
              //   product={product}
              //   URL={`/recycle/categories/brands/products/productDetails/${product.uniqueURL}`}
              // />

              <div
                className="flex items-center justify-center max-h-44 sm:max-h-56 sm:rounded-lg border-b border-r border-solid sm:border-0"
                key={idx}
              >
                {/* <Link to={`${URL}`} className="w-full h-full"> */}
                <Link
                  to={`/recycle/categories/brands/products/productDetails/${product.uniqueURL}`}
                  className="w-full h-full"
                >
                  <div className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white p-2 sm:p-4 sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
                    <div className="flex horizontal w-28 h-28 items-center justify-center max-sm:w-24 max-sm:h-20">
                      <img
                        src={`${import.meta.env.VITE_APP_BASE_URL}${
                          product.image
                        }`}
                        alt="Product"
                        className="w-[105px] h-[105px] max-sm:w-20 max-sm:h-20"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-center mt-1 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                      <div className="text-[12px] font-[500] leading-2 max-sm:text-[11px]">
                        {product.name}
                      </div>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <RecycleContent heading={false} />
      </div>
    </>
  );
};
