"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from "react"
import logo1 from '../../../public/assets/logos/002.png'
import logo2 from '../../../public/assets/logos/003.png'
import logo3  from '../../../public/assets/logos/010.png'
import logo4  from '../../../public/assets/logos/004.png'
import {Lexend} from "next/font/google";
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });

const HeroSection = () => {
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
  }, []); // Empty dependency array ensures this runs once on mount

    return (
        <>
            <div className='container mx-auto py-2' ref={nextContainerRef}  >
                <div className=''>

                    <div className='border-b flex justify-between pt-[130px] pb-10 items-end'>
                        <div className='  max-w-[1000px] '><h1 className='leading-[95px] text-[80px]'>Data Driven Performance Marketing Solutions</h1></div>
                        <div className='text-gray1 text-font19'>01</div>
                    </div>

                    <div className='grid grid-cols-2 md:py-[142px] py-24'>

                        <div className='col-span-1'>
                            <div className='flex gap-2 items-center'>
                                <h3 className='text-[30px]'>OUR APPROACH</h3>
                                <div className='w-5 h-5 bg-primary'></div>
                            </div>
                        </div>

                        <div className='text-[19px] text-gray1 xl:ms-[137px] ms-3'>
                            <p className={`${lexend.className}`}>Our team will work with you to understand your goals and identify the
                                channels that will give you the best ROI. We’ll help you develop a custom
                                ads strategy to make sure that your marketing budget is spent effectively.
                                We then design creative for your ads and provide ongoing optimization and
                                management in order to achieve sustainable, growth-focused results.</p>
                        </div>

                    </div>

                </div>
            </div>

            <div  style={{ width: divWidth  }}>
                <div className='flex gap-5 bg-bglight pl-40 py-5'>
                    <div className='flex justify-between w-1/2'>
                        <Image src={logo1 } alt='image' width={160} height={40}></Image>
                        <Image src={logo2} alt='image' width={102} height={40}></Image>
                        <Image src={logo3} alt='image' width={88} height={44}></Image>
                        <Image src={logo4} alt='image' width={65} height={46}></Image>
                    </div>

                </div>

                <div className='bg-black w-full h-[500px]'>

                </div>

            </div>



        </>
    )
}

export default HeroSection