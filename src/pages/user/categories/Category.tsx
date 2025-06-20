import { FlexBox, Typography } from "@components/general";
import {
  Breadcrumbs,
  HowItWorks,
  Loading,
  PageNotFound,
  TestimonialSlider,
} from "@components/user";
import { useGetCategoryQuery } from "@features/api";
import { ChangeEvent, FC, useState } from "react";
import { useParams } from "react-router-dom";
import { BrandSelection, TopSellingProducts } from "./component";
import { ICategoryResponse } from "@features/api/categoriesApi/types";
import { TopSellingBrands } from "./component";

type TCategoryParams = {
  categoryUniqueURL: string;
};

export const Category = () => {
  const { categoryUniqueURL } = useParams<TCategoryParams>();

  if (!categoryUniqueURL) {
    throw new Error("Category UniqueURL is required to Get a category.");
  }

  const {
    data: category,
    isLoading: categoryLoading,
    error,
  } = useGetCategoryQuery(categoryUniqueURL);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: ChangeEvent) => {
    setSearchTerm((e.target as HTMLInputElement).value);
  };

  if (error && "status" in error && error.status === 404)
    return <PageNotFound />;

  if (categoryLoading) return <Loading />;

  return (
    <FlexBox direction="col" className="min-h-screen mt-10">
      <Breadcrumbs />

      {/* Hero Section */}
      <div className="max-w-6xl sm:w-full rounded-xl px-5 sm:px-16 py-8 md:py-12 bg-instant-mid/10 mx-aut mx-4 sm:mx-0">
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

      {/* How It Works Section */}
      <HowItWorks />

      {/* Top Selling Brands */}
      {category?.brands && <TopSellingBrands brands={category.brands} />}

      {category?.name && <TopSellingProducts categoryName={category.name} />}

      <TestimonialSlider />
    </FlexBox>
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

{
  /* <div className="flex-1 max-w-md ">
  <div className="relative">
    <div className="w-60 sm:w-80 h-60 sm:h-80 mx-auto bg-gradient-to-br from-instant-mid/20 to-instant-end/10 rounded-full flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements *
      <div className="absolute top-4 right-8 w-12 h-8 bg-white rounded transform rotate-12"></div>
      <div className="absolute bottom-8 left-4 w-16 h-12 bg-white rounded transform -rotate-12"></div>
      <div className="absolute top-12 left-12 w-8 h-6 bg-white rounded transform rotate-45"></div>

      <div className="absolute z-10">
        <img
          src="/images/logo-transparent.png"
          alt="logo"
          className="w-[150px] sm:w-[220px] sm:mb-4"
          loading="lazy"
        />
      </div>

      {/* Person illustration placeholder *
      <div className="w-48 h-56 bg-white/10 rounded-t-full relative">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/20 rounded-full"></div>
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-white/20 rounded-lg"></div>
        <div className="absolute top-24 right-2 w-6 h-10 rounded border-2 bg-secondary-light"></div>
        <div className="absolute top-24 left-2 w-8 h-6 bg-secondary-light rounded"></div>
      </div>
    </div>
  </div>
</div>; */
}

// Mock data to simulate your API response
// const mockCategoryData = {
//   id: "1",
//   name: "Mobile Phone",
//   image: "/api/placeholder/400/300",
//   uniqueURL: "mobile-phone",
//   brands: [
//     { id: "1", name: "Apple", image: "/api/placeholder/80/80", uniqueURL: "apple" },
//     { id: "2", name: "Xiaomi", image: "/api/placeholder/80/80", uniqueURL: "xiaomi" },
//     { id: "3", name: "Samsung", image: "/api/placeholder/80/80", uniqueURL: "samsung" },
//     { id: "4", name: "Vivo", image: "/api/placeholder/80/80", uniqueURL: "vivo" }
//   ],
//   categoryType: { id: "1", name: "Electronics" }
// };
