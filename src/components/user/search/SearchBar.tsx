// import { useState, useEffect, useRef, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./searchStyle.css";
// import axios from "axios";
// import { generatePathWithParams } from "@utils/general/generatePathWithParams";
// import { ROUTES } from "@routes";
// import { determineServicePath } from "@utils/user/determineServicePath";
// import { LaptopIcon, MobileIcon, SearchIcon, ServiceIcon } from "@icons";

// export const SearchBar = () => {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [productsData, setProductsData] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(false);
//   const [servicesData, setServicesData] = useState([]);
//   const [servicesLoading, setServicesLoading] = useState(false);
//   //   console.log("search", search);

//   const navigate = useNavigate();

//   // console.log("productsData", productsData);

//   const handleSearch = async (e, from) => {
//     let searchValue;

//     if (from.includes("input")) {
//       searchValue = e.target.value;
//     } else {
//       searchValue = e;
//     }
//     // console.log("searchValue", searchValue);
//     try {
//       setProductsLoading(true);
//       setServicesLoading(true);

//       let response = await axios.get(
//         `${import.meta.env.VITE_APP_BASE_URL}/api/products`,
//         {
//           params: {
//             search: searchValue.trim() ? searchValue : undefined,
//             page,
//             limit: 10,
//           },
//         }
//       );

//       let services = await axios.get(
//         `${import.meta.env.VITE_APP_BASE_URL}/api/services/search`,
//         {
//           params: {
//             search: searchValue.trim() ? searchValue : undefined,
//             page,
//             limit: 10,
//           },
//         }
//       );

//       // console.log("services from search", services.data);

//       setProductsData(response.data);
//       // console.log("products count", response.data.totalProducts);
//       if (response.data.totalProducts === 0) {
//         setServicesData(services.data);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setProductsLoading(false);
//       setServicesLoading(false);
//     }
//   };

//   const handleScroll = () => {
//     // console.log("scroll", search);
//     if (
//       productListRef.current.scrollTop === 0 &&
//       page > 1 &&
//       !productsLoading
//     ) {
//       setPage((prevPage) => prevPage - 1); // Decrement page number for previous page
//       //   handleSearch();
//       debounceCallApi(search, "scroll");
//     } else if (
//       productListRef.current.scrollHeight - productListRef.current.scrollTop ===
//         productListRef.current.clientHeight &&
//       hasMore &&
//       !productsLoading
//     ) {
//       setPage((prevPage) => prevPage + 1); // Increment page number for next page
//       //   handleSearch();
//       debounceCallApi(search, "scroll");
//     }
//   };

//   const debounce = (myFunc, wait = 500) => {
//     let timerId;
//     return (...args) => {
//       clearTimeout(timerId);
//       timerId = setTimeout(() => myFunc(...args), wait);
//     };
//   };

//   const debounceCallApi = useMemo(() => debounce(handleSearch, 800), []);
//   //   const debounceScroll = useMemo(() => debounce(handleScroll, 400), []);

//   const productListRef = useRef(null);

//   useEffect(() => {
//     setPage(1); // Reset page number on new search
//   }, [search]);

//   useEffect(() => {
//     if (!productsLoading && productsData) {
//       setHasMore(productsData.totalPages > page);
//     }
//   }, [productsLoading, productsData, page]);

//   // Function to clear the search
//   const clearSearch = () => {
//     // console.log("clear search");
//     setSearch("");
//   };

//   useEffect(() => {
//     // Add event listener to document for click events
//     document.addEventListener("click", clearSearch);

//     // Remove event listener when component unmounts
//     return () => {
//       document.removeEventListener("click", clearSearch);
//     };
//   }, []); // Empty dependency array to run effect only once on mount

//   const navigateTo = (product) => {
//     const location = localStorage.getItem("location");
//     const { category, brand } = product;
//     const url = `${location}/${category.uniqueURL}/${brand.uniqueURL}/${product.uniqueURL}`;
//     navigate(url);
//   };

