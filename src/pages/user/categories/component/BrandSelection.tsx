import { ICategoryResponse } from "@features/api/categoriesApi/types";
import { FC, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandCard } from "./BrandCard";
import { ArrowRightIcon } from "@icons";

interface IBrandSelection {
  category: ICategoryResponse;
}
export const BrandSelection: FC<IBrandSelection> = memo(({ category }) => {
  const navigate = useNavigate();

  const [selectedBrand, setSelectedBrand] = useState("");

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  const handleNavigate = (): void => {
    navigate("brands");
  };

  return (
    <div className="text-center lg:text-left">
      <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
        <div className="h-px bg-gray-300 flex-1 max-w-20"></div>
        <span className="text-gray-600 font-medium">Or choose a brand</span>
        <div className="h-px bg-gray-300 flex-1 max-w-20"></div>
      </div>

      <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
        {category?.brands?.slice(0, 4).map((brand) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            selectedBrand={selectedBrand}
            handleBrandSelect={handleBrandSelect}
          />
        ))}
      </div>

      {category && category?.brands?.length > 4 && (
        <button
          onClick={handleNavigate}
          className="text-instant-mid hover:text-teal-700 font-medium flex items-center gap-1 mx-auto lg:mx-0"
        >
          More Brands
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
});

// className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
//   selectedBrand === brand.id
//     ? "bg-teal-500 text-white border-teal-500"
//     : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
// }`}
