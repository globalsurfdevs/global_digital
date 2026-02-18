
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
      "Build your digital marketing career at Global Surf Dubai. Work on bold brands, big campaigns & cutting-edge tech. See open roles & join our growing team.",
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
