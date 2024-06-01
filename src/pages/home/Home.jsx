import React from "react";
import Slider from "../../components/Slider";
import Categories from "../categories/Categories";
import Testimonials from "../../components/Testimonials";
import TestimonialCarousel from "../../components/TestimonialsCorousel";
import HowItWorks from "../../components/HowItWorks";
import WhyChooseInstantCashPicks from "../../components/WhyUs";
import { Helmet } from "react-helmet-async";

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
  return (
    <>
      <Helmet>
        <title>{`Home | InstantCashPick`}</title>
        {/* <meta
          name="description"
          content="India's growing trusted platform to sell old Mobile Phone, Laptops etc, sell your used Mobile Phone, Laptops etc at InstantCashPick and get instant cash at your doorstep. Visit the website to know more!"
        /> */}
        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick. No more waiting for checks to clear or funds to transfer. Receive cash on the spot quickly and easily."
        />

        <meta
          name="keywords"
          content="Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://instantcashpick.com/" />
      </Helmet>
      {/* <Slider images={images} /> */}
      <Slider />
      <Categories />
      {/* <Testimonials /> */}
      <HowItWorks />
      <TestimonialCarousel />
      <WhyChooseInstantCashPicks />
    </>
  );
};

export default Home;
