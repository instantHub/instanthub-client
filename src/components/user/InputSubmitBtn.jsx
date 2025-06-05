import React from "react";

export const InputSubmitBtn = ({ loading, label, ariaLabel }) => {
  return (
    <input
      type="submit"
      value={`${!loading ? label : "Loading..."} `}
      className="mt-5 max-sm:mt-3 border rounded px-2 py-1 bg-green-600 text-white cursor-pointer hover:bg-green-700 max-sm:text-sm disabled:bg-secondary-light disabled:cursor-none"
      aria-label={ariaLabel}
      disabled={loading}
      aria-disabled={loading}
    />
  );
};
