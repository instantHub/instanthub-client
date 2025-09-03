import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@routes";
import { NavMenu } from "./components";
import { NavCategoriesList } from "./components/NavCategoriesList";
import { SearchBar } from "../search";

export interface IActivePath {
  home: boolean;
  service: boolean;
  recycle: boolean;
}

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navOptions = useMemo(
    () => [
      { name: "Home", url: ROUTES.user.root },
      { name: "About", url: ROUTES.user.about },
      { name: "Contact", url: ROUTES.user.contactUs },
    ],
    []
  );

  const pathPrefix = location.pathname.substring(0, 4);
  const isServicePages = location.pathname.includes("/services");

  const [activePath, setActivePath] = useState({
    home: false,
    service: false,
    recycle: false,
  });

  useEffect(() => {
    const newPath = {
      home:
        pathPrefix === "/" &&
        !["/ser", "/rec", "/cat", "sell"].includes(pathPrefix),
      service: pathPrefix === "/ser",
      recycle: pathPrefix === "/rec",
    };
    setActivePath(newPath);
  }, [location.pathname]);

  const getNavLinkClass = (url: string) =>
    `px-2 py-1 border border-white rounded ${
      location.pathname === url ? "bg-instant-mid text-white" : ""
    } hover:border-secondary`;

  return (
    <>
      <nav className="bg-white text-black p-2 max-sm:py-1 max-sm:rounded-xl w-full mt-1 sticky top-0 z-50 border-b">
        <div className="max-w-full mx-auto px-4 max-2sm:px-1">
          <div className="flex items-center">
            <div className="flex items-center sm:grow">
              <Link to="/" onClick={scrollToTop}>
                <img
                  src="/images/instanthg-logo.png"
                  alt="InstantHub"
                  className="w-[65px] sm:w-[75px] p-1 sm:p-0"
                  loading="lazy"
                />
              </Link>
            </div>

            <SearchBar />

            <div className="hidden md:flex max-14inch:text-sm">
              <div className="flex items-center space-x-4 text-[16px] max-sm:text-sm">
                {navOptions.map((d, i) => (
                  <span key={i} className={getNavLinkClass(d.url)}>
                    <Link to={d.url}>{d.name}</Link>
                  </span>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-2 text-center absolute right-0">
            <ul className="flex flex-col bg-white text-black border p-4 items-center space-y-2 rounded text-[16px] max-sm:text-sm">
              {navOptions.map((d, i) => (
                <li key={i} className={getNavLinkClass(d.url)}>
                  <Link to={d.url}>{d.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <header className="max-sm:hidden w-full mx-auto ">
        <NavMenu activePath={activePath} />

        {!isServicePages && <NavCategoriesList />}
      </header>
    </>
  );
};
