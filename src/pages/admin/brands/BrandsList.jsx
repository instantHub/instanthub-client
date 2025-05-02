import React from "react";
import { useGetCategoryQuery } from "@api/categoriesApi";
import { useGetAllBrandQuery } from "@api/brandsApi";
import { Link } from "react-router-dom";
import { filterCategory } from "@features/adminSlices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import BrandCard from "./BrandCard";
import { ROUTES } from "@routes";

const BrandsList = () => {
  const { data: brandsData, isLoading: brandsLoading } = useGetAllBrandQuery();

  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoryQuery();

  // const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    // setSelectedCategory(e.target.value);
    dispatch(filterCategory({ category: e.target.value, from: "brandsList" }));
  };

  const dispatch = useDispatch();

  const selectedCategory = useSelector(
    (state) => state.filter.brandsList.category
  );

  console.log("selectedCategory", selectedCategory);

  return (
    //Products based on the Category selected
    <div className="p-4 max-sm:p-2 max-sm:text-sm">
      <div className="flex justify-between">
        <h2 className="text-black text-lg max-sm:text-sm font-bold mb-4">
          Brands List
        </h2>
        <div>
          <Link to={ROUTES.admin.createBrand}>
            <button className="bg-blue-700 text-white px-2 py-1 rounded">
              Create Brand
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="condition" className=" mr-2">
          Select Category:
        </label>
        <select
          id="condition"
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="p-2 rounded bg-gray-700 text-white max-sm:p-1"
        >
          <option value="">Select</option>
          {!categoryDataLoading &&
            categoryData?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {!brandsLoading && (
        <div className="w-full grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-5 max-sm:gap-3">
          {brandsData
            .filter((br) => {
              // Return true to include all brands when no category is selected
              if (!selectedCategory) return true;
              else return br.category.id === selectedCategory;
            })
            .map((brand) => (
              <BrandCard key={brand?.id} data={brand} />
            ))}
        </div>
      )}
    </div>
  );
};

export default BrandsList;
