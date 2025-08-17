import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarScheduleFillIcon,
  ProfileIcon,
} from "@icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogPostsData } from "src/data";

export const BlogCarousel = () => {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  // ✅ Detect how many cards fit per screen
  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.innerWidth >= 1280) {
        setVisibleSlides(3); // Desktop XL
      } else if (window.innerWidth >= 768) {
        setVisibleSlides(2); // Tablet
      } else {
        setVisibleSlides(1); // Mobile
      }
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  const maxSlide = blogPostsData.length - visibleSlides; // ✅ last possible slide index

  // Auto-advance carousel but stop at last page
  useEffect(() => {
    if (currentSlide >= maxSlide) return; // stop autoplay at last page

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : prev));
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide, maxSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // @ts-ignore
  const openPost = (post) => {
    navigate(`/blogs/${post.id}`);
  };
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
          }}
        >
          {blogPostsData.map((post) => (
            <div
              key={post.id}
              className="w-full md:w-1/2 xl:w-1/3 flex-shrink-0 px-4"
            >
              <div className="bg-white rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Card Header */}
                <div className="bg-gradient-to-br from-instant-mid to-instant-end p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <div className="text-4xl">{post.image}</div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-lg opacity-90 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ProfileIcon className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarScheduleFillIcon className="w-4 h-4" />
                        {post.date}
                      </div>
                    </div>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {post.readTime}
                    </span>
                  </div>

                  <button
                    onClick={() => openPost(post)}
                    className="w-full bg-gradient-to-br from-instant-mid/75 to-instant-end/75 text-white py-4 rounded-xl font-bold hover:from-instant-mid hover:to-instant-end transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Read Complete Guide
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all transform hover:scale-110 z-10"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {currentSlide < maxSlide && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all transform hover:scale-110 z-10"
        >
          <ArrowRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-gradient-to-br from-instant-mid/75 to-instant-end/75 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
