import { Link } from "react-router-dom";
import { FC } from "react";
import { IServiceData } from "@types";

export interface IServiceGridProps {
  service: IServiceData;
  displayBig: boolean;
  showTitle: boolean;
}

export const ServiceItemGrid: FC<IServiceGridProps> = ({
  service,
  displayBig,
  showTitle = false,
}) => {
  return (
    <div className="flex justify-center" key={service.id}>
      <Link
        to={service.path}
        className={`flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white  sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500 ${
          displayBig ? `w-32 h-32` : `w-28 h-28`
        } max-sm:w-24 max-sm:h-24`}
      >
        <div className="flex horizontal w-28 h-28 items-center justify-center max-sm:w-24 max-sm:h-24">
          <img
            src={service.image}
            alt="service"
            className={`${
              showTitle ? "w-28 h-28 max-sm:w-20 max-sm:h-20" : "justify-center"
            } `}
          />
        </div>
        {/* Optional: display service name */}
        {showTitle && (
          <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
            <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
              {service.name}
            </div>
          </span>
        )}
      </Link>
    </div>
  );
};
