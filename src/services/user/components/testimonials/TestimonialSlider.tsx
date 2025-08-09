import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { FlexBox, Typography } from "@components/general";
import { useGetPublicTestimonialsQuery } from "@features/api";
import { ArrowLeftIcon, ArrowRightIcon, AstroIcon } from "@icons";
import { ITestimonial } from "@utils/types";

interface ITestimonialSliderProps {
  data: ITestimonial[];
  children?: ReactNode;
}

export const TestimonialSlider: FC<ITestimonialSliderProps> = ({
  data,
  children,
}) => {
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [data.length, isAutoPlaying]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const currentCard = testimonialRefs.current[currentIndex];

    if (container && currentCard) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = currentCard.getBoundingClientRect();

      const scrollLeft =
        container.scrollLeft +
        cardRect.left -
        containerRect.left -
        containerRect.width / 2 +
        cardRect.width / 2;

      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [currentIndex]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <AstroIcon
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-none sm:rounded-xl py-8 sm:py-12">
      <div className="max-w-[450px] sm:max-w-6xl md:max-w-3xl lg:max-w-6xl mx-aut px-2 sm:px-4 mx-auto">
        {/* Header */}
        <div className="text-left mb-2 sm:mb-5">
          <Typography variant="h2">
            See What Our Customer Has To Say!
          </Typography>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
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
            onClick={nextTestimonial}
            className={`absolute -right-2 sm:-right-10 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-3 rounded-full shadow-lg transition-all duration-200 ${
              canScrollRight
                ? "bg-white hover:bg-gray-50 text-gray-800 hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ArrowRightIcon size={24} />
          </button>

          {/* Scrollable Container */}
          <div className="flex flex-col bg-instant-mid/10 overflow-hidden border-2 rounded-xl px-8 sm:px-12 py-8 sm:py-10">
            <Typography variant="h3" className="text-center mb-6">
              Customer Stories
            </Typography>
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide gap-2 sm:gap-6 "
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {data.map((testimonial, index) => (
                <div
                  ref={(el) => (testimonialRefs.current[index] = el)}
                  key={index}
                  className={`flex-shrink-0 w-[80%] sm:w-[33%] lg:w-[25%] transition-all duration-300
      p-0 sm:p-0 bg-white border rounded-xl shadow-md
      hover:shadow-xl transform hover:-translate-y-2 group
      ${index === currentIndex ? "border-instant-mid" : ""}
    `}
                >
                  <FlexBox direction="col" className="p-3 sm:p-6">
                    <FlexBox className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-instant-mid/90 to-instant-start/70">
                      <span className="text-sm font-bold text-white">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </FlexBox>
                    <div>
                      <Typography
                        variant="h6"
                        className="font-semibold text-gray-800"
                      >
                        {testimonial.name}
                      </Typography>
                    </div>

                    <p
                      className={`${
                        testimonial.testimonial.length > 20
                          ? "text-xs"
                          : "text-sm"
                      } text-gray-700 line-clamp-3`}
                    >
                      "{testimonial.testimonial}"
                    </p>
                    <div className="flex items-center mt-3">
                      {renderStars(testimonial.rating)}
                    </div>
                  </FlexBox>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        {data && data?.length > 1 && (
          <FlexBox className="mt-6 sm:mt-8 space-x-3">
            {data.map((_, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1 sm:w-[6px] h-1 sm:h-[6px] rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </FlexBox>
        )}
      </div>

      {children}
    </div>
  );
};
