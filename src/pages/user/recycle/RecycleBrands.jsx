import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetBrandsByCategoryQuery } from "@api";
import { Helmet } from "react-helmet-async";
import { Loading, RecycleBreadcrumbs } from "@components/user";
import RecycleContent from "@components/user/static/recycleProduct/RecycleContent";
import { ROUTES } from "@routes";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";

export const RecycleBrands = () => {
  const { categoryURL } = useParams();
  console.log("categoryURL", categoryURL);

  const [category, setCategory] = useState(null);
  const { data: brands = [], isLoading: brandsLoading } =
    useGetBrandsByCategoryQuery(categoryURL);
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
          href={`https://www.instanthub.in/recycle/categories/recycle-brands/${categoryURL}`}
        />
      </Helmet>
      <div className="pt-10 max-sm:pt-5 w-4/5 max-2sm:w-[90%] mx-auto">
        <p className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
          Recycle your {category?.name} to recycle and get Instant Cash
        </p>

        {/* RecycleBreadcrumbs Headers */}
        <RecycleBreadcrumbs />

        {brandsLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-7 gap-y-5 max-lg:grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3">
            {brands?.length > 0 ? (
              brands?.map((item) => (
                <div className="flex justify-center" key={item._id}>
                  <Link
                    to={`${generatePathWithParams(
                      ROUTES.user.recycleProducts,
                      item.uniqueURL
                    )}?b=${categoryURL}`}
                    className={`p-4 flex bg-white cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl 
                                          transition ease-in-out duration-500 w-28 h-28 max-sm:w-24 max-sm:h-24`}
                  >
                    <img
                      src={import.meta.env.VITE_APP_BASE_URL + item?.image}
                      alt={item?.name || "Item"}
                      className="justify-center"
                      loading="lazy" // Native lazy loading
                    />
                  </Link>
                </div>
              ))
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
