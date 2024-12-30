import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBrandQuery } from "../../features/api";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading";
import ItemGrid from "../../components/ItemGrid";
import SellContent from "../../components/SellContent";

const Brands = () => {
  const { catId } = useParams();

  const [category, setCategory] = useState(null);
  const { data: brands = [], isLoading: brandsLoading } =
    useGetBrandQuery(catId);
  // console.log("brands", brands);

  useEffect(() => {
    if (!brandsLoading) setCategory(brands[0]?.category);
  }, [brands]);

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${category?.name}s | InstantHub`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content={`Sell ${
            category?.name
          } on Instant Hub, Instant Hub, instant hub, instanthub, Instant Pick, InstantHub, sell ${category?.name.toLowerCase()} on instanthub`}
        />
        <link rel="canonical" href={`https://www.instanthub.in/${catId}`} />
      </Helmet>

      <div className="mt-8 w-4/5 max-sm:w-[90%] mx-auto">
        <h1 className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
          {/* Sell your {category?.name} for Instant Cash */}
          Sell your {category?.name} for Instant Cash
        </h1>

        <div className="mb-6 text-lg max-sm:text-sm">
          {!brandsLoading && (
            <div className="flex items-center gap-1">
              <h2 className="flex items-center opacity-60 gap-1">
                <Link to="/">Home</Link>
                <FaAngleRight />
              </h2>
              <span>{category?.name}</span>
            </div>
          )}
          <hr className="text-black mt-1" />
        </div>

        {brandsLoading ? (
          <Loading />
        ) : (
          // <div className="grid grid-cols-8 gap-y-5 max-lg:grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3 max-2sm:grid-cols-2">
          <div className="grid grid-cols-8 gap-y-5 max-lg:grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3">
            {brands?.length > 0 ? (
              // brands?.map((brand) => (
              //   <div key={brand.id} className="flex justify-center">
              //     <Link to={`/categories/brands/products/${brand.id}`}>
              //       <div className="w-28 p-4 h-28 flex cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500">
              //         <img
              //           src={`${import.meta.env.VITE_APP_BASE_URL}${
              //             brand.image
              //           }`}
              //           alt={brand.name}
              //           className="items-center justify-center"
              //         />
              //       </div>
              //     </Link>
              //   </div>
              // ))
              <ItemGrid
                items={brands}
                linkPath="/categories/brands/products"
                displayBig={false}
              />
            ) : (
              <h2>No Data Available</h2>
            )}
          </div>
        )}

        <SellContent />
      </div>
    </>
  );
};

export default Brands;
