"use client"


import { JobInputType } from '@/app/types/JobInputType'
import { JobType } from '@/app/types/JobType'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { toast } from 'sonner'

const AdminJobs = () => {

        const [jobs, setJobs] = useState<JobType[] | []>([])
        const [refetch, setRefetch] = useState(false)

        useEffect(() => {
            const fetchJobsData = async () => {
                try {
                    const response = await fetch(`/api/jobs`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data)
                        setJobs(data.jobs)
    
                    } else {
                        console.error("Failed to fetch job data");
                    }
                } catch (error) {
                    console.error("Error fetching job data:", error);
                }
            }
    
            fetchJobsData()
        }, [refetch])

        const handleDeleteJob = async(id:number) =>{
            try {
                const response = await fetch(`/api/jobs?id=${id}`,{
                    method:"DELETE"
                });
                    if (response.ok) {
                        const data = await response.json();
                        toast.success(data.message)
                        setRefetch((prev)=>!prev)
                    } else {
                        console.error("Failed to remove job data");
                    }
            } catch (error) {
                console.error("Error deleting job:",error)
            }
        }

        
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl'>Available jobs</h1>
                <Link href={'/admin/jobs/add'}><button className='bg-blue-950 text-white p-2 rounded-xl'>Add a new job</button></Link>
            </div>
            <div className='flex flex-col gap-3'>
                {jobs && jobs.length > 0 ? (jobs.map((item)=>(
                                    <div className='w-full relative'>

                                    <Link href={`/admin/jobs/${item.id}`} className="w-full h-32 flex flex-col items-center px-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div className='flex h-full flex-col p-5 items-start'>
                                            <div className="flex flex-col justify-between leading-normal items-center">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.jobTitle}</h5>
                                            </div>
                                            <div className="flex flex-col justify-between leading-normal">
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.team}</h5>
                                            </div>
                                        </div>
                
                
                                    </Link>
                
                                    <div className='justify-start flex h-full p-2 absolute top-5 right-5'>
                                        <div className='size-5 bg-red-600 rounded-full items-center flex justify-center text-xl text-white' onClick={()=>handleDeleteJob(item.id)}><IoIosClose /></div>
                                    </div>
                
                                </div>
                ))) 
                
                : 
                
                (<div>No jobs available</div>)}


            </div>
        </div>
    )
}

export default AdminJobs