import React, { useState } from "react";
import { ArrowLeftIcon } from "@icons";
import { SignIn } from "./AdminLoginPage";
import { PartnerLoginPage } from "@partner/auth";

const AdminIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const PartnerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

type LoginView = "selection" | "admin" | "partner";

export const LoginLandingPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<LoginView>("selection");

  const renderSelectionView = () => (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Welcome Back!
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please select your login method to continue.
          </p>
        </div>

        {/* Login Options */}
        <div className="space-y-4">
          {/* Admin Login Button */}
          <button
            onClick={() => setCurrentView("admin")}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
          >
            <span className="flex items-center">
              <AdminIcon />
              Login as Admin
            </span>
          </button>

          {/* Partner Login Button */}
          <button
            onClick={() => setCurrentView("partner")}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
          >
            <span className="flex items-center">
              <PartnerIcon />
              Login as Partner
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      {currentView !== "selection" && (
        <button
          onClick={() => setCurrentView("selection")}
          className="p-2 pr-5 flex gap-2 absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Go back to role selection"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          Back
        </button>
      )}

      {currentView === "selection" && renderSelectionView()}
      {currentView === "admin" && <SignIn />}
      {currentView === "partner" && <PartnerLoginPage />}

      <footer className="text-center mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Instant Hub. All rights reserved.
      </footer>
    </div>
  );
};
