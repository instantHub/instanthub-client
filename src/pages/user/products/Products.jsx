import React, { useEffect, useMemo, useState } from "react";
import { useGetProductsQuery, useGetBrandSeriesQuery } from "@api";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Loading,
  Breadcrumbs,
  ProductCard,
  SeriesButton,
} from "@components/user";
import SellContent from "@components/user/static/SellContent";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";
import { slugify } from "@utils/general/slugify";
import { SearchIcon } from "@icons";

export const Products = () => {
  const { brandId, categoryUniqueURL, brandUniqueURL } = useParams();
  // console.log(
  //   "brandId, categorySlug, brandUniqueURL",
  //   brandId,
  //   categoryUniqueURL,
  //   brandUniqueURL
  // );

  const { data: brandSeries, isLoading: seriesLoading } =
    useGetBrandSeriesQuery(brandUniqueURL);

  const [seriesAction, setSeriesAction] = useState({
    showSeries: false,
    selectedSeries: "",
  });
  // console.log("seriesAction", seriesAction);

  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);

  const [search, setSearch] = useState("");

  // Get Products by Brand
  // const { data: productsData, isLoading: productsLoading } =
  //   useGetProductsQuery({ brandId, search });
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery({ brandUniqueURL, search });

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

  const displayedSeries = seriesAction?.showSeries
    ? brandSeries?.filter((series) => series.id === seriesAction.selectedSeries)
    : brandSeries;

  const filteredProducts = seriesAction.showSeries
    ? productsData?.filter(
        (product) => product.series === seriesAction.selectedSeries
      )
    : productsData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (productsLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${brand?.name} ${category?.name} | InstantHub`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content={`sell products on online, sell old mobiles online, sell old ${brand?.name} ${category?.name} online, sell ${brand?.name} ${category?.name} online, sell old mobile online, sell old laptops online, sell old laptop online,sell old products on Instant Hub, Instant Cash, Instant Pick, InstantHub, instant hub, instant hub, instant pick, instanthub`}
          // content="Instant Hub, Instant Cash, Instant Pick, InstantHub, instant hub, instant hub, instant pick, InstantHub"
        />
        <link
          rel="canonical"
          href={`https://www.instanthub.in/categories/brands/products/${brandId}`}
        />
      </Helmet>

      {/* Series */}
      <div
        className={`${
          displayedSeries?.length > 0 ? "w-full pt-10 max-sm:pt-2" : "mt-0"
        }`}
      >
        <div className="mx-10 max-sm:mx-2 grid grid-cols-8 max-md:grid-cols-4 max-sm:grid-cols-3 sm:gap-x-2 sm:gap-y-2 rounded sm:rounded-none ring-0 ring-transparent shadow sm:shadow-none mt-4 sm:mt-0">
          {displayedSeries?.map((series) => (
            <SeriesButton
              key={series.id}
              series={series}
              isSelected={
                seriesAction.showSeries &&
                series.id === seriesAction.selectedSeries
              }
              onClick={() => handleSeries(series.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 w-[90%] max-sm:w-[90%] mx-auto bg-white">
        {/* Search Bar */}
        <div className=" my-2 flex justify-end gap-2 items-center max-sm:my-4 max-sm:justify-center">
          <div className="flex items-center gap-1 px-2 border rounded-md">
            <SearchIcon className="text-gray-700 text-sm" />
            <input
              type="search"
              name="search"
              placeholder="Search a product"
              className="px-2 bg-white text-sm py-1 outline-none"
              onChange={(e) => debounce(e, "test1", "test2")}
            />
          </div>
          <div>
            <button className="bg-green-600 pl-1 pr-2 rounded text-sm py-1 text-white">
              Search
            </button>
          </div>
        </div>

        <div>
          <p className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
            Sell your{" "}
            {category && brand ? `${brand.name} ${category.name}` : null} for
            Instant Cash
          </p>
        </div>

        <Breadcrumbs />

        <div className="grid grid-cols-6 max-14inch:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 sm:gap-x-12 sm:gap-y-8 rounded-xl sm:rounded-none ring-0 ring-transparent shadow sm:shadow-none mt-4 sm:mt-0">
          {filteredProducts?.filter(
            (product) => product.status.toLowerCase() !== "blocked"
          ).length === 0 && (
            <div className="flex items-center justify-center">
              <h1>{brand?.name} Products Not Available</h1>
            </div>
          )}

          {filteredProducts
            ?.filter((product) => product.status.toLowerCase() !== "blocked")
            ?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                URL={`${product.uniqueURL}`}
                // URL={`${slugify(product.uniqueURL)}`}
                // URL={removeLastParamFromPath(ROUTES.user.productDetails)}
              />
            ))}
        </div>

        <SellContent />
      </div>
    </>
  );
};
