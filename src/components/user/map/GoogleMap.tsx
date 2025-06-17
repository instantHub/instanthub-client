import { FC } from "react";

export const GoogleMap: FC = () => {
  return (
    <div className="w- h-[150px] sm:h-[200px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089868012!2d77.46612713338564!3d12.953945614765914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e96cf6b7cacaf5d%3A0xab7866b6ed108bea!2sInstant%20Hub!5e0!3m2!1sen!2sin!4v1750141491578!5m2!1sen!2sin"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};
