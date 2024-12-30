import React, { useState, useEffect } from "react";
import { RxDotFilled } from "react-icons/rx";
import { useGetActiveSlidersListQuery } from "../features/api";
import Loading from "./Loading";

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
      // className="max-w-[1400px] w-full h-auto mx-auto mt-10 max-sm:mt-7
      className="max-w-[1400px] w-full h-auto mx-auto mt- max-sm:mt-
          group max-lg:px-2
          max-sm:px-2
          max-14inch:px-24"
    >
      {/* Slider Image */}
      <div>
        <img
          src={`${baseURL}${slidersData[currentIndex]?.image}`}
          alt={`Banner ${currentIndex + 1}`}
          className="w-full h-auto bg-cover bg-center rounded-lg max-sm:h-[110px] "
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
