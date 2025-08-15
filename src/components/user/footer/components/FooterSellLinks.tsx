import { FC } from "react";
import { FlexBox, Typography } from "@components/general";
import { useGetCategoriesQuery } from "@features/api";
import { ICategoryResponse } from "@features/api/categoriesApi/types";
import { useNavigate } from "react-router-dom";
import { LOCATIONS } from "@utils/constants";

export const FooterSellLinks: FC = () => {
  const navigate = useNavigate();

  const { data: categoryData = [], isLoading: categoryLoading } =
    useGetCategoriesQuery();

  const handleNavigate = ({ uniqueURL }: ICategoryResponse) => {
    const geoLocation = localStorage.getItem("location") || LOCATIONS.BENGALURU;
    navigate(`${geoLocation}/${uniqueURL}`);
  };

  return (
    <>
      <FlexBox direction="col" align="start" gap={2} className="py-2">
        <Typography variant="h4">Sell Devices</Typography>
        <FlexBox direction="col" gap={2} align="start">
          {!categoryLoading &&
            categoryData.map((category, i) => (
              <button
                key={`${category.uniqueURL}-${i}`}
                className="text-sm text-gray-700"
                onClick={() => handleNavigate(category)}
              >
                Sell {category.name}
              </button>
            ))}
        </FlexBox>
      </FlexBox>
      <hr className="sm:hidden bg-gray-300 h-[2px] w-full absolut" />
    </>
  );
};
