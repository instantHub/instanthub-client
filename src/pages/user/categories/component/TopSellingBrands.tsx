import { FlexBox, Typography } from "@components/general";
import { IBrandLite } from "@features/api/brands/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@icons";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../style.css";

interface ITopSellingBrands {
  brands: IBrandLite[];
}

export const TopSellingBrands: FC<ITopSellingBrands> = ({ brands }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const navigate = useNavigate();

  const displayBrands = brands.length > 0 ? brands : brands;

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
      const cardWidth = 280; // w-64 + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 280; // w-64 + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  const handleBrandClick = (brand: IBrandLite) => {
    navigate(`${brand?.uniqueURL}`);
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
    // <div className="w-full bg-secondary-light/50 rounded-none sm:rounded-xl py-8 sm:py-12">
    <div className="w-full max-w-6xl bg-instant-mid/10 rounded-none sm:rounded-xl py-8 sm:py-12">
      <div className="max-w-[410px] mx-auto sm:max-w-6xl md:max-w-3xl lg:max-w-6xl mx-aut px-2 sm:px-4 sm:mx-0">
        {/* Header */}
        <div className="text-center mb-2 sm:mb-5">
          <Typography variant="h2">Top Selling Brands</Typography>

          <Typography variant="h5" className="text-instant-mid">
            Discover amazing products from top brands around the world
          </Typography>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute -left-2 sm:-left-10 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-3 rounded-full shadow-lg transition-all duration-200 ${
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
            className={`absolute -right-4 sm:-right-16 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-3 rounded-full shadow-lg transition-all duration-200 ${
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
            className="flex overflow-x-auto scrollbar-hide gap-2 sm:gap-4 px-3 sm:px-12 py-2 sm:py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayBrands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                className="flex-shrink-0 w-32 p-0 sm:p-0 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
              >
                <div className="p-1 sm:p-3">
                  {/* Brand Image */}
                  <FlexBox className="mb-1 sm:mb-2 overflow-hidden ">
                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URL}${
                        brand?.image
                      }`}
                      alt={brand.name}
                      className="w-[55px] sm:w-[75px] h-[55px] sm:h-[75px] group-hover:scale-105 transition-transform duration-300"
                      // className="w-[70px] h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </FlexBox>

                  {/* Brand Info */}
                  <div className="text-center">
                    {/* <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {brand.name}
                    </h3> */}
                    <p className="text-[11px] sm:text-xs text-gray-500 mb-2">
                      Explore {brand?.name} products
                    </p>

                    {/* CTA Button */}
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
          {Array.from({ length: Math.ceil(displayBrands?.length / 3) }).map(
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
