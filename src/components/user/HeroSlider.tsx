import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useGetActiveSlidersListQuery } from "@api";

export function HeroSlider() {
  const { data: slidersData = [], isLoading: slidersLoading } =
    useGetActiveSlidersListQuery();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState<"left" | "right">("right");
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null); // ✅ Fixed type
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Precompute all image URLs once
  const imageUrls = useMemo(
    () => slidersData.map((slider) => `${baseURL}/${slider.image}`),
    [slidersData, baseURL]
  );

  // Preload images progressively (current + next)
  useEffect(() => {
    if (imageUrls.length === 0) return;

    const preloadImage = (index: number) => {
      if (loadedImages.has(index)) return;

      const img = new Image();
      img.src = imageUrls[index];
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(index));
      };
    };

    // Preload current image
    preloadImage(currentIndex);

    // Preload next image
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    preloadImage(nextIndex);

    // Preload previous image
    const prevIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    preloadImage(prevIndex);
  }, [currentIndex, imageUrls, loadedImages]);

  // Auto-slide functionality with proper cleanup
  useEffect(() => {
    if (imageUrls.length <= 1) return;

    const startAutoSlide = () => {
      // Clear existing interval
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }

      // Start new interval
      intervalRef.current = setTimeout(() => {
        handleNext();
      }, 5000);
    };

    startAutoSlide();

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentIndex, imageUrls.length]); // ✅ Added currentIndex dependency

  const handleNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  }, [imageUrls.length]);

  const handlePrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  }, [imageUrls.length]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? "right" : "left");
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Touch/Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Pause on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (imageUrls.length > 1 && !intervalRef.current) {
      intervalRef.current = setTimeout(() => {
        handleNext();
      }, 5000);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="w-full py-2 md:py-4">
      <div className="max-w-[1400px] mx-auto px-1 md:px-6 lg:px-8">
        {slidersLoading ? (
          <div className="space-y-4">
            {/* Enhanced Skeleton Loader */}
            <div className="relative w-full h-[120px] md:h-[350px] bg-gradient-to-r from-purple-200 via-purple-100 to-blue-200 animate-pulse rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

              {/* Skeleton Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-between px-8">
                <div className="space-y-3">
                  <div className="w-32 h-32 bg-white/50 rounded-2xl" />
                </div>
                <div className="space-y-4 flex-1 max-w-md ml-8">
                  <div className="h-8 bg-white/50 rounded-lg w-3/4" />
                  <div className="h-6 bg-white/50 rounded-lg w-1/2" />
                </div>
              </div>
            </div>

            {/* Skeleton Dots */}
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-2 w-2 bg-purple-200 rounded-full animate-pulse"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        ) : imageUrls.length === 0 ? null : (
          <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Slider Container */}
            <div className="relative w-full h-[110px] md:h-[350px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Images with Slide Animation */}
              <div className="relative w-full h-full">
                {imageUrls.map((url, index) => {
                  const isActive = index === currentIndex;
                  const isPrev =
                    index ===
                    (currentIndex - 1 + imageUrls.length) % imageUrls.length;
                  const isNext =
                    index === (currentIndex + 1) % imageUrls.length;

                  let transformClass = "translate-x-full";
                  if (isActive) transformClass = "translate-x-0";
                  else if (isPrev) transformClass = "-translate-x-full";

                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${transformClass} ${
                        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      {/* Loading State */}
                      {!loadedImages.has(index) && isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
                          <div className="relative">
                            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin animation-delay-150" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Image */}
                      <img
                        src={url}
                        alt={`Instant Hub Banner ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        // className={`w-full h-full max-sm:h-[110px] bg-cover bg-center transition-opacity duration-500 ${
                        //   loadedImages.has(index) ? "opacity-100" : "opacity-0"
                        // }`}
                        className="w-full h-auto bg-cover bg-center rounded-lg max-sm:h-[110px]"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows (Desktop) */}
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg hover:shadow-xl hover:scale-110 max-md:opacity-100"
                    aria-label="Previous slide"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg hover:shadow-xl hover:scale-110 max-md:opacity-100"
                    aria-label="Next slide"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Slide Counter Badge */}
              {imageUrls.length > 1 && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-bold shadow-lg">
                  {currentIndex + 1} / {imageUrls.length}
                </div>
              )}
            </div>

            {/* Modern Dots Navigation */}
            {imageUrls.length > 1 && (
              <div className="flex gap-2 justify-center mt-6">
                {imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`relative h-2 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? "w-8 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50"
                        : "w-2 bg-gray-300 hover:bg-purple-400 hover:w-4"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentIndex ? "true" : "false"}
                  >
                    {/* Animated Progress Bar */}
                    {index === currentIndex && (
                      <span
                        className="absolute inset-0 bg-white/30 rounded-full origin-left animate-progress"
                        key={currentIndex} // Reset animation on slide change
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-progress {
          animation: progress 5s linear;
        }
        
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
      `}</style>
    </section>
  );
}
