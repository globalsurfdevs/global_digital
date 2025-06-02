import React from "react";
import Head from "next/head"; // Add this import

export default function TestMenuPage() {
  return (
    <main>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
     <div className="container mx-auto  text-center" style={{ paddingTop: "150px", paddingBottom: "100px",height: "100vh" }}>
      <h1 className="text-2xl font-bold mb-4">Test Menu</h1>
      <p className="mb-4">
        This page is for testing purposes only and will not be indexed by search engines.
      </p>
      <p className="mb-4">
        You can add your test menu </p>

    </div>
      {/* Add your test menu content here */}
    </main>
  );
}