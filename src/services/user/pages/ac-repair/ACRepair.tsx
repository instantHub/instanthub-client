import { FC } from "react";
import { Button, Typography, VerticalTimeline } from "@components/general";
import { Accordion } from "@components/user";
import {
  ReadyToSell,
  Testimonials,
  WhatWeOffer,
} from "@services/user/components";
import {
  acRepairStepsData,
  acRepairTestimonials,
  ACRepairWhatWeOffer,
  LAPTOP_FAQs,
} from "@services/user/data";

export const ACRepair: FC = () => {
  return (
    <div>
      <section
        className="relative flex min-h-[350px] items-center justify-center bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWp-3fxuss_wY8Ax7ynWcxgM2CgJmNB96MpyGB8BBW_p9uB20vS8eOSwum_Umiujj6QgaHd8NQkldzYHesbfoIKOo_wD8aFkM-rZuU20Lrz5cTNpMQ8x4yo4erGOOruKLq7yRtZI23JKuKAQQiUEegE6wMDJr_eCKjxLH33MnK4muEjXn43HgcVOSA2VoTdbhNm-A2QwLKDpvVB9UxkZOmgnXZ9D1kq5NL9MeS6kpg42CCJ-DP_CZyAwuLA_Gfw99gthrEUuTrpMU")',
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <Typography variant="h1">Expert AC Repair Services</Typography>
            <Typography variant="h6">
              InstantHub offers comprehensive AC repair, maintenance, and
              installation services. Our certified technicians ensure your
              cooling system operates efficiently, providing comfort and peace
              of mind.
            </Typography>
            <Button variant="instanthub">Schedule Service</Button>
          </div>
        </div>
      </section>

      <WhatWeOffer title="What we offer" data={ACRepairWhatWeOffer} />

      <VerticalTimeline
        steps={acRepairStepsData}
        completedSteps={[1, 2, 3, 4]}
        title={`Our Simple ${acRepairStepsData.length}-Step Process`}
        subtitle="We've streamlined our process to get your plumbing fixed fast."
      />

      <Testimonials data={acRepairTestimonials} />

      <ReadyToSell
        title="Ready to repair your AC?"
        subTitle="Book your order today and experience the difference with InstantHub."
      >
        <Button variant="instanthub">Book Now</Button>
      </ReadyToSell>

      <section className="py-5 sm:pt-12">
        <Accordion faqs={LAPTOP_FAQs} />
      </section>
    </div>
  );
};
