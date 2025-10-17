import React from "react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  color: "blue" | "green" | "yellow" | "red" | "purple" | "indigo" | "orange";
  to: string;
}

const colorMap = {
  blue: "bg-blue-100 text-blue-600 border-blue-200",
  green: "bg-green-100 text-green-600 border-green-200",
  yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
  red: "bg-red-100 text-red-600 border-red-200",
  purple: "bg-purple-100 text-purple-600 border-purple-200",
  indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
  orange: "bg-orange-100 text-orange-600 border-orange-200",
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  icon: Icon,
  color,
  to,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-2 border-transparent hover:border-gray-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="text-left">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          {count}
        </p>
        <p className="text-xs sm:text-sm text-gray-600">{title}</p>
      </div>
    </button>
  );
};
