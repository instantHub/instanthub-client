import React, { useState } from "react";
import { useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useGetActiveSlidersListQuery } from "../features/api";

function Slider() {
  const { data: slidersData, isLoading: slidersLoading } =
    useGetActiveSlidersListQuery();
  const [slidersList, setSlidersList] = useState([]);

  if (!slidersLoading) {
    // console.log(slidersList);
  }

  // console.log("slidersList", slidersList);
  // console.log("slidersList length", slidersList.length);

  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  // console.log(baseURL);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const index = isFirstSlide ? slidersList.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };
  const gotoSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const goToNextSlide = () => {
    // console.log("goToNextSlide", slidersList.length);
    // if (slidersList.length == 1) {
    if (slidersData.length == 1) {
      return;
    }
    // const isLastSlide = currentIndex === slidersList.length - 1;
    const isLastSlide = currentIndex === slidersList.length - 1;
    const index = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Automatically move to the next slide every 3 seconds
    console.log("UseEffect on banner index change", slidersList.length);
    const intervalId = setInterval(goToNextSlide, 4000);

    // Clean up the interval when the component unmounts or when currentIndex changes
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  useEffect(() => {
    if (!slidersLoading) {
      const sliders = slidersData.filter(
        (slider) => slider.status === "Active"
      );
      setSlidersList(sliders);
    }
  }, [slidersData]);

  // console.log("Slider data", slidersData);
  // console.log("slidersList", slidersList);

  return (
    // TODO: need to set this div to relative for right and left arrow functionality, however navbar will be affected
    <div
      className="max-w-[1400px] w-full h-auto mx-auto mt-5
          group  max-lg:px-0
          max-2sm:px-0
          max-14inch:px-24"
    >
      {/* {!slidersLoading && slidersList.length !== 0 && ( */}
      {!slidersLoading && (
        <div
          // className={`max-w-[1400px] w-full h-[380px] mx-auto mt-5
          // max-md:h-[200px] max-lg:h-[300px] group  max-lg:px-0
          // max-2sm:px-0 max-2sm:max-h-[150px]
          // max-14inch:px-24 max-14inch:max-h-[300px] max-14inch:max-w-[1300px]`}
          className={`
`}
        >
          {/* <div
            style={{
              backgroundImage: `url(${baseURL}${slidersList[currentIndex].image})`,
            }}
            // className="w-full h-full rounded-2xl bg-cover bg-center bg-no-repeat duration-500"
            className="w-[95%] h-full rounded-2xl mx-auto bg-cover bg-center bg-no-repeat duration-500"
          ></div> */}

          <div>
            <img
              // src={`${baseURL}${slidersList[currentIndex]?.image}`}
              src={`${baseURL}${slidersData[currentIndex]?.image}`}
              alt="Banner"
              className="w-full h-auto bg-cover bg-center rounded-lg"
            />
          </div>
          {/* left arrow */}
          {/* <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft size={30} onClick={goToPrevSlide} />
          </div> */}
          {/* right arrow */}
          {/* <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight size={30} onClick={goToNextSlide} />
          </div> */}

          {/* Dots */}
          <div className="flex top-4 justify-center py-2">
            {/* {!slidersLoading &&
              slidersList.map((image, index) => (
                <div
                  key={index}
                  onClick={() => gotoSlide(index)}
                  className="text-2xl cursor-pointer"
                >
                  <RxDotFilled />
                </div>
              ))} */}
            {!slidersLoading &&
              slidersData
                .filter((slider) => slider.status === "Active")
                .map((image, index) => (
                  <div
                    key={index}
                    // onClick={() => gotoSlide(index)}
                    className="text-2xl cursor-pointer"
                  >
                    <RxDotFilled />
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Slider;
