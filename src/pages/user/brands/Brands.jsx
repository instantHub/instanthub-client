import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetBrandsByCategoryQuery } from "@api";
import { Helmet } from "react-helmet-async";
import {
  Loading,
  Breadcrumbs,
  PageNotFound,
  ServerError,
} from "@components/user";
import SellContent from "@components/user/static/SellContent";

import { slugify } from "@utils/general";

export const Brands = () => {
  const { categoryUniqueURL } = useParams();

  const {
    data: brands = [],
    isLoading: brandsLoading,
    error,
  } = useGetBrandsByCategoryQuery(categoryUniqueURL);

  const [category, setCategory] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = (brand) => {
    const { category } = brand;
    navigate(`/${category.uniqueURL}/${brand.uniqueURL}`);
  };

  useEffect(() => {
    if (!brandsLoading) setCategory(brands[0]?.category);
  }, [brands]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (error && "status" in error && error.status === 404)
    return <PageNotFound />;

  if (error && "status" in error && error.status === 500)
    return <ServerError />;

  if (brandsLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{category?.metaTitle || category?.name}</title>
        <meta name="description" content={category?.metaDescription} />
        <meta name="keywords" content={category?.metaKeywords.join(", ")} />
        <link rel="canonical" href={category?.canonicalUrl} />
      </Helmet>

      <div className="pt-8 max-sm:pt-5 w-4/5 max-sm:w-[90%] mx-auto">
        <h1 className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
          Sell your {category?.name} for Instant Cash asknaskdnj
        </h1>

        <Breadcrumbs />

        <div className="grid grid-cols-8 gap-y-5 max-lg:grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3">
          {brands?.length > 0 ? (
            brands?.map((brand) => (
              <div className="flex justify-center" key={brand.id}>
                <button
                  onClick={() => handleNavigate(brand)}
                  className={`p-4 flex bg-white cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl 
                              transition ease-in-out duration-500 w-32 h-32 max-sm:w-24 max-sm:h-24`}
                >
                  <img
                    src={import.meta.env.VITE_APP_BASE_URL + brand?.image}
                    alt={brand?.name || "Item"}
                    className="justify-center"
                    loading="lazy"
                  />
                </button>
              </div>
            ))
          ) : (
            <h2>No Data Available</h2>
          )}
        </div>

        <SellContent />
      </div>
    </>
  );
};
