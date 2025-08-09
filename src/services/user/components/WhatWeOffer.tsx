import { FC, ReactNode } from "react";
import { IWhatWeOfferItems } from "@utils/types";

interface IWhatWeOfferProps {
  title: string;
  data: IWhatWeOfferItems[];
  children?: ReactNode;
}

export const WhatWeOffer: FC<IWhatWeOfferProps> = ({
  data,
  children,
  title,
}) => {
  return (
    <section className="min-h-[500px] flex flex-col justify-center py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="text-center border group p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="bg-gray-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-instant-mid/30 transition-colors">
                <div className="text-instant-mid group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {children}
      </div>
    </section>
  );
};
