import { AlertCircle } from "@icons";

export const AccessDenied: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
    <p className="text-gray-600 text-center max-w-md">
      You don't have the required permissions to access this content. Please
      contact your administrator if you believe this is an error.
    </p>
  </div>
);
