"use client"

import React, { useEffect, useState } from 'react'
import { partnerData } from '@/app/data/partnerData'
import { motion, AnimatePresence } from 'framer-motion'

const Partner = () => {
    const [dataIndex, setDataIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setDataIndex((prev) => {
                const nextIndex = prev == partnerData.length - 1 ? 0 : prev + 1
                return nextIndex
            })
        }, 2000);

        return () => clearInterval(interval)

    }, [])

    return (
        <div className='bg-dgray mt-[50px]  lg:mt-20 '>
            <div className='container py-4 mx-auto'>
                <div className='pt-[50px] lg:pt-[110px] pb-[50px] lg:pb-[115px] flex flex-col gap-[50px] lg:gap-[94px]'>
                    <div className='border-b pb-8   border-gray-500'>
                        <p className='title-65'>Why Partner With Us</p>
                    </div>
                    <div className='title-65 font-medium leading-[120px]   overflow-hidden relative'>
                        {/* We turn Data into <span className='text-primary'>Insights</span> */}
                        We Turn <span className='text-gray1'>{partnerData[dataIndex].item.split(" ").slice(0, partnerData[dataIndex].item.split(" ").length - 1).toString().replace(",", " ")+" "}</span>
                        <AnimatePresence><motion.span key={partnerData[dataIndex].item} // Add a key to make sure the element is treated as a unique component
                            whileInView={{ y: 0 }}
                            exit={{ y: "100%" }}
                            initial={{ y: "-100%" }} className='text-primary absolute ml-3'>{partnerData[dataIndex].item.split(" ").slice(partnerData[dataIndex].item.split(" ").length - 1).toString()}</motion.span></AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Partner