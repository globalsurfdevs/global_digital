import * as React from "react";
import { motion } from "framer-motion";


const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};



export const MenuItem = ({item}:{i:number,item:{item:string}}) => {
  // const style = { border: `2px solid black` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* <div className="icon-placeholder" style={style}/> */}
      <div className="text-placeholder border-b-2 font-bold py-2 hover:bg-black hover:text-white">{item.item}</div>
    </motion.li>
  );
};