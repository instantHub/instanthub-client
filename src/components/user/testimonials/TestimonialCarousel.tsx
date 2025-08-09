import { FlexBox, Typography } from "@components/general";
import { useGetPublicTestimonialsQuery } from "@features/api";
import { ArrowLeftIcon, ArrowRightIcon, AstroIcon, SlidesIcon } from "@icons";
import { useState, useEffect, FC } from "react";

export const TestimonialCarousel: FC = () => {
  const { data: testimonials = [], isLoading } =
    useGetPublicTestimonialsQuery("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
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

  const renderSmallStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <AstroIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-br from-instant-start/10 via-instant-mid/10 to-instant-end/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-300 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <Typography variant="h1" className="text-gray-800 mb-4">
            What Our{" "}
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-instant-mid to-instant-start">
              Clients Say
            </span>
          </Typography>

          <Typography variant="h6" className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our amazing clients
            have to say about their experience.
          </Typography>
        </div>

        {/* Main Carousel */}
        <div className="relative">
          <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-4 sm:px-12 sm:py-8">
            <FlexBox direction="col" className="lg:flex-row gap-12">
              <FlexBox direction="col">
                <div className="mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-instant-mid/70 to-instant-start/50 flex items-center justify-center mx-auto lg:mx-0 shadow-lg border-4 border-white">
                  <span className="text-xl sm:text-3xl font-bold text-white">
                    {currentTestimonial.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                <Typography variant="h4" className="text-gray-800 mb-2">
                  {currentTestimonial.name}
                </Typography>

                <FlexBox className="lg:justify-start">
                  {renderStars(currentTestimonial.rating)}
                </FlexBox>
              </FlexBox>

              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="relative">
                  <SlidesIcon className="absolute -top-6 -left-32 sm:-left-4 w-10 h-10 text-purple-200 transform rotate-180" />
                  <blockquote className="text-sm md:text-[16px] leading-relaxed text-gray-700 italic font-medium pl-8">
                    "{currentTestimonial.testimonial}"
                  </blockquote>
                  <SlidesIcon className="absolute -bottom-2 -right-32 sm:-right-8 w-10 h-10 text-purple-200" />
                </div>
              </div>
            </FlexBox>
          </div>

          {/* Navigation Arrows */}
          {testimonials && testimonials?.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 md:left-44 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                aria-label="Previous testimonial"
              >
                <ArrowLeftIcon className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 md:right-44 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                aria-label="Next testimonial"
              >
                <ArrowRightIcon className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {testimonials && testimonials?.length > 1 && (
          <FlexBox className="mt-6 sm:mt-8 space-x-3">
            {testimonials.map((_, index: number) => (
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

        {/* Mini testimonials preview */}
        {testimonials && testimonials?.length > 1 && (
          //   <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <FlexBox
            justify="start"
            wrap="wrap"
            className="sm:justify-center mt-8 sm:mt-10 gap-3 sm:gap-4"
          >
            {/*  {testimonials?.map((testimonial, index) => ( */}
            {testimonials
              ?.filter((t) => t.featured)
              .map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`
                    bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-white/80 hover:scale-105 border border-white/20 
                    ${index === currentIndex ? "ring-2 ring-instant-mid" : ""}
                    `}
                  onClick={() => goToSlide(index)}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-instant-mid/90 to-instant-start/70 flex items-center justify-center mr-4">
                      <span className="text-sm font-bold text-white">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <Typography
                        variant="caption"
                        className="font-semibold text-gray-800"
                      >
                        {testimonial.name}
                      </Typography>
                    </div>
                  </div>
                  <p
                    className={`${
                      testimonial.testimonial.length > 20
                        ? "text-[10px]"
                        : "text-xs"
                    } text-gray-700 line-clamp-3`}
                  >
                    {testimonial.testimonial.length > 15
                      ? `"${testimonial.testimonial.slice(0, 15)}..."`
                      : `"${testimonial.testimonial}"`}
                  </p>
                  <div className="flex items-center mt-3">
                    {renderSmallStars(testimonial.rating)}
                  </div>
                </div>
              ))}
          </FlexBox>
        )}
      </div>
    </section>
  );
};
