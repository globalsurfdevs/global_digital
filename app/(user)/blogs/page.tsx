import React from 'react'
import Blogs from '@/app/components/Blogs'
import { getAllBlogs } from '@/app/lib/blog.service';

const page = async () => {
  const dbBlogs = await getAllBlogs();
  return (
    <>
      <Blogs dbBlogs={dbBlogs}/>
    </>
  )
}
 
export default page