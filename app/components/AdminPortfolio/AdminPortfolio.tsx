"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Portfolio } from '@/app/types/Portfolio'
import { IoIosClose } from "react-icons/io";
import { toast } from 'sonner';

const AdminPortfolio = () => {

    const [portfolios, setPortfolios] = useState([])
    const [refetch,setRefetch] = useState(false)

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const response = await fetch(`/api/portfolio`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.portfolio)
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

    const handlePortfolioDelete = async(id:number) =>{
        try {
            const response = await fetch(`/api/portfolio?id=${id}`,{
                method:"DELETE"
            });
                if (response.ok) {
                    const data = await response.json();
                    toast.success(data.message)
                    setRefetch((prev)=>!prev)
                } else {
                    console.error("Failed to remove portfolio data");
                }
        } catch (error) {
            console.error("Error deleting portfolio:",error)
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl'>List of companies</h1>
                <Link href={'/admin/portfolio/add'}><button className='bg-blue-950 text-white p-2 rounded-xl'>Add a new portfolio</button></Link>
            </div>
            <div className='flex flex-col gap-3'>
                {portfolios.length > 0 ? (

                    portfolios.map((item: Portfolio) => (
                        <div className='w-full relative' key={item.id}>

                            <Link href={`/admin/portfolio/${item.id}`} className="w-full h-32 flex flex-col items-center justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className='flex h-full'>
                                    <img className="object-cover w-full rounded-t-lg h-full md:h-full md:w-48 md:rounded-none md:rounded-s-lg" src="/images/brand/brand-01.svg" alt="" />
                                    <div className="flex flex-col justify-between p-4 leading-normal items-center">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.companyName}</h5>
                                    </div>
                                </div>

                                
                            </Link>

                            <div className='justify-start flex h-full p-2 absolute top-5 right-5'>
                                    <div className='size-5 bg-red-600 rounded-full items-center flex justify-center text-xl text-white' onClick={()=>handlePortfolioDelete(item.id)}><IoIosClose/></div>
                                </div>

                        </div>
                    ))


                ) : (

                    <div>No portfolios available</div>
                )}


            </div>
        </div>
    )
}

export default AdminPortfolio