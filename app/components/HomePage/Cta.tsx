"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LetsTalk from "@/app/components/common/LetsConnect";
import Link from "next/link";

const Cta = () => {
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
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      {/* Modal section */}
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}

      {/* CTA section */}
      <div className="bg-black pt-[50px] xs:pt-10 lg:pt-14 xl:pt-[109px]">
        <div className="container mx-auto px-4 text-white">
          <div className="flex flex-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { y: 50 },
                visible: {
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                },
              }}
            >
              <div className="flex h-1/2 flex-col justify-center border-b border-gray-400">
                <h2 className="text-font65 leading-lh1p07">
                  <span className="text-primary">Ready to see </span>what your marketing spend can actually deliver?
                </h2>
                <p className="text-font25 leading-[35px] text-[#A3A3A3] lg:mt-10">Talk to our digital marketing agency in Dubai about what a strategy built around your commercial objectives could achieve for your business across the UAE.</p>

                <div className="innerfnont mb-10 mt-10 lg:mb-[120px] lg:mt-[57px]">
                  <Link
                    href="/contact-us"
                    className="text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 text-white transition-all duration-300 ease-in hover:bg-primary hover:text-primary hover:text-white hover:shadow-lg lg:px-24"
                  >
                    <span className="duration-300 ease-in group-hover:text-black">
                      Start the Conversation
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cta;
