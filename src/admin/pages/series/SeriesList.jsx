import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  useGetAllSeriesQuery,
  useDeleteSeriesMutation,
} from "../../../features/api";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import EditButton from "../../components/EditButton";
import Table from "../../components/TableView";

const SeriesList = () => {
  const { data: seriesData, isLoading: seriesLoading } = useGetAllSeriesQuery();
  const [deleteSeries] = useDeleteSeriesMutation();

  if (!seriesLoading) {
    console.log("seriesData", seriesData);
  }

  const handleDelete = async (seriesId, e) => {
    e.preventDefault();
    console.log("delete series", seriesId);
    try {
      const deletedSeries = await deleteSeries(seriesId);
      toast.success(deletedSeries.message);
    } catch (error) {
      console.log("Error while deleting Series:", error);
      toast.error(error.message);
    }
  };

  const headers = ["Series Name", "Category & Brand", "Update", "Delete"];

  const rowRenderer = (series) => (
    <>
      <td>{series.name}</td>
      <td className="flex flex-col">
        <div>
          <span className="text-sm opacity-70">Category:</span>{" "}
          {series?.category?.name}
        </div>
        <div>
          <span className="text-sm opacity-70">Brand: </span>
          {series?.brand?.name}
        </div>
      </td>
      <td className="px-4 py-2">
        <EditButton location={`/admin/update-series/${series.id}`} />
      </td>
      <td>
        <button
          onClick={(e) => handleDelete(series.id, e)}
          className="bg-red-600 text-white px-3 py-1 rounded-md"
        >
          <MdDeleteForever className="text-2xl" />
        </button>
      </td>
    </>
  );

  return (
    <>
      <div className="flex mt-[5%] w-[80%] mx-auto">
        <div className="grow">
          <div className="flex justify-between items-center">
            <h1 className="bold text-[1.4rem] mb-2">Series List</h1>
          </div>
          <div className="bg-white border rounded-md shadow-lg">
            {!seriesLoading && (
              <Table
                headers={headers}
                data={seriesData}
                keyExtractor={(item) => item.id}
                rowRenderer={rowRenderer}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeriesList;
