"use client"

import React, { useState } from 'react'
import { accordianItems } from '@/app/data/accordianItems'
import Image from "next/image";
import arrowactive from '@/public/assets/logos/arr-active.svg'
import arrowdown from '@/public/assets/logos/arr-down.svg'
import {Collapse} from 'react-collapse';

const FAQ = () => {

    const [open,setOpen] = useState<number | null>(null)

    const toggle = (itemIndex:number) =>{
        if(open==itemIndex){
            setOpen(null)
            return
        }

        setOpen(itemIndex)
    }

    return (
        <div className='container mx-auto py-4'>
            <div className='py-24 grid grid-cols-1 xl:grid-cols-7'>

                <div className='col-span-2  mb-5 xl:mb-0'>
                    <h1 className='title-65'>FAQ</h1>
                </div>

                <div className='col-span-5 w-full'>

                    {accordianItems.map((item,index)=>(
                        <div className='flex justify-between w-full border-b border-t py-8 lg:pt-[50px] lg:pb-[50px] items-center gap-3' key={index}  onClick={()=>toggle(index)}>
                            <div className='flex flex-col  '>
                            <div className={` ${open===index ? 'text-30 text-black' : 'text-30 text-gray1'}`} >{index + 1}. {item.title}</div>
                                <Collapse isOpened={open===index}>
                                    <div className="collapse-item pt-[22px]"><p className='text-19 text-gray1'>{item.description}</p></div>
                                </Collapse>
                            </div>
                            {open === index ? <div className='text-5xl text-primary'><Image src={arrowactive} alt="image" className="w-[35px] h-35px   "></Image></div> : <div className='text-xl'>
                                <Image src={arrowdown} alt="image" className="w-15 h-15 bg-white "></Image></div>}
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default FAQ