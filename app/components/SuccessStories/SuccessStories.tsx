"use client"
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Link from 'next/link';
import { Portfolio } from '@/app/types/Portfolio';
import { formatLinkForPortfolio,formatLinkForCaseStudy } from '@/app/helpers/formatLink';

export const SuccessStories = ({companyId}:{
    companyId:number | undefined
}) => {

    const [data, setData] = useState<Portfolio[] | null>(null)
    
        useEffect(() => {
            
            const fetchPortfolios = async () => {
                const response = await fetch(`/api/portfolio`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setData(data?.portfolio.filter((item:Portfolio)=>item.id!==companyId).sort(() => Math.random() - 0.5).slice(0,3))
                }
            }
    
            fetchPortfolios()
    
        }, [companyId])


        
    return (
        <div className='pt-[50px] lg:pt-[50px] flex flex-col   lg:pb-[140px] pb-[52px]'>
            <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                      }}
                            >
                <div>
                <h2 className='title-65 pb-5 lg:pb-[48px]'>Success Stories We&apos;re Proud of</h2>
                </div>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } }, // Slide up and fade in
                      }}
                            >
            <div className='grid lg:grid-cols-3 gap-8'>

                {data && data.length > 0 ? (data?.map((item,index) => (
                    <div className='flex flex-col relative ' key={index}>
                        <div className='bg-black h-96 relative mb-4 lg:mb-[31px]'>
                            <Image src={item.bannerImage ?? item.coverImage} alt="image" className="absolute object-cover w-full h-full" fill/>
                        </div>
                        <div className=''>
                            <img src={item.logo} alt='logo' className='h-[50px] w-auto'/>
                        </div>
                        <div className='bg-black h-[.5px] w-full mt-[10px] lg:mt-[32px] mb-[10px] lg:mb-[42px]'>

                        </div>
                        <div>
                            <h4 className='text-font30'>{item.companyName}</h4>
                        </div>

                        <Link href={item.section == 'portfolio' ? `/portfolio/${formatLinkForPortfolio(item.companyName)}` : `/case-study/${formatLinkForCaseStudy(item.companyName)}`} className='absolute w-full h-full left-0 top-0'></Link>

                    </div>

                ))):(
                    <div>No success stories</div>
                )}
            </div>
            </motion.div>

        </div>
    )
}

