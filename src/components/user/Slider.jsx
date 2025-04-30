// BEST IN PERFORMANCE IN LIGHTHOUSE
import React, { useState, useEffect, useMemo, useRef } from "react";
import { RxDotFilled } from "react-icons/rx";
import { useGetActiveSlidersListQuery } from "../../features/api";
import Loading from "./loader/Loading";

function Slider() {
  const { data: slidersData = [], isLoading: slidersLoading } =
    useGetActiveSlidersListQuery(); // Default to empty array

  const [currentIndex, setCurrentIndex] = useState(0);
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const intervalRef = useRef(null);

  // Precompute all image URLs once
  const imageUrls = useMemo(
    () => slidersData.map((slider) => `${baseURL}${slider.image}`),
    [slidersData]
  );

  // Preload all images
  useEffect(() => {
    if (imageUrls.length > 0) {
      imageUrls.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [imageUrls]);

  // Auto-slide functionality
  useEffect(() => {
    if (imageUrls.length <= 1) return; // Skip auto-sliding for a single image

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
  }, [imageUrls]);

  // if (slidersLoading) return <Loading />; // Show loader while fetching data
  // if (imageUrls.length === 0) return null; // Return nothing if no slides

  return (
    <>
      {/* <div className="max-w-[1400px] w-full h-auto mx-auto group max-lg:px-2 max-sm:px-2 max-14inch:px-24">
        {/* Main Slider Image 
        <div>
          <img
            src={imageUrls[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            width="1920"
            height="600"
            className="w-full h-auto bg-cover bg-center rounded-lg max-sm:h-[110px]"
          />
        </div>

       Dots Navigation 
        {imageUrls.length > 1 && (
          <div className="flex justify-center py-2">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`text-2xl cursor-pointer transition-colors duration-300 ${
                  index === currentIndex ? "text-secondary" : "text-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <RxDotFilled />
              </button>
            ))}
          </div>
        )}
      </div> */}

      {/* Ensuring Layout Stability */}
      <div
        className="max-w-[1400px] w-full h-auto mx-auto group max-lg:px-2 max-sm:px-2 max-14inch:px-24"
        style={{ minHeight: "150px" }} // Prevent layout shift
      >
        {slidersLoading ? (
          <>
            {/* Skeleton Image */}
            <div className="w-full h-[400px] max-sm:h-[110px] bg-gray-300 animate-pulse rounded-lg"></div>

            {/* Skeleton Dots Navigation */}
            <div className="flex justify-center py-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-gray-300 rounded-full mx-1 animate-pulse"
                ></div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Main Slider Image */}
            <div>
              <img
                src={imageUrls[currentIndex]}
                alt={`Banner ${currentIndex + 1}`}
                width="1920"
                height="600"
                className="w-full h-auto bg-cover bg-center rounded-lg max-sm:h-[110px]"
              />
            </div>

            {/* Dots Navigation */}
            {imageUrls.length > 1 && (
              <div className="flex justify-center py-2">
                {imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`text-2xl cursor-pointer transition-colors duration-300 ${
                      index === currentIndex
                        ? "text-secondary"
                        : "text-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <RxDotFilled />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Slider;