//   return (
//     <div className="bg-white grow border rounded mx-4 md:w-80 sm:w-64 max-2sm:w-[58%] max-2sm:mx-2">
//       <div className="flex pl- items-center bg-gray-100 pl-2">
//         <SearchIcon className="text-gray-500" />
//         <input
//           aria-label="Search"
//           type="search"
//           name="search"
//           value={search}
//           id="search"
//           className="text-black grow bg-gray-100 px-2 text-sm py-2 focus:bg-transparent outline-none"
//           placeholder={`Search for Mobiles, Laptops etc.. `}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             // handleSearch();
//             debounceCallApi(e, "inputTag");
//             // debounceCallApi(e);
//           }}
//         />
//       </div>

//       {search && !productsLoading && productsData && (
//         <div
//           //   className="absolute bg-white text-black flex flex-col p-4 rounded max-w-[500px] max-h-[270px] overflow-y-auto scrollbar w-fit "
//           className="absolute bg-white text-black flex flex-col p-4 rounded max-h-[270px] overflow-y-auto scrollbar "
//           // style={{ maxHeight: "200px", overflowY: "scroll" }}
//           ref={productListRef}
//           onScroll={handleScroll}
//           //   onScroll={debounceScroll(search)}
//         >
//           {!productsLoading &&
//             productsData?.products?.map((product, index) => (
//               <div key={index} onClick={clearSearch}>
//                 <button onClick={() => navigateTo(product)}>
//                   <button className="flex items-center gap-1 py-2 border-b">
//                     {product.category.name.toLowerCase().includes("laptop") ? (
//                       <LaptopIcon />
//                     ) : (
//                       <MobileIcon />
//                     )}

//                     <h2 className="">{product.name}</h2>
//                   </button>
//                 </button>
//               </div>
//             ))}
//         </div>
//       )}

//       {search && !servicesLoading && servicesData && (
//         <div
//           className={`${
//             productsData.totalProducts > 0 ? "hidden" : ""
//           } absolute bg-white text-black flex flex-col p-4 rounded max-h-[270px] overflow-y-auto scrollbar`}
//           ref={productListRef}
//           onScroll={handleScroll}
//         >
//           {!servicesLoading &&
//             servicesData?.services?.map((service, index) => (
//               <Link key={index} to={determineServicePath(service)}>
//                 <div onClick={clearSearch}>
//                   <button className="flex items-center gap-1 py-2 border-b">
//                     <ServiceIcon />
//                     <h2 className="">{service.name}</h2>
//                   </button>
//                 </div>
//               </Link>
//             ))}
//           {search && servicesData && (
//             <div className="text-sm max-sm:text-sm">No such item</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

import { useState, useEffect, useRef, useMemo, ChangeEvent, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { determineServicePath } from "@utils/user/determineServicePath";
import { LaptopIcon, MobileIcon, SearchIcon, ServiceIcon } from "@icons";
import "./searchStyle.css";

interface Product {
  name: string;
  uniqueURL: string;
  category: { uniqueURL: string; name: string };
  brand: { uniqueURL: string };
}

interface ProductResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
}

interface Service {
  name: string;
  uniqueURL: string;
}

interface ServiceResponse {
  services: Service[];
}

