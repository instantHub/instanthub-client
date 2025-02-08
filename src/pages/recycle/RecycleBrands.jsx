import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetBrandQuery } from "../../features/api";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/loader/Loading";
import ItemGrid from "../../components/ItemGrid";
import RecycleContent from "./RecycleContent";
import BreadCrumbLinks from "../../components/BreadCrumbLinks";

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
      <div className="pt-10 max-sm:pt-5 w-4/5 max-2sm:w-[90%] mx-auto">
        <p className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
          Recycle your {category?.name} to recycle and get Instant Cash
        </p>

        {/* BreadCrumbLinks Headers */}
        <BreadCrumbLinks
          recycle={true}
          brands={{
            link: ``,
            label: `Recycle ${category?.name}`,
            isLast: true,
          }}
        />

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
