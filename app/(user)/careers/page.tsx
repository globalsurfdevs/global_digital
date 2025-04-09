
import React  from "react";
import Index from "@/app/components/Careers";

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
    title: "Digital Marketing Careers |GS.Digital",
    description:
      "Digital Marketing Careers. Contact us now",
    alternates: {
      canonical: "https://www.globalsurf.ae/careers",
    },
  };
}
const page = () => {


  return (
    <>
    <Index/>
    </>


  );
};

export default page;