export const SearchBar: FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [productsData, setProductsData] = useState<ProductResponse | null>(
    null
  );
  const [servicesData, setServicesData] = useState<ServiceResponse | null>(
    null
  );

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);

  const navigate = useNavigate();
  const productListRef = useRef<HTMLDivElement | null>(null);

  const debounce = (func: (...args: any[]) => void, delay = 200) => {
    let timer: number | undefined;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchResults = async (query: string) => {
    try {
      setLoadingProducts(true);
      setLoadingServices(true);

      const trimmedQuery = query.trim();
      const params = {
        search: trimmedQuery || undefined,
        page,
        limit: 10,
      };

      const productRes = await axios.get<ProductResponse>(
        `${import.meta.env.VITE_APP_BASE_URL}/api/products`,
        { params }
      );

      // const [productRes, serviceRes] = await Promise.all([
      //   axios.get<ProductResponse>(
      //     `${import.meta.env.VITE_APP_BASE_URL}/api/products`,
      //     { params }
      //   ),
      //   axios.get<ServiceResponse>(
      //     `${import.meta.env.VITE_APP_BASE_URL}/api/services/search`,
      //     { params }
      //   ),
      // ]);

      setProductsData(productRes.data);
      // setServicesData(
      //   productRes.data.totalProducts === 0 ? serviceRes.data : null
      // );
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoadingProducts(false);
      setLoadingServices(false);
    }
  };

  const debouncedSearch = useMemo(() => debounce(fetchResults, 800), [page]);

  useEffect(() => {
    setPage(1); // Reset page on new search
  }, [search]);

  useEffect(() => {
    if (productsData) {
      setHasMore(productsData.totalPages > page);
    }
  }, [productsData, page]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    debouncedSearch(query);
  };

  const handleScroll = () => {
    const ref = productListRef.current;
    if (!ref || loadingProducts) return;

    const { scrollTop, scrollHeight, clientHeight } = ref;

    if (scrollTop === 0 && page > 1) {
      setPage((prev) => prev - 1);
      debouncedSearch(search);
    } else if (scrollHeight - scrollTop === clientHeight && hasMore) {
      setPage((prev) => prev + 1);
      debouncedSearch(search);
    }
  };

  const clearSearch = () => setSearch("");

  useEffect(() => {
    document.addEventListener("click", clearSearch);
    return () => document.removeEventListener("click", clearSearch);
  }, []);

  const handleProductClick = (product: Product) => {
    const location = localStorage.getItem("location");
    const url = `${location}/${product.category.uniqueURL}/${product.brand.uniqueURL}/${product.uniqueURL}`;
    navigate(url);
    clearSearch();
  };

  return (
    <div className="bg-white grow border rounded mx-4 md:w-80 sm:w-64 max-2sm:w-[58%] max-2sm:mx-2">
      <div className="flex items-center bg-gray-100 pl-2">
        <SearchIcon className="text-gray-500" />
        <input
          aria-label="Search"
          type="search"
          name="search"
          id="search"
          value={search}
          placeholder="Search for Mobiles, Laptops etc.."
          className="text-black grow bg-gray-100 px-2 text-sm py-2 focus:bg-transparent outline-none"
          onChange={handleInputChange}
        />
      </div>

      {search && !loadingProducts && productsData && (
        <div
          className="absolute bg-white text-black flex flex-col p-4 rounded max-h-[270px] overflow-y-auto scrollbar"
          ref={productListRef}
          onScroll={handleScroll}
        >
          {productsData.products.map((product) => (
            <button
              key={product.uniqueURL}
              className="flex items-center gap-1 py-2 border-b text-left w-full"
              onClick={() => handleProductClick(product)}
            >
              {product.category.name.toLowerCase().includes("laptop") ? (
                <LaptopIcon />
              ) : (
                <MobileIcon />
              )}
              <span>{product.name}</span>
            </button>
          ))}
        </div>
      )}

      {search && !loadingServices && servicesData && (
        <div
          className={`${
            productsData?.totalProducts ? "hidden" : ""
          } absolute bg-white text-black flex flex-col p-4 rounded max-h-[270px] overflow-y-auto scrollbar`}
          ref={productListRef}
          onScroll={handleScroll}
        >
          {servicesData.services.map((service) => (
            <Link
              key={service.uniqueURL}
              to={determineServicePath(service)}
              onClick={clearSearch}
            >
              <div className="flex items-center gap-1 py-2 border-b">
                <ServiceIcon />
                <span>{service.name}</span>
              </div>
            </Link>
          ))}
          {!servicesData.services.length && (
            <div className="text-sm">No such item</div>
          )}
        </div>
      )}
    </div>
  );
};
