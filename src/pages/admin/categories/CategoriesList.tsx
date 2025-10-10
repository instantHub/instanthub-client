import { useGetCategoriesQuery } from "@api";
import { Link } from "react-router-dom";
import { CategoryCard } from "./CategoryCard";
import { ROUTES } from "@routes";
import { Loading } from "@components/user";
import { ICategoryResponse } from "@features/api/categories/types";
import { Button, FlexBox, Typography } from "@components/general";
import { PlusIcon } from "@icons";

export const CategoriesList = () => {
  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoriesQuery();

  if (categoryDataLoading) return <Loading />;

  return (
    <div className="p-4 max-sm:p-2 max-sm:text-sm">
      <FlexBox direction={{ base: "col", sm: "row" }} justify="between">
        <Typography as="h2" variant="h3" className="max-md:text-sm">
          Categories List
        </Typography>

        <Button size="sm" rightIcon={<PlusIcon />}>
          <Link to={ROUTES.admin.createCategory}>Create Category</Link>
        </Button>
      </FlexBox>

      <div className="w-fit grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 max-sm:gap-3">
        {categoryData?.map((category: ICategoryResponse) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
