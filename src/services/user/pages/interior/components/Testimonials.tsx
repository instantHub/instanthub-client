import { Button, FlexBox, Typography } from "@components/general";
import { FC, useState } from "react";

const testimonials = [
  {
    name: "Megha Malani",
    location: "Wadhwa Atmosphere, Mumbai",
    text: "DesignCafe gave us a home we always wanted. The journey from idea to execution was smooth and having them on board transform our home was a great decision!",
    profile: "/testimonials/megha.jpg",
    image: "/testimonials/kitchen1.jpg",
  },
  {
    name: "Mr & Mrs Bansal",
    location: "Alembic Urban Forest, Bengaluru",
    text: "Overall an excellent job done by DesignCafe. Truly overwhelmed by the complete design and execution of the project. Love the storage solutions provided in the kitchen.",
    profile: "/testimonials/bansal.jpg",
    image: "/testimonials/livingroom.jpg",
  },
];

interface ITestimonialsProps {
  style?: string;
  openModal: () => void;
}

export const Testimonials: FC<ITestimonialsProps> = ({ style, openModal }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <section className={`py-12 px-4 ${style}`}>
      <Typography variant="h1" className="text-center mb-10">
        Happy Customers
      </Typography>

      <FlexBox gap={10} className="max-w-5xl mx-auto max-sm:flex-col">
        {testimonials
          .slice(currentTestimonial, currentTestimonial + 2)
          .map((t, i) => (
            <FlexBox
              key={i}
              direction="col"
              align="start"
              className="rounded-xl p-6 shadow-md"
            >
              <FlexBox direction="col" align="start" className="mb-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.location}</p>
              </FlexBox>
              <p className="text-gray-800 mb-4">{t.text}</p>
            </FlexBox>
          ))}
      </FlexBox>

      <FlexBox className="space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentTestimonial
                ? "bg-instant-mid"
                : "bg-instant-mid/20"
            }`}
            onClick={() => setCurrentTestimonial(index)}
          />
        ))}
      </FlexBox>

      <div className="flex justify-center mt-8">
        <Button className="*:p-2" variant="instanthub" onClick={openModal}>
          Book A Free Consultation
        </Button>
      </div>
    </section>
  );
};
