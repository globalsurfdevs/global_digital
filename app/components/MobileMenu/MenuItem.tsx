import * as React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from '@/public/assets/assets'

const navmenuSection = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({
  item,
  Links,
  children,
  toggle
}: {
  item: string;
  Links: string;
  children?: React.ReactNode;
  toggle:()=>void
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <motion.li
      className="items-center  relative cursor-pointer w-full flex-col"
      
      onClick={children ? toggleSubmenu : toggle}
    >
      <div className="flex justify-between items-center  border-b font-bold w-full">
       <Link href={Links} className="py-3 w-full"> {item}</Link>
        {children && (
          <span className="ml-2">
          {isSubmenuOpen ? (
            <Image
              className=" dark:block"
              src={assets.up_arrow}
              alt="Logo"
              width={32}
              height={32}
            />
          ) : (
            <Image
              className=" dark:block"
              src={assets.down_arrow}
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </span>

        )}
      </div>
      {children && isSubmenuOpen && (
        <motion.ul
          className="left-0 top-full mt-2 w-full "
        >
          {children}
        </motion.ul>
      )}
    </motion.li>
  );
};
