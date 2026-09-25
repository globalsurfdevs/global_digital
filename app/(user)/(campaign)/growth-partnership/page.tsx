import GrowthPartnershipLanding from "@/app/components/GrowthPartnership/GrowthPartnershipLanding";
import React from "react";

const page = async () => {
  return (
    <>
      <GrowthPartnershipLanding />
      {/* Whatsapp Contact */}
      <a
        href="https://wa.me/message/SZ6OPV5N2KURK1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-7 right-7 z-[9999] flex items-center justify-center rounded-full  bg-white shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <img
          src="/assets/images/branding-positioning/whatsapp-icon.svg"
          alt="WhatsApp"
          className="relative z-10 h-8 w-8"
        />
      </a>
    </>
  );
};

export default page;
