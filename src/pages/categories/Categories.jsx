import React from "react";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../features/api";
import Loading from "../../components/Loading";
import ItemGrid from "../../components/ItemGrid";

const Categories = () => {
  const { data: categories, categoriesLoading: categoriesLoading } =
    useGetCategoryQuery();

  return (
    // <div className="mt-10 max-sm:mt-5 mx-auto">
    <div className="w-full mx-auto">
      <div className="w-4/5 max-sm:w-[92%] mx-auto">
        <div className="mx-0 mb-6">
          <h1 className="text-2xl pb-6 max-sm:text-lg">
            Ready to sell?{" "}
            <span className="text-3xl text-secondary font-semibold max-sm:text-xl">
              Let's turn your gadgets into cash!
            </span>
          </h1>
          {/* <hr className="text-black mt-1" /> */}
        </div>

        {categoriesLoading ? (
          <Loading />
        ) : (
          // <div className="grid grid-cols-6 gap-x-2 gap-y-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 w-full mx-auto items-center justify-center text-center relative">
          <div className="grid grid-cols-6 gap-x-2 gap-y-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-3 w-full mx-auto items-center justify-center text-center relative">
            <ItemGrid
              items={categories}
              linkPath="/categories/brands"
              displayBig={true}
            />

            {/* RECYCLE */}
            <div className="flex justify-center">
              <Link
                to={`/recycle-categories`}
                className="w-32 p-4 h-32 max-sm:w-24 max-sm:h-24 flex bg-white cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
              >
                <img
                  src="/images/recycle1.png"
                  alt="CAT"
                  className="justify-center"
                />
                {/* <p className="size-4 pt-1">Recyle</p> */}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* <div className="mt-16 pt-8 pb-16 bg-secondary-light px-[10%]">
        <AllBrandsList />
      </div> */}
    </div>
  );
};

export default Categories;
