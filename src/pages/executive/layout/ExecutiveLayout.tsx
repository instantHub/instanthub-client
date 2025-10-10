import { useEffect } from "react";
import { Navbar } from "../components";
import { useDispatch } from "react-redux";
import { useAdminProfileQuery } from "@features/api";
import { setCredentials } from "@features/slices";
import { Outlet } from "react-router-dom";

export const ExecutiveLayout = () => {
  const { data: user, isSuccess } = useAdminProfileQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setCredentials({ admin: user }));
    }
  }, [isSuccess, user, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-2 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};
