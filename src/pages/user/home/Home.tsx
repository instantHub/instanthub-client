import { Helmet } from "react-helmet-async";
import { Categories } from "../categories";
import { Accordion, GuideHome, HeroSlider, Slider } from "@components/user";
import WhyUs from "@components/user/static/home/WhyUs";
import { useScrollToTop } from "@hooks";
import { TestimonialCarousel } from "@components/user";
import { SELL_FAQ_DATA, sellProcessStepsData } from "src/data";
import { MobileStepper, VerticalTimeline } from "@components/general";
import { TopSellings } from "./topSellings";
import BlogCarousel from "../blogs/BlogCarousel";

export const Home = () => {
  useScrollToTop();

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

      <div className="flex flex-col gap-10 max-sm:gap-5 w-full mt-5">
        <HeroSlider />
        <Categories />

        <TopSellings />

        <TestimonialCarousel />

        <WhyUs />

        <VerticalTimeline
          steps={sellProcessStepsData}
          completedSteps={[1, 2, 3, 4]}
          title={`Our Simple ${sellProcessStepsData.length}-Step Process`}
          subtitle="We've streamlined our process to get your gadgets sold fast."
          primaryColor="bg-gradient-to-br from-instant-end/30 via-instant-mid/50 to-instant-start/30"
          backgroundColor="bg-gradient-to-br from-instant-start/10 via-instant-mid/10 to-instant-end/10"
          className="max-sm:hidden"
        />

        <MobileStepper
          steps={sellProcessStepsData}
          completedSteps={[1, 2, 3, 4]}
          title={`Our Simple ${sellProcessStepsData.length}-Step Process`}
          subtitle="We've streamlined our process to get your gadgets sold fast."
          circleColor="bg-gradient-to-br from-instant-end/70 via-instant-mid/70 to-instant-start/70"
          backgroundColor="bg-gradient-to-br from-instant-start/10 via-instant-mid/10 to-instant-end/10"
          className="sm:hidden"
        />

        <Accordion
          faqs={SELL_FAQ_DATA}
          bgColor="bg-white"
          descBGColor="bg-instant-mid/10"
          borderTop={1}
        />

        <BlogCarousel />

        <GuideHome />
      </div>
    </>
  );
};
