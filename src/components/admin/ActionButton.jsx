import { DeleteForeverIcon, EditIcon } from "@icons";

export const ActionButton = ({
  actionOne,
  actionTwo,
  actionOneHandler,
  actionTwoHandler,
  name,
}) => {
  const style = {
    btnStyle:
      "w-fit flex justify-center items-center gap-1 font-bold py-2 max-sm:py-1 px-4 max-sm:px-2 text-sm max-sm:text-xs border-t",
  };
  return (
    // Edit or Delete
    <div className="w-full h-fit flex justify-around items-center">
      <button
        className={`w-full ${style.btnStyle} text-blue-600 border-r`}
        onClick={actionOneHandler}
      >
        <span className="tracking-[5px] max-sm:tracking-[4px] max-sm:text-[10px]">
          {actionOne} {name && name}
        </span>
        <span>
          <EditIcon />
        </span>
      </button>
      <button
        className={`${style.btnStyle} text-red-600 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-1000`}
        onClick={actionTwoHandler}
      >
        <span className="tracking-widest max-sm:text-[10px]">{actionTwo}</span>
        <span>
          <DeleteForeverIcon />
        </span>
      </button>
    </div>
  );
};

