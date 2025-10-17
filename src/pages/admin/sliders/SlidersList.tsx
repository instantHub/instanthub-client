import { useGetAllSlidersQuery } from "@api";
import { SliderCard } from "./components";

// You can create these simple components for a better UX
const LoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-56 w-full"></div>
);

const EmptyState = () => (
  <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
    <h3 className="text-lg font-medium text-gray-700">No Sliders Found</h3>
    <p className="mt-1 text-sm text-gray-500">
      Create a new slider to see it here.
    </p>
  </div>
);

export const SlidersList = () => {
  const {
    data: slidersList,
    isLoading,
    isError,
  } = useGetAllSlidersQuery(undefined);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="border-b border-gray-200 pb-5 mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Sliders
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage the images in your website's carousel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && (
          // Show skeleton loaders while fetching data
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        )}

        {!isLoading &&
          slidersList &&
          slidersList.length > 0 &&
          // @ts-ignore
          slidersList.map((slider) => (
            // @ts-ignore
            <SliderCard key={slider.id} slider={slider} />
          ))}

        {!isLoading && (!slidersList || slidersList.length === 0) && (
          <EmptyState />
        )}

        {isError && (
          <p className="col-span-full text-center text-red-500">
            Failed to load sliders.
          </p>
        )}
      </div>
    </div>
  );
};
