import React from "react";
import { ROUTES } from "@routes";
import { Button } from "@components/general";
import { ArrowLeftIcon } from "@icons";
import { useNavigate } from "react-router-dom";
import { useCustomNavigation } from "@hooks";

export const CardHeader = ({ location, text, source }) => {
  const { goBack, navigateTo } = useCustomNavigation();

  return (
    <div className="flex justify-between items-center">
      <h1 className="bold text-[1.4rem] mb-2 max-sm:text-sm">{text}</h1>
      <div className="flex items-center gap-1 ">
        <h2 className="max-sm:hidden">Homes /</h2>
        <h2 className="pl-1 max-sm:hidden"> {text}</h2>

        {source === "create" ? (
          <Button
            size="sm"
            onClick={() => navigateTo(ROUTES.admin.productsList)}
          >
            Products Lists
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeftIcon />}
            onClick={goBack}
          >
            Back
          </Button>
        )}
      </div>
    </div>
  );
};
