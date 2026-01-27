import React from "react";
import Script from "next/script";
import ContactUs from "../../components/common/ContactUs"; 

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
    title: "contact",
    description:
      "contact",
    alternates: {
      canonical: "https://www.globalsurf.ae/contact-us",
    },
  };
}

const page = () => {
  return (
    <>
    
      <ContactUs  /> 
    </>
  );
};

export default page;
