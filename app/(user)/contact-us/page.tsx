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
    title: "Contact Us | Global Surf Digital Marketing Agency",
    description:
      "Looking to grow your business online? Contact Global Surf for a strategy discussion on SEO, performance marketing, web, and digital growth across the UAE.",
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
