import React from "react";

// Define the shape of a single statistic item
type StatItem = {
  label: string;
  value: string | number;
};

// Define the props for our card component
type StatsCardProps = {
  title: string;
  icon?: React.ReactNode; // Icon is optional
  stats: StatItem[];
  actions: React.ReactNode; // Pass buttons or links here
  className?: string;
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  icon,
  stats,
  actions,
  className = "",
}) => {
  return (
    <div
      className={`min-w-[300px] bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col h-full ${className}`}
    >
      {/* Icon and Title Section */}
      <div className="flex flex-col items-center text-center">
        {icon && <div className="mb-3 text-green-500">{icon}</div>}
        <h3 className="text-md font-semibold text-slate-600">{title}</h3>
      </div>

      {/* Stats List */}
      <div className="my-3 space-y-3 text-sm">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-center items-center">
            <span className="font-semibold text-slate-800">{stat.label}:</span>
            <span className="text-slate-600 truncate ml-2">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons - Pushed to the bottom */}
      <div className="mt-auto pt-3 text-center">{actions}</div>
    </div>
  );
};
