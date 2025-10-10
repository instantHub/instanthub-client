import React from "react";

// Data for the legend items. Easy to maintain and update.
const legendItems = [
  {
    name: "Completed",
    description: "The order has been successfully fulfilled.",
    // Using solid colors for the key makes them easy to see.
    colorClass: "bg-green-500",
  },
  {
    name: "Assigned",
    description: "A pending order assigned to an executive for pickup.",
    colorClass: "bg-blue-500",
  },
  {
    name: "Unassigned",
    description:
      "A new order that requires attention and needs to be assigned.",
    colorClass: "bg-yellow-500",
  },
  {
    name: "Cancelled",
    description: "The order has been cancelled.",
    colorClass: "bg-red-500",
  },
];

interface IOrderStatusLegend {
  skip: "Completed" | "Assigned" | "Unassigned" | "Cancelled";
}

export const OrderStatusLegend: React.FC<IOrderStatusLegend> = ({ skip }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h3 className="text-md font-semibold mb-4 text-gray-800 border-b pb-2">
        Order Status Key
      </h3>
      <div className="space-y-3">
        {legendItems
          .filter((item) => item.name !== skip)
          .map((item) => (
            <div key={item.name} className="flex items-start">
              <div
                className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 mt-1 ${item.colorClass}`}
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-gray-700 text-sm">
                  {item.name}
                </p>
                <p className="text-gray-500 text-xs">{item.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
