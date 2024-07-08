import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetCategoryQuery, useGetBrandQuery } from "../../features/api";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const RecycleBrands = () => {
  const { catId } = useParams();
  console.log("catID", catId);

  const { data: getCategories, isLoading: categoryLoading } =
    useGetCategoryQuery();
  const { data, isLoading } = useGetBrandQuery(catId);
  console.log("brand api data", data);

  // Finding Category Name
  let category = { name: "", id: "" };
  if (!categoryLoading) {
    console.log(getCategories);
    getCategories.map((cat) => {
      if (catId == cat.id) {
        category = { name: cat.name, id: cat.id };
      }
    });
    console.log(category.name);
  }

  // useEffect(() => {});

  return (
    <>
      <Helmet>
        <title>
          {`Sell Old ${!isLoading ? category.name : null}s | InstantCashPick`}
        </title>
        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content={`Sell ${
            !categoryLoading ? category.name : `Mobiles`
          } on Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, sell mobiles on instantcashpick`}
        />
        <link rel="canonical" href={`https://instantcashpick.com/${catId}`} />
      </Helmet>
      {/* <div className="mt-8 w-4/5 mx-auto"> */}
      <div className="pt-10 w-4/5 max-2sm:w-[90%] mx-auto">
        <p className="pb-5 text-2xl font-bold max-sm:text-xl">
          Sell your {!categoryLoading ? category.name : null} to recycle and get
          Instant Cash
        </p>
        <div className="mx-0 mb-6">
          {!isLoading && (
            <div className="flex items-center gap-1 max-2sm:text-xs">
              <h2 className="flex items-center opacity-60 gap-1">
                <Link to={"/"}>Home</Link>
                <FaAngleRight />
                <Link to={"/recycle-categories"}>Recycle</Link>
                <FaAngleRight />
                <span className="font-semibold">Recycle {category.name}</span>
              </h2>
            </div>
          )}
          <hr className="text-black mt-1" />
        </div>

        {isLoading ? (
          // <h1 className="text-5xl text-black opacity-40 mx-auto">Loading...</h1>
          <div className="flex flex-col justify-center items-center h-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex flex-wrap justify-evenly gap-6 bg-[url('/recycle1.png')] bg-center bg-no-repeat min-h-[400px] max-sm:min-h-[300px]">
          {/* <div className="grid grid-cols-6 max-sm:grid-cols-3 max-2sm:grid-cols-2 justify-center gap-6 bg-[url('/recycle1.png')] bg-center bg-no-repeat min-h-[400px] max-sm:min-h-[300px]"> */}
            {!data.length == 0 ? (
              data.map((brand, i) => (
                <Link
                  to={`/recycle-categories/recycle-brands/recycle-products/${brand.id}`}
                  key={i}
                >
                  <div
                    key={i}
                    className="w-28 p-4 h-28 flex cursor-pointer border border-cyan-500 rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
                  >
                    <img
                      src={import.meta.env.VITE_APP_BASE_URL + brand.image}
                      alt="CAT"
                      className="items-center justify-center"
                    />
                  </div>
                </Link>
              ))
            ) : (
              <h1>No Data Available</h1>
            )}
          </div>
        )}

        <div></div>
      </div>
    </>
  );
};

export default RecycleBrands;
