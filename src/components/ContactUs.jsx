import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>{`Contact Us | InstantCashPick`}</title>
        <meta
          name="description"
          content="Contact Us to know more about InstantCashPick. Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content="Contact Us, Contact Us Instant Cash Pick, Instant Cash, Instant Pick,Contact Us InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://instantcashpick.com/contact-us" />
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
          <div className="list-disc pl-6 mb-6">
            <p className="flex items-center gap-1">
              <span className="opacity-60">Phone:</span>
              <span>+91 8722288017</span>
            </p>

            <p className="flex items-center gap-1">
              <span className="opacity-60">Email:</span>
              <span>support@instantcashpick.com</span>
            </p>
            {/* <p>
              Live Chat: Visit our website to chat with a representative in
              real-time.
            </p> */}
          </div>
          <p className="text-gray-600 text-lg max-sm:text-sm">
            Join the thousands of satisfied customers who have chosen
            InstantCashPicks for their electronic item selling needs.{" "}
            <br className="lg:hidden" /> Experience the convenience of instant
            cash payments today!
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
