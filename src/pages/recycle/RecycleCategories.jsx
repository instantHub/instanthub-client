import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../features/api";
import AllBrandsList from "../brands/AllBrandsList";
import { Helmet } from "react-helmet-async";
import ItemGrid from "../../components/ItemGrid";
import Loading from "../../components/Loading";

const RecycleCategories = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoryQuery();

  const [filteredCategories, setFilteredCategories] = useState(null);

  useEffect(() => {
    if (!categoriesLoading) {
      let filterData = categories.filter(
        (category) =>
          category.name.includes("Mobile") || category.name.includes("Laptop")
      );
      setFilteredCategories(filterData);
    }
  }, [categories]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://instantcashpick.com/recycle-categories",
    name: "InstantCashPick",
    description:
      "Get instant cash payments with InstantCashPick on recycling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://instantcashpick.com/recycle-categories",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Helmet>
        <title>{`Recycle | InstantCashPick`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick on recycling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content={`Recycle on Instant Cash Pick, Recycle on Instant Cash Pick, recycle on instant cash pick, recycle mobile, recycle laptop, recycle mobiles on instantcashpick`}
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link
          rel="canonical"
          href="https://instantcashpick.com/recycle-categories"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="pt-10 mx-auto">
        <div className="w-4/5 mx-auto">
          <div className="mx-0 mb-6">
            <h1 className="text-2xl pb-6 max-sm:text-lg">
              Ready to recycle?{" "}
              <span className="text-3xl text-cyan-500 font-semibold max-sm:text-xl">
                Let's recycle your gadgets!
              </span>
            </h1>
            {/* <hr className="text-black mt-1" /> */}
          </div>

          {categoriesLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-wrap justify-evenly gap-6 bg-[url('/images/recycle1.png')] bg-center bg-no-repeat min-h-[400px] max-sm:min-h-[300px]">
              <ItemGrid
                items={filteredCategories}
                linkPath="/recycle-categories/recycle-brands"
                displayBig={true}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecycleCategories;
