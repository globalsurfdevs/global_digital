"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Portfolio } from '@/app/types/Portfolio'
import { IoIosClose } from "react-icons/io";
import { toast } from 'sonner';
import {closestCorners, DndContext} from '@dnd-kit/core'
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable';
import PortfolioCard from './PortfolioCard';

const AdminPortfolio = () => {

    const [portfolios, setPortfolios] = useState<Portfolio[]>([])
    const [refetch,setRefetch] = useState(false)
    const [reorderMode,setReorderMode] = useState(false)

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const response = await fetch(`/api/portfolio`,{
                    headers:{
                        'x-auth-type':'admin'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data.portfolio)
                    setPortfolios(data.portfolio)

                } else {
                    console.error("Failed to fetch portfolio data");
                }
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
            }
        }

        fetchPortfolios()
    }, [refetch])


    const getTaskPos = (id: number) => portfolios.findIndex((item:{id:number})=>( item.id == id))


    const handleDragEnd = (event: { active: any; over: any; }) => {
        const {active,over} = event

        console.log(active.id,over.id)

        if(active.id == over.id) return;
        setPortfolios((portfolios)=>{
            const originalPos = getTaskPos(active.id)
            const newPos = getTaskPos(over.id)
            return arrayMove(portfolios,originalPos,newPos)
        })

        console.log(portfolios)
    }

    const confirmPosition = async() => {
        setReorderMode(!reorderMode);

        const updatedPortfolios = portfolios.map((portfolio, index) => ({
            ...portfolio,
            index: index + 1,
        }));

        // setPortfolios((portfolios) =>
        //     portfolios.map((portfolio, index) => ({
        //         ...portfolio,
        //         index: index + 1,
        //     }))
        // );

        setPortfolios(updatedPortfolios); 

        const formData = new FormData()
        formData.append('portfolios',JSON.stringify(updatedPortfolios))
        const response = await fetch('/api/portfolio/reorder',{
            method:"POST",
            body:formData
        })
    };


    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-3xl'>List of companies</h1>
                </div>
                
                <div className='flex gap-2'>
                <button className='bg-primary text-white p-2 rounded-full px-6' onClick={confirmPosition}>{!reorderMode ? "Reorder" : "Confirm"}</button>
                <Link href={'/admin/portfolio/add'}><button className='bg-black text-white p-2 rounded-full px-6'>Add new content</button></Link>
                </div>
                
            </div>
            {reorderMode ? (<DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className='flex flex-col gap-3'>
                <SortableContext items={portfolios} strategy={verticalListSortingStrategy}>
                {portfolios.length > 0 ? (

                    portfolios.map((item: Portfolio) => (
                        <PortfolioCard item={item} setRefetch={setRefetch} id={item.id} reorderMode={reorderMode} key={item.customId}/>
                    ))


                ) : (

                    <div>No portfolios available</div>
                )}

                </SortableContext>
            </div>
            </DndContext>) 
            
            
            : 
            
            
            
            
                (<div className='flex flex-col gap-3'>
                    
                    {portfolios.length > 0 ? (
    
                        portfolios.map((item: Portfolio) => (
                            <PortfolioCard item={item} setRefetch={setRefetch} id={item.id} key={item.customId}/>
                        ))
    
    
                    ) : (
    
                        <div>No portfolios available</div>
                    )}
    
                    
                </div>)
                 } 
        </div>
    )
}

export default AdminPortfolio