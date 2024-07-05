import React from "react";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>{`Contact Us | InstantCashPick`}</title>
        <meta name="description" content="Description of my page" />
        <meta
          name="keywords"
          content="Contact Us, Contact Us Instant Cash Pick, Instant Cash, Instant Pick,Contact Us InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <meta name="author" content="Your Name" />
        <link rel="canonical" href="https://instantcashpick.com/contact-us" />
      </Helmet>
      <div className="flex justify-center items-center mt-[5%]">
        <div className="max-w-lg p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            Have questions or ready to sell your electronics? Get in touch with
            our friendly team today:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Phone: +91 8722288017</li>
            <li>Email: support@instantcashpick.com</li>
            <li>
              Live Chat: Visit our website to chat with a representative in
              real-time.
            </li>
          </ul>
          <p className="text-gray-600">
            Join the thousands of satisfied customers who have chosen
            InstantCashPicks for their electronic item selling needs. Experience
            the convenience of instant cash payments today!
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
