// src/pages/executive/ExecutiveDashboard/components/QuickActions.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Calendar,
  AlertTriangle,
  CheckSquare,
} from "lucide-react";
import { IExecutiveStats } from "@features/api/executive/types";

interface QuickActionsProps {
  stats: IExecutiveStats;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ stats }) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "View All Orders",
      description: `${stats.overall.totalAssigned} total orders`,
      icon: ClipboardList,
      color: "blue",
      to: "/executive/orders",
    },
    {
      title: "Today's Orders",
      description: `${stats.today.total} orders scheduled`,
      icon: Calendar,
      color: "green",
      to: "/executive/orders?dateFilter=today",
    },
    {
      title: "Overdue Orders",
      description: `${stats.overall.overdue} need attention`,
      icon: AlertTriangle,
      color: "red",
      to: "/executive/orders?status=overdue",
      highlight: stats.overall.overdue > 0,
    },
    {
      title: "Pending Orders",
      description: `${stats.overall.pending} to complete`,
      icon: CheckSquare,
      color: "yellow",
      to: "/executive/orders?status=pending",
    },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.to)}
            className={`bg-white rounded-lg p-4 shadow-sm border-2 transition-all text-left hover:shadow-md ${
              action.highlight
                ? "border-red-300 ring-2 ring-red-100"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <div
              className={`inline-flex p-2 rounded-lg mb-3 bg-${action.color}-100`}
            >
              <action.icon className={`text-${action.color}-600`} size={20} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
