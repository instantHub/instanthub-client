import { FC, ReactNode } from "react";
import { FlexBox, Typography } from "@components/general";
import { ITestimonial } from "@utils/types";

interface ITestimonialsProps {
  data: ITestimonial[];
  style?: string;
  children?: ReactNode;
}

export const Testimonials: FC<ITestimonialsProps> = ({
  data,
  style,
  children,
}) => {
  return (
    <section
      className={`min-h-[500px] flex flex-col justify-center py-12 px-12 ${style}`}
    >
      <Typography variant="h1" className="text-center mb-10">
        Happy Customers
      </Typography>

      {/* <FlexBox gap={10} className="max-w-5xl mx-auto max-sm:flex-col"> */}
      <FlexBox gap={10} className="max-sm:flex-col">
        {data.map((t, i) => (
          <FlexBox
            key={i}
            direction="col"
            align="start"
            className="border rounded-lg p-6 shadow-md"
          >
            <FlexBox direction="col" align="start" className="mb-4">
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.location}</p>
            </FlexBox>
            <p className="text-gray-800 mb-4">{t.testimonial}</p>
          </FlexBox>
        ))}
      </FlexBox>

      {children}
    </section>
  );
};
