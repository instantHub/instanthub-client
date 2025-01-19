import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ActionButton from "../../components/ActionButton";

const ListItemCard = ({ data, service, handleEdit, handleDelete }) => {
  const editBtnStyle =
    "flex items-center justify-center tracking-[10px] bg-white border-t border-r border-t-blue-200 text-blue-600 px-3 py-1";
  const deleteBtnStyle =
    "flex items-center justify-center bg-white border-t border-t-red-200 text-red-600 px-3 py-1";

  return (
    <div className="w-full border-gray-300 flex flex-col gap-1 border rounded pt-2 text-center text-sm max-sm:text-xs">
      {/* All Details */}
      <div className="px-4 max-sm:px-1 max-sm:text-[10px]">
        {/*  */}
        <div className="w-full grid grid-cols-2 items-center gap-1">
          <img
            src={import.meta.env.VITE_APP_BASE_URL + data.image}
            alt={data.name}
            className="w-[60px] h-[60px] mx-auto "
          />
          <p className={`${data?.name?.length > 16 && "max-sm:text-[9px]"}`}>
            {data.name}
          </p>
        </div>
        {/* Service Name for Category List */}
        {service.categoriesList && (
          <DisplayContent label="Service Type" text={data.type} />
        )}

        {/* Service Name for All other Lists except Categories List */}
        {!service.categoriesList && (
          <DisplayContent
            label="Service Name"
            text={data.serviceCategoryId.name}
          />
        )}

        {service.subServiceProductsList && (
          <>
            <DisplayContent
              label="Sub Service Name"
              text={data.subServiceId.name}
            />
            <DisplayContent
              label="Product Description"
              text={data.description}
            />
            <div className="flex gap-2 font-semibold">
              <DisplayContent label="Price" text={`${data.price} /-`} />
              <DisplayContent label="Discount" text={`${data.discount} %`} />
            </div>
          </>
        )}
      </div>

      {/* Edit or Delete */}
      <ActionButton
        actionOne={"Edit"}
        actionOneHandler={handleEdit}
        actionTwo={"Delete"}
        actionTwoHandler={handleDelete}
        name={null}
      />
    </div>
  );
};

export default ListItemCard;

const DisplayContent = ({ label, text }) => {
  return (
    <div className="w-full flex items-center justify-center gap-1 py-2 max-sm:py-1">
      <p className={`max-sm:text-[10px]`}>{label} -</p>
      <p className={``}>{text}</p>
    </div>
  );
};
