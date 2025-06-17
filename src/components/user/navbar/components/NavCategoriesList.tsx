import { FlexBox } from "@components/general";
import { useGetCategoriesQuery } from "@features/api";
import { ArrowDownIcon, ArrowUpIcon } from "@icons";
import { ROUTES } from "@routes";
import { generatePathWithParams } from "@utils/general";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavCategoriesList = () => {
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );

  const navigate = useNavigate();

  const { data: categoryData = [], isLoading: categoryLoading } =
    useGetCategoriesQuery();

  const handleNavigation = useCallback(
    (to: string, uniqueURL: string) => {
      const geoLocation = localStorage.getItem("location") || "";
      if (to === "brands") navigate(`${geoLocation}/${uniqueURL}`);
      else if (to === "products")
        navigate(generatePathWithParams(ROUTES.user.products, uniqueURL));
    },
    [navigate]
  );

  const getDropdownPosition = (id: string) => {
    if (categoryData[0]?.id === id) return "left-0";
    if (categoryData[categoryData.length - 1]?.id === id) return "right-0";
    return "";
  };

  return (
    <div className="relative hidden sm:flex pb-3 border-b text-sm">
      <div className="bg-primary-bg shadow-bottom1 w-full">
        <div className="flex w-full justify-evenly px-4 max-14inch:px-14">
          {!categoryLoading &&
            categoryData.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  setHoveredCategoryId(null);
                  handleNavigation("brands", category.uniqueURL);
                }}
                onMouseEnter={() => setHoveredCategoryId(category.id)}
                onMouseLeave={() => setHoveredCategoryId(null)}
                className="relative flex flex-row items-center cursor-pointer group/navigation pt-4 hover:border-t-[3px] hover:border-t-secondary hover:pt-[13px]"
              >
                <span className="flex flex-col items-center">
                  <div className="hover:text-secondary flex items-center gap-1">
                    <span>Sell {category.name}</span>
                    {hoveredCategoryId === category.id ? (
                      <ArrowUpIcon size={16} />
                    ) : (
                      <ArrowDownIcon size={16} />
                    )}
                  </div>
                  {hoveredCategoryId === category.id && (
                    <div
                      className={`absolute z-10 top-full mt-0 pt-3 bg-white shadow-md p-2 w-full ${getDropdownPosition(
                        category.id
                      )}`}
                      onMouseEnter={() => setHoveredCategoryId(category.id)}
                    >
                      <h2 className="py-2 font-bold">Brands</h2>
                      <FlexBox direction="col" align="start">
                        {category.brands?.length ? (
                          category.brands.map((brand, i) => (
                            <button
                              key={`${brand.uniqueURL}-${i}`}
                              // onClick={() =>
                              //   handleNavigation("products", brand.uniqueURL)
                              // }
                              className="py-1 px-2 rounded hover:bg-gray-100"
                            >
                              {brand.name}
                            </button>
                          ))
                        ) : (
                          <li className="text-sm">No Brands</li>
                        )}
                      </FlexBox>
                    </div>
                  )}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
