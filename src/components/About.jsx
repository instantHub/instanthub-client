import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  const values = [
    {
      heading: "Transparency",
      content:
        "We believe in transparent pricing and honest transactions. You can trust us to provide fair evaluations and upfront payments for your electronic items.",
    },
    {
      heading: "Convenience",
      content:
        " Our platform is designed for maximum convenience. With just a few clicks, you can sell your gadgets and receive instant cash payments, eliminating the need for lengthy negotiations or waiting periods.",
    },
    {
      heading: "Customer Satisfaction",
      content:
        " InstantCashPicks, customer satisfaction is our top priority. We are committed to providing exceptional service and support throughout the selling process, ensuring a positive experience for every user.",
    },
    {
      heading: "Innovation",
      content:
        " We are constantly innovating to improve our platform and enhance the selling experience for our customers. From advanced algorithms for accurate pricing to seamless payment methods, we leverage cutting-edge technology to streamline the process.",
    },
  ];

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>{`About | InstantCashPick`}</title>
        <meta name="description" content="Description of my page" />
        <meta
          name="keywords"
          content="About, About Instant Cash Pick, Instant Cash, Instant Pick, About InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://instantcashpick.com/about" />
      </Helmet>

      <div className="min-h-screen px-8 py-4 max-sm:p-2 ">
        <div className="mx-auto px-4 max-sm:px-0 py-8 bg-white rounded-lg max-sm:rounded-none">
          {/* About */}
          <div className="mb-8 max-sm:px-4">
            <h2 className="text-3xl max-sm:text-2xl text-center font-bold mb-4 text-gray-800">
              About the website
            </h2>
            <p className="text-lg max-sm:text-sm text-gray-700">
              At InstantCashPicks, we redefine convenience in electronic item
              purchases. Our platform is designed to cater to your immediate
              needs, providing a seamless experience for selling your
              electronics and receiving instant cash payments. Whether you're
              upgrading to the latest smartphone or looking to trade in your
              laptop for a newer model, InstantCashPicks is here to make the
              process swift and rewarding.
            </p>
          </div>

          {/* Mission */}
          <div className="mb-8 max-sm:px-4">
            <h2 className="text-3xl max-sm:text-xl font-bold mb-4 text-gray-800">
              Our Mission
            </h2>
            <p className="text-lg max-sm:text-sm text-gray-700">
              Our mission at InstantCashPicks is to simplify the process of
              selling your electronic devices. We understand that keeping up
              with the latest technology can be expensive, which is why we offer
              competitive prices for your used electronics. By providing instant
              cash payments, we aim to make the upgrade process more accessible
              and hassle-free for our customers.
            </p>
          </div>

          {/* VALUES */}
          <div className="mb-8 max-sm:px-1">
            <h2 className="text-3xl max-sm:text-xl max-sm:px-2 font-bold mb-4 text-gray-800">
              Values
            </h2>
            <div className="grid grid-cols-4 gap-4 max-sm:gap-2 max-sm:grid-cols-2 max-md:grid-cols-2 ">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="flex items-center p-4 max-sm:px-2 max-sm:py-4 bg-slate-200/10 border shadow-md
                              rounded-lg hover:scale-105 hover:bg-slate-900/70 hover:text-white transition-all ease-in-out duration-1000"
                >
                  <div className="flex flex-col gap-4 justify-center text-center ">
                    <strong className="text-xl max-sm:text-[1rem]">
                      {value.heading}
                    </strong>
                    <p className="text-[1rem] max-sm:text-xs font-thin">
                      {value.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="max-sm:px-4">
            <h2 className="text-3xl max-sm:text-xl font-bold mb-4 text-gray-800">
              History
            </h2>
            <p className="text-lg max-sm:text-sm text-gray-700">
              InstantCashPicks was founded in [2024] by a team of tech
              enthusiasts with a passion for simplifying the process of selling
              electronic items. Frustrated by the traditional methods of selling
              gadgets, they set out to create a better solution that would offer
              speed, convenience, and transparency. Since then, InstantCashPicks
              has grown into a leading platform for instant electronic item
              purchases, serving customers across India. With a commitment to
              innovation and customer satisfaction, we continue to redefine the
              way people sell their gadgets, one transaction at a time. Join us
              on our journey and experience the future of electronic item
              selling with InstantCashPicks!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
