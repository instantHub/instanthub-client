import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";
import FloatingButtons from "../../components/FloatingButtons";

const Layout = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://instantcashpick.com/",
    name: "InstantCashPick",
    description:
      "Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more..!",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://instantcashpick.com",
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <>
      {/* <meta
      name="description"
      content="India's growing trusted platform to sell old Mobile Phone, Laptops etc, sell your used Mobile Phone, Laptops etc at InstantCashPick and get instant cash at your doorstep. Visit the website to know more!"
    /> */}
      {/* <link rel="canonical" href={window.location.href} /> */}

      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>{`Sell Your Gadgets Online | InstantCashPick`}</title>
       
        <meta
          name="description"
          // No more waiting for checks to clear or funds to transfer.
          content="Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content="sell products on online, sell old mobiles online, sell old mobile online, sell old laptops online, sell old laptop online,sell old products on Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://instantcashpick.com/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet> */}
      {/* <div className="flex flex-col min-h-screen items-center"> */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <FloatingButtons />

        <div className="flex-grow">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
