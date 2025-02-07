import React, { useEffect, useMemo, useState } from "react";
import { useGetProductsQuery } from "../../features/api/products/productsApi";
import { useGetBrandSeriesQuery } from "../../features/api";
import { useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import RecycleContent from "./RecycleContent";
import BreadCrumbLinks from "../../components/BreadCrumbLinks";
import SeriesButton from "../../components/SeriesButton";

const RecycleProducts = () => {
  const { brandId } = useParams();

  const { data: brandSeries } = useGetBrandSeriesQuery(brandId);

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
    useGetProductsQuery({ brandId, search });

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
    ? brandSeries.filter((series) => series.id === seriesAction.selectedSeries)
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

      <div
        className={`${
          displayedSeries.length > 0 ? "pt-7 max-sm:py-2" : "pt-5 max-sm:pt-0"
        } w-4/5 max-2sm:w-[90%] mx-auto `}
      >
        {/* Search Bar */}
        <div className=" my-2 flex justify-end gap-2 items-center max-sm:my-4 max-sm:justify-center">
          <div className="flex pl-4 items-center border rounded">
            <BsSearch className="text-black" />
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

        <BreadCrumbLinks
          recycle={true}
          brands={{
            link: `/recycle-categories/recycle-brands/${category?.id}`,
            label: `Recycle ${category?.name}`,
          }}
          products={{
            link: ``,
            label: `Recycle ${brand?.name} ${category?.name}`,
            isLast: true,
          }}
        />

        <div className="grid grid-cols-6 max-14inch:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 sm:gap-x-12 sm:gap-y-8 rounded-xl sm:rounded-none ring-0 ring-transparent shadow sm:shadow-none mt-4 sm:mt-0">
          {filteredProducts
            .filter((product) => product.status.toLowerCase() !== "blocked")
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                URL="/recycle-categories/recycle-brands/recycle-productDetails"
              />
            ))}
        </div>
        <RecycleContent heading={false} />
      </div>
    </>
  );
};

export default RecycleProducts;
