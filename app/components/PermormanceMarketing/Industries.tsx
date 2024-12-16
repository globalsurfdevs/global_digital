"use client"
import React, { useEffect, useRef, useState } from "react"
import WorkSwiper from '../HomePage/WorkSwiper'

const Industries = () => {
   // Ref for the next container (HTMLDivElement type)
    const nextContainerRef = useRef<HTMLDivElement | null>(null);
    const [divWidth, setDivWidth] = useState("100%");

    useEffect(() => {
      const updateDivWidth = () => {
        if (nextContainerRef.current) {
          // Get the bounding rectangle of the next container
          const containerRect = nextContainerRef.current.getBoundingClientRect();

          // Get the computed style of the next container to retrieve margin values
          const computedStyle = window.getComputedStyle(nextContainerRef.current);

          // Calculate the total width including margins (left + width + right)
          const marginLeft = parseFloat(computedStyle.marginLeft);
            const totalWidth = containerRect.width + marginLeft - 15

          setDivWidth(`${totalWidth}px`);
        }
      };
      // Initial width calculation
      updateDivWidth();

      // Recalculate on window resize
      window.addEventListener("resize", updateDivWidth);

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener("resize", updateDivWidth);
      };
    }, []);
  return (
    <div className=' '>
        <div className='pt-[140px] pb-[134px] flex flex-col  border-b-2'>

            <div className=' container mx-auto text-4xl' ref={nextContainerRef}>
                <h1 className="text-font65 leading-lh1p07 pb-[60px]">Industries We Serve</h1>
            </div>
<div className="overflow-hidden ms-auto" style={{ width: divWidth  }}>
          <WorkSwiper />
          </div>
        </div>
    </div>
  )
}

export default Industries