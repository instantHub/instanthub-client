import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@icons";

const BackButton = ({ location, text }) => {
  return (
    <div
      className={`${
        text ? `bg-blue-700 rounded` : `bg-black rounded hover:bg-gray-700`
      }  text-white text-lg max-sm:text-xs inline-block m-2 px-2 py-1  `}
    >
      <Link className="flex items-center justify-between" to={location}>
        <ArrowLeftIcon /> {text ? text : "Back"}
      </Link>
    </div>
  );
};

export default BackButton;
