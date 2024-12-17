"use client"

import React, { useState } from 'react'
import { accordianItems } from '@/app/data/accordianItems'
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
            <div className='py-24 grid grid-cols-7'>

                <div className='col-span-2 text-4xl'>
                    <h1>FAQ</h1>
                </div>

                <div className='col-span-5 w-full'>

                    {accordianItems.map((item,index)=>(
                        <div className='flex justify-between w-full border-b border-t py-8 items-center gap-3' key={index}  onClick={()=>toggle(index)}>
                            <div className='flex flex-col gap-2'>
                                <div className='text-[30px]'>{index+1}. {item.title}</div>
                                <Collapse isOpened={open===index}>
                                    <div className="collapse-item">{item.description}</div>
                                </Collapse>
                            </div>
                        {open===index ? <div className='text-5xl text-primary'>&#8593;</div> : <div className='text-xl'>&#8595;</div> }
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default FAQ