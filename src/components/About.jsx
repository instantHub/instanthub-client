import React from "react";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>{`About | InstantCashPick`}</title>
        <meta name="description" content="Description of my page" />
        <meta
          name="keywords"
          content="About, About Instant Cash Pick, Instant Cash, Instant Pick, About InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <meta name="author" content="Your Name" />
        <link rel="canonical" href="https://instantcashpick.com/about" />
      </Helmet>
      <div className="min-h-screen p-8">
        <div className="mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-3xl text-center font-bold mb-4 text-gray-800">
              About the website
            </h2>
            <p className="text-lg text-gray-700">
              At InstantCashPicks, we redefine convenience in electronic item
              purchases. Our platform is designed to cater to your immediate
              needs, providing a seamless experience for selling your
              electronics and receiving instant cash payments. Whether you're
              upgrading to the latest smartphone or looking to trade in your
              laptop for a newer model, InstantCashPicks is here to make the
              process swift and rewarding.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700">
              Our mission at InstantCashPicks is to simplify the process of
              selling your electronic devices. We understand that keeping up
              with the latest technology can be expensive, which is why we offer
              competitive prices for your used electronics. By providing instant
              cash payments, we aim to make the upgrade process more accessible
              and hassle-free for our customers.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Values</h2>
            <ul className="grid grid-cols-4 gap-4 max-sm:grid-cols-2 max-md:grid-cols-2">
              <li className="p-4 bg-cyan-100 rounded-lg text-lg hover:scale-105 hover:bg-cyan-200 max-sm:text-sm">
                {/* <li className="p-4 bg-gray-200 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"> */}
                <div className="flex flex-col gap-4 text-center">
                  <strong className="text-xl">Transparency</strong>
                  <p className="">
                    We believe in transparent pricing and honest transactions.
                    You can trust us to provide fair evaluations and upfront
                    payments for your electronic items.
                  </p>
                </div>
              </li>
              <li className="p-4 bg-cyan-100 rounded-lg text-lg hover:scale-105 hover:bg-cyan-200 max-sm:text-sm">
                {/* <li className="p-4 bg-gray-200 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"> */}
                <div className="flex flex-col gap-4 text-center">
                  <strong className="text-xl">Convenience</strong>
                  <p className="">
                    Our platform is designed for maximum convenience. With just
                    a few clicks, you can sell your gadgets and receive instant
                    cash payments, eliminating the need for lengthy negotiations
                    or waiting periods.
                  </p>
                </div>
              </li>
              <li className="p-4 bg-cyan-100 rounded-lg text-lg hover:scale-105 hover:bg-cyan-200 max-sm:text-sm">
                {/* <li className="p-4 bg-gray-200 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"> */}
                <div className="flex flex-col gap-4 text-center">
                  <strong className="text-xl">Customer Satisfaction</strong>
                  <p className="">
                    InstantCashPicks, customer satisfaction is our top priority.
                    We are committed to providing exceptional service and
                    support throughout the selling process, ensuring a positive
                    experience for every user.
                  </p>
                </div>
              </li>
              <li className="p-4 bg-cyan-100 rounded-lg text-lg hover:scale-105 hover:bg-cyan-200 max-sm:text-sm">
                {/* <li className="p-4 bg-gray-200 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"> */}
                <div className="flex flex-col gap-4 text-center">
                  <strong className="text-xl">Innovation</strong>
                  <p className="">
                    We are constantly innovating to improve our platform and
                    enhance the selling experience for our customers. From
                    advanced algorithms for accurate pricing to seamless payment
                    methods, we leverage cutting-edge technology to streamline
                    the process.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">History</h2>
            <p className="text-lg text-gray-700">
              InstantCashPicks was founded in [Year] by a team of tech
              enthusiasts with a passion for simplifying the process of selling
              electronic items. Frustrated by the traditional methods of selling
              gadgets, they set out to create a better solution that would offer
              speed, convenience, and transparency. Since then, InstantCashPicks
              has grown into a leading platform for instant electronic item
              purchases, serving customers across [Location/Country]. With a
              commitment to innovation and customer satisfaction, we continue to
              redefine the way people sell their gadgets, one transaction at a
              time. Join us on our journey and experience the future of
              electronic item selling with InstantCashPicks!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
