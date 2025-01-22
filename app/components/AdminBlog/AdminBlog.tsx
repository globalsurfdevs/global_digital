"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { toast } from 'sonner'

const AdminBlog = () => {

    const [blogs, setBlogs] = useState([])
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`/api/blogs`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setBlogs(data.blog)

                } else {
                    console.error("Failed to fetch blog data");
                }
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        }

        fetchBlogData()
    }, [refetch])

    const handleDeleteBlog = async(id:number) =>{
        try {
            const response = await fetch(`/api/blogs?id=${id}`,{
                method:"DELETE"
            });
                if (response.ok) {
                    const data = await response.json();
                    toast.success(data.message)
                    setRefetch((prev)=>!prev)
                } else {
                    console.error("Failed to remove blog data");
                }
        } catch (error) {
            console.error("Error deleting blog:",error)
        }
    }


    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl'>Available blogs</h1>
                <Link href={'/admin/blogs/add'}><button className='bg-blue-950 text-white p-2 rounded-xl'>Add a new blog</button></Link>
            </div>
            <div className='flex flex-col gap-3'>
                {blogs && blogs.length > 0 ? (
                    blogs.map((item:{id:number,thumbnail:string,heading:string}) => (
                        <div className='w-full relative'>

                            <Link href={`/admin/blogs/${item.id}`} className="w-full h-32 flex flex-col items-center justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className='flex h-full'>
                                    <img className="object-cover w-full rounded-t-lg h-full md:h-full md:w-48 md:rounded-none md:rounded-s-lg" src={item.thumbnail} alt="" />
                                    <div className="flex flex-col justify-between p-4 leading-normal items-center">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.heading}</h5>
                                    </div>
                                </div>


                            </Link>

                            <div className='justify-start flex h-full p-2 absolute top-5 right-5'>
                                <div className='size-5 bg-red-600 rounded-full items-center flex justify-center text-xl text-white' onClick={()=>handleDeleteBlog(item.id)}><IoIosClose /></div>
                            </div>

                        </div>
                    ))

                ) : (
                    <div>No blogs available</div>
                )}


            </div>
        </div>

    )
}

export default AdminBlog