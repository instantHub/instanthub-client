import { FC, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@icons";
import { IServiceImageCarouselItem } from "@utils/types";

export interface IImageCarouselProps {
  items: IServiceImageCarouselItem[];
  className?: string;
  autoPlay?: boolean;
  itemsPerView?: number;
}

export const ImageCarousel: FC<IImageCarouselProps> = ({
  items,
  className = "",
  autoPlay = false,
  itemsPerView = 3, // default 3 items visible per slide on desktop
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= items.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0
        ? items.length - itemsPerView
        : prev - itemsPerView
    );
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay]);

  // Determine responsive items per view
  const getResponsiveItems = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return itemsPerView;
  };

  const [responsiveItemsPerView, setResponsiveItemsPerView] = useState(
    getResponsiveItems()
  );

  useEffect(() => {
    const handleResize = () => {
      setResponsiveItemsPerView(getResponsiveItems());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleItems = items.slice(
    currentIndex,
    currentIndex + responsiveItemsPerView
  );

  return (
    <div className={`relative w-full ${className}`}>
      <div className="overflow-hidden px-4">
        <div className="flex gap-4 transition-transform ease-in-out duration-500">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="flex-1 min-w-0 rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="font-semibold text-base">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ArrowRightIcon className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};
