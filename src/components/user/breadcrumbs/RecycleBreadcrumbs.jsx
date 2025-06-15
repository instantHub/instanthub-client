import { Fragment } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { MAX_LABEL_LENGTH } from "@utils/user/constants";
import { ArrowRightIcon } from "@icons";

export const RecycleBreadcrumbs = () => {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const back = searchParams.get("b");
  // console.log("searchParams back:", back);

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
    return "/" + paths.slice(0, index).join(`/`);
  };

  // console.log("bread crumbs", paths);

  return (
    <nav className="w-full mx-0 mb-6 text-[16px] breadcrumbs ">
      <div className="flex items-center gap-1 max-sm:gap-[2px] text-[16px] max-sm:text-xs opacity-60">
        <Link to="/">Home</Link>
        {paths.map((segment, index) => {
          const label = formatLabel(segment);

          return (
            <Fragment key={index}>
              <ArrowRightIcon />
              <span>{label}</span>
            </Fragment>
          );
        })}
      </div>
      <hr className="my-2" />
    </nav>
  );
};
