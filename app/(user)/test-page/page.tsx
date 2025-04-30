"use client";
import React, { useEffect, useState } from "react";

import LetsTalk from "@/app/components/common/LetsConnect";

const page = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [modalOpen]);

  return (
    <div>
      {/* Modal section */}
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}
      <div className="container  text-white">
        <div className="flex flex-col items-center justify-center py-[50px] xs:py-10 lg:py-14 xl:pb-[131px] xl:pt-[109px]">
          <h1 className="mb-3 text-[40px] text-black">Test Page</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 text-black transition-all duration-300 ease-in hover:bg-primary hover:text-primary hover:text-white hover:shadow-lg lg:px-24"
          >
            <span className="duration-300 ease-in group-hover:text-black">
              LET’S CONNECT
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
