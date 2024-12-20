import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { menuItems } from "@/app/data/menuItems";


const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = () => (
  <>
    <motion.ul variants={variants} className="mobile-menu-ul">
    {menuItems.map((item, index) => (
      <MenuItem key={index} i={index} item={item}/>
    ))}
  </motion.ul>
  </>
);

// const itemIds = [0, 1, 2, 3];
