import React from "react";
import BackButton from "./BackButton";
import ListButton from "./ListButton";
import { ROUTES } from "../../routes";

const CardHeader = ({ location, text, source }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="bold text-[1.4rem] mb-2 max-sm:text-sm">{text}</h1>
      <div className="flex items-center gap-1 ">
        <h2 className="max-sm:hidden">Home /</h2>
        <h2 className="pl-1 max-sm:hidden"> {text}</h2>

        {source === "create" ? (
          <ListButton
            location={ROUTES.admin.productsList}
            text={"Products List"}
          />
        ) : (
          <BackButton location={location} />
        )}
      </div>
    </div>
  );
};

export default CardHeader;
