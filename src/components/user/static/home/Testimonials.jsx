import React, { memo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    // Testimonials data
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at scelerisque turpis.",
      author: "John Doe",
      image: "https://source.unsplash.com/100x100/?person",
    },
    {
      id: 2,
      text: "Sed euismod ultrices tellus, at elementum est volutpat in. Duis pretium nisi at nibh.",
      author: "Jane Doe",
      image: "https://source.unsplash.com/100x100/?person",
    },
    {
      id: 3,
      text: "Fusce non purus et eros vestibulum cursus ut vel ipsum. Proin eget malesuada lorem.",
      author: "Michael Smith",
      image: "https://source.unsplash.com/100x100/?person",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Testimonials
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Check out what our customers are saying about us.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="mr-4 text-black px-4 py-2 rounded focus:outline-none"
          onClick={prevTestimonial}
        >
          <FaChevronLeft />
        </button>
        <div className="max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
          {testimonials
            .slice(currentIndex, currentIndex + 3)
            .map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                  <div className="flex justify-center">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.image}
                      alt={testimonial.author}
                    />
                  </div>
                  <div className="mt-6 text-center sm:text-lg">
                    <p>{testimonial.text}</p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 sm:px-10 sm:py-6">
                  <p className="text-sm text-gray-600">
                    - {testimonial.author}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <button
          className="ml-4 text-black px-4 py-2 rounded focus:outline-none"
          onClick={nextTestimonial}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default memo(Testimonials);
