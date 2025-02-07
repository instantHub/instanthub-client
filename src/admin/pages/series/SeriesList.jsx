import React, { useEffect, useState } from "react";
import {
  useGetAllSeriesQuery,
  useDeleteSeriesMutation,
} from "../../../features/api";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import EditButton from "../../components/EditButton";
import Table from "../../components/TableView";
import ConfirmationModal from "../../components/ConfirmationModal";
import SeriesCard from "./SeriesCard";

const SeriesList = () => {
  const { data: seriesData, isLoading: seriesLoading } = useGetAllSeriesQuery();
  const [deleteSeries] = useDeleteSeriesMutation();

  if (!seriesLoading) {
    console.log("seriesData", seriesData);
  }

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [seriesToDelete, setSeriesToDelete] = useState("");

  const handleDelete = async (seriesId) => {
    console.log("delete series", seriesId);
    try {
      const deletedSeries = await deleteSeries(seriesId);
      toast.success(deletedSeries.message);
    } catch (error) {
      console.log("Error while deleting Series:", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-[5%] w-fit max-sm:w-[99%] mx-auto">
        <h1 className="text-2xl py-2 font-serif">Series List</h1>
        {/* Series Cards */}
        <div className="mt-2 mb-5 flex flex-col items-center">
          <div className="w-full px-10 max-sm:px-2 mx-auto grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4 max-sm:gap-2 ">
            {seriesData?.map((series) => {
              return (
                <SeriesCard
                  key={series.id}
                  data={series}
                  setModalOpen={setModalOpen}
                  setSeriesToDelete={setSeriesToDelete}
                />
              );
            })}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={seriesToDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this series? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default SeriesList;
