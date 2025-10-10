import React from "react";

// The data array makes it easy to modify which statuses are shown.
const legendItems = [
  { name: "Completed", colorClass: "bg-green-500" },
  { name: "Assigned", colorClass: "bg-blue-500" },
  { name: "Unassigned", colorClass: "bg-yellow-500" },
  { name: "Cancelled", colorClass: "bg-red-500" },
];

export const CompactOrderStatusLegend: React.FC = () => {
  return (
    <div className="flex justify-around items-center space-x-4 rounded-lg bg-white p-2 border border-gray-200 shadow-sm">
      {legendItems.map((item) => (
        <div key={item.name} className="flex items-center">
          <span
            className={`w-3 h-3 rounded-sm mr-2 ${item.colorClass}`}
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-gray-600">{item.name}</span>
        </div>
      ))}
    </div>
  );
};
