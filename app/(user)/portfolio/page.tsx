import React from "react";
import Portfolio from "@/app/components/Portfolio";
interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Digital Marketing Agency Portfolio | GS.Digital",
    description:
      "Explore GS.Digital’s portfolio featuring innovative marketing strategies, creative designs, and impactful branding solutions.",
    alternates: {
      canonical: "https://www.globalsurf.ae/portfolio",
    },
  };
}
const page = () => {
  return (
    <>
      <Portfolio />
    </>
  );
};

export default page;
