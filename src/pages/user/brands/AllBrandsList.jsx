// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useGetAllBrandQuery } from "../../features/api";
// import Loading from "../../components/loader/Loading";

// const AllBrandsList = () => {
//   const { data: brandsData, isLoading: brandsLoading } = useGetAllBrandQuery();

//   const [showAllBrands, setShowAllBrands] = useState(false);

//   const handleShowMoreBrands = () => {
//     setShowAllBrands(true);
//   };

//   const handleShowLessBrands = () => {
//     setShowAllBrands(false);
//   };

//   // if (!brandsLoading) {
//   //   console.log(brandsData);
//   // }

//   return (
//     <div>
//       <div className="my-10">
//         <h2 className="text-2xl flex gap-2 items-center border-b-[1px] border-b-secondary w-fit max-sm:text-xl">
//           Explore{" "}
//           {!brandsLoading && (
//             <span className="text-4xl font-semibold text-secondary">
//               {brandsData.length}
//             </span>
//           )}{" "}
//           leading Brands across our Categories.
//         </h2>
//       </div>
//       <div>
//         {brandsLoading ? (
//           <Loading />
//         ) : (
//           <div className="flex justify-center flex-wrap items-center h-full">
//             <div className="grid grid-cols-6 justify-center gap-2 w-[80%] max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-sm:w-full">
//               {brandsData.length > 0 ? (
//                 <>
//                   {brandsData
//                     .slice(0, showAllBrands ? brandsData.length : 5)
//                     .map((brand, i) => (
//                       <Link
//                         to={`/categories/brands/products/${brand.id}`}
//                         key={i}
//                         className=""
//                       >
//                         <div className="w-32 p-4 h-[136px] bg-white flex flex-col cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500">
//                           <div key={i}>
//                             <img
//                               src={
//                                 import.meta.env.VITE_APP_BASE_URL + brand.image
//                               }
//                               alt="CAT"
//                               className="items-center justify-center"
//                             />
//                           </div>
//                           <div className="text-center opacity-60">
//                             <h2>{brand.category.name}</h2>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   {!showAllBrands && brandsData.length > 5 && (
//                     <button
//                       onClick={handleShowMoreBrands}
//                       className="w-fit px-2  h-fit my-auto cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
//                     >
//                       Show More...
//                     </button>
//                   )}
//                   {showAllBrands && (
//                     <button
//                       onClick={handleShowLessBrands}
//                       className="w-fit px-2  h-fit my-auto cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
//                     >
//                       Show Less..
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>No Data Available</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllBrandsList;
