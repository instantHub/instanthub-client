import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBrandQuery } from "@api/brandsApi";
import { Helmet } from "react-helmet-async";
import Loading from "@components/user/loader/Loading";
import ItemGrid from "@components/user/ItemGrid";
import SellContent from "@components/user/static/SellContent";
import BreadCrumbLinks from "@components/user/breadcrumbs/BreadCrumbLinks";

const Brands = () => {
  const { catId } = useParams();

  const [category, setCategory] = useState(null);
  const { data: brands = [], isLoading: brandsLoading } =
    useGetBrandQuery(catId);
  // console.log("brands", brands);

  useEffect(() => {
    if (!brandsLoading) setCategory(brands[0]?.category);
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

      <div className="pt-8 max-sm:pt-5 w-4/5 max-sm:w-[90%] mx-auto">
        <h1 className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
          Sell your {category?.name} for Instant Cash
        </h1>

        {!brandsLoading && (
          <BreadCrumbLinks
            brands={{
              link: ``,
              label: `${category?.name}`,
              isLast: true,
            }}
          />
        )}

        {brandsLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-8 gap-y-5 max-lg:grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3">
            {brands?.length > 0 ? (
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
