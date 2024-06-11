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
      {/* <Slider images={images} /> */}
      <Slider />
      <Categories />
      {/* <Testimonials /> */}
      <HowItWorks />
      <TestimonialCarousel />
      <WhyChooseInstantCashPicks />
      <FAQ from={`home`} />
    </>
  );
};

export default Home;
