import { FC } from "react";
import { Button, Typography } from "@components/general";
import { Accordion } from "@components/user";
import {
  PastProjectsCarousel,
  ReadyToSell,
  RoomSection,
  ServiceBookingForm,
  Testimonials,
  WhatWeOffer,
} from "@services/user/components";
import {
  acRepairTestimonials,
  kitchenData,
  LAPTOP_FAQs,
} from "@services/user/data";
import { CarpentryWhatWeOffer } from "@services/user/data/carpentry";

export const Carpentry: FC = () => {
  return (
    <div>
      <section
        className="mt-5 relative flex min-h-[350px] items-center justify-center bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_7UHU16Dl9Wh_eCXjgfzlQSuqxb4FUIL5AvIeL13BgZtqTccrQs_Erw7YWYFmWSuOtucXGasi-OjSqxTENrdO0HTNbHoopbMTHNigE4nKdxkLn3jtOcvMq18xHXrLA6qd1xBnsx8VBX3k7I9qdWf9gRhBBS9hFjr2dakMSbRW8QPHXydz4BccEfvJhg5CvCX98CfPU9pGxf4JyhamPOle3ucIONe31Q9llHzwx6r--DICcVlPBby8HAsm7FUb1hGYaGFDgZSCaC4")',
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <Typography variant="h1">Expert Carpentry Services</Typography>
            <Typography variant="h6">
              InstantHub offers professional carpentry services, including
              custom furniture design, repairs, and installations. Our skilled
              craftsmen ensure quality and precision in every project.
            </Typography>
            <Button className="bg-amber-800/80 hover:bg-amber-800">
              Schedule Service
            </Button>
          </div>
        </div>
      </section>

      <WhatWeOffer title="What we offer" data={CarpentryWhatWeOffer} />

      <PastProjectsCarousel
        title="Our Past Projects"
        subtitle="Explore our recent carpentry projects showcasing our craftsmanship and attention to detail."
        items={kitchenData}
        bgColor="bg-amber-800/10"
      />

      <Testimonials data={acRepairTestimonials} />

      <ReadyToSell
        title="Ready to transform your space?"
        subTitle="Book your order today and experience the difference with InstantHub."
        bgColor="bg-amber-800/10"
      >
        <Button className="bg-amber-800 hover:bg-amber-800/80">Book Now</Button>
      </ReadyToSell>

      <section className="py-5 sm:pt-12">
        <Accordion faqs={LAPTOP_FAQs} bgColor="bg-amber-800/10" />
      </section>

      {/* <ServiceBookingForm /> */}
    </div>
  );
};
