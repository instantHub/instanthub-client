import { RootState } from "@features/store";
import React from "react";
import { useSelector } from "react-redux";

export const PartnerDashboard: React.FC = () => {
  const { partner } = useSelector((state: RootState) => state.partnerPanel);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {partner?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your partnership today.
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>
                Last login:{" "}
                {partner?.lastLogin
                  ? new Date(partner.lastLogin).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
