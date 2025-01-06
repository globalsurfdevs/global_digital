"use client"
import { motion } from 'framer-motion';
import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import Button from '../Button/Button'
import React from 'react'
import { CaseStudy } from '@/app/types/CaseStudy';
import Link from 'next/link';

const Ready = ({data}:{
  data:{
    caseStudy:CaseStudy[]
  }|null
}) => {

  if(!data){
    return null
  }

  return (
      <div className='container mx-auto py-4'>
           {data.caseStudy[0].image1 || data.caseStudy[0].image2 ? <motion.div
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                              variants={{
                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                }}
                                      >
        <div className=' grid grid-cols-2 gap-[20px]'>

            {data.caseStudy[0].image1 && <div className=''>
                <Image src={data.caseStudy[0].image1} alt='image1' width={800} height={500}/>
            </div>}

            {data.caseStudy[0].image2 && <div className=''>
                <Image src={data.caseStudy[0].image2} alt='image2' width={800} height={500}/>
            </div>}

              </div>
              </motion.div> : null }
              <motion.div
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                              variants={{
                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } }, // Slide up and fade in
                                }}
                                      >
                <div className='lg:pb-[150px] pb-[50px] lg:pt-[138px] pt-[30px] border-b flex flex-col   '>
                    <h2 className='title-65 mb-4 lg:mb-7'>We’re Ready - Are You?</h2>
                    <p className='text-19 text-gray1 max-w-[113ch] fnt-lexend'>If you&apos;re looking forward to growing your digital presence with fresh and effective strategies,
                        you’re in the right place. With our experience and a personal touch, we’ll help your brand connect
                        with the right audience in a way that truly resonates. </p>
          <div >

            <div className='mt-[20px] lg:mt-[64px] innerfnont relative'><Button text='LET&apos;S COLLABORATE' />

            <Link href="/lets-talk" className="absolute left-0 top-0 w-full h-full"></Link>
            </div> </div>
                </div>

              </motion.div>

    </div>
  )
}

export default Ready