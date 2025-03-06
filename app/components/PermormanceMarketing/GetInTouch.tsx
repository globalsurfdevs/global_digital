"use client"
import React from 'react'
import Button from '../Button/Button'
import Link from "next/link";
import { motion } from 'framer-motion';
type PartnerDataType = {
    text: string;
    textred: string;
  };

  type PartnerListProps = {
    ctabbutton: string;
    link: string;
    redlast?: boolean;
    data: PartnerDataType[];
  };

  const GetInTouch: React.FC<PartnerListProps> = ({ data , ctabbutton, link, redlast}) => {
  return (
      <div className="flex flex-col bg-black py-[50px] lg:py-[150px]">
      <div className="container px-4 mx-auto text-white">
        <div className="flex flex-col justify-center h-1/3 ">

      <motion.div
                  initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                          variants={{
                            hidden: { opacity: 0, y: 50 }, // Start below and invisible
                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                          }}
          >

            {data.map((item, index) => (
              redlast ? (
                <h2 className="title-65 leading-[1.15]" key={index}>
                  {item.text}<span className="text-primary">{item.textred} </span>
                </h2>
              ) : <h2 className="title-65 leading-[1.15]" key={index}>
              <span className="text-primary">{item.textred} </span>{item.text}
            </h2>
            ))}
          </motion.div>

      <motion.div
                  initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                          variants={{
                            hidden: { opacity: 0, y: 50 }, // Start below and invisible
                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                          }}
                >
            <div className='mt-6 lg:mt-[57px] innerfnont'><Link href={link}><Button text={ctabbutton} /></Link></div>

          </motion.div>
            </div>
          </div>
        </div>
  )
}

export default GetInTouch