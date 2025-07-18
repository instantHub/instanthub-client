import { FC } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { ArrowRightIcon } from "@icons";
import { IServiceImageCarouselItem } from "@types";

export interface RoomSectionProps {
  title: string;
  subtitle: string;
  items: IServiceImageCarouselItem[];
  theme: "kitchen" | "bedroom" | "living";
  style?: string;
  openModal: () => void;
}

export const RoomSection: FC<RoomSectionProps> = ({
  title,
  subtitle,
  items,
  theme,
  style,
  openModal,
}) => {
  const themeStyles = {
    kitchen: {
      //   bg: "bg-gradient-to-br from-instant-mid/10 to-instant-end/10",
      bg: "border",
      accent: "text-instant-mid",
      button: "bg-instant-mid/75 hover:bg-instant-mid active:bg-instant-mid",
    },
    bedroom: {
      //   bg: "bg-gradient-to-br from-instant-start/10 to-instant-start/5",
      bg: "",
      accent: "text-instant-start",
      button:
        "bg-instant-start/75 hover:bg-instant-start active:bg-instant-start",
    },
    living: {
      //   bg: "bg-gradient-to-br from-instant-end/5 to-instant-end/10",
      bg: "border",
      accent: "text-instant-end",
      button: "bg-instant-end/75 hover:bg-instant-end active:bg-instant-end",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <>
      <div
        //   className={`${currentTheme.bg} p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl`}
        className={`${currentTheme.bg} p-4 sm:p-6 lg:p-8 ${style}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 ${currentTheme.accent} px-4`}
            >
              {title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <ImageCarousel items={items} className="mb-6 sm:mb-8" />

          <div className="text-center px-4">
            <button
              onClick={openModal}
              className={`${currentTheme.button} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-200 active:scale-95 shadow-lg flex items-center gap-2 mx-auto text-sm sm:text-base`}
            >
              Explore {title} Designs
              <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-[800px] max-md:w-[375px]"
      >
        <InteriorConsultationForm onClose={() => setIsModalOpen(false)} />
      </Modal> */}
    </>
  );
};
