import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  const values = [
    {
      heading: "Transparency",
      content:
        // "We believe in transparent pricing and honest transactions. You can trust us to provide fair evaluations and upfront payments for your electronic items.",
        "We believe in transparent pricing, fair evaluations, and honest transactions. Whether you are selling a device, opting for repairs, or recycling, you can trust us to provide upfront information and fair solutions tailored to your needs.",
    },
    {
      heading: "Convenience",
      content:
        // "Our platform is designed for maximum convenience. With just a few clicks, you can sell your gadgets and receive instant cash payments, eliminating the need for lengthy negotiations or waiting periods.",
        "Our platform is designed with your convenience in mind. From selling gadgets and accessing repair services to recycling responsibly, everything can be done with just a few clicks. No lengthy negotiations or waiting periods—just quick, reliable solutions at your fingertips.",
    },
    {
      heading: "Customer Satisfaction",
      content:
        // " InstantHub, customer satisfaction is our top priority. We are committed to providing exceptional service and support throughout the selling process, ensuring a positive experience for every user.",
        "At InstantHub, customer satisfaction is at the heart of everything we do. Whether you're selling, repairing, or recycling, we are committed to providing exceptional service and support, ensuring a positive experience every step of the way.",
    },
    {
      heading: "Sustainability",
      content:
        "We are dedicated to promoting sustainability by offering eco-friendly recycling services for electronic waste. By extending the lifecycle of devices and encouraging responsible disposal, we contribute to reducing environmental impact.",
    },
    {
      heading: "Innovation",
      content:
        // "We are constantly innovating to improve our platform and enhance the selling experience for our customers. From advanced algorithms for accurate pricing to seamless payment methods, we leverage cutting-edge technology to streamline the process.",
        "We continuously innovate to improve our services and the overall user experience. From using advanced algorithms for accurate pricing to introducing cutting-edge repair techniques, we leverage technology to deliver seamless, efficient solutions.",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>{`About | InstantHub`}</title>
        <meta name="description" content="Description of my page" />
        <meta
          name="keywords"
          content="About, About Instant Hub, about instant hub, About InstantHub, about instanthub"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://www.instanthub.in/about" />
      </Helmet>

      <div className="min-h-screen px-8 py-4 max-sm:p-2 ">
        <div className="mx-auto px-4 max-sm:px-0 py-8 bg-white rounded-lg max-sm:rounded-none">
          {/* About */}
          <div className="mb-8 max-sm:px-4">
            <h2 className="text-3xl max-sm:text-2xl text-center font-bold mb-4 text-gray-800">
              About the website
            </h2>
            <p className="text-lg max-sm:text-sm text-gray-700">
              At InstantHub, we redefine convenience in electronic item sales,
              repairs, and recycling. Our platform is designed to cater to your
              immediate needs, providing a seamless experience for selling your
              electronics, accessing professional repair services, and
              responsibly recycling your devices. With instant cash payments,
              hassle-free service, and a commitment to sustainability, we strive
              to be your one-stop destination for all electronic needs.
            </p>
            {/* <p className="text-lg max-sm:text-sm text-gray-700">
              At InstantHub, we redefine convenience in electronic item
              purchases. Our platform is designed to cater to your immediate
              needs, providing a seamless experience for selling your
              electronics and receiving instant cash payments. Whether you're
              upgrading to the latest smartphone or looking to trade in your
              laptop for a newer model, InstantHub is here to make the
              process swift and rewarding.
            </p> */}
          </div>

          {/* Mission */}
          <div className="mb-8 max-sm:px-4">
            <h2 className="text-3xl max-sm:text-xl font-bold mb-4 text-gray-800">
              Our Mission
            </h2>
            {/* <p className="text-lg max-sm:text-sm text-gray-700">
              Our mission at InstantHub is to simplify the process of
              selling your electronic devices. We understand that keeping up
              with the latest technology can be expensive, which is why we offer
              competitive prices for your used electronics. By providing instant
              cash payments, we aim to make the upgrade process more accessible
              and hassle-free for our customers.
            </p> */}
            {/* <br /> */}
            <p className="text-lg max-sm:text-sm text-gray-700">
              Our mission at InstantHub is to simplify and enhance the
              experience of selling, recycling, and repairing electronic
              devices. We understand the challenges of keeping up with
              ever-changing technology and the importance of sustainable
              practices. That's why we provide competitive prices for your used
              electronics, eco-friendly recycling solutions, and professional
              repair services. By offering instant cash payments, efficient
              device repair, and responsible recycling options, we aim to make
              upgrading, reusing, or disposing of your devices accessible and
              hassle-free for everyone.
            </p>
          </div>

          {/* VALUES */}
          <div className="mb-8 max-sm:px-1">
            <h2 className="text-3xl max-sm:text-xl max-sm:px-2 font-bold mb-4 text-gray-800">
              Values
            </h2>
            <div className="grid grid-cols-5 gap-4 max-sm:gap-2 max-sm:grid-cols-2 max-md:grid-cols-3">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="flex items-center p-4 max-sm:px-2 max-sm:py-4 bg-slate-200/10 border shadow-md
                              rounded-lg hover:scale-105 hover:bg-secondary hover:text-white transition-all ease-in-out duration-1000"
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
              InstantHub was founded in [2024] by a team of tech enthusiasts
              with a passion for simplifying the process of selling electronic
              items. Frustrated by the traditional methods of selling gadgets,
              they set out to create a better solution that would offer speed,
              convenience, and transparency. Since then, InstantHub has grown
              into a leading platform for instant electronic item purchases,
              serving customers across India. With a commitment to innovation
              and customer satisfaction, we continue to redefine the way people
              sell their gadgets, one transaction at a time. Join us on our
              journey and experience the future of electronic item selling with
              InstantHub!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
