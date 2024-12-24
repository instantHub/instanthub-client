import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>{`Contact Us | InstantHub`}</title>
        <meta
          name="description"
          content="Contact Us to know more about InstantHub. Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content="Contact Us, Contact Us Instant Hub, Instant Hub, Instant Pick, Contact Us InstantHub, instant hub, Instant Hub, instant pick, InstantHub"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://www.instanthub.in/contact-us" />
      </Helmet>

      <div className="flex justify-center items-center mt-[5%]">
        <div className="max-w-lg p-8 max-sm:p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl max-sm:text-2xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4 text-lg max-sm:text-sm">
            Have questions or ready to sell your electronics? Get in touch with
            our friendly team today:
          </p>

          {/* Contact Details */}
          <div className="list-disc pl-6 mb-6 text-[16px] max-sm:text-xs">
            <p className="flex items-center gap-2">
              <span className="opacity-60 w-[60px] text-end">Phone:</span>
              <span>+91 8722288017</span>
            </p>

            <p className="flex items-center gap-2">
              <span className="opacity-60 w-[60px] text-end">Email:</span>
              <span>support@instanthub.in</span>
            </p>

            <p className="flex items-center gap-2">
              <span className="opacity-60 w-[60px] text-end">GST:</span>
              <span>29CSJPA4571K1ZE</span>
            </p>

            <div className="flex items-start gap-2">
              <span className="opacity-60 w-[60px] text-end">Adress:</span>
              <p className="">
                Sy. No. 92, R Greens A.C, <br />
                Sarjapur Outer Ring Road Marathahalli <br />
                Bengaluru - 37
              </p>
            </div>
            {/* <p>
              Live Chat: Visit our website to chat with a representative in
              real-time.
            </p> */}
          </div>

          <p className="text-gray-600 text-lg max-sm:text-sm">
            Join the thousands of satisfied customers who have chosen InstantHub
            for their electronic item selling needs.{" "}
            <br className="lg:hidden" /> Experience the convenience of instant
            cash payments today!
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
