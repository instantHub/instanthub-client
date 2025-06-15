import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { Categories } from "../categories";
import { Slider } from "@components/user";
import TestimonialsCorousel from "@components/user/static/home/TestimonialsCorousel";
import HowItWorks from "@components/user/static/home/HowItWorks";
import WhyUs from "@components/user/static/home/WhyUs";
import FAQ from "@components/user/static/FAQ";
import { ServicesHome } from "../services";
import { useIPLocation } from "../../../hooks/useIPLocation";

export const Home = () => {
  const { location } = useIPLocation();

  console.log("location", location);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Sell Old Gadgets Online | InstantHub`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content="Instant Hub, instant hub, InstantHub, instanthub, Sell Instant Laptop in Bangalore, Instant Mobile Selling in Bangalore, Get Instant Cash for Your Mobile, 
                  sell mobile instantly, sell laptop instantly,
                  Sell Your Phone Instantly for Cash, Sell My Mobile Quickly, Quick Laptop Selling in Bangalore, Sell My Phone for Instant Cash, Sell Mobile Phones Instantly for Cash,
                  sell old products on Instant Hub, sell on instant hub, sell old products on InstantHub, sell old products on instanthub, instant pick, Instant Pick, instant cash pick, 
                  Instant Cash Pick, sell products on online, sell old mobiles online, sell old mobile online, sell old laptops online, sell old laptop online."
        />

        <link rel="canonical" href="https://www.instanthub.in/" />
      </Helmet>

      <div className="flex flex-col w-full">
        {/* Bill Board Advertisement */}
        <div className="relative overflow-hidden whitespace-nowrap py-2 max-sm:py-1 w-full bg-secondary text-secondary-light my-3 max-sm:my-2">
          <div className="absolute px-2 max-sm:px-1 left-0 bg-secondary z-10 top-2 max-sm:top-1">
            <div className="flex items-center gap-1 ">
              <span className="animate-pulse max-sm:text-[10px]">Offers</span>
            </div>
          </div>
          <div className="animate-marquee max-sm:animate-marquee-fast sm:w-fi flex items-center gap-20 sm:gap-96 text-[16px] max-sm:text-xs">
            <span className=" ">
              💵 "Sell Fast, Get Paid Faster - Start Now!" 💸
            </span>
            <span className=" ">
              📱 "Old Gadgets, New Beginnings - Sell Now!" 🎁
            </span>
            <span className=" ">
              🛒 "Out with the Old, In with the Deals - Special New Year
              Offers!"
            </span>
          </div>
          <div className="max-sm:hidden absolute px-2 bg-secondary right-0 top-2 ">
            <div className="flex items-center gap-1">
              <span className="animate-pulse">Offers</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 max-sm:gap-5 w-full">
          <Slider />

          <Categories />

          <div className="mt-10 pt-5 pb-16 bg-secondary-light/40">
            <ServicesHome />
          </div>
          <HowItWorks />
          <TestimonialsCorousel />
          <WhyUs />
          <FAQ from={`home`} />
        </div>
      </div>
    </>
  );
};
