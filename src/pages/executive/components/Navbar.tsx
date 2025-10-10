import { FC } from "react";
import { LogoutIcon } from "@icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useLogoutMutation } from "@features/api";
import { ROUTES } from "@routes";
import { toast } from "react-toastify";
import { logout as logoutAction } from "@features/slices/auth/auth.slice";
import { RootState } from "@features/store";
import { TAdminRole } from "@utils/types";
import { FlexBox, Typography } from "@components/general";

export const Navbar: FC = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { admin } = useSelector((state: RootState) => state.adminPanel);

  const { pathname } = useLocation();
  const currentPage: string = pathname
    .split("/")
    .filter((segment) => segment !== "")
    .slice(-1)[0]
    .toUpperCase();

  const handleLogout = async () => {
    console.log("handleLogout");

    try {
      await logout({
        id: admin?._id ?? "",
        role: admin?.role as TAdminRole,
      }).unwrap();
      toast.success("Logged out successfully");
      dispatch(logoutAction());

      window.location.href = ROUTES.admin.loginPage;
    } catch (error) {}
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <FlexBox justify="between">
        <Typography variant="h5">{currentPage}</Typography>

        <FlexBox gap={2}>
          <h1 className="flex items-cente text-lg max-md:text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition">
            {admin?.name}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition"
          >
            <LogoutIcon className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </FlexBox>
      </FlexBox>
    </header>
  );
};
