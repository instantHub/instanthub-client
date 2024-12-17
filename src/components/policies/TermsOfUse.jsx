import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const TermsOfUse = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://instantcashpick.com/terms-of-use",
    name: "InstantCashPick",
    description:
      "Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more..!",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://instantcashpick.com/terms-of-use",
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
        <title>{`Terms Of Use | InstantCashPick`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content="Terms Of Use, terms of use, Terms Of Use of Instant Cash Pick, Terms Of Use of InstantCashPick"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://instantcashpick.com/terms-of-use" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {/* <div className="mx-10 mb-5 mt-5 px-10 py-2 border rounded shadow-2xl  flex flex-col gap-2 max-sm:mx-2 max-sm:px-5"> */}
      <div className="my-5 px-1 py-2 flex flex-col gap-2">
        <h1 className="text-3xl max-sm:text-2xl font-bold mb-6 text-center text-gray-800">
          Terms of Use
        </h1>
        <div className="flex flex-col gap-2 text-gray-600 mb-4 max-sm:text-sm">
          <p>
            Please read these terms of use carefully before using this website
            (“InstantCashPick”). These website terms of use (the “terms of use”)
            govern your access to and use of the website. The website is
            available for your use only on the condition that you agree to the
            terms of use set forth below. If you do not agree to all of the
            terms of use, do not access or use the website. By accessing or
            using the website, you and the entity you are authorized to
            represent (“you” or “your”) signify your agreement to be bound by
            the terms of use.
          </p>
          <p>
            This is a legally binding contract between “you” the “seller of the
            goods”, InstantCashPick, and third-party buyers (“buyer”) which
            provides services for purchasing, recycling and/or donating of used
            consumer products (the “buyer services”). InstantCashPick acts as a
            platform to allow sellers who comply with their policies to sell
            certain goods. You conduct your actual sales and other transactions
            directly with the third parties and, unless otherwise specifically
            and clearly indicated, not with InstantCashPick. As a result,
            InstantCashPick cannot control any aspect of your sales and
            transactions with third parties, and the third parties are solely
            responsible to you for all aspects of your sales and transactions
            with them and consequently InstantCashPick will have no liabilities
            towards the sellers or buyers in this regard. In the document below
            “we”, “our”, “us” is used for InstantCashPick and InstantCashPick’s
            third party buyer collectively.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-gray-600 mb-4">
          <h2 className="font-semibold text-gray-700 text-xl max-sm:text-lg">
            Seller Responsibilities
          </h2>
          <ol className="pl-2 max-sm:text-sm">
            <li>
              1. You certify that you are the legal owner of the gadget that you
              want to sell. All initial quotes are pending our evaluation of
              your gadget and no binding offer is made until we have had a
              chance to inspect the gadget. We reserve the right to refuse to
              offer to purchase any item that you offer to sell for any reason
              we deem, in our sole discretion, to be sensible. We reserve the
              right to change our quote at any time.
            </li>
            <li>
              2. Should you be given a quote via our website/app/affiliates AND
              we, upon inspection of your gadget, agree to pay you that quoted
              amount, you are legally and contractually bound to sell us the
              gadget for the price quoted via the website.
            </li>
            <li>
              3. Should you be given a quote via our website/app and upon
              inspection your gadget is A) a different model than originally
              quoted, B) missing any parts, C) in a different condition than
              stated, we, in instances mentioned heretofore and beyond, reserve
              the right to change our offer.
            </li>
            <li>
              4. All gadgets sold must compulsorily be attached with the
              following documents:
              <ul className="pl-4 list-inside">
                <li>
                  i. self-attested ID-proof (government approved) of owner of
                  old gadget;
                </li>
                <li>
                  ii. self-attested indemnity bond provided by us if required;
                </li>
              </ul>
            </li>
            <li>
              5. Lawful Sales Only. You must own the right, title and all legal
              interest in the gadget or other articles you sell us. Your sale
              and/or, shipment of any such article must not violate any law,
              regulation or statute of any jurisdiction. You may not unlawfully
              transfer or encumber any intellectual property, trademark,
              copyright, patent, software, license or other legal right or
              restriction via your shipping or selling of the picked-up article.
              The article you sell must be free of all legal restrictions that
              would affect the value of the article, restrict your legal right
              to transfer ownership of the article (including the article
              itself, softwares present on the article, or hardware on or inside
              the article). You must refrain from violating any export laws or
              restrictions. The article you sell (including all related
              materials, software and add on hardware) may not be counterfeited,
              stolen, or contain harmful or offensive content of any nature. You
              agree to indemnify and hold InstantCashPick, our affiliates,
              suppliers, licensors and partners, and the officers, directors,
              employees, agents and representatives of each of them harmless,
              including costs, liabilities and legal fees, from any claim or
              demand made by any third party due to or arising out of (i) your
              access to or use of Services, (ii) your violation of these Terms &
              Conditions,
            </li>
            <li>
              6. It is also your responsibility to wipe, clean or delete data on
              your Gadget being sold via InstantCashPick. You confirm that all
              the data in the said device will be erased before handing it over.
              You also confirm that in spite of erasing the data
              manually/electronically, if any data still accessible due any
              technical reason, InstantCashPick or the Third party buyer shall
              not be responsible for the same and you will not approach
              InstantCashPick for any retrieval of the data.
            </li>
            <li>
              7. You understand once a device is sold by you via
              InstantCashPick, in no scenario can this device be returned back
              to you.
            </li>
            <li>
              8. You understand that Products distributed as gifts from state
              sponsored or NGO funded distribution programs are not accepted on
              InstantCashPick platform.
            </li>
            <li>
              9. We reserve the right to modify this agreement at any time
              without giving you prior notice. Your use of our website/app, any
              of our tools and services, following any such modification
              constitutes your agreement to follow and be bound by the Agreement
              as modified. Terms and conditions modifying the Agreement are
              effective immediately upon publication.
            </li>
            <li>
              10. InstantCashPick reserves the right to cancel any transaction
              that is deemed suspicious or fraudulent on the organisation’s own
              discretion.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-2 text-gray-600 mb-4 max-sm:text-sm">
          <h2 className="text-gray-700 font-semibold text-xl max-sm:text-lg">
            Terms of Use for Repair of Product
          </h2>
          <p>
            The Services constitute a technology platform that connects users of
            InstantCashPick mobile applications or websites provided as part of
            the Services (each, an “Application”) who are seeking gadget
            (Phones, tablet, Laptop etc.) repair services to a network of third
            party repair technicians, including, without limitation, independent
            third party repair technicians and third party logistics providers
            under agreement with InstantCashPick (“Third Party Professionals”).
            The Services are made available solely for your personal/
            non-commercial use unless agreed otherwise, in writing in a separate
            agreement with you.
          </p>
          <p>
            You acknowledge and agree that InstantCashPick does not provide
            gadget repair services or logistics or function as a gadget repair
            services company. Our services are to be used by you, if at all, for
            the purpose of requesting and scheduling gadget repair services or
            logistics services with third party professionals, but you agree
            that InstantCashPick has no responsibility or liability to you
            related to any gadget repair services or logistics provided to you
            by the third party professionals through the use of the services.
          </p>
          <p>
            InstantCashPick does not guarantee the suitability, safety or
            ability of third party professionals. It is solely your
            responsibility to determine if a third party professional will meet
            your needs and expectations. under no circumstances will
            InstantCashPick participate in disputes between you and a third
            party professional. By using the services, you acknowledge that you
            may be exposed to situations involving third party professionals
            that are potentially unsafe, offensive, harmful to minors, or
            otherwise objectionable, and that your use of third party
            professionals arranged or scheduled using the services is at your
            own risk and judgment. InstantCashPick shall not have any liability
            whatsoever arising from or in any way related to your transactions
            or relationship with third party professionals.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-gray-600 mb-4 max-sm:text-sm">
          <h2 className="text-gray-700 font-semibold text-xl max-sm:text-lg">
            Payment for Services
          </h2>
          <p>
            You understand and agree that usage of the Services may result in
            payments by you for the services you receive from a Third Party
            Professional (“Charges”). After you have received services,
            InstantCashPick will facilitate payment of the applicable Charges on
            behalf of the Third Party Professional, solely as the Third Party
            Professional’s limited payment collection agent, using the preferred
            payment method you have designated while initiating or modifying
            your Account, and will send you a receipt via email at the end of
            each session. By utilizing the Services, it is understood and agreed
            that payment of the Charges in such manner shall be considered the
            same as payment made directly by you to the Third Party
            Professional(s). Charges will be inclusive of applicable taxes
            wheresoever required by law. Charges paid by you are final and
            non-refundable, unless otherwise determined by InstantCashPick in
            its sole discretion. While you do retain the right to request lower
            Charges from a Third Party Professional for services received by you
            from such Third Party Professional at the time you receive such
            services from the Third Party Professional, InstantCashPick will
            respond accordingly to any request from a Third Party Professional
            to modify the Charges for a particular service.
          </p>
          <p>
            You understand and agree that (i) all Charges are due immediately
            and (ii) payment will be facilitated by InstantCashPick using the
            preferred payment method you have designated while initiating or
            modifying your Account. If your primary account payment method is
            determined to not able to be charged for any reason whatsoever, you
            agree that InstantCashPick may, as the Third Party Professional’s
            limited payment collection agent, use a secondary payment method in
            your account, if available.
          </p>
          <p>
            InstantCashPick reserves the right to establish, remove and/or
            revise charges for any or all aspects of the Services at any time at
            InstantCashPick’s sole discretion. InstantCashPick will use
            reasonable efforts to inform you of charges that may apply, provided
            that you will be responsible for Charges incurred under your account
            regardless of your awareness of such charges or the amounts thereof.
            We may from time to time provide certain users with promotional
            offers and discounts that may result in different charges for the
            same or similar services, and you agree that such promotional offers
            and discounts, unless also made available to you, shall have no
            bearing on your use of the services or the charges applied to you.
            You may choose to cancel your request for services from a Third
            Party Professional at any time prior to such Third Party
            Professional’s arrival.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-gray-600 mb-4 max-sm:text-sm">
          <h2 className="text-gray-700 font-semibold text-xl max-sm:text-lg">
            Repair Clauses for iOS users
          </h2>
          <p>
            We use only genuine parts while repairing iOS products, which is why
            the price may be a little higher than other service providers. We
            also provide a 1-year warranty for iOS repairs. It is advisable to
            always back up your data before submitting the device for repairs.
          </p>
          <p>
            If at any point of time during the diagnosis of the device, our
            technician feels that the device cannot be repaired within the
            stipulated time, the device will be picked up and taken to our
            service center and the same will be informed to you.
          </p>
          <p>
            The final price for repair of any iOS device will be decided post
            diagnosis of the device by our technician. You may choose to
            continue or cancel the repair at that time.
          </p>
          <p>
            Data can be lost during the process of repair. We strive hard to
            retain the data as it is, but in the case of any such event, we are
            not responsible for the loss of data. It is advisable to always back
            up your data before submitting the device for repairs.
          </p>
          <p>
            We don’t provide any kind of standby phone until the device is
            repaired.
          </p>
          <p>
            During the repair process, there is a possibility that the
            application, password, or PIN lock gets reset. We request you to
            collect the device only after fully checking your device.
          </p>
          <p>
            We provide a warranty only for the part that has been replaced. If
            some other part of the device is not working, we don’t cover it
            under our warranty policy. If any device is opened or repaired by
            any other service provider, the warranty gets void automatically.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-gray-600 mb-4 max-sm:text-sm">
          <h2 className="font-semibold text-gray-700 text-xl max-sm:text-lg">
            General
          </h2>
          <p>
            InstantCashPick does not warrant the suitability of the services
            offered on this website. Information on this website is provided on
            an “as is” basis and InstantCashPick accepts no liability for
            inaccuracies or typographical errors. Users are advised to carry out
            their own checks to ensure the suitability of the services being
            offered. InstantCashPick disclaims all liability for any damage or
            loss, whether direct or indirect, arising from use of this website.
          </p>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of the jurisdiction in which
            InstantCashPick operates. Any disputes arising out of or in
            connection with these terms and conditions shall be subject to the
            exclusive jurisdiction of the courts of that jurisdiction.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
