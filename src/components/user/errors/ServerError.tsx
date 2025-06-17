import { Link } from "react-router-dom";

export const ServerError = () => {
  return (
    <div className="min-h-[500px] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-bold text-red-600">500</h1>
        <p className="mt-4 text-2xl font-semibold text-red-700">Server Error</p>
        <p className="mt-2 text-gray-600">
          Sorry, pleaser retry or try after sometime.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-instant-mid text-white font-semibold rounded-lg shadow-md hover:bg-instant-mid/60 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
