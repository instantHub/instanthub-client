import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "./useAuth";
import {
  logout,
  updateSessionExpiry,
} from "@features/adminSlices/adminAuthSlice";
import { useRefreshTokenMutation } from "@api";

export const useSessionTimeout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, sessionExpiry, isSessionExpired } = useAuth();
  const [refreshToken] = useRefreshTokenMutation();

  const handleActivity = useCallback(() => {
    if (isAuthenticated && !isSessionExpired()) {
      dispatch(updateSessionExpiry());
    }
  }, [isAuthenticated, isSessionExpired, dispatch]);

  const handleSessionExpiry = useCallback(async () => {
    if (isAuthenticated && isSessionExpired()) {
      try {
        await refreshToken().unwrap();
        dispatch(updateSessionExpiry());
      } catch (error) {
        dispatch(logout());
      }
    }
  }, [isAuthenticated, isSessionExpired, refreshToken, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Activity listeners
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    // Session expiry check
    const interval = setInterval(handleSessionExpiry, 60000); // Check every minute

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearInterval(interval);
    };
  }, [isAuthenticated, handleActivity, handleSessionExpiry]);
};
