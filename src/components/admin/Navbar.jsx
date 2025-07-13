import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLogoutMutation, useAdminProfileQuery } from "@api";
import { useNavigate } from "react-router-dom";
import { logout } from "@features/adminSlices/adminAuthSlice";
import { toast } from "react-toastify";
import { SideBarContext } from "@pages/admin";
import { ROUTES } from "@routes";
import { FiAlignLeft, LogoutIcon, MenuIcon, ProfileIcon } from "@icons";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminPanel);
  const { pathname } = useLocation();
  const { adminProfile, isLoading, isError } = useAdminProfileQuery();

  // const { toggleSidebar, isSidebarOpen } = props;
  const { isSidebarOpen, toggleSidebar } = useContext(SideBarContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [adminLogout] = useAdminLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await adminLogout({ admin }).unwrap();
      toast.success("Logged out successfully");
      dispatch(logout());
      console.log("before nav to lgoin");
      // navigate(ROUTES.admin.login);
      navigate("/admin/login");
    } catch (error) {}
  };

  // if (isError) {
  //   console.log("Error in Admin Profile mainfly for JWT Token Expiry", isError);
  //   navigate(ROUTES.admin.login);
  //   dispatch(logout());
  // }

  const handleClick = (event) => {
    event.preventDefault(); // Prevent default behavior
    startTransition(() => {
      window.history.pushState({}, "", to); // Programmatic navigation
    });
  };

  return (
    // <nav className="sticky flex justify-between items-center p-4 w-full  top-0 z-50">
    <nav
      className={`bg-white flex items-center py-3 max-sm:py-3 w-lvw sticky top-0 z-20 border-b max-14inch:py-0 max-2sm:mx-
              ${isSidebarOpen ? "justify-between" : "justify-between"}
    `}
    >
      {/* SideBar Open Toggle */}
      <button
        className={`${isSidebarOpen ? "" : " pl-5 text-3xl max-sm:text-xl"}`}
        onClick={() => {
          toggleSidebar();
        }}
      >
        <MenuIcon />
      </button>

      {/* Current Page Name */}
      <div>
        <p className="text-xl max-sm:text-xs font-serif font-semibold">
          {pathname
            .split("/")
            .filter((segment) => segment !== "")
            .slice(-1)[0]
            .toUpperCase()}
        </p>
      </div>

      {/* Admin Profile DropDown */}
      <div className="flex items-center ">
        {admin && (
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <button
                onClick={toggleDropdown}
                className="group ml-4 text-black focus:outline-none flex items-center gap-1"
              >
                <span>{admin.name}</span>
                <FiAlignLeft className="group-hover:animate-bounce" />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="absolute mt-32 bg-white rounded-lg shadow-lg">
                <div className="py-1">
                  <Link to={ROUTES.admin.updateProfile}>
                    <h2 className="px-4 py-2 text-gray-800 hover:bg-gray-300 flex items-center gap-1">
                      <span>Profile</span>
                      <ProfileIcon />
                    </h2>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex gap-1 items-center px-4 py-2 text-gray-800 hover:bg-gray-300"
                  >
                    <span>Logout</span>
                    <LogoutIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
