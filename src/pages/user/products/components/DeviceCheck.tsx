import { FC, useCallback } from "react";
import { AboutDevice } from "../questionnaire/ProductQuestions";
import { FlexBox, Typography } from "@components/general";
import { useSelector } from "react-redux";
import { selectCategory } from "@features/slices";

interface IDeviceCheckProps {
  setAboutDevice: React.Dispatch<React.SetStateAction<AboutDevice>>;
}

export const DeviceCheck: FC<IDeviceCheckProps> = ({ setAboutDevice }) => {
  const category = useSelector(selectCategory);

  const handleDeviceCheck = useCallback(
    (isDeviceOn: boolean) => {
      setAboutDevice({
        isDeviceOn,
        isDeviceChecked: true,
      });
    },
    [setAboutDevice]
  );

  const DeviceCheckButton: FC<{ innerText: string }> = ({ innerText }) => {
    const isYes = innerText === "Yes";

    return (
      <button
        type="button"
        onClick={() => handleDeviceCheck(isYes)}
        className="flex pr-16 max-sm:pr-8 items-center border rounded-md cursor-pointer p-2.5 max-sm:p-1.5 ring-0 ring-transparent shadow hover:border-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary"
        aria-label={`Mark device as ${innerText.toLowerCase()}`}
      >
        <span className="border border-solid rounded-full w-5 h-5 max-sm:w-4 max-sm:h-4 mr-1.5 bg-white"></span>
        <span className="text-sm flex-1 flex justify-center">{innerText}</span>
      </button>
    );
  };

  return (
    <FlexBox direction="col" gap={5} className="mt-10">
      <Typography variant="body">
        Is your {category?.name} Switched On?
      </Typography>

      <FlexBox gap={4}>
        <DeviceCheckButton innerText="Yes" />
        <DeviceCheckButton innerText="No" />
      </FlexBox>
    </FlexBox>
  );
};
