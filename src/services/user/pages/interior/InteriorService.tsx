import { FC, useState } from "react";
import { RoomSection, ImageCarousel } from "@services/user";
import { Testimonials, WhatYouGet, WhyChooseUs } from "./components";
import {
  bedroomData,
  kitchenData,
  livingRoomItems,
  personalisedData,
} from "@services/user/data";
import { Button, Modal } from "@components/general";
import { InteriorConsultationForm } from "./components";
import { signatureColorText } from "@utils/styles";

export const InteriorService: FC = () => {
  // const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function openModal(): void {
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="min-h-screen w-full">
        {/* Mobile Navigation */}
        {/* <MobileNav
          isOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
        /> */}

        {/* Mobile-First Hero Section */}
        <section className="my-5 md:my-10 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 ${signatureColorText}`}
            >
              Transform Your Home
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Create your dream interior with our expert designers and premium
              materials
            </p>
            <Button size="lg" variant="instanthub" onClick={openModal}>
              Start Your Journey
            </Button>
          </div>
        </section>

        {/* Mobile-First Space Saving Solutions */}
        {/* <section className="py-12 sm:py-16 bg-gray-100"> */}
        <section className="py-12 bg-instant-mid/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                Personalised Space Saving Solutions
              </h2>
              <p className="text-instant-mid font-semibold text-base sm:text-lg">
                20% Extra Space Guaranteed
              </p>
            </div>

            <ImageCarousel
              items={personalisedData}
              className="mb-6 sm:mb-8"
              autoPlay
            />

            <div className="text-center px-4">
              <Button size="lg" variant="instanthub" onClick={openModal}>
                Talk To Our Space Saving Experts Today!
              </Button>
            </div>
          </div>
        </section>

        <div className="max-sm:hidden">
          <WhyChooseUs openModal={openModal} />
        </div>

        {/* Room Sections */}
        <section className="">
          <div className="space-y- sm:space-y- lg:space-y- ">
            <RoomSection
              title="Smart Modular Kitchen Designs"
              subtitle="Functional and beautiful kitchens that make cooking a joy"
              items={kitchenData}
              theme="kitchen"
              style="bg-instant-mid/10"
              openModal={openModal}
            />

            <RoomSection
              title="Luxurious Bedroom Designs"
              subtitle="Create your personal sanctuary with our elegant bedroom solutions"
              items={bedroomData}
              theme="bedroom"
              style="bg-white"
              openModal={openModal}
            />

            <RoomSection
              title="Stunning Living Room Designs"
              subtitle="Spaces that bring families together in comfort and style"
              items={livingRoomItems}
              theme="living"
              style="bg-instant-mid/10"
              openModal={openModal}
            />
          </div>
        </section>

        {/* Mobile-First CTA Section */}
        <section className="bg-gradient-to-r from-instant-mid to-instant-end py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Ready to Transform Your Home?
            </h2>
            <p className="text-white text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
              Get a free consultation with our expert designers and start your
              journey to your dream home
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto">
              <button
                className="bg-white text-instant-mid px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors"
                onClick={openModal}
              >
                Book Free Consultation
              </button>
              <button
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-instant-mid active:bg-gray-100 transition-colors"
                onClick={openModal}
              >
                View Our Portfolio
              </button>
            </div>
          </div>
        </section>

        <WhatYouGet style="bg-instant-mid/10" openModal={openModal} />

        <Testimonials style="bg-white" openModal={openModal} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-[800px] max-md:w-[375px]"
      >
        <InteriorConsultationForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
