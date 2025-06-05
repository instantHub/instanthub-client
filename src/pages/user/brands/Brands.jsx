import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetBrandQuery } from "@api";
import { Helmet } from "react-helmet-async";
import { Loading, Breadcrumbs } from "@components/user";
import SellContent from "@components/user/static/SellContent";

import { slugify } from "@utils/general/slugify";

export const Brands = () => {
  // const { catId } = useParams();
  const { categoryUniqueURL } = useParams();

  const { data: brands = [], isLoading: brandsLoading } =
    useGetBrandQuery(categoryUniqueURL);

  const [category, setCategory] = useState(null);

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
        <link
          rel="canonical"
          href={`https://www.instanthub.in/${categoryUniqueURL}`}
        />
      </Helmet>

      <div className="pt-8 max-sm:pt-5 w-4/5 max-sm:w-[90%] mx-auto">
        <h1 className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
          Sell your {category?.name} for Instant Cash
        </h1>

        <Breadcrumbs />

        {brandsLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-8 gap-y-5 max-lg:grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3">
            {brands?.length > 0 ? (
              brands?.map((item) => (
                <div className="flex justify-center" key={item.id}>
                  <Link
                    // to={`${slugify(item.uniqueURL)}`}
                    to={`${item.uniqueURL}`}
                    className={`p-4 flex bg-white cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl 
                              transition ease-in-out duration-500 ${
                                false
                                  ? `w-32 h-32 max-sm:w-24 max-sm:h-24`
                                  : `w-28 h-28 max-sm:w-24 max-sm:h-24`
                              }`}
                  >
                    <img
                      src={import.meta.env.VITE_APP_BASE_URL + item?.image}
                      alt={item?.name || "Item"}
                      className="justify-center"
                      loading="lazy" // Native lazy loading
                    />
                    {/* Optional: display item name */}
                    {/* <p className="size-4 pt-1">{item?.name}</p> */}
                  </Link>
                </div>
              ))
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
