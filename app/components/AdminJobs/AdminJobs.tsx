"use client"

import { JobInputType } from '@/app/types/JobInputType'
import { JobType } from '@/app/types/JobType'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
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

    const handleDeleteJob = async (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            const response = await fetch(`/api/jobs?id=${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message)
                setRefetch((prev) => !prev)
            } else {
                console.error("Failed to remove job data");
            }
        } catch (error) {
            console.error("Error deleting job:", error)
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl'>Available jobs</h1>
                <Link href={'/admin/jobs/add'}><button className='bg-blue-950 text-white p-2 rounded-xl'>Add a new job</button></Link>
            </div>

            <div className='relative overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700'>
                <table className='w-full text-left text-sm text-gray-700 dark:text-gray-300'>
                    <thead className='bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Job Title</th>
                            <th scope='col' className='px-6 py-3'>Team</th>
                            <th scope='col' className='px-6 py-3 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs && jobs.length > 0 ? (
                            jobs.map((item) => (
                                <tr
                                    key={item._id}
                                    className='bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                >
                                    <td className='px-6 py-4'>
                                        <Link href={`/admin/jobs/${item._id}`} className='font-semibold text-gray-900 dark:text-white hover:underline'>
                                            {item.jobTitle}
                                        </Link>
                                    </td>
                                    <td className='px-6 py-4'>{item.team}</td>
                                    <td className='px-6 py-4 text-right'>
                                        <button
                                            onClick={(e) => handleDeleteJob(item._id, e)}
                                            className='size-6 bg-red-600 rounded-full items-center flex justify-center text-lg text-white ml-auto hover:bg-red-700 transition-colors'
                                            aria-label='Delete job'
                                        >
                                            <BiTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className='px-6 py-4 text-center text-gray-500'>
                                    No jobs available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminJobs