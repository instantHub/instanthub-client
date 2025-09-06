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

      setProductsData(productRes.data);
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
    const url = `${product.category.uniqueURL}/${product.brand.uniqueURL}/${product.uniqueURL}`;
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
