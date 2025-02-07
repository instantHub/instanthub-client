// Orders

export const orderCurrentStatus = (status) => {
  if (status.pending)
    return (
      <span className="text-blue-600 bg-blue-200 text-xs px-2 py-[2px] rounded-full ">
        Pending
      </span>
    );
  if (status.completed)
    return (
      <span className="text-green-600 bg-green-200 text-xs px-2 py-[2px] rounded-full">
        Completed
      </span>
    );
  if (status.cancelled)
    return (
      <span className="text-red-600 bg-red-200 text-xs px-2 py-[2px] rounded-full">
        Cancelled
      </span>
    );
  return "Unknown";
};

export const orderViewBtnColor = (status) => {
  // if (status.pending) return "text-white bg-blue-500 hover:bg-blue-700";
  if (status.pending)
    return "border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white";
  if (status.completed)
    return "border border-green-600 text-green-600 hover:bg-green-700 hover:text-white";
  if (status.cancelled)
    return "border border-red-600 text-red-600 hover:bg-red-700 hover:text-white";
  return "bg-black text-white";
};
