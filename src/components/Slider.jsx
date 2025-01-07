import React, { useState, useEffect } from "react";
import { RxDotFilled } from "react-icons/rx";
import { useGetActiveSlidersListQuery } from "../features/api";
import Loading from "./Loading";
import LazyImage from "./LazyImage";

function Slider() {
  const { data: slidersData = [], isLoading: slidersLoading } =
    useGetActiveSlidersListQuery(); // Default to empty array

  const [currentIndex, setCurrentIndex] = useState(0);

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const goToNextSlide = () => {
    if (slidersData.length <= 1) return; // Prevent sliding if there's only one slide
    const isLastSlide = currentIndex === slidersData.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  };

  // Preload the LCP image
  useEffect(() => {
    if (slidersData.length > 0) {
      const lcpImage = `${baseURL}${slidersData[0]?.image}`;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = lcpImage;
      document.head.appendChild(link);
      return () => document.head.removeChild(link);
    }
  }, [slidersData]);

  useEffect(() => {
    if (slidersData.length > 1) {
      const intervalId = setInterval(goToNextSlide, 4000);
      return () => clearInterval(intervalId); // Clean up the interval
    }
  }, [currentIndex, slidersData]);

  if (slidersLoading || slidersData.length === 0) {
    return <Loading />; // Fallback UI when loading or no sliders are available
  }

  return (
    <div
      className="max-w-[1400px] w-full h-auto mx-auto mt- max-sm:mt-
          group max-lg:px-2
          max-sm:px-2
          max-14inch:px-24"
    >
      {/* Slider Image */}
      <div>
        {/* Avoid loading="lazy" for above-the-fold content (like banners). Lazy loading defers loading until the user scrolls, 
              but the banner needs to load immediately for a good LCP score. */}
        <img
          src={`${baseURL}${slidersData[currentIndex]?.image}`}
          alt={`Banner ${currentIndex + 1}`}
          width="1920"
          height="600"
          className="w-full h-auto bg-cover bg-center rounded-lg max-sm:h-[110px] "
          // loading="lazy" // Native lazy loading
          // No lazy loading for LCP image
        />
      </div>

      {/* Dots */}
      {slidersData.length > 1 && (
        <div className="flex top-4 justify-center py-2">
          {slidersData.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`text-2xl cursor-pointer ${
                index === currentIndex ? "text-secondary" : "text-gray-500"
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
