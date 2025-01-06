import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimentions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

import Link from "next/link";

const sidebar = {
  open: {
    x: 0, // Slide in from the right
    transition: {
      type: "tween",
      duration: 0.3, // Adjust the speed of the animation
    },
  },
  closed: {
    x: "100%", // Move out to the right
    transition: {
      type: "tween",
      duration: 0.3, // Adjust the speed of the animation
    },
  },
};

const imageSection = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      delay: 0
    }
  },
  closed: {
    x: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}



export const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const menuRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(()=>{
    console.log(isOpen)
    if (isOpen == true) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }
    else {
      document.body.style.overflow = "";
      document.body.style.height = "100vh";
    }
  },[isOpen])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        event.stopPropagation();
        toggleOpen();
      }
    };

    document.addEventListener("click", handleClickOutside,{passive:false});
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const debouncedToggle = React.useCallback(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => toggleOpen(), 500);
    };
  }, [toggleOpen]);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
<div className={isOpen ? "overlay-nav" : ""}></div>
      {<motion.div className={"menusi background shadow-lg"} variants={sidebar} ref={menuRef}>

        <motion.div className="">
          <div className="fixed w-full min-h-[60px] bg-white z-1 py-5 px-6">
            <Link href="/">
              <Image src={assets.logo} alt="logo" className="w-32" />
              </Link>
          </div>
        </motion.div>

        <Navigation toggle={()=>toggleOpen()}/>

        <div className="text-white px-6">
          <div className="border-t pb-5 pt-5 flex flex-col gap-4 items-center">


        <Link
              href="/lets-talk"
              className="  group  flex items-center space-x-2 px-6 py-2 border border-primary rounded-full text-primary hover:bg-prtext-primary hover:text-primary
               hover:text-black hover:shadow-lg ease-in duration-300 transition"
            >
              <span className="group-hover:text-black ease-in duration-300">
                LET’S TALK
              </span>
              <div className="bg-primary p-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-105"
                >
                  <g clipPath="url(#clip0_65_39)">
                    <path
                      d="M8.88346 1.26172L1.13281 8.8624"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M1.13281 1.26172H8.88346V8.71245"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_65_39">
                      <rect width="10" height="10" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>
        <motion.div>
          <div className="flex w-full text-black text-2xl gap-5">
          <a href="https://www.facebook.com/globalsurf.digital" target="_blank" className="hover:text-primary"><FaFacebookF /></a>
          <a href="https://x.com/GlobalSurf_D" target="_blank" className="hover:text-primary"> <FaXTwitter/></a>
          <a href="https://www.instagram.com/globalsurf.digital/" target="_blank" className="hover:text-primary">  <FaInstagram /></a>
          <a href="https://www.linkedin.com/company/globalsurfdigital" target="_blank" className="hover:text-primary"> <FaLinkedin/></a>
          <a href="https://www.tiktok.com/@globalsurf.digital" target="_blank" className="hover:text-primary"> <FaTiktok/></a>
            </div>
        </motion.div>
        </div>
        </div>

        </motion.div>}

<div className="bg-white w-20">
<MenuToggle toggle={() => toggleOpen()}/>

</div>
    </motion.nav>
  );
};
