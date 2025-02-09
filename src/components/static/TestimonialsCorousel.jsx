import React, { memo, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";

const Testimonials = () => {
  const testimonials = [
    // Testimonials data
    {
      id: 1,
      text: "I couldn't be happier with the service provided by this company. They were professional, efficient, and went above and beyond to meet my needs.",
      author: "Akash Banerjee",
      image: "https://source.unsplash.com/100x100/?person",
    },
    {
      id: 2,
      text: "I was impressed by the level of expertise and attention to detail displayed by the team. They guided me through the entire process and made sure I was satisfied every step of the way.",
      author: "Siva",
      image: "https://source.unsplash.com/100x100/?person",
    },
    {
      id: 3,
      text: "This company provides excellent service. I have used their services and had a great experience.",
      author: "Ameer Ahmed",
      image: "https://source.unsplash.com/100x100/?person",
    },
  ];

  // const [currentIndex, setCurrentIndex] = useState(0);

  // const nextTestimonial = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const prevTestimonial = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
  //   );
  // };

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const index = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    // console.log("goToNextSlide", slidersList.length);
    // if (slidersList.length == 1) {
    //   return;
    // }
    const isLastSlide = currentIndex === testimonials.length - 1;
    const index = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  const gotoSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // console.log("testing", testimonials[currentIndex]);

  useEffect(() => {
    // Automatically move to the next slide every 3 seconds

    const intervalId = setInterval(goToNextSlide, 4000);

    // Clean up the interval when the component unmounts or when currentIndex changes
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  // Google reviews
  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const placeId = "YOUR_PLACE_ID";
  //     const apiKey = "YOUR_API_KEY";
  //     const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const reviews = data.result.reviews;
  //     console.log(reviews); // Array of reviews
  //   };

  //   fetchReviews();
  // }, []);

  return (
    <div>
      <div className="group">
        <div className="w-full h-full rounded-2xl bg-cover bg-center bg-no-repeat duration-500">
          <div className="bg-secondary-light/40 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl max-sm:text-2xl font-extrabold text-gray-900 sm:text-4xl ">
                Testimonials
              </h2>
              <p className="mt-4 text-lg max-sm:text-sm text-gray-600 max-sm:text-[16px] max-14inch:text-sm">
                Check out what our customers are saying about us.
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <button
                aria-label="Scroll Left"
                className="mr-4 text-black px-4 py-2 rounded focus:outline-none"
                onClick={goToPrevSlide}
              >
                <FaChevronLeft />
              </button>
              <div className="max-w-lg mx-auto grid gap-8 lg:max-w-none">
                <div
                  key={testimonials[currentIndex].id}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                    <div className="flex justify-center">
                      {/* <img
                        className="h-12 w-12 rounded-full"
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].author}
                      /> */}
                      <p className="px-4 py-2 text-black text-3xl bg-secondary-light shadow-lg rounded-full max-sm:text-xl">
                        {/* {testimonials[currentIndex].author[0]} */}
                        {testimonials[currentIndex].author
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </p>
                    </div>
                    <div className="mt-6 text-center text-sm max-sm:text-xs">
                      <p>{testimonials[currentIndex].text}</p>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 sm:px-10 sm:py-6">
                    <p className="text-sm max-sm:text-xs text-gray-600">
                      - {testimonials[currentIndex].author}
                    </p>
                  </div>
                </div>
              </div>
              <button
                aria-label="Scroll Right"
                className="ml-4 text-black px-4 py-2 rounded focus:outline-none"
                onClick={goToNextSlide}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          {/* left arrow */}
          {/* <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft size={30} onClick={goToPrevSlide} />
        </div> */}
          {/* right arrow */}
          {/* <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight size={30} onClick={goToNextSlide} />
        </div> */}
        </div>

        <div className="flex top-4 justify-center py-2">
          {testimonials.map((t, index) => (
            <div
              key={index}
              onClick={() => gotoSlide(index)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Testimonials);
