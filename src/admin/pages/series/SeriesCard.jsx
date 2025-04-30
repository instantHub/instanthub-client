import React from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/admin/ActionButton";

const SeriesCard = ({ data, setModalOpen, setSeriesToDelete }) => {
  // console.log("data", data);
  const navigate = useNavigate();

  const style = {
    boldness: "font-semibold max-sm:text-[11px]",
  };

  const handleEdit = () => {
    navigate(`/admin/update-series/${data?.id}`);
  };

  return (
    <>
      <div
        className={`shadow flex flex-col items-center cursor-pointer rounded-md text-sm max-sm:text-xs border`}
      >
        {/* Series Name */}
        <div className="flex flex-col text-start gap-[2px]">
          <div>
            <span className="max-sm:text-[10px]">Series: </span>
            <span className={`${style.boldness}`}>{data?.name}</span>
          </div>
          <div>
            <span className="max-sm:text-[10px]">Category: </span>
            <span className={`${style.boldness}`}>{data?.category?.name}</span>
          </div>
          <div>
            <span className="max-sm:text-[10px]">Brand: </span>
            <span className={`${style.boldness}`}>{data?.brand?.name}</span>
          </div>
        </div>

        {/* Edit or Delete */}
        <ActionButton
          actionOne={"Update"}
          actionOneHandler={handleEdit}
          actionTwo={"Delete"}
          actionTwoHandler={() => {
            setModalOpen(true);
            setSeriesToDelete(data?.id);
          }}
          name={null}
        />
      </div>
    </>
  );
};

export default SeriesCard;
