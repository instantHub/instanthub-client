import React from "react";
import Slider from "../../components/Slider";
import Categories from "../categories/Categories";
import Testimonials from "../../components/Testimonials";
import TestimonialCarousel from "../../components/TestimonialsCorousel";
import HowItWorks from "../../components/HowItWorks";
import WhyChooseInstantCashPicks from "../../components/WhyUs";
import { Helmet } from "react-helmet-async";
import FloatingButtons from "../../components/FloatingButtons";
import FAQ from "../../components/FAQ";
import Services from "../services/Services";
import AllBrandsList from "../brands/AllBrandsList";
import ServicesHome from "../services/ServicesHome";

const Home = () => {
  const images = [
    {
      url: "https://instantcashpick.com/admin/uploads/sliders/2023-06-27-01-22-2420230627012224pickmyphonepickmyphone%20banner-01.jpg",
    },
    {
      url: "https://instantcashpick.com/admin/uploads/sliders/2023-06-27-01-22-3220230627012232pickmyphonepickmyphone%20banner-02.jpg",
    },
    {
      url: "https://instantcashpick.com/admin/uploads/sliders/2024-03-17-10-03-3820240317100338pickmyphonepexels-lukas-kloeppel-466685.jpg",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://instantcashpick.com/",
    name: "InstantCashPick",
    description:
      "Get instant cash payments with InstantCashPick. No more waiting for checks to clear or funds to transfer. Receive cash on the spot quickly and easily.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://instantcashpick.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Helmet>
        <title>{`Sell Old Gadgets Online | InstantCashPick`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content="sell products on online, sell old mobiles online, sell old mobile online, sell old laptops online, sell old laptop online,sell old products on Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <link rel="canonical" href="https://instantcashpick.com/" />
      </Helmet>

      <div className="">
        <Slider />
        <Categories />
        {/* <div className="mt-16 pt-8 pb-16 bg-cyan-50 px-[10%]">
        <AllBrandsList />
        </div> */}
        <div className="mt-10 pt-5 pb-16 bg-cyan-50">
          {/* <Services /> */}
          <ServicesHome />
        </div>
        <HowItWorks />
        <TestimonialCarousel />
        <WhyChooseInstantCashPicks />
        <FAQ from={`home`} />
      </div>
    </>
  );
};

export default Home;
