import * as React from "react";
import { useRef, useState } from "react";
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

  const hideButton = () => {
    setHideIcon((prev)=>!prev)
  }

  const debouncedToggle = React.useCallback(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => toggleOpen(), 500);
    };
  }, [toggleOpen]);
  const [hideIcon, setHideIcon] = useState(false);
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

        <Navigation toggle={()=>toggleOpen()} onHide={hideButton}/>

        <div className="text-white px-6">
          <div className="border-t pb-5 pt-5 flex flex-col gap-4  ">



            <motion.div><h2 className="text-primary">Follow us on</h2></motion.div>
        <motion.div>
          <div className="flex w-full text-black text-2xl gap-5">
          <a href="https://www.facebook.com/globalsurf.digital" target="_blank" rel="nofollow" className="hover:text-primary"><FaFacebookF /></a>
          <a href="https://x.com/GlobalSurf_D" target="_blank" rel="nofollow" className="hover:text-primary"> <FaXTwitter/></a>
          <a href="https://www.instagram.com/globalsurf.digital/" target="_blank" rel="nofollow" className="hover:text-primary">  <FaInstagram /></a>
          <a href="https://www.linkedin.com/company/globalsurfdigital" target="_blank" rel="nofollow" className="hover:text-primary"> <FaLinkedin/></a>
          <a href="https://www.tiktok.com/@globalsurf.digital" target="_blank" rel="nofollow" className="hover:text-primary"> <FaTiktok/></a>
            </div>
        </motion.div>
        </div>
        </div>

        </motion.div>}

<div className="bg-white w-20">
<MenuToggle toggle={() => toggleOpen()} hidden={hideIcon}/>

</div>
    </motion.nav>
  );
};
