import React, { useEffect, useState } from "react";
import { useGetCategoryQuery } from "@features/api/categories/categoriesApi";
import { Helmet } from "react-helmet-async";
import ItemGrid from "@components/user/ItemGrid";
import Loading from "@components/user/loader/Loading";
import RecycleContent from "@components/user/static/recycleProduct/RecycleContent";

const RecycleCategories = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoryQuery();

  const [filteredCategories, setFilteredCategories] = useState(null);

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

  useEffect(() => {
    if (!categoriesLoading) {
      let filterData = categories.filter(
        (category) =>
          category.name.includes("Mobile") || category.name.includes("Laptop")
      );
      setFilteredCategories(filterData);
    }
  }, [categories]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

      <div className="pt-10 max-sm:pt-5 mx-auto">
        <div className="w-full mx-auto">
          <div className="w-5/6 max-sm:text-center mx-auto mb-6">
            <h1 className="text-2xl pb-6 max-sm:text-lg">
              Ready to recycle?{" "}
              <span className="text-3xl text-secondary font-semibold max-sm:text-xl">
                Let's recycle your gadgets!
              </span>
            </h1>
          </div>

          <div className="bg-[url('/images/recycle1.png')] w-full h-full"></div>

          {categoriesLoading ? (
            <Loading />
          ) : (
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
