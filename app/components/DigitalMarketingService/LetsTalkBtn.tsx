"use client"
import React, { useEffect, useState } from 'react'
import { Lexend } from 'next/font/google'
import LetsTalk from '../common/LetsConnect';
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})  
export default function LetsTalkBtn() {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {

    console.log("modalOpen", modalOpen);
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
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}
      <div className="relative">

        <button onClick={() => setModalOpen(true)} className="z-2 z-1 group relative flex w-fit items-center gap-1 lg:gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0 pb-3 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0 " >
          <div className="relative">
            <div className=" bg-white overflow-y-auto">
             
              <p className={`duration-200" text-font16 font-medium ease-in-out group-hover:text-primary uppercase ${lexend.className}`}>
                Get Your Custom Growth Plan
              </p>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="duration-200 ease-in-out group-hover:scale-125 group-hover:stroke-black">
            <g clipPath="url(#clip0_46_1045)" className="group-hover:stroke-black">
              <path d="M18.7892 1.27512L0.699219 19.0151" stroke="#E63E31" strokeWidth="2" strokeMiterlimit="10" className="group-hover:stroke-black" />
              <path d="M0.699219 1.27512H18.7892V18.6651" stroke="#E63E31" strokeWidth="2" strokeMiterlimit="10" className="group-hover:stroke-black" />
            </g>
            <defs>
              <clipPath id="clip0_46_1045">
                <rect width="19.79" height="19.45" fill="white" transform="translate(0 0.275116)" />
              </clipPath>
            </defs>
          </svg>
        </button>

      </div>
   
    </>
  )
}
