// // src/features/blog/BlogStats.tsx
// import React from "react";
// import { useGetBlogStatsQuery } from "@features/api";

// const BlogStats: React.FC = () => {
//   const { data, isLoading } = useGetBlogStatsQuery();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center p-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   const stats = data?.data;
//   const statusCounts = stats?.statusCounts || [];
//   const topBlogs = stats?.topBlogs || [];
//   const totalViews = stats?.totalViews || 0;

//   const getStatusCount = (status: string) => {
//     const found = statusCounts.find((s: any) => s._id === status);
//     return found?.count || 0;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Blogs</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">
//                 {statusCounts.reduce(
//                   (acc: number, curr: any) => acc + curr.count,
//                   0
//                 )}
//               </p>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-lg">
//               <svg
//                 className="w-8 h-8 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Published</p>
//               <p className="text-3xl font-bold text-green-600 mt-2">
//                 {getStatusCount("published")}
//               </p>
//             </div>
//             <div className="bg-green-100 p-3 rounded-lg">
//               <svg
//                 className="w-8 h-8 text-green-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Drafts</p>
//               <p className="text-3xl font-bold text-yellow-600 mt-2">
//                 {getStatusCount("draft")}
//               </p>
//             </div>
//             <div className="bg-yellow-100 p-3 rounded-lg">
//               <svg
//                 className="w-8 h-8 text-yellow-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Views</p>
//               <p className="text-3xl font-bold text-purple-600 mt-2">
//                 {totalViews.toLocaleString()}
//               </p>
//             </div>
//             <div className="bg-purple-100 p-3 rounded-lg">
//               <svg
//                 className="w-8 h-8 text-purple-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Top Blogs */}
//       <div className="bg-white rounded-lg shadow-sm p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//           Top 5 Blogs by Views
//         </h3>
//         <div className="space-y-3">
//           {topBlogs.length === 0 ? (
//             <p className="text-gray-500 text-center py-4">
//               No published blogs yet
//             </p>
//           ) : (
//             topBlogs.map((blog: any, index: number) => (
//               <div
//                 key={blog._id}
//                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold text-sm">
//                     {index + 1}
//                   </span>
//                   <div>
//                     <p className="font-medium text-gray-900">
//                       {blog.content?.title}
//                     </p>
//                     <p className="text-sm text-gray-500">/{blog.slug}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-lg font-semibold text-gray-900">
//                     {blog.views}
//                   </p>
//                   <p className="text-xs text-gray-500">views</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogStats;
