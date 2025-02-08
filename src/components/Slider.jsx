// import React, { useState, useEffect } from "react";
// import { RxDotFilled } from "react-icons/rx";
// import { useGetActiveSlidersListQuery } from "../features/api";
// import Loading from "./loader/Loading";
// import LazyImage from "./LazyImage";

// function Slider() {
//   const { data: slidersData = [], isLoading: slidersLoading } =
//     useGetActiveSlidersListQuery(); // Default to empty array

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const baseURL = import.meta.env.VITE_APP_BASE_URL;

//   const goToNextSlide = () => {
//     if (slidersData.length <= 1) return; // Prevent sliding if there's only one slide
//     const isLastSlide = currentIndex === slidersData.length - 1;
//     setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
//   };

//   // Preload the LCP image
//   useEffect(() => {
//     if (slidersData.length > 0) {
//       const lcpImage = `${baseURL}${slidersData[0]?.image}`;
//       const link = document.createElement("link");
//       link.rel = "preload";
//       link.as = "image";
//       link.href = lcpImage;
//       document.head.appendChild(link);
//       return () => document.head.removeChild(link);
//     }
//   }, [slidersData]);

//   useEffect(() => {
//     if (slidersData.length > 1) {
//       const intervalId = setInterval(goToNextSlide, 4000);
//       return () => clearInterval(intervalId); // Clean up the interval
//     }
//   }, [currentIndex, slidersData]);

//   if (slidersLoading || slidersData.length === 0) {
//     return <Loading />; // Fallback UI when loading or no sliders are available
//   }

//   return (
//     <div
//       className="max-w-[1400px] w-full h-auto mx-auto mt- max-sm:mt-
//           group max-lg:px-2
//           max-sm:px-2
//           max-14inch:px-24"
//     >
//       {/* Slider Image */}
//       <div>
//         {/* Avoid loading="lazy" for above-the-fold content (like banners). Lazy loading defers loading until the user scrolls,
//               but the banner needs to load immediately for a good LCP score. */}
//         <img
//           src={`${baseURL}${slidersData[currentIndex]?.image}`}
//           alt={`Banner ${currentIndex + 1}`}
//           width="1920"
//           height="600"
//           className="w-full h-auto bg-cover bg-center rounded-lg max-sm:h-[110px] "
//           // loading="lazy" // Native lazy loading
//           // No lazy loading for LCP image
//         />
//       </div>

//       {/* Dots */}
//       {slidersData.length > 1 && (
//         <div className="flex top-4 justify-center py-2">
//           {slidersData.map((_, index) => (
//             <div
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`text-2xl cursor-pointer ${
//                 index === currentIndex ? "text-secondary" : "text-gray-500"
//               }`}
//             >
//               <RxDotFilled />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Slider;

// CHAT GPT CODE #1
// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { RxDotFilled } from "react-icons/rx";
// import { useGetActiveSlidersListQuery } from "../features/api";
// import Loading from "./loader/Loading";

// function Slider() {
//   const { data: slidersData = [], isLoading: slidersLoading } =
//     useGetActiveSlidersListQuery(); // Default to empty array

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const baseURL = import.meta.env.VITE_APP_BASE_URL;
//   const intervalRef = useRef(null);

//   // Compute the LCP image URL once when data updates
//   const lcpImageUrl = useMemo(
//     () => (slidersData.length > 0 ? `${baseURL}${slidersData[0].image}` : ""),
//     [slidersData]
//   );

//   // Preload LCP image
//   useEffect(() => {
//     if (lcpImageUrl) {
//       const link = document.createElement("link");
//       link.rel = "preload";
//       link.as = "image";
//       link.href = lcpImageUrl;
//       document.head.appendChild(link);
//       return () => document.head.removeChild(link);
//     }
//   }, [lcpImageUrl]);

//   // Auto-slide functionality
//   useEffect(() => {
//     if (slidersData.length <= 1) return; // Skip auto-sliding for single image

//     intervalRef.current = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === slidersData.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 4000);

//     return () => clearInterval(intervalRef.current); // Cleanup
//   }, [slidersData]);

//   if (slidersLoading) return <Loading />; // Show loader while fetching data
//   if (slidersData.length === 0) return null; // Return nothing if no slides

//   return (
//     <div className="max-w-[1400px] w-full h-auto mx-auto group max-lg:px-2 max-sm:px-2 max-14inch:px-24">
//       {/* Main Slider Image */}
//       <div>
//         <img
//           src={`${baseURL}${slidersData[currentIndex].image}`}
//           alt={`Banner ${currentIndex + 1}`}
//           width="1920"
//           height="600"
//           className="w-full h-auto bg-cover bg-center rounded-lg max-sm:h-[110px]"
//         />
//       </div>

//       {/* Dots Navigation */}
//       {slidersData.length > 1 && (
//         <div className="flex justify-center py-2">
//           {slidersData.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`text-2xl cursor-pointer transition-colors duration-300 ${
//                 index === currentIndex ? "text-secondary" : "text-gray-500"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             >
//               <RxDotFilled />
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Slider;

// BEST IN PERFORMANCE IN LIGHTHOUSE
import React, { useState, useEffect, useMemo, useRef } from "react";
import { RxDotFilled } from "react-icons/rx";
import { useGetActiveSlidersListQuery } from "../features/api";
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

  if (slidersLoading) return <Loading />; // Show loader while fetching data
  if (imageUrls.length === 0) return null; // Return nothing if no slides

  return (
    <div className="max-w-[1400px] w-full h-auto mx-auto group max-lg:px-2 max-sm:px-2 max-14inch:px-24">
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
                index === currentIndex ? "text-secondary" : "text-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <RxDotFilled />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
