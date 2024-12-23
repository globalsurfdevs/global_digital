import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { menuItems } from "@/app/data/menuItems";




export const Navigation = () => (
  <>
    <motion.ul   className="mobile-menu-ul">
    {menuItems.map((menuItem, index) => (
      <MenuItem

      key={index}
      item={menuItem.item}
      children={menuItem.children}
    />
    ))}
  </motion.ul>
  </>
);

// const itemIds = [0, 1, 2, 3];
