import * as React from "react";
import { motion, SVGMotionProps } from "framer-motion";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
interface MenuToggleProps {
  hidden: boolean
  toggle: () => void; // Explicitly typing 'toggle' as a function returning void+
}

const Path = (props: React.JSX.IntrinsicAttributes & SVGMotionProps<SVGPathElement> & React.RefAttributes<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, hidden }) =>{
  React.useEffect(()=>{
    console.log(hidden);
  }, [hidden])

return (


 <> 

  <button onClick={toggle}  className={`menuToggle ${hidden ? "invisible" : "sdsd"} `}>
    
  <svg width="23" height="23" viewBox="0 0 23 23">
    <Path
      variants={{
        closed: { d: "M 2 2.5 L 20 2.5" },
        open: { d: "M 3 16.5 L 17 2.5" },

      }}
    />
    <Path
      d="M 8 9.423 L 20 9.423"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 },
      }}
      transition={{ duration: 0.1 }}
    />
    <Path
      variants={{
        closed: { d: "M 2 16.346 L 20 16.346" },
        open: { d: "M 3 2.5 L 17 16.346" },
      }}
    />
  </svg>
</button>
  
</>
  )


}
;