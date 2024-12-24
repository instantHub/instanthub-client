import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

function TermsAndConditions() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://instanthub.in/terms-conditions",
    name: "InstantHub",
    description:
      "Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more..!",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://instanthub.in/terms-conditions",
      "query-input": "required name=search_term_string",
    },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Terms & Conditions | InstantHub`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content="Terms & Conditions, Terms & Conditions of Instant Hub, Terms & Conditions of InstantHub"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link
          rel="canonical"
          href="https://instanthub.in/terms-conditions"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {/* <div className="mx-10 mb-5 mt-5 px-10 py-2 border rounded shadow-2xl flex flex-col gap-2 max-sm:mx-2 max-sm:px-5"> */}
      <div className="my-5 py-2 px-1 text-gray-600 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-black text-3xl max-sm:text-xl font-semibold py-2">
            Terms and Conditions <br /> for InstantHub services
          </h1>
          <p className="max-sm:text-sm">
            By using it, you are agreeing to these Terms & Conditions (defined
            below). Please read them carefully. Manak Waste Management Pvt Ltd.,
            formerly known as ReGlobe, doing business as InstantHub
          </p>
          <p className="max-sm:text-sm">
            “InstantHub” owns and operates the website,{" "}
            <a href="https://www.instanthub.in">
              www.instanthub.in
            </a>
            . The mobile touch versions, App on Play store and Apple App store
            and/or any site(s) we have now or in the future that reference these
            Terms & Conditions (collectively, “InstantHub”), provides a
            marketplace and platform for consumers and organizations to sell or
            repair their used, old and other articles, and conduct varied
            transactions and activities, with third-party companies and other
            entities and persons (collectively, “Third Parties”). The
            InstantHub marketplace, platform, and related functionality,
            whether provided through the Site or through other means, are
            collectively referred to as the services (the “Services”).
          </p>
          <p className="max-sm:text-sm">
            If you do not agree with any part of these Terms & Conditions, you
            must not use the Site or Services. Your continued use of the Site or
            Services will constitute your acceptance of these Terms &
            Conditions, as they may be modified by us from time to time, with or
            without notice to you. Please check this page regularly for updates
            to the InstantHub Terms & Conditions.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">
            1. InstantHub is a marketplace venue
          </h2>
          <p className="max-sm:text-sm">
            InstantHub is a platform to allow users, subject to compliance
            with InstantHub’s policies, to sell/repair certain goods.
            InstantHub may not be directly involved in the transaction
            between user(s) and third party professional(s), ensuing no control
            by reasons whatsoever in any aspect of your transactions with Third
            Parties, and the Third Parties are solely responsible to you for all
            aspects of your transactions with them.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">
            2. Permitted Use and Compliance with Laws.
          </h2>
          <p className="max-sm:text-sm">
          InstantHub authorizes you to access, view and use the Site
            content and software (collectively, the “Manak Waste Management Pvt
            Ltd Property”) solely to the extent necessary for you to use the
            Services. You may not remove any copyright, trademark or other
            proprietary notices that have been placed on the InstantHub
            Property. You may not engage in systematic retrieval of data or
            other content from the InstantHub Property. Except as expressly
            permitted by these Terms & Conditions, any modification,
            reproduction, redistribution, republication, uploading, posting,
            transmitting, distributing or otherwise exploiting in any way the
            InstantHub Property, or any portion of the InstantHub
            Property, is strictly prohibited without the prior written
            permission of Manak Waste Management Pvt Ltd.
          </p>
          <p className="max-sm:text-sm">
            You agree that you will comply with all applicable laws, regulations
            and ordinances relating to the Site and Services, the
            InstantHub Property or your use of them, and that in using the
            Site and Services you will not engage in any conduct that restricts
            or inhibits any other person from using or enjoying the Services.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">
            3. Copyright and trademarks.
          </h2>
          <p className="max-sm:text-sm">
            Except as otherwise indicated, all materials in the Site, including,
            but not limited to text, software, photos, video, graphics, music,
            sound, the InstantHub Logo, ScreenPro logo, ReGlobe Logo and
            other InstantHub ,ScreenPro and ReGlobe trademarks and service
            marks and the entire contents of the Site are the property of Manak
            Waste Management Pvt Ltd and/or its affiliates or licensors,
            including the Third Parties, and are protected by
            international/Indian copyright and trademark laws, all rights
            reserved. Any violation of these restrictions may result in a
            copyright, trademark, or other intellectual property right
            infringement that may subject you to civil and/or criminal
            penalties.
          </p>
          <p className="max-sm:text-sm">
            Other marks on the site not owned by InstantHub may be under
            license from the trademark owner thereof, in which case such license
            is for the exclusive benefit and use of InstantHub unless
            otherwise stated, or may be the property of their respective owners.
            You may not use any of the trademark name, logos, trademarks or
            brands, or trademarks or brands of others on the Site without Manak
            Waste Management Pvt Ltd’s express permission.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">
            4. InstantHub Services and Third Party Services and Sites
          </h2>
          <p className="max-sm:text-sm">
            The information and materials provided in the Site and through the
            Services are intended for general reference only, and may not
            describe all of the terms, conditions, and exceptions applicable to
            InstantHub’s Services. InstantHub presents information
            from Third Parties through the InstantHub Site and Services,
            including prices offered for your items, item descriptions, certain
            Third Party terms of service, and other information (“Third Party
            Information”). InstantHub cannot control, and is not
            responsible for the accuracy of any Third Party Information.
          </p>
          <p className="max-sm:text-sm">
            You conduct your actual sales and other transactions directly with
            the Third Parties and, unless otherwise specifically and clearly
            indicated, not with InstantHub. InstantHub cannot control
            any aspect of your sales and transactions with Third Parties, and
            the Third Parties are solely responsible to you for all aspects of
            your sales and transactions with them.
          </p>
          <p className="max-sm:text-sm">
            At times, the InstantHub Site may have links to websites hosted
            by the Third Parties and other entities (the “Additional Sites”), or
            such Additional Sites may have links to the InstantHub Site.
            These links are offered as a convenience and for informational
            purposes only, not as referrals or endorsements by InstantHub
            of the Additional Sites. The Additional Sites are maintained by
            their respective organizations, and those organizations are solely
            responsible for the content of their own websites. InstantHub
            does not verify nor make any warranty or representation about the
            content, accuracy, opinions expressed, warranties, products or
            services, intellectual property compliance, or links of such
            Additional Sites. You should read the privacy policies and Terms &
            Conditions agreements of all Additional Sites.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">
            5. Privacy and Passwords
          </h2>
          <p className="max-sm:text-sm">
            InstantHub values and protects the privacy of your information.
            Please review the InstantHub privacy policy, as it contains
            important information relating to your use of the Site and Services.
            Some portions of the Site are protected and require a user
            identification code (“User ID”) and password for access.
            Unauthorized access or use of such portions of the Site is
            prohibited. You agree that you will notify InstantHub
            immediately if you believe that a third party has obtained your User
            ID or password, or if you believe that any unauthorized access or
            use may occur or has occurred. For your protection, if
            InstantHub believes that any unauthorized access may occur or
            has occurred, InstantHub may terminate access without prior
            notice to you. You also agree that InstantHub is permitted to
            act upon any instructions received such instructions as authorized
            by you.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">
            6. Membership
          </h2>
          <h3>a. Registration and Basic Membership Terms:</h3>
          <p className="max-sm:text-sm">
            Members are visitors to the site and or those using the Services
            that choose to register with InstantHub (“Members”). Once
            registered, an account is created for each Member (“Account”). If
            you choose to register as a Member, you represent and warrant to us
            that:
          </p>
          <ul className="max-sm:text-sm">
            <li>(i) you are of legal age to form a binding contract</li>
            <li>
              (ii) you will provide us with accurate, current and complete
              registration and contact information, and keep your information
              updated
            </li>
            <li>
              (iii) your registration and your use of the Services are not
              prohibited by law.
            </li>
          </ul>
          <p className="max-sm:text-sm">
            We reserve the right to suspend or terminate your membership, or
            your access to the Site and or Services, in the event that you
            breach any of the Terms & Conditions or other applicable
            InstantHub policies.
          </p>
          <h3>b. Password and Account Security:</h3>
          <p className="max-sm:text-sm">
            In connection with your Account, you will create a password and a
            user id. You are responsible for keeping your password and secure,
            and you are responsible for all actions taken using your password.
          </p>
          <h3>c. Age:</h3>
          <p className="max-sm:text-sm">
            To create an Account or to otherwise use this Website, you must be
            at least eighteen (18) years old or the age of majority in your
            state or province of residence, whichever is greater.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">
            7. Inactive Accounts
          </h2>
          <h3>a. Inactive Status:</h3>
          <p className="max-sm:text-sm">
            A Member’s Account may be set to inactive if there is no activity
            associated with that Account for 180 days.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">
            8. Warranty Exclusions and Limitations of Liability
          </h2>
          <p className="max-sm:text-sm">
            We warrant that the Services and InstantHub Property will
            conform substantially to the descriptions set forth on the Site. In
            the event of any breach of this warranty, the Customer’s sole and
            exclusive remedy, and InstantHub’s sole and exclusive
            liability, shall be (at InstantHub’s sole option) to remedy the
            failure or to refund the amount paid by the customer, if any. Except
            as set forth in the foregoing, InstantHub disclaims all
            warranties of any kind, whether express, implied, or statutory,
            including, but not limited to, any implied warranties of
            merchantability, fitness for a particular purpose, title, and
            non-infringement, with respect to the Services, InstantHub
            Property, and any products or services provided through the Site.
          </p>
          <p className="max-sm:text-sm">
            In no event will InstantHub be liable for any indirect,
            incidental, consequential, special, exemplary, or punitive damages
            of any kind in connection with these Terms & Conditions, even if
            InstantHub has been advised of the possibility of such damages.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">9. Indemnity</h2>
          <p className="max-sm:text-sm">
            You agree to indemnify, defend and hold harmless InstantHub,
            its subsidiaries, affiliates, officers, agents, and other partners
            and employees, from any loss, liability, claim, or demand, including
            reasonable attorneys' fees, arising out of or relating to your use
            of the Site or Services, including any violation of these Terms &
            Conditions, any law or regulation, or the rights of any third party.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl max-sm:text-lg">
            10. Changes to Terms & Conditions
          </h2>
          <p className="max-sm:text-sm">
            Instant Hub reserves the right to change these Terms &
            Conditions at any time without prior notice to you. The revised
            Terms & Conditions will be effective immediately upon posting on the
            Site, and your continued use of the Site and Services will
            constitute your acceptance of the revised Terms & Conditions. It is
            your responsibility to review these Terms & Conditions regularly.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            If you have any questions about these Terms & Conditions, please
            contact us at{" "}
            <a href="mailto:info@instanthub.in">
              info@instanthub.in
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditions;
