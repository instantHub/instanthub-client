import { Fragment } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MAX_LABEL_LENGTH } from "@utils/user/constants";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  const formatLabel = (segment) => {
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return label.length > MAX_LABEL_LENGTH
      ? label.slice(0, MAX_LABEL_LENGTH) + "..."
      : label;
  };

  const createUrl = (index) => {
    return "/" + paths.slice(0, index + 1).join("/");
  };

  return (
    <nav className="w-full mx-0 mb-6 text-[16px] breadcrumbs ">
      <div className="flex items-center gap-1 max-sm:gap-[2px] text-[16px] max-sm:text-xs opacity-60">
        <Link to="/">Home</Link>
        {paths.map((segment, index) => {
          const isLast = index === paths.length - 1;
          const isLocation = index === 0; // 'bengaluru' is first segment
          const label = formatLabel(segment);

          return (
            <Fragment key={index}>
              <FaAngleRight />
              {isLast ? (
                <span className="font-semibold text-black">{label}</span>
              ) : isLocation ? (
                <span>{label}</span> // Unclickable location
              ) : (
                <Link to={createUrl(index)}>{label}</Link>
              )}
            </Fragment>
          );
        })}
      </div>
      <hr className="my-2" />
    </nav>
  );
};

export default Breadcrumbs;
