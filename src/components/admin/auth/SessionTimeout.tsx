import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@hooks";
import { logout } from "@features/slices/auth/auth.slice";
import { useRefreshTokenMutation } from "@api";

// TODO: Check and remove this if not needed
export const SessionTimeout: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const dispatch = useDispatch();
  const { isAuthenticated, sessionExpiry } = useAuth();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    if (!isAuthenticated || !sessionExpiry) return;

    const checkSession = () => {
      const now = Date.now();
      const timeLeft = sessionExpiry - now;

      if (timeLeft <= 0) {
        dispatch(logout());
        return;
      }

      // Show warning 2 minutes before expiry
      if (timeLeft <= 2 * 60 * 1000) {
        setShowWarning(true);
        setCountdown(Math.ceil(timeLeft / 1000));
      } else {
        setShowWarning(false);
      }
    };

    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, sessionExpiry, dispatch]);

  const handleExtendSession = async () => {
    try {
      await refreshToken().unwrap();
      setShowWarning(false);
    } catch (error) {
      dispatch(logout());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Session Expiring Soon
        </h3>
        <p className="text-gray-600 mb-4">
          Your session will expire in {Math.floor(countdown / 60)}:
          {(countdown % 60).toString().padStart(2, "0")} minutes.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleExtendSession}
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Extend Session
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
