import React from "react";
import { Link } from "react-router-dom";

export const ItemGrid = ({ items, linkPath, displayBig = false }) => {
  return (
    <>
      {items?.map((item) => (
        <div className="flex justify-center" key={item.id}>
          <Link
            to={`${linkPath}/${item.uniqueURL}`}
            className={`p-4 flex bg-white cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl 
                transition ease-in-out duration-500 ${
                  displayBig
                    ? `w-32 h-32 max-sm:w-24 max-sm:h-24`
                    : `w-28 h-28 max-sm:w-24 max-sm:h-24`
                }`}
          >
            <img
              src={import.meta.env.VITE_APP_BASE_URL + item?.image}
              alt={item?.name || "Item"}
              className="justify-center"
              loading="lazy" // Native lazy loading
            />
          </Link>
        </div>
      ))}
    </>
  );
};

// className="w-32 p-4 h-32 flex cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500 bg-white"
