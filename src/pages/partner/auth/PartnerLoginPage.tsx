import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PartnerLoginForm } from "./PartnerLoginForm";
import { RootState } from "@features/store";
import { LockIcon, PlusIcon, ProfileIcon } from "@icons";

export const PartnerLoginPage: React.FC = () => {
  const { isAuthenticated, admin } = useSelector(
    (state: RootState) => state.adminPanel
  );

  // Redirect if already authenticated
  if (isAuthenticated && admin) {
    if (admin.role === "partner") {
      return <Navigate to="/partner/dashboard" replace />;
    }
    // return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Partner Portal
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Access your dedicated partner dashboard and manage your business
                operations.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <LockIcon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Secure Access
                  </h3>
                  <p className="text-gray-600">
                    Role-based authentication ensures you only see what's
                    relevant to your partnership.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <ProfileIcon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Partner Management
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive tools to manage your partner relationships and
                    activities.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <PlusIcon />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Analytics & Insights
                  </h3>
                  <p className="text-gray-600">
                    Real-time analytics to track performance and make
                    data-driven decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center">
            <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center mb-8">
                  <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <LockIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Partner Login
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Sign in to access your partner dashboard
                  </p>
                </div>

                <PartnerLoginForm />

                <div className="mt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Need help accessing your account?{" "}
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Contact support
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
