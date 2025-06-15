import { EditIcon } from "@icons";
import { Link } from "react-router-dom";

const EditButton = ({ location }) => {
  const light =
    "bg-white border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white ";
  const dark = "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <div
      className={`${light} w-fit flex items-center font-bold py-2 px-4 max-sm:px-2 rounded max-sm:text-xs`}
    >
      <Link className="flex items-center gap-1" to={location}>
        <span className="max-sm:hidden">Edit</span>
        <EditIcon />
      </Link>
    </div>
  );
};

export default EditButton;
