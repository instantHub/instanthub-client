import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "@api";

export const Categories = () => {
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  return (
    <div className="w-4/5 max-sm:w-[92%] mx-auto">
      <h1 className="text-2xl mb-6 pb-6 max-sm:text-lg">
        Ready to sell?{" "}
        <span className="text-3xl text-secondary font-semibold max-sm:text-xl">
          Let's turn your gadgets into cash!
        </span>
      </h1>

      {/* Ensuring Layout Stability */}
      <div
        className="grid grid-cols-6 gap-x-2 gap-y-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-3 w-full mx-auto items-center justify-center text-center relative"
        style={{ minHeight: "150px" }} // Prevent layout shift
      >
        {categoriesLoading ? (
          <>
            {/* Skeleton Loaders for Placeholder */}
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="w-32 h-32 max-sm:w-24 max-sm:h-24 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </>
        ) : (
          <>
            {categories?.map((item) => (
              <div className="flex justify-center" key={item.id}>
                <Link
                  to={`${localStorage.getItem("location")}/${item.uniqueURL}`}
                  className={`p-4 flex bg-white cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl 
                              transition ease-in-out duration-500 w-32 h-32 max-sm:w-24 max-sm:h-24
                            }`}
                >
                  <img
                    src={import.meta.env.VITE_APP_BASE_URL + item?.image}
                    alt={item?.name || "Item"}
                    className="justify-center"
                    loading="lazy" // Native lazy loading
                  />
                </Link>
              </div>
            ))}

            {/* RECYCLE Category */}
            <div className="flex justify-center">
              <Link
                to={`/recycle/categories`}
                className="w-32 h-32 max-sm:w-24 p-4 max-sm:h-24 flex bg-white cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
              >
                <img
                  src="/images/recycle1.png"
                  alt="Recycle"
                  className="w-full h-full object-contain"
                  width="128"
                  height="128" // Explicit height to prevent CLS
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
