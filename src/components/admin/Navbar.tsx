import { FC, useState } from "react";
import { useSidebar } from "@hooks";
import { FiAlignLeft, LogoutIcon, MenuIcon, ProfileIcon } from "@icons";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminLogoutMutation } from "@features/api";
import { ROUTES } from "@routes";
import { toast } from "react-toastify";
import { logout } from "@features/slices/auth/auth.slice";

export const Navbar: FC = () => {
  const { toggleSidebar } = useSidebar();

  const dispatch = useDispatch();
  const [adminLogout] = useAdminLogoutMutation();

  const { pathname } = useLocation();
  const currentPage: string = pathname
    .split("/")
    .filter((segment) => segment !== "")
    .slice(-1)[0]
    .toUpperCase();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("handleLogout");

    try {
      await adminLogout().unwrap();
      toast.success("Logged out successfully");
      dispatch(logout());
      console.log("before nav to lgoin");
      navigate(ROUTES.admin.loginPage);
    } catch (error) {}
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            aria-label="Open sidebar"
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          <h1 className="text-sm md:text-xl font-semibold text-gray-900">
            Admin - {currentPage}
          </h1>
        </div>

        {/* Add other navbar items here */}
        <div className="relative">
          {/* {admin && ( */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDropdown}
              className="group flex items-center gap-2 text-sm sm:text-lg font-medium text-gray-800 hover:text-black focus:outline-none"
            >
              {/* <span className="truncate max-w-[100px]">{admin.name}</span> */}
              <FiAlignLeft className="w-5 h-5 group-hover:animate-bounce transition-all" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-10 z-50 w-40 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
                <div className="flex flex-col py-2">
                  <Link
                    to={ROUTES.admin.updateProfile}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition"
                  >
                    <ProfileIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition"
                  >
                    <LogoutIcon className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* )} */}
        </div>
      </div>
    </header>
  );
};
