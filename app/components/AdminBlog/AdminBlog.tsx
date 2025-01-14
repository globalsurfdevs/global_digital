import Link from 'next/link'
import React from 'react'
import { IoIosClose } from 'react-icons/io'

const AdminBlog = () => {
  return (
    <div className='flex flex-col gap-5'>
    <div className='flex justify-between items-center'>
        <h1 className='text-3xl'>Available blogs</h1>
        <Link href={'/admin/blogs/add'}><button className='bg-blue-950 text-white p-2 rounded-xl'>Add a new blog</button></Link>
    </div>
    <div className='flex flex-col gap-3'>
        <div className='w-full relative'>

                    <Link href={`/admin/blog/#`} className="w-full h-32 flex flex-col items-center justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className='flex h-full'>
                            <img className="object-cover w-full rounded-t-lg h-full md:h-full md:w-48 md:rounded-none md:rounded-s-lg" src={""} alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal items-center">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Example blog</h5>
                            </div>
                        </div>

                        
                    </Link>

                    <div className='justify-start flex h-full p-2 absolute top-5 right-5'>
                            <div className='size-5 bg-red-600 rounded-full items-center flex justify-center text-xl text-white'><IoIosClose/></div>
                        </div>

                </div>

    </div>
</div>
  
  )
}

export default AdminBlog