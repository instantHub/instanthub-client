import { useGetCategoriesQuery } from "@features/api";
import { useMemo } from "react";

export const useCategoryImages = () => {
  const {
    data: categoryData = [],
    isLoading,
    isError,
  } = useGetCategoriesQuery();

  const categoryImages = useMemo(() => {
    return categoryData.reduce((acc: Record<string, string>, cat: any) => {
      if (!acc[cat.name]) acc[cat.name] = cat.image;
      return acc;
    }, {});
  }, [categoryData]);

  return { categoryImages, categoryData, isLoading, isError };
};
