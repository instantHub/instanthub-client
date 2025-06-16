import { useNavigate } from "react-router-dom";
import { useDeleteSliderMutation } from "@api";
import { ActionButton } from "@components/admin";
import { generatePathWithParams } from "@utils/general";
import { ROUTES } from "@routes";

export const SliderCard = ({ data }) => {
  // console.log("data", data);
  const navigate = useNavigate();
  const [deleteSlider] = useDeleteSliderMutation();

  const style = {
    boldness: "font-semibold max-sm:font-norma",
    borderColor: `${data.status.pending && "border-blue-600"} 
    ${data.status.completed && "border-green-600"} ${
      data.status.cancelled && "border-red-600"
    }`,
  };

  const handleDelete = async (sliderId) => {
    console.log("delete slider", sliderId);
    const deletedSlider = await deleteSlider(sliderId);
    toast.success(deletedSlider.message);
  };

  const handleEdit = () => {
    navigate(generatePathWithParams(ROUTES.admin.updateSlider, data.id));
  };

  return (
    <>
      <div
        className={`shadow flex flex-col items-center cursor-pointer rounded-md text-sm max-sm:text-xs border ${style.borderColor}`}
      >
        <div className="px-5 max-sm:px-2 py-2 mx-auto">
          <img
            src={import.meta.env.VITE_APP_BASE_URL + data.image}
            alt={"Product Image"}
            // className={`w-[60px] h-fit mx-auto max-sm:w-[50px]`}
            className="w-[480px] h-[150px] mx-auto max-sm:w-[280px] max-sm:h-[90px]"
            loading="lazy" // Native lazy loading
          />
        </div>
        {/* Slider Status */}
        <div className="flex flex-col text-start gap-[2px]">
          <div>
            <span>Status: </span>
            <span className={`${style.boldness}`}>{data.status}</span>
          </div>
        </div>

        {/* Edit or Delete */}
        <ActionButton
          actionOne={"Update Slider"}
          actionOneHandler={handleEdit}
          actionTwo={"Delete"}
          actionTwoHandler={() => {
            handleDelete(data.id);
          }}
          name={null}
        />
      </div>
    </>
  );
};
