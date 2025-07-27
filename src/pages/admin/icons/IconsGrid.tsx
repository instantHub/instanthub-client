import { FC, useEffect } from "react";
import * as ICONS from "@icons";

const iconList = Object.entries(ICONS).map(([name, Icon]) => ({
  name,
  Icon,
}));

export const IconsGrid: FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Available Icons</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {iconList.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition"
          >
            {/* <Icon */}
            <Icon className="w-8 h-8 mb-2" />
            <span className="text-sm text-center">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
