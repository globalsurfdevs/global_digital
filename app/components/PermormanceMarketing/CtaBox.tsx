"use client"
import React from 'react'
import Button from '../Button/Button'
import Link from "next/link";
import { motion } from 'framer-motion';
type PartnerDataType = {
    text: string;
  textred: string;
  texttwo?: string;
  desc?: string;
  };

  type PartnerListProps = {
    ctabbutton: string;
    redlast?: boolean;
    link: string;
    data: PartnerDataType[];
  };

  const CtaBox: React.FC<PartnerListProps> = ({ data , ctabbutton, link, redlast }) => {
  return (
      <div className="flex flex-col bg-dgray py-[50px] lg:py-[130px]">
      <div className="container px-4 mx-auto ">
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
                <div>
                  <h2 className="title-65 leading-[1.15]" key={index}>
                  <span className="text-primary">{item.textred} </span>{item.text}
                  <br></br>
                  <span>{item.texttwo}</span>
                </h2>
                <p   className="text-19 lg-mb-[64px] fnt-lexend mb-0 text-gray1 mt-5 md:mt-8 xl:mt-14">{item.desc}</p>
                </div>
              ) : <div>
              <h2 className="title-65 leading-[1.15]" key={index}>
              {item.text}<span className="text-primary">{item.textred} </span>
              <br></br>
              <span>{item.texttwo}</span>
            </h2>
            <p   className="text-19 lg-mb-[64px] fnt-lexend mb-0 text-gray1 mt-5 md:mt-8 xl:mt-14">{item.desc}</p>
            </div>
            ))}

            {/* //   <div key={index}>
            //     <h2 className="title-65 leading-[1.15]" >
            //       {item.text}<span className="text-primary">{item.textred} </span>
            //       <br></br>
            //       <span>{item.texttwo}</span>
            //   </h2>
            //    <p   className="text-19 lg-mb-[64px] fnt-lexend mb-0 text-gray1 mt-5 md:mt-8 xl:mt-14">{item.desc}</p>
            //    </div>
            // ))} */}

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
            <div className='mt-6 lg:mt-[57px] innerfnont'><Link href={link}><Button text={ctabbutton} textcolor={'black'}/></Link></div>

          </motion.div>
            </div>
          </div>
        </div>
  )
}

export default CtaBox