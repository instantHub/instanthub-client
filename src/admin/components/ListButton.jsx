import React from "react";
import { Link } from "react-router-dom";

const ListButton = ({ location, text }) => {
  return (
    <div className="bg-blue-700 text-white px-2 py-1 rounded-md cursor-pointer max-md:text-xs">
      <Link to={location}>{text}</Link>
    </div>
  );
};

export default ListButton;
