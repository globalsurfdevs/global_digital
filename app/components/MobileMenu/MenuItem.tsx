import * as React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
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

export const MenuItem = ({ item, children }: { item: string; children?: React.ReactNode }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <motion.li
      className="mobile-menu-li relative cursor-pointer w-full flex-col"
      variants={navmenuSection}
      onClick={children ? toggleSubmenu : undefined}
    >
      <div className="flex justify-between items-center py-2 border-b font-bold w-full">
        {item}
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
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="left-0 top-full mt-2 w-full "
        >
          {children}
        </motion.ul>
      )}
    </motion.li>
  );
};
