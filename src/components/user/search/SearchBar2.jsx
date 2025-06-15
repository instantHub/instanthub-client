import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import "./searchStyle.css";
import axios from "axios";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";
import { determineServicePath } from "@utils/user/determineServicePath";
import { LaptopIcon, MobileIcon, SearchIcon, ServiceIcon } from "@icons";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [productsData, setProductsData] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  //   console.log("search", search);

  // console.log("productsData", productsData);

  const handleSearch = async (e, from) => {
    let searchValue;

    if (from.includes("input")) {
      searchValue = e.target.value;
    } else {
      searchValue = e;
    }
    // console.log("searchValue", searchValue);
    try {
      setProductsLoading(true);
      setServicesLoading(true);

      let response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/products`,
        {
          params: {
            search: searchValue.trim() ? searchValue : undefined,
            page,
            limit: 10,
          },
        }
      );

      let services = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/services/search`,
        {
          params: {
            search: searchValue.trim() ? searchValue : undefined,
            page,
            limit: 10,
          },
        }
      );

      // console.log("services from search", services.data);

      setProductsData(response.data);
      // console.log("products count", response.data.totalProducts);
      if (response.data.totalProducts === 0) {
        setServicesData(services.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
      setServicesLoading(false);
    }
  };

  const handleScroll = () => {
    // console.log("scroll", search);
    if (
      productListRef.current.scrollTop === 0 &&
      page > 1 &&
      !productsLoading
    ) {
      setPage((prevPage) => prevPage - 1); // Decrement page number for previous page
      //   handleSearch();
      debounceCallApi(search, "scroll");
    } else if (
      productListRef.current.scrollHeight - productListRef.current.scrollTop ===
        productListRef.current.clientHeight &&
      hasMore &&
      !productsLoading
    ) {
      setPage((prevPage) => prevPage + 1); // Increment page number for next page
      //   handleSearch();
      debounceCallApi(search, "scroll");
    }
  };

  const debounce = (myFunc, wait = 500) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => myFunc(...args), wait);
    };
  };

  const debounceCallApi = useMemo(() => debounce(handleSearch, 800), []);
  //   const debounceScroll = useMemo(() => debounce(handleScroll, 400), []);

  const productListRef = useRef(null);

  useEffect(() => {
    setPage(1); // Reset page number on new search
  }, [search]);

  useEffect(() => {
    if (!productsLoading && productsData) {
      setHasMore(productsData.totalPages > page);
    }
  }, [productsLoading, productsData, page]);

  // Function to clear the search
  const clearSearch = () => {
    // console.log("clear search");
    setSearch("");
  };

  useEffect(() => {
    // Add event listener to document for click events
    document.addEventListener("click", clearSearch);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", clearSearch);
    };
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div className="bg-white grow border rounded mx-4 md:w-80 sm:w-64 max-2sm:w-[58%] max-2sm:mx-2">
      <div className="flex pl- items-center bg-gray-100 pl-2">
        <SearchIcon className="text-gray-500" />
        <input
          aria-label="Search"
          type="search"
          name="search"
          value={search}
          id="search"
          className="text-black grow bg-gray-100 px-2 text-sm py-2 focus:bg-transparent outline-none"
          placeholder={`Search for Mobiles, Laptops etc.. `}
          onChange={(e) => {
            setSearch(e.target.value);
            // handleSearch();
            debounceCallApi(e, "inputTag");
            // debounceCallApi(e);
          }}
        />
      </div>

      {search && !productsLoading && productsData && (
        <div
          //   className="absolute bg-white text-black flex flex-col p-4 rounded max-w-[500px] max-h-[270px] overflow-y-auto scrollbar w-fit "
          className="absolute bg-white text-black flex flex-col p-4 rounded max-h-[270px] overflow-y-auto scrollbar "
          // style={{ maxHeight: "200px", overflowY: "scroll" }}
          ref={productListRef}
          onScroll={handleScroll}
          //   onScroll={debounceScroll(search)}
        >
          {!productsLoading &&
            productsData?.products?.map((product, index) => (
              <div key={index} onClick={clearSearch}>
                <Link
                  to={generatePathWithParams(
                    ROUTES.user.productDetails,
                    product.id
                  )}
                  // onClick={clearSearch}
                >
                  <button className="flex items-center gap-1 py-2 border-b">
                    {product.category.name.toLowerCase().includes("laptop") ? (
                      <LaptopIcon />
                    ) : (
                      <MobileIcon />
                    )}

                    <h2 className="">{product.name}</h2>
                  </button>
                </Link>
              </div>
            ))}
        </div>
      )}

      {search && !servicesLoading && servicesData && (
        <div
          className={`${
            productsData.totalProducts > 0 ? "hidden" : ""
          } absolute bg-white text-black flex flex-col p-4 rounded max-h-[270px] overflow-y-auto scrollbar`}
          ref={productListRef}
          onScroll={handleScroll}
        >
          {!servicesLoading &&
            servicesData?.services?.map((service, index) => (
              <Link key={index} to={determineServicePath(service)}>
                <div onClick={clearSearch}>
                  <button className="flex items-center gap-1 py-2 border-b">
                    <ServiceIcon />
                    <h2 className="">{service.name}</h2>
                  </button>
                </div>
              </Link>
            ))}
          {search && servicesData && (
            <div className="text-sm max-sm:text-sm">No such item</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
