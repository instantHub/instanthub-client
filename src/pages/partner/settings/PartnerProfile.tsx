import React from "react";
import { RootState } from "@features/store";
import { useSelector } from "react-redux";

export const PartnerProfile: React.FC = () => {
  const { partner, loading } = useSelector(
    (state: RootState) => state.partnerPanel
  );
  console.log("partner from redux", partner);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-center text-gray-600">
        No profile information available.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md sm:p-8">
      <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row">
        <div className="h-28 w-28 rounded-full border-4 border-gray-200 object-cover shadow-sm">
          <span className="flex h-full w-full items-center justify-center bg-blue-100 text-4xl font-semibold text-blue-700">
            {partner.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-800 sm:text-left">
            {partner.name}
          </h1>
          <p className="text-center text-lg text-gray-500 sm:text-left">
            Company @ {partner.companyName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Contact Information
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-base text-gray-900">{partner.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-base text-gray-900">{partner.phone}</dd>
            </div>
          </dl>
        </div>

        {/* Account Details */}
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Account Details
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Account ID</dt>
              <dd className="mt-1 font-mono text-sm text-gray-900">
                {partner._id}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Login</dt>
              <dd className="mt-1 text-base text-gray-900">
                {new Date(partner.lastLogin ?? "").toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};
