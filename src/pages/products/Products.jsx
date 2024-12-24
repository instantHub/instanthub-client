import React, { useEffect, useMemo, useState } from "react";
import {
  useGetProductsQuery,
  useGetBrandSeriesQuery,
} from "../../features/api";
import { useParams, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard";
import SellContent from "../../components/SellContent";

const Products = () => {
  const { brandId } = useParams();

  const { data: brandSeries, isLoading: seriesLoading } =
    useGetBrandSeriesQuery(brandId);

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

  // console.log(brand);

  const displayedSeries = seriesAction.showSeries
    ? brandSeries.filter((series) => series.id === seriesAction.selectedSeries)
    : brandSeries;

  // if (seriesLoading || displayedSeries.length === 0) return null;

  const filteredProducts = seriesAction.showSeries
    ? productsData?.filter(
        (product) => product.series === seriesAction.selectedSeries
      )
    : productsData;

  // if (productsData?.length === 0)
  //   return (
  //     <div className="flex items-center justify-center w-full h-dvh">
  //       <h1>Not Available</h1>
  //     </div>
  //   );

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
      <div className={`${displayedSeries?.length > 0 ? "mt-10" : "mt-0"}`}>
        <div className="mx-10 grid grid-cols-8 max-md:grid-cols-4 max-sm:grid-cols-3 sm:gap-x-2 sm:gap-y-2 rounded sm:rounded-none ring-0 ring-transparent shadow sm:shadow-none mt-4 sm:mt-0">
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

      {/* <div className="mt-5 w-4/5 max-sm:w-[90%] mx-auto"> */}
      <div className="mt-5 w-[90%] max-sm:w-[90%] mx-auto">
        {/* Search Bar */}
        <div className=" my-2 flex justify-end gap-2 items-center max-sm:my-4 max-sm:justify-center">
          <div className="flex items-center gap-1 px-2 border rounded-md">
            <BsSearch className="text-gray-700 text-sm" />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search a product"
              className="px-2 text-sm py-1 outline-none"
              // onChange={(e) => setSearch(e.target.value)}
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

        {/* Home > Cat > Brand */}
        <div className="mx-0 mb-6 text-lg max-sm:text-sm">
          <div className="flex items-center gap-1">
            <h2 className="flex items-center opacity-60 gap-1">
              <Link to={"/"}>Home</Link>
              <FaAngleRight />
              <Link to={`/categories/brands/${category?.id}`}>
                {category?.name}
              </Link>
              <FaAngleRight />
            </h2>
            {brand?.name}
          </div>
          <hr className="text-black mt-1" />
        </div>

        <div className="grid grid-cols-6 max-14inch:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 sm:gap-x-12 sm:gap-y-8 rounded-xl sm:rounded-none ring-0 ring-transparent shadow sm:shadow-none mt-4 sm:mt-0">
          {filteredProducts.filter(
            (product) => product.status.toLowerCase() !== "blocked"
          ).length === 0 && (
            <div className="flex items-center justify-center">
              <h1>{brand?.name} Products Not Available</h1>
            </div>
          )}

          {filteredProducts
            .filter((product) => product.status.toLowerCase() !== "blocked")
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                URL="/categories/brands/productDetails"
              />
            ))}
        </div>

        <SellContent />
      </div>
    </>
  );
};

export default Products;

const SeriesButton = ({ series, isSelected, onClick }) => (
  <div
    key={series.id}
    className="relative col-span-1 max-h-44 sm:max-h-56 sm:rounded border-b border-r border-solid sm:border-0 max-sm:border-gray-300"
  >
    <button onClick={onClick} className="w-full h-full">
      <div
        className={`${
          isSelected ? "bg-cyan-500 text-white" : "bg-gray-200 max-sm:bg-white"
        } flex flex-col items-center justify-center cursor-pointer w-full h-full p-2 sm:p-2 sm:min-w-full rounded sm:rounded-md sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500`}
      >
        <span className="text-center mt-2 flex-1 line-clamp-3 flex items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
          <div className="text-[14px] font-[500] leading-7">{series.name}</div>
        </span>
      </div>
    </button>
    {isSelected && (
      <button onClick={onClick} className="absolute top-1 right-1 text-white">
        <FaTimes />
      </button>
    )}
  </div>
);
