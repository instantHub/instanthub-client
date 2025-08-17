export const SkeletonRow = () => (
  <div className="px-4 sm:px-6 py-4 animate-pulse">
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-6 sm:col-span-7 flex items-center space-x-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="flex gap-2">
            <div className="h-3 bg-gray-200 rounded w-10" />
            <div className="h-3 bg-gray-200 rounded w-10" />
          </div>
        </div>
      </div>
      <div className="col-span-3 sm:col-span-2 text-center">
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-1" />
        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
      </div>
      <div className="col-span-3 sm:col-span-3 text-center">
        <div className="h-8 bg-gray-200 rounded w-20 mx-auto" />
      </div>
    </div>
  </div>
);
