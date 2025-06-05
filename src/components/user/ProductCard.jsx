import { Link } from "react-router-dom";

export const ProductCard = ({ product, URL }) => (
  <div className="flex items-center justify-center max-h-44 sm:max-h-56 sm:rounded-lg border-b border-r border-solid sm:border-0 max-14inch:">
    {/* <Link to={`${URL}/${product.id}`} className="w-full h-full"> */}
    <Link to={`${URL}`} className="w-full h-full">
      <div className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white p-2 sm:p-4 sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
        <div className="flex horizontal w-28 h-28 items-center justify-center max-sm:w-24 max-sm:h-20">
          <img
            src={`${import.meta.env.VITE_APP_BASE_URL}${product.image}`}
            alt="Product"
            className="w-[105px] h-[105px] max-sm:w-20 max-sm:h-20"
            loading="lazy" // Native lazy loading
          />
        </div>
        <span className="text-center mt-1 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
          <div className="text-[12px] font-[500] leading-2 max-sm:text-[11px]">
            {product.name}
          </div>
        </span>
      </div>
    </Link>
  </div>
);
