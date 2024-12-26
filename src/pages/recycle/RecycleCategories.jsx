import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../features/api";
import AllBrandsList from "../brands/AllBrandsList";
import { Helmet } from "react-helmet-async";
import ItemGrid from "../../components/ItemGrid";
import Loading from "../../components/Loading";
import RecycleContent from "./RecycleContent";

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
    url: "https://www.instanthub.in/recycle-categories",
    name: "InstantHub",
    description:
      "Get instant cash payments with InstantHub on recycling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.instanthub.in/recycle-categories",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Helmet>
        <title>{`Recycle | InstantHub`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantHub on recycling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content={`Recycle on Instant Hub, recycle on instant hub, recycle on instanthub, recycle mobile, recycle laptop, recycle mobiles on instanthub`}
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link
          rel="canonical"
          href="https://www.instanthub.in/recycle-categories"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="pt-10 mx-auto">
        <div className="w-full mx-auto">
          <div className="w-5/6 max-sm:text-center mx-auto mb-6">
            <h1 className="text-2xl pb-6 max-sm:text-lg">
              Ready to recycle?{" "}
              <span className="text-3xl text-cyan-500 font-semibold max-sm:text-xl">
                Let's recycle your gadgets!
              </span>
            </h1>

            {/* <hr className="text-black mt-1" /> */}
          </div>

          <div className="bg-[url('/images/recycle1.png')] w-full h-full"></div>

          {categoriesLoading ? (
            <Loading />
          ) : (
            // <div className="flex flex-wrap justify-evenly gap-6 bg-[url('/images/recycle1.png')] bg-center bg-no-repeat min-h-[400px] max-sm:min-h-[300px]">
            <div className="flex flex-wrap justify-evenly gap-6 bg-[url('/images/recycle1.png')] bg-contain bg-center bg-no-repeat my-10">
              <ItemGrid
                items={filteredCategories}
                linkPath="/recycle-categories/recycle-brands"
                displayBig={true}
              />
            </div>
          )}

          <RecycleContent heading={true} />
        </div>
      </div>
    </>
  );
};

export default RecycleCategories;
