import React from "react";
import Home from "@/app/components/HomeTest/Indexv2";

type Metadata = {
  title: string;
  description: string;
  robots: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Digital Marketing Agency in Dubai ",
    description:
      "GS Digital is a digital marketing agency in Dubai covering a full-service digital marketing services including SEO, paid media, social media, and web development for 140+ UAE and GCC brands since 2013. Talk to us today. ",

    robots: "noindex, nofollow",
  };
}

const page = async () => {
  return (
    <>
      <Home />
    </>
  );
};

export default page;
