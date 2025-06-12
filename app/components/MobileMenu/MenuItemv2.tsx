import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from '@/public/assets/assets';

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

const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn"
    }
  }
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
  toggle: () => void;
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <motion.li
      className="items-center relative cursor-pointer w-full flex-col"
      onClick={children ? toggleSubmenu : toggle}
    >
      <div className="flex justify-between items-center border-b font-bold w-full">
        <Link href={Links} className="py-4 w-full">{item}</Link>
        {children && (
          <span className="ml-2">
            <Image
              className="dark:block"
              src={isSubmenuOpen ? assets.up_arrow : assets.down_arrow}
              alt="Arrow Icon"
              width={32}
              height={32}
              style={{ filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)" }}
            />
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {children && isSubmenuOpen && (
          <motion.ul
            className="left-0 top-full w-full overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
};
