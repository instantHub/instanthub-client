import { ICategoryResponse } from "@features/api/categoriesApi/types";
import { BrandSelection } from "./BrandSelection";
import { FlexBox, Typography } from "@components/general";
import { FC } from "react";

interface IHeroSectionProps {
  category: ICategoryResponse | undefined;
  searchTerm?: string;
  handleSearch?: () => void;
}

export const HeroSection: FC<IHeroSectionProps> = ({
  category,
  searchTerm,
  handleSearch,
}) => {
  return (
    <div className="max-w-6xl sm:w-full rounded-xl px-5 sm:px-16 py-8 md:py-12 bg-instant-mid/10 max-sm:mx-2">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <Typography as={"h1"} variant="h1">
            Sell Old {category?.name} for Instant Cash
          </Typography>

          {/* Features */}
          <HeadingFeatures />

          {/* Search Bar */}
          <div className="relative mb-8 max-w-md mx-auto lg:mx-0">
            <input
              type="text"
              placeholder={`Search your ${category?.name} to sell`}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Brand Selection */}
          <BrandSelection category={category as ICategoryResponse} />
        </div>

        {/* Right Illustration */}
        <div className="relative w-32 sm:w-64 h-32 sm:h-64 mx-auto rounded-full flex items-center justify-center">
          <img
            src="/images/logo-transparent.png"
            alt="logo"
            className="w-[150px] sm:w-[220px] sm:mb-4 absolute z-10"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

const HeadingFeatures: FC = () => {
  const features = [
    "Maximum Value",
    "Safe & Hassle-free",
    "Free Doorstep Pickup",
  ];
  return (
    <FlexBox className="sm:justify-start gap-4 mt-2 mb-8 text-[10.5px] sm:text-xs">
      {features.map((feature, i) => (
        <FlexBox key={i} gap={2} className="text-instant-mid">
          <div className="w-1 sm:w-2 h-1 sm:h-2 bg-instant-mid rounded-full"></div>
          <span>{feature}</span>
        </FlexBox>
      ))}
    </FlexBox>
  );
};
