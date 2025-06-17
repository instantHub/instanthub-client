import { FC } from "react";

export const BillBoardAds: FC = () => {
  return (
    <div className="relative overflow-hidden whitespace-nowrap py-2 max-sm:py-1 w-full bg-secondary text-secondary-light my-3 max-sm:my-2">
      <div className="absolute px-2 max-sm:px-1 left-0 bg-secondary z-10 top-2 max-sm:top-1">
        <div className="flex items-center gap-1 ">
          <span className="animate-pulse max-sm:text-[10px]">Offers</span>
        </div>
      </div>
      <div className="animate-marquee max-sm:animate-marquee-fast sm:w-fi flex items-center gap-20 sm:gap-96 text-[16px] max-sm:text-xs">
        <span className=" ">
          💵 "Sell Fast, Get Paid Faster - Start Now!" 💸
        </span>
        <span className=" ">
          📱 "Old Gadgets, New Beginnings - Sell Now!" 🎁
        </span>
        <span className=" ">
          🛒 "Out with the Old, In with the Deals - Special New Year Offers!"
        </span>
      </div>
      <div className="max-sm:hidden absolute px-2 bg-secondary right-0 top-2 ">
        <div className="flex items-center gap-1">
          <span className="animate-pulse">Offers</span>
        </div>
      </div>
    </div>
  );
};
