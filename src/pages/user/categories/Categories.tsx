import { Link, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "@api";
import { ICategoryResponse } from "@features/api/categories/types";

export const Categories = () => {
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const navigate = useNavigate();

  const handleNavigate = (category: ICategoryResponse): void => {
    navigate(`${category.uniqueURL}`, {
      state: { categoryId: category.id },
    });
  };

  return (
    <div className="w-4/5 max-sm:w-[92%] mx-auto">
      <h1 className="text-2xl mb-6 pb-6 max-sm:text-lg">
        Ready to sell?{" "}
        <span className="text-3xl text-secondary font-semibold max-sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-instant-mid to-instant-start">
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
            {categories?.map((category) => (
              <div className="flex justify-center" key={category.id}>
                <button
                  onClick={() => handleNavigate(category)}
                  className={`p-4 flex bg-white cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl 
                              transition ease-in-out duration-500 w-32 h-32 max-sm:w-24 max-sm:h-24
                            }`}
                >
                  <img
                    src={import.meta.env.VITE_APP_BASE_URL + category?.image}
                    alt={category?.name || "Item"}
                    className="justify-center"
                    loading="lazy"
                  />
                </button>
              </div>
            ))}

            {/* RECYCLE Category */}
            <div className="flex justify-center">
              <Link
                to={`/recycle/categories`}
                className="w-32 h-32 max-sm:w-24 p-4 max-sm:h-24 flex bg-white cursor-pointer border border-instant-mid rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
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
