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
import Link from "next/link";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(20px at calc(100% - 40px) 30px)",
    transition: {
      delay: 0,
      type: "tween",
      stiffness: 400,
      damping: 10,
    },
  }
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
    }
    else {
      document.body.style.overflow = "";
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
        toggleOpen();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
<div className={isOpen ? "overlay-nav" : ""}></div>
      {<motion.div className={"menusi background shadow-lg"} variants={sidebar} ref={menuRef}>

        <motion.div className="" variants={imageSection}>
          <div className="fixed w-full min-h-[60px] bg-white z-1 py-5 px-6">
            <Link href="/">
              <Image src={assets.logo} alt="logo" className="w-32" />
              </Link>
          </div>
        </motion.div>

        <Navigation/>

        <div className="text-white px-6">
          <div className="border-t pb-5 pt-5 flex flex-col gap-4">
        <motion.div variants={imageSection}><h2 className="text-primary">Follow us on</h2></motion.div>
        <motion.div variants={imageSection}>
          <div className="flex w-full text-black text-2xl gap-10">
          <FaFacebookF />
            <FaXTwitter/>
            <FaInstagram />
            </div>
        </motion.div>
        </div>
        </div>

        </motion.div>}

      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
