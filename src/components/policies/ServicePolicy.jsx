import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const ServicePolicy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.instanthub.in/service-policy",
    name: "InstantHub",
    description:
      "Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more..!",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.instanthub.in/service-policy",
      "query-input": "required name=search_term_string",
    },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Service Policy | InstantHub`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content="Service Policy, Service Policy of Instant Hub, Service Policy of InstantHub, service policy of InstantHub"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://www.instanthub.in/service-policy" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {/* <div className="mx-10 mb-5 mt-5 px-10 py-2 border rounded shadow-2xl flex flex-col gap-2 max-sm:mx-2 max-sm:px-5"> */}
      <div className="my-5 px-1 py-2 flex flex-col gap-2">
        {/* <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"> */}
        <article className="">
          <h1 className="text-3xl max-sm:text-2xl font-bold mb-6 text-center text-gray-800">
            Service Policy
          </h1>
          <p className="text-gray-600 mb-4 max-sm:text-sm">
            Effective date: 2024
          </p>
          <p className="text-gray-600 mb-6 max-sm:text-sm">
            {/* Welcome to Instant Hub. We are committed to protecting your personal
            information and your right to privacy. If you have any questions or
            concerns about our policy, or our practices with regards to your
            personal information, please contact us at 8722288017. */}
            Thank you for choosing Instant Hub. Your trust is important to us,
            and we are dedicated to protecting your rights and ensuring clarity
            about our services. If you have any questions regarding this policy,
            feel free to contact us at 8722288017.
          </p>

          <section className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              {/* 1. InstantHub Services and Third Party Services and Sites */}
              1. Instant Hub Services and Third-Party Sites
            </h2>
            <div className="py-2">
              <p className="max-sm:text-sm text-[17px]">
                {/* The information and materials provided in the Site and through the
              Services are intended for general reference only, and may not
              describe all of the terms, conditions, and exceptions applicable
              to InstantHub’s Services. InstantHub presents information from
              Third Parties through the InstantHub Site and Services, including
              prices offered for your items, item descriptions, certain Third
              Party terms of service, and other information (“Third Party
              Information”). InstantHub cannot control, and is not responsible
              for the accuracy of any Third Party Information. */}
                The materials and information provided on our website and
                services are for general reference and may not encompass all
                terms, conditions, or exceptions related to Instant Hub's
                offerings.
              </p>
              <p className="max-sm:text-sm text-gray-800 py-1">
                We present details from Third Parties, such as:
              </p>
              <ul className="list-disc pl-5 max-sm:text-sm text-gray-600">
                <li>Prices for your items.</li>
                <li>Descriptions and terms related to services.</li>
                <li>Other relevant Third-Party information.</li>
              </ul>
              <p className="max-sm:text-sm text-[15px]">
                While we strive for accuracy, Instant Hub does not control or
                guarantee the reliability of Third-Party Information.
              </p>
            </div>

            <div className="py-2">
              <p className="max-sm:text-sm text-[17px] py-1">
                {/*  You conduct your actual sales and other transactions directly with
              the Third Parties and, unless otherwise specifically and clearly
              indicated, not with InstantHub. InstantHub cannot control any
              aspect of your sales and transactions with Third Parties, and the
              Third Parties are solely responsible to you for all aspects of
              your sales and transactions with them. */}
                Sales and Transactions with Third Parties:
              </p>
              <p className="max-sm:text-sm text-gray-800 py-1"></p>
              <ul className="list-disc pl-5 max-sm:text-sm text-gray-600">
                <li>
                  All transactions, including sales, are conducted directly
                  between you and the Third Parties.
                </li>
                <li>
                  Instant Hub does not manage or oversee these transactions.
                </li>
                <li>
                  Third Parties are solely accountable for any disputes or
                  issues arising from your transactions with them.
                </li>
              </ul>
            </div>

            <div className="py-2">
              <p className="max-sm:text-sm text-[17px] py-1">
                {/*   At times, the InstantHub Site may have links to websites hosted by
              the Third Parties and other entities (the “Additional Sites”), or
              such Additional Sites may have links to the InstantHub Site. These
              links are offered as a convenience and for informational purposes
              only, not as referrals or endorsements by InstantHub of the
              Additional Sites. The Additional Sites are maintained by their
              respective organizations, and those organizations are solely
              responsible for the content of their own websites. InstantHub does
              not verify nor make any warranty or representation about the
              content, accuracy, opinions expressed, warranties, products or
              services, intellectual property compliance, or links of such
              Additional Sites. You should read the privacy policies and Terms &
              Conditions agreements of all Additional Sites. */}
                Links to External Sites.
              </p>

              <ul className="list-disc pl-5 max-sm:text-sm text-gray-600">
                <li>
                  Our platform may include links to external websites
                  ("Additional Sites") or vice versa.
                </li>
                <li>
                  These links are provided solely for convenience and
                  information.
                </li>
                <li>
                  Instant Hub does not endorse, verify, or take responsibility
                  for the content, accuracy, products, services, or intellectual
                  property compliance of Additional Sites.
                </li>
              </ul>
              <p className="max-sm:text-sm text-[17px] text-gray-800 py-1">
                We encourage you to review the privacy policies and terms of
                service of all Additional Sites before interacting with them.{" "}
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              {/* 2. Information We Collect */}
              2. Information We Collect{" "}
            </h2>
            <p className="text-gray-600 leading-relaxed max-sm:text-sm py-1">
              {/* We collect personal details like your name, contact information,
              and product details during registration and transactions. This
              helps us process your requests and ensure seamless service. */}
              During registration and transactions, we may collect details such
              as:
            </p>
            <ul className="list-disc pl-5 max-sm:text-sm text-gray-600">
              <li>Name and contact information.</li>
              <li>Product and transaction-specific data.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed max-sm:text-sm">
              This information allows us to process requests efficiently and
              provide a seamless user experience.
            </p>
          </section>

          {/* Use of Collected Information */}
          <section className="mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              {/* 3. Use of Collected Information */}
              3. Use of Collected Information
            </h2>
            <p className="text-gray-600 leading-relaxed max-sm:text-sm py-1">
              The data collected is utilized for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed max-sm:text-sm">
              <li>Facilitating and managing platform transactions.</li>
              <li>Providing updates on orders and promotional content.</li>
              <li>Enhancing platform functionality based on user feedback.</li>
              <li>Ensuring compliance with applicable laws and regulations.</li>
            </ul>
          </section>

          {/* Your Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              {/* 4. Your Responsibilities */}
              4. Your Responsibilities
            </h2>
            <p className="text-gray-600 leading-relaxed max-sm:text-sm py-1">
              {/* As a user, you agree to provide accurate information, maintain the
              confidentiality of your account details, and ensure compliance
              with our terms of service. */}
              As a valued user, you agree to:
            </p>

            <ul className="list-disc pl-6 text-gray-600 leading-relaxed max-sm:text-sm">
              <li>
                Provide accurate and up-to-date information during interactions.
              </li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>
                Adhere to our terms of service and guidelines while using the
                platform.
              </li>
            </ul>
          </section>

          {/* Updates to the Policy */}
          <section className="mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              5. Policy Updates
            </h2>
            <p className="text-gray-600 leading-relaxed max-sm:text-sm">
              {/* This policy is subject to updates to reflect changes in
              regulations, services, or other operational factors. Ensure to
              review it periodically. */}
              This policy may be revised periodically to reflect changes in
              regulations, services, or operational practices. We recommend
              reviewing this document regularly to stay informed about any
              updates.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default ServicePolicy;
