import { Link, useNavigate } from "react-router-dom";
import { FC } from "react";
import { IServiceCategory } from "@features/api/servicesApi/types";

export interface IServiceCategoryItemProps {
  service: IServiceCategory;
  displayBig?: boolean;
  showTitle: boolean;
}

export const ServiceCategoryItem: FC<IServiceCategoryItemProps> = ({
  service,
  displayBig,
  showTitle = false,
}) => {
  const navigate = useNavigate();
  const handleNavigate = (): void => {
    navigate(service.uniqueURL, { state: service });
  };
  return (
    <div className="flex justify-center" key={service._id}>
      <div
        onClick={handleNavigate}
        // to={service.uniqueURL}
        className={`flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white  sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500 ${
          displayBig ? `w-32 h-32` : `w-28 h-28`
        } max-sm:w-24 max-sm:h-24`}
      >
        <div className="flex horizontal w-28 h-28 items-center justify-center max-sm:w-24 max-sm:h-24">
          <img
            src={`${import.meta.env.VITE_APP_BASE_URL}${service?.image}`}
            alt={service?.name}
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
      </div>
    </div>
  );
};
