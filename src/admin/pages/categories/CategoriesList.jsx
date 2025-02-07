import React from "react";
import { useGetCategoryQuery } from "../../../features/api/categories/categoriesApi";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CategoriesList = () => {
  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoryQuery();

  if (!categoryDataLoading) {
    console.log(categoryData);
  }

  return (
    <div className="p-4 max-sm:p-2 max-sm:text-sm">
      <div className="flex justify-between">
        <h2 className="text-black text-lg font-bold mb-4 max-sm:text-sm">
          Categories List
        </h2>
        <div>
          <Link to={"/admin/add-category"}>
            <button className="bg-blue-700 text-white text-lg max-sm:text-xs px-2 py-1 rounded">
              Create Category
            </button>
          </Link>
        </div>
      </div>

      {!categoryDataLoading && (
        <div className="w-fit grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 max-sm:gap-3">
          {categoryData.map((cat) => (
            <CategoryCard key={cat?.id} data={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
