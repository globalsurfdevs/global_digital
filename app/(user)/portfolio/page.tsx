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
const page = async() => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return (
    <>
      <Portfolio data={data.portfolio}/>
    </>
  );
};

export default page;
