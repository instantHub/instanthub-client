import { FlexBox } from "@components/general";
import { useGetCategoriesQuery } from "@features/api";
import { ArrowDownIcon, ArrowUpIcon } from "@icons";
import { useCallback, useState, memo } from "react";
import { useNavigate } from "react-router-dom";

export const NavCategoriesList = memo(() => {
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  const { data: categoryData = [], isLoading: categoryLoading } =
    useGetCategoriesQuery();

  const handleNavigation = useCallback(
    (uniqueURL: string) => {
      setHoveredCategoryId(null);
      navigate(`${uniqueURL}`);
    },
    [navigate]
  );

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredCategoryId(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategoryId(null);
  }, []);

  const getDropdownPosition = useCallback(
    (id: string) => {
      if (categoryData[0]?.id === id) return "left-0";
      if (categoryData[categoryData.length - 1]?.id === id) return "right-0";
      return "left-1/2 -translate-x-1/2";
    },
    [categoryData]
  );

  if (categoryLoading) {
    return (
      <div className="hidden sm:flex border-b">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 w-full">
          <div className="flex w-full justify-evenly px-4 py-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-24 bg-gray-200 animate-pulse rounded"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative hidden sm:flex border-b text-xs">
      <div className="bg-gradient-to-r from-purple-50/50 via-white to-blue-50/50 w-full">
        <div className="flex w-full justify-evenly px-4 max-14inch:px-14">
          {categoryData.map((category) => (
            <div
              key={category.id}
              onClick={() => handleNavigation(category.uniqueURL)}
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
              className="relative flex flex-row items-center cursor-pointer group transition-all duration-300"
            >
              <span className="flex flex-col items-center">
                {/* Category Button */}
                <div
                  className={`
                    flex items-center gap-1 px-4 py-4 rounded-lg
                    transition-all duration-300
                    ${
                      hoveredCategoryId === category.id
                        ? "text-purple-600 bg-purple-50 font-semibold"
                        : "text-gray-700 hover:text-purple-600 hover:bg-purple-50/50"
                    }
                  `}
                >
                  <span>Sell {category.name}</span>
                  <span className="transition-transform duration-300">
                    {hoveredCategoryId === category.id ? (
                      <ArrowUpIcon size={16} />
                    ) : (
                      <ArrowDownIcon size={16} />
                    )}
                  </span>
                </div>

                {/* Dropdown Menu */}
                {hoveredCategoryId === category.id && (
                  <div
                    className={`
                      absolute z-50 top-full mt-2 pt-2
                      bg-white shadow-2xl rounded-xl p-4 min-w-[200px]
                      border border-purple-100
                      animate-slideDown
                      ${getDropdownPosition(category.id)}
                    `}
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Dropdown Arrow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-purple-100 rotate-45" />

                    <h2 className="py-2 font-bold text-gray-800 border-b border-purple-100 mb-2">
                      Popular Brands
                    </h2>

                    <FlexBox direction="col" align="start" className="gap-1">
                      {category.brands?.length ? (
                        category.brands.map((brand, i) => (
                          <button
                            key={`${brand.uniqueURL}-${i}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigation(
                                `${category.uniqueURL}/${brand.uniqueURL}`
                              );
                            }}
                            className="
                              w-full text-left py-2 px-3 rounded-lg 
                              text-gray-700 hover:bg-purple-50 hover:text-purple-600
                              transition-colors duration-200
                              flex items-center justify-between group/brand
                            "
                          >
                            <span>{brand.name}</span>
                            <svg
                              className="w-4 h-4 opacity-0 group-hover/brand:opacity-100 transition-opacity"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 py-2">
                          No brands available
                        </p>
                      )}
                    </FlexBox>
                  </div>
                )}

                {/* Active indicator */}
                {hoveredCategoryId === category.id && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
});

NavCategoriesList.displayName = "NavCategoriesList";
