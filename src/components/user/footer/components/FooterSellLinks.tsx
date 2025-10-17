// src/components/layout/components/FooterSellLinks.tsx
import { FC, memo } from "react";
import { useGetCategoriesQuery } from "@features/api";
import { ICategoryResponse } from "@features/api/categories/types";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const FooterSellLinks: FC = memo(() => {
  const navigate = useNavigate();
  const { data: categoryData = [], isLoading: categoryLoading } =
    useGetCategoriesQuery();

  const handleNavigate = ({ uniqueURL }: ICategoryResponse) => {
    navigate(uniqueURL);
  };

  if (categoryLoading) {
    return (
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-800 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {categoryData.map((category, i) => (
        <li key={`${category.uniqueURL}-${i}`}>
          <button
            onClick={() => handleNavigate(category)}
            className="text-white hover:text-white transition-colors duration-200 flex items-center gap-2 group w-full text-left"
          >
            <ArrowRight
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
            />
            <span className="text-sm">Sell {category.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
});

FooterSellLinks.displayName = "FooterSellLinks";
