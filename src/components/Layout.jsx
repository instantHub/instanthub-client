import React from "react";
import Slider from "./Slider";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const Layout = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://instantcashpick.com/",
    name: "InstantCashPick",
    description:
      "Get instant cash payments with InstantCashPick. No more waiting for checks to clear or funds to transfer. Receive cash on the spot quickly and easily.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://instantcashpick.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <>
      <Helmet>
        {/* <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /> */}
        <meta charSet="utf-8" />
        <title>{`Sell Your Gadgets | InstantCashPick`}</title>
        {/* <meta
      name="description"
      content="India's growing trusted platform to sell old Mobile Phone, Laptops etc, sell your used Mobile Phone, Laptops etc at InstantCashPick and get instant cash at your doorstep. Visit the website to know more!"
    /> */}
        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick. No more waiting for checks to clear or funds to transfer. Receive cash on the spot quickly and easily."
        />

        <meta
          name="keywords"
          content="Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://instantcashpick.com/" />
        {/* <link rel="canonical" href={window.location.href} /> */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
