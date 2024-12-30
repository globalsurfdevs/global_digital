"use client"

import React from 'react'

import { useParams } from 'next/navigation'
import { BlogData } from "../../data/BlogData";
import { motion } from "framer-motion";

import Image from "next/image";


const BlogDetails = () => {
    // const router = useRouter();
        const {companyId} = useParams()

    // Find the blog by ID
    const blog = BlogData.find((b) => b.id === parseInt(companyId as string, 10));

    if (!blog) {
      return <p>Loading...</p>; // Or show a "Not Found" message
    }


    return (
        <>
            <div className='container mx-auto py-4'>
      <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                      }}
        >
        <div className='xl:grid  items-center border-b lg:pt-[130px] sm:pt-[50px] pt-[20px] pb-[50px] flex flex-col gap-4'>

          <div className='text-font80   w-full h-full'>
            <h1 className='title-80'>Blogs</h1>
          </div>



        </div>
        </motion.div>
        <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                      }}
                >
                    <div className=' class-blogdetails-mn  pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px] '>
                    <Image
                    src={blog.feature_thumb}
                    className="brd-50 w-100 mb-4"
                    alt={blog.title}
                    width={1000}
                    height={400}
                        />

                  <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
                    </div>

        </motion.div>
      </div>

        </>
    )
}

export default BlogDetails