// src/pages/executive/ExecutiveDashboard/ExecutiveDashboard.tsx
import React from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Star,
  Award,
  Package,
} from "lucide-react";

import { Loading } from "@components/user";
import { PerformanceCard, QuickActions, StatCard } from "./components";
import { useGetExecutiveStatsQuery } from "@features/api";

export const ExecutiveDashboard: React.FC = () => {
  const {
    data: stats,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetExecutiveStatsQuery();

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-red-600 text-sm mb-4">
            {error && "data" in error
              ? JSON.stringify(error.data)
              : "Failed to fetch dashboard data. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back, {stats?.executive.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your orders today.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 fill-yellow-500" size={20} />
                <span className="font-semibold text-lg">
                  {stats?.executive.rating.toFixed(1)}
                </span>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <Award className="text-green-600" size={20} />
                <span className="text-sm text-gray-600">
                  {stats?.executive.totalCompleted} completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <PerformanceCard
            title="Weekly Performance"
            value={stats?.performance.weeklyCompleted || 0}
            subtitle="orders completed this week"
            icon={TrendingUp}
            color="green"
          />
          <PerformanceCard
            title="Completion Rate"
            value={`${stats?.performance.completionRate}%`}
            subtitle="of assigned orders"
            icon={CheckCircle}
            color="blue"
          />
          <PerformanceCard
            title="Total Assigned"
            value={stats?.overall.totalAssigned || 0}
            subtitle="orders in total"
            icon={Package}
            color="purple"
          />
        </div>

        {/* Today's Overview */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Today's Schedule
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Orders"
              count={stats?.today.total || 0}
              icon={Calendar}
              color="blue"
              to="/executive/orders?dateFilter=today"
            />
            <StatCard
              title="Pending"
              count={stats?.today.pending || 0}
              icon={Clock}
              color="yellow"
              to="/executive/orders?status=pending&dateFilter=today"
            />
            <StatCard
              title="Completed"
              count={stats?.today.completed || 0}
              icon={CheckCircle}
              color="green"
              to="/executive/orders?status=completed&dateFilter=today"
            />
            <StatCard
              title="Overdue"
              count={stats?.today.overdue || 0}
              icon={AlertCircle}
              color="red"
              to="/executive/orders?status=overdue"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions stats={stats!} />

        {/* Tomorrow's Preview */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tomorrow's Schedule
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
            <StatCard
              title="Total Orders"
              count={stats?.tomorrow.total || 0}
              icon={Calendar}
              color="indigo"
              to="/executive/orders?dateFilter=tomorrow"
            />
            <StatCard
              title="Pending"
              count={stats?.tomorrow.pending || 0}
              icon={Clock}
              color="orange"
              to="/executive/orders?status=pending&dateFilter=tomorrow"
            />
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Overall Statistics
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Assigned"
              count={stats?.overall.totalAssigned || 0}
              icon={Package}
              color="purple"
              to="/executive/orders"
            />
            <StatCard
              title="Pending"
              count={stats?.overall.pending || 0}
              icon={Clock}
              color="yellow"
              to="/executive/orders?status=pending"
            />
            <StatCard
              title="Completed"
              count={stats?.overall.completed || 0}
              icon={CheckCircle}
              color="green"
              to="/executive/orders?status=completed"
            />
            <StatCard
              title="Overdue"
              count={stats?.overall.overdue || 0}
              icon={AlertCircle}
              color="red"
              to="/executive/orders?status=overdue"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
