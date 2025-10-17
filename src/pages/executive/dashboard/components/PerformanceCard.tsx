import React from "react";
import { LucideIcon } from "lucide-react";

interface PerformanceCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  color: "green" | "blue" | "purple";
}

const colorMap = {
  green: "from-green-500 to-green-600",
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
};

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) => {
  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} rounded-xl p-6 text-white shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium opacity-90">{title}</h3>
        <Icon size={24} className="opacity-80" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold mb-1">{value}</p>
      <p className="text-sm opacity-80">{subtitle}</p>
    </div>
  );
};
