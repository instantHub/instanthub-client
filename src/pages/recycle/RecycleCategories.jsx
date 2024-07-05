import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../features/api";
import AllBrandsList from "../brands/AllBrandsList";

const RecycleCategories = () => {
  const { data, isLoading } = useGetCategoryQuery();

  const [mobileCat, setMobileCat] = useState("");

  useEffect(() => {
    if (data) {
      const mobile = data.find((d) => d.name.toLowerCase().includes("mobile"));
      console.log(mobile);
      setMobileCat(mobile.id);
    }
  });

  return (
    // <div className="mt-20 mx-auto">
    // <div className="pt-10 h-screen mx-auto bg-[url('/recycle1.png')] bg-cover bg-center bg-no-repeat">
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

        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex flex-wrap justify-evenly gap-6 bg-[url('/recycle1.png')] bg-center bg-no-repeat min-h-[400px] max-sm:min-h-[300px]">
            {data
              .filter(
                (d) =>
                  d.name.toLowerCase().includes("mobile") ||
                  d.name.toLowerCase().includes("laptop")
              )
              .map((category, i) => (
                <Link
                  to={`/recycle-categories/recycle-brands/${category.id}`}
                  key={i}
                >
                  <div
                    key={i}
                    className="w-32 p-4 h-32 flex bg-white cursor-pointer border border-cyan-500 rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
                    // className="w-28 p-4 h-32 flex bg-white cursor-pointer border border-cyan-500 rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
                  >
                    <img
                      src={import.meta.env.VITE_APP_BASE_URL + category.image}
                      alt="CAT"
                      className="justify-center"
                    />
                    {/* <p className="size-4 pt-1">{category.name}</p> */}
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecycleCategories;
