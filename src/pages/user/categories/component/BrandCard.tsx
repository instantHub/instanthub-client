import { IBrandLite } from "@features/api/brands/types";
import { FC, memo } from "react";
import { Link } from "react-router-dom";

interface IBrandCard {
  brand: IBrandLite;
  selectedBrand: string;
  handleBrandSelect: (id: string) => void;
}
export const BrandCard: FC<IBrandCard> = memo(
  ({ brand, selectedBrand, handleBrandSelect }) => {
    return (
      <div
        onClick={() => handleBrandSelect(brand.id)}
        className={`rounded-xl border transition-all duration-200 ${
          selectedBrand === brand.id
            ? "bg-instant-mid text-white border-instant-mid"
            : "bg-white text-gray-700 border-gray-200 hover:border-instant-mid hover:bg-instant-mid"
        }`}
      >
        <Link to={`${brand.uniqueURL}`}>
          <div className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white p-2 sm:p-4 sm:min-w-full rounded-0 rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
            <img
              src={`${import.meta.env.VITE_APP_BASE_URL}${brand?.image}`}
              alt="Product"
              className="w-[45px] h-[45px]"
              loading="lazy"
            />
          </div>
        </Link>
      </div>
    );
  }
);
