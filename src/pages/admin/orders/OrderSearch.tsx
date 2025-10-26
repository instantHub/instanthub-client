// import { useState, useEffect } from "react";
// import { useDebounce } from "./hooks/useDebounce";

// export function OrderSearch() {
//   const [searchInput, setSearchInput] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Debounce the search input
//   const debouncedSearch = useDebounce(searchInput, 500);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!debouncedSearch) {
//         // Optionally fetch all orders when search is empty
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await fetch(
//           `/api/orders/by-status?search=${encodeURIComponent(
//             debouncedSearch
//           )}&status=all&page=1&limit=20`
//         );
//         const data = await response.json();

//         if (data.success) {
//           setOrders(data.data.orders);
//         }
//       } catch (error) {
//         console.error("Search error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [debouncedSearch]);

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchInput}
//         onChange={(e) => setSearchInput(e.target.value)}
//         placeholder="Search by Order ID, Name, Phone, City..."
//         className="search-input"
//       />

//       {loading && <div>Searching...</div>}

//       <div className="results">
//         {orders.map((order) => (
//           <div key={order.id}>
//             {order.orderId} - {order.customer.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
