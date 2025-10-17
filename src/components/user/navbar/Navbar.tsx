import { useState, useEffect, useCallback, memo, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Info, TrendingUp, Zap } from "lucide-react";
import { ROUTES } from "@routes";
import { SearchBar } from "../search";
import { NavMenu } from "./components";
import { NavCategoriesList } from "./components/NavCategoriesList";

export interface IActivePath {
  home: boolean;
  service: boolean;
  recycle: boolean;
}

export const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pathPrefix = location.pathname.substring(0, 4);
  const isServicePages = location.pathname.includes("/services");

  const activePath = useMemo(
    () => ({
      home:
        pathPrefix === "/" &&
        !["/ser", "/rec", "/cat", "/sel"].includes(pathPrefix),
      service: pathPrefix === "/ser",
      recycle: pathPrefix === "/rec",
    }),
    [pathPrefix]
  );

  const getNavLinkClass = useCallback(
    (url: string) => {
      const isActive = location.pathname === url;
      return `
      relative px-4 py-2 rounded-lg font-medium transition-all duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
          : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
      }
    `;
    },
    [location.pathname]
  );

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main Navbar */}
      <nav
        // className={`
        //   fixed top-0 left-0 right-0 z-50
        //   transition-all duration-300
        //   ${
        //     isScrolled
        //       ? "bg-white/98 backdrop-blur-xl shadow-xl border-b border-purple-100"
        //       : "bg-white shadow-md"
        //   }
        // `}
        className={`
          w-full sticky top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            isScrolled
              ? "bg-white/98 backdrop-blur-xl shadow-xl border-b border-purple-100"
              : "bg-white shadow-md"
          }
        `}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 md:gap-6 py-3 md:py-4">
            {/* Logo */}
            <Link
              to={ROUTES.user.root}
              className="flex-shrink-0 group relative"
              aria-label="InstantHub Home"
            >
              <img
                src="/images/logo-transparent.png"
                alt="InstantHub"
                className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105"
                width="80"
                height="48"
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-purple-400 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
            </Link>

            {/* Search Bar - Takes remaining space */}
            <div className="flex-1 max-w-3xl">
              <SearchBar />
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Sell Now CTA */}
              <button
                onClick={() => navigate(ROUTES.user.root)}
                className="
                  group relative px-5 py-3
                  bg-gradient-to-r from-instant-start via-instant-mid to-instant-end 
                  text-white font-semibold rounded-xl
                  hover:shadow-2xl hover:shadow-purple-500/50
                  hover:scale-105 active:scale-95
                  transition-all duration-300
                  overflow-hidden
                "
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-instant-end via-instant-mid to-instant-start opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="relative flex items-center gap-2 text-sm">
                  <Zap
                    size={18}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  Sell Now
                </span>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              {/* Quick Stats Badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <TrendingUp size={18} className="text-green-600" />
                <div className="text-left">
                  <p className="text-xs text-gray-600 leading-none">
                    Best Prices
                  </p>
                  <p className="text-sm font-bold text-green-600 leading-tight">
                    Guaranteed
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="
                lg:hidden flex-shrink-0 p-2 rounded-xl 
                hover:bg-purple-50 active:bg-purple-100
                transition-colors duration-200
              "
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <header className="max-sm:hidden w-full mx-auto bg-white top-[85px] z-40 shadow-sm">
        <NavMenu activePath={activePath} />
        {!isServicePages && <NavCategoriesList />}
      </header>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      {/* <div className="h-[100px] md:h-[88px]" /> */}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={toggleMobileMenu}
          />

          {/* Menu Panel */}
          <div className="fixed top-[100px] md:top-[88px] right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl animate-slideInRight">
            <div className="flex flex-col h-full">
              {/* Menu Header with Gradient */}
              <div className="p-6 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 text-white">
                <h2 className="text-xl font-bold mb-1">Quick Links</h2>
                <p className="text-sm text-purple-100">Explore InstantHub</p>
              </div>

              {/* Menu Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {/* Info Links */}
                  <li>
                    <Link
                      to={ROUTES.user.about}
                      className="
                        flex items-center gap-3 px-4 py-3 rounded-xl
                        text-gray-700 hover:bg-purple-50 hover:text-purple-600
                        transition-all duration-200
                        group
                      "
                    >
                      <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                        <Info size={20} className="text-purple-600" />
                      </div>
                      <span className="font-medium">About Us</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={ROUTES.user.contactUs}
                      className="
                        flex items-center gap-3 px-4 py-3 rounded-xl
                        text-gray-700 hover:bg-blue-50 hover:text-blue-600
                        transition-all duration-200
                        group
                      "
                    >
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <Phone size={20} className="text-blue-600" />
                      </div>
                      <span className="font-medium">Contact Us</span>
                    </Link>
                  </li>

                  {/* Divider */}
                  <li className="py-2">
                    <div className="border-t border-gray-200" />
                  </li>

                  {/* Trust Badges */}
                  <li className="px-4 py-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Best Price Guaranteed
                          </p>
                          <p className="text-xs text-gray-600">
                            Get top value for your gadgets
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Instant Payment
                          </p>
                          <p className="text-xs text-gray-600">
                            Quick & secure transactions
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Free Pickup
                          </p>
                          <p className="text-xs text-gray-600">
                            Doorstep service available
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>

              {/* Menu Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
                {/* Contact Info */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>Need help? Call us</span>
                </div>

                {/* Close Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="
                    w-full py-3 px-4 
                    bg-white border-2 border-gray-200
                    text-gray-700 font-medium rounded-xl
                    hover:bg-gray-50 active:scale-98
                    transition-all duration-200
                  "
                >
                  Close Menu
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
});

Navbar.displayName = "Navbar";
