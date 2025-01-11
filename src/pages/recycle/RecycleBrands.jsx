import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetBrandQuery } from "../../features/api";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading";
import ItemGrid from "../../components/ItemGrid";
import RecycleContent from "./RecycleContent";

const RecycleBrands = () => {
  const { catId } = useParams();
  // console.log("catID", catId);

  const [category, setCategory] = useState(null);
  const { data: brands = [], isLoading: brandsLoading } =
    useGetBrandQuery(catId);
  // console.log("brands", brands);

  useEffect(() => {
    if (!brandsLoading) setCategory(brands[0].category);
  }, [brands]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${category?.name}s | InstantHub`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantHub on recycling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content={`Recycle ${category?.name} on Instant Hub, Recycle on Instant Hub, recycle on instant hub, recycle mobile, recycle laptop, recycle mobiles on instanthub`}
        />
        <link
          rel="canonical"
          href={`https://www.instanthub.in/recycle-categories/recycle-brands/${catId}`}
        />
      </Helmet>
      {/* <div className="mt-8 w-4/5 mx-auto"> */}
      <div className="pt-10 w-4/5 max-2sm:w-[90%] mx-auto">
        <p className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
          Recycle your {category?.name} to recycle and get Instant Cash
        </p>
        <div className="mx-0 mb-6">
          {!brandsLoading && (
            <div className="flex items-center gap-1 max-2sm:text-xs">
              <h2 className="flex items-center opacity-60 gap-1">
                <Link to={"/"}>Home</Link>
                <FaAngleRight />
                <Link to={"/recycle-categories"}>Recycle</Link>
                <FaAngleRight />
                <span className="font-semibold">Recycle {category?.name}</span>
              </h2>
            </div>
          )}
          <hr className="text-black mt-1" />
        </div>

        {brandsLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-7 gap-y-5 max-lg:grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3">
            {brands?.length > 0 ? (
              <ItemGrid
                items={brands}
                linkPath="/recycle-categories/recycle-brands/recycle-products"
                displayBig={false}
              />
            ) : (
              <h2>No Data Available</h2>
            )}
          </div>
        )}

        <RecycleContent heading={false} />
      </div>
    </>
  );
};

export default RecycleBrands;
