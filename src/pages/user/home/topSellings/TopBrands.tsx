import { FlexBox, Typography } from "@components/general";
import { IBrandResponse } from "@features/api/brands/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@icons";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ITopBrand {
  totalSold: number;
  brand: IBrandResponse;
}

interface ITopBrandsProps {
  brands: ITopBrand[];
}

export const TopBrands: FC<ITopBrandsProps> = ({ brands }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const navigate = useNavigate();

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 280;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 280;
      scrollContainerRef.current.scrollBy({
        left: cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  const handleBrandClick = (brand: ITopBrand["brand"]) => {
    navigate(`${brand?.category?.uniqueURL}/${brand?.uniqueURL}`);
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  return (
    <div className="w-full bg-instant-mid/10 rounded-none sm:rounded-xl py-8 sm:py-12">
      <div className="max-w- mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="text-center mb-5">
          <Typography variant="h2">Top Selling Brands</Typography>
          <Typography variant="h5" className="text-instant-mid">
            Discover amazing products from top brands around the world
          </Typography>
        </div>

        {/* Carousel */}
        <div className="relative px-2 sm:px-20">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute -left-2 sm:left-10 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-200 ${
              canScrollLeft
                ? "bg-white hover:bg-gray-50 text-gray-800 hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <ArrowLeftIcon size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute -right-2 sm:right-10 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-200 ${
              canScrollRight
                ? "bg-white hover:bg-gray-50 text-gray-800 hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ArrowRightIcon size={24} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 px-1 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {brands?.map(({ brand, totalSold }) => (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                className="flex-shrink-0 w-40 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
              >
                <div className="p-4">
                  {/* Brand Image */}
                  <FlexBox className="justify-center mb-2">
                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URL}${brand.image}`}
                      alt={brand.name}
                      className="w-[75px] h-[75px] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </FlexBox>

                  {/* Brand Info */}
                  <div className="text-center">
                    <p className="text-sm font-semibold">
                      {brand.category.name}
                    </p>
                    {/* <p className="text-xs text-gray-500 mb-1">
                      {totalSold} sold
                    </p> */}
                    <div className="inline-flex items-center text-instant-start/70 font-medium text-xs group-hover:text-instant-start transition-colors duration-200">
                      View Products
                      <ArrowRightIcon
                        size={16}
                        className="ml-1 group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(brands?.length / 3) }).map(
            (_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors duration-200"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
