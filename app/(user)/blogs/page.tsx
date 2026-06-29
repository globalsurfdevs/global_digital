import React from 'react'
import Blogs from '@/app/components/Blogs'
import { getAllBlogs } from '@/app/lib/blog.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GS Digital Blogs | Digital Marketing Insights UAE',
  description: 'Latest insights on SEO, performance marketing, social content and AI for UAE businesses from GS Digital. Read practical guides and case studies.',
  alternates: {
    canonical: 'https://www.globalsurf.ae/blogs',
  },
};

const page = async () => {
  const dbBlogs = await getAllBlogs();
  return (
    <>
      <Blogs dbBlogs={dbBlogs}/>
    </>
  )
}
 
export default page