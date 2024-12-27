import React from "react";
import Slider from "../../components/Slider";
import Categories from "../categories/Categories";
import Testimonials from "../../components/Testimonials";
import TestimonialCarousel from "../../components/TestimonialsCorousel";
import HowItWorks from "../../components/HowItWorks";
import WhyChooseInstantHubs from "../../components/WhyUs";
import { Helmet } from "react-helmet-async";
import FloatingButtons from "../../components/FloatingButtons";
import FAQ from "../../components/FAQ";
import Services from "../services/Services";
import AllBrandsList from "../brands/AllBrandsList";
import ServicesHome from "../services/ServicesHome";

const Home = () => {
  const images = [
    {
      url: "https://www.instanthub.in/admin/uploads/sliders/2023-06-27-01-22-2420230627012224pickmyphonepickmyphone%20banner-01.jpg",
    },
    {
      url: "https://www.instanthub.in/admin/uploads/sliders/2023-06-27-01-22-3220230627012232pickmyphonepickmyphone%20banner-02.jpg",
    },
    {
      url: "https://www.instanthub.in/admin/uploads/sliders/2024-03-17-10-03-3820240317100338pickmyphonepexels-lukas-kloeppel-466685.jpg",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.instanthub.in/",
    name: "InstantHub",
    description:
      "Get instant cash payments with InstantHub. No more waiting for checks to clear or funds to transfer. Receive cash on the spot quickly and easily.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.instanthub.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

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
          content="Instant Hub, instant hub, InstantHub, instanthub, sell old products on Instant Hub, sell on instant hub, sell old products on InstantHub, sell old products on instanthub, instant pick, Instant Pick, instant cash pick, Instant Cash Pick, sell products on online, sell old mobiles online, sell old mobile online, sell old laptops online, sell old laptop online."
        />
        <link rel="canonical" href="https://www.instanthub.in/" />
      </Helmet>

      <div className="">
        <Slider />
        <Categories />

        <div className="mt-10 pt-5 pb-16 bg-secondary-light/40">
          {/* <Services /> */}
          <ServicesHome />
        </div>
        <HowItWorks />
        <TestimonialCarousel />
        <WhyChooseInstantHubs />
        <FAQ from={`home`} />
      </div>
    </>
  );
};

export default Home;
