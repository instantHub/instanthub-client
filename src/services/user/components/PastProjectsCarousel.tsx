import { FC } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { IServiceImageCarouselItem } from "@utils/types";

export interface IPastProjectsCarouselProps {
  title: string;
  subtitle: string;
  items: IServiceImageCarouselItem[];
  bgColor?: string;
  className?: string;
}

export const PastProjectsCarousel: FC<IPastProjectsCarouselProps> = ({
  title,
  subtitle,
  items,
  className,
  bgColor = "bg-instant-mid/10",
}) => {
  return (
    <section className={`${bgColor} p-4 sm:p-6 lg:p-8 ${className}`}>
      <div className="">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 px-4`}
          >
            {title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <ImageCarousel
          items={items}
          itemsPerView={5}
          className="mb-6 sm:mb-8"
        />
      </div>
    </section>
  );
};
