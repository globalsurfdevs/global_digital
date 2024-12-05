import * as React from "react";
import { useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimentions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
//   closed: {
//     clipPath: "circle(30px at calc(100% - 40px) 40px)",
//     transition: {
//       delay: 0.5,
//       type: "spring",
//       stiffness: 400,
//       damping: 40
//     }
//   }
};



export const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  React.useEffect(()=>{
    console.log(isOpen)
  },[isOpen])

  

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      {<motion.div className={isOpen ? "background" : ""} variants={sidebar} />}
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
