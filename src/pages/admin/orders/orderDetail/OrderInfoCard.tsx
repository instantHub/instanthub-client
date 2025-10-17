import React from "react";
import { LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useCollapse } from "./OrderDetail2";
import { Typography } from "@components/general";

interface OrderInfoCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  borderColor?: string;
}

export const OrderInfoCard: React.FC<OrderInfoCardProps> = ({
  id,
  icon: Icon,
  title,
  children,
  borderColor = "border-gray-200",
}) => {
  const { openCards, toggleCard } = useCollapse();
  const isOpen = openCards.has(id);

  return (
    <div
      className={`bg-white rounded-lg border-2 ${borderColor} shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
    >
      <button
        onClick={() => toggleCard(id)}
        className="w-full flex items-center justify-between gap-3 p-3 lg:p-4 sm:p-6 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`card-content-${id}`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Icon className="text-gray-700" size={20} />
          </div>
          <Typography variant="h5">{title}</Typography>
        </div>

        <div className="shrink-0">
          {isOpen ? (
            <ChevronUp className="text-gray-500" size={20} />
          ) : (
            <ChevronDown className="text-gray-500" size={20} />
          )}
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div
          id={`card-content-${id}`}
          className="px-4 pb-4 sm:px-6 sm:pb-6 pt-3 space-y-1 border-t"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
